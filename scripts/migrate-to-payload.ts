/**
 * One-shot migration of MDX case studies (src/work, src/personal) + site config
 * into Payload. Idempotent: existing docs (matched by slug) and media (matched by
 * filename) are reused, so it's safe to re-run. Pass `--fresh` to delete existing
 * project docs first and re-import from scratch.
 *
 *   pnpm migrate            # import, skipping anything already present
 *   pnpm migrate --fresh    # wipe work/personal docs, then import
 *
 * Requires DATABASE_URL, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN in .env.
 */
import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";

import { loadEnvConfig } from "@next/env";
import yaml from "js-yaml";
import { getPayload } from "payload";
import { editorConfigFactory, convertMarkdownToLexical, BlocksFeature } from "@payloadcms/richtext-lexical";

import config from "../src/payload.config";
import { ImageBlock, GalleryBlock, VideoBlock } from "../src/blocks/MediaBlocks";

loadEnvConfig(process.cwd());

const ROOT = process.cwd();
const FRESH = process.argv.includes("--fresh");

const MIME: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".avif": "image/avif",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
};

const oid = () => randomBytes(12).toString("hex");

function mimeFor(filename: string): string {
    return MIME[path.extname(filename).toLowerCase()] || "application/octet-stream";
}

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

interface Parsed {
    data: Record<string, any>;
    body: string;
}

function parseFrontmatter(raw: string): Parsed {
    const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
    if (!match) return { data: {}, body: raw };
    return { data: (yaml.load(match[1]) as Record<string, any>) ?? {}, body: match[2] };
}

// ---------------------------------------------------------------------------
// Media upload (deduped + idempotent)
// ---------------------------------------------------------------------------

let payload: Awaited<ReturnType<typeof getPayload>>;
const mediaCache = new Map<string, string>();

async function ensureMedia(source: string, alt: string): Promise<string> {
    const key = source.trim();
    if (mediaCache.has(key)) return mediaCache.get(key)!;

    let buffer: Buffer;
    let filename: string;

    if (/^https?:\/\//.test(key)) {
        filename = decodeURIComponent(key.split(/[?#]/)[0].split("/").pop() || `asset-${oid()}`);
        const res = await fetch(key);
        if (!res.ok) throw new Error(`Failed to fetch ${key}: ${res.status}`);
        buffer = Buffer.from(await res.arrayBuffer());
    } else {
        const filePath = path.join(ROOT, "public", key);
        if (!fs.existsSync(filePath)) throw new Error(`Local asset not found: ${filePath} (from "${key}")`);
        filename = path.basename(key);
        buffer = fs.readFileSync(filePath);
    }

    // Reuse an existing Media doc with the same filename (idempotent re-runs).
    const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1, depth: 0 });
    if (existing.docs.length > 0) {
        const id = String(existing.docs[0].id);
        mediaCache.set(key, id);
        return id;
    }

    const doc = await payload.create({
        collection: "media",
        data: { alt: alt || filename },
        file: { data: buffer, mimetype: mimeFor(filename), name: filename, size: buffer.length },
    });
    const id = String(doc.id);
    mediaCache.set(key, id);
    console.log(`    ↑ uploaded ${filename}`);
    return id;
}

// ---------------------------------------------------------------------------
// MDX body → Lexical
// ---------------------------------------------------------------------------

type LexicalNode = Record<string, unknown>;

let editorConfig: Awaited<ReturnType<typeof editorConfigFactory.fromFeatures>>;

function blockNode(blockType: string, fields: Record<string, unknown>): LexicalNode {
    return { type: "block", format: "", version: 2, fields: { id: oid(), blockType, ...fields } };
}

function parseAttrs(tag: string): Record<string, string> {
    const attrs: Record<string, string> = {};
    const re = /(\w+)\s*=\s*"([^"]*)"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(tag))) attrs[m[1]] = m[2];
    return attrs;
}

const splitPipes = (v: string | undefined) =>
    (v ?? "")
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);

async function tagToBlock(tag: string): Promise<LexicalNode | null> {
    if (tag.startsWith("<video")) {
        const srcMatch = /<source\b[^>]*\bsrc\s*=\s*"([^"]+)"/.exec(tag);
        if (!srcMatch) return null;
        const video = await ensureMedia(srcMatch[1], "");
        return blockNode("videoBlock", { video, subtitle: "" });
    }

    const attrs = parseAttrs(tag);
    if (attrs.srcs) {
        const srcs = splitPipes(attrs.srcs);
        const alts = splitPipes(attrs.alts);
        const images: LexicalNode[] = [];
        for (let i = 0; i < srcs.length; i++) {
            images.push({ id: oid(), image: await ensureMedia(srcs[i], alts[i] || "") });
        }
        return blockNode("galleryBlock", { images, subtitle: attrs.subtitle || "" });
    }
    if (attrs.src) {
        const image = await ensureMedia(attrs.src, attrs.alt || "");
        return blockNode("imageBlock", { image, subtitle: attrs.subtitle || "" });
    }
    return null;
}

/** Normalize inline raw HTML the markdown converter doesn't handle. */
function preprocessMarkdown(md: string): string {
    return md.replace(/<i>([\s\S]*?)<\/i>/g, "*$1*");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function bodyToLexical(body: string): Promise<any> {
    const children: LexicalNode[] = [];
    const TAG_RE = /<ImageContainer\b[\s\S]*?\/>|<video\b[\s\S]*?<\/video>/g;

    const pushMarkdown = (chunk: string) => {
        const md = preprocessMarkdown(chunk).trim();
        if (!md) return;
        const state = convertMarkdownToLexical({ editorConfig, markdown: md });
        children.push(...((state.root.children as LexicalNode[]) ?? []));
    };

    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = TAG_RE.exec(body))) {
        pushMarkdown(body.slice(last, m.index));
        const node = await tagToBlock(m[0]);
        if (node) children.push(node);
        last = TAG_RE.lastIndex;
    }
    pushMarkdown(body.slice(last));

    return { root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children } };
}

// ---------------------------------------------------------------------------
// Collection import
// ---------------------------------------------------------------------------

function readMdxDir(dir: string) {
    const full = path.join(ROOT, "src", dir);
    return fs
        .readdirSync(full)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => ({ slug: f.replace(/\.mdx$/, ""), raw: fs.readFileSync(path.join(full, f), "utf8") }));
}

const toISO = (d: string) => new Date(d).toISOString();

async function alreadyExists(collection: "work-projects" | "personal-projects", slug: string): Promise<boolean> {
    const res = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0 });
    return res.docs.length > 0;
}

async function importWork() {
    console.log("\n▶ Work projects");
    for (const { slug, raw } of readMdxDir("work")) {
        if (await alreadyExists("work-projects", slug)) {
            console.log(`  • ${slug} (exists, skipped)`);
            continue;
        }
        const { data: fm, body } = parseFrontmatter(raw);
        console.log(`  • ${slug}`);
        await payload.create({
            collection: "work-projects",
            data: {
                title: fm.title,
                projectShortBrief: fm.projectShortBrief,
                projectBrief: fm.projectBrief,
                body: await bodyToLexical(body),
                projectClient: fm.projectClient,
                projectRole: fm.projectRole,
                projectDate: fm.projectDate,
                ...(fm.projectAgency ? { projectAgency: fm.projectAgency } : {}),
                categories: fm.categories,
                image: await ensureMedia(fm.image, fm.title),
                thumb: await ensureMedia(fm.thumb, fm.title),
                themeColor: fm.themeColor,
                accentColor: fm.accentColor,
                slug,
                sortDate: toISO(fm.sortDate),
            },
        });
    }
}

async function importPersonal() {
    console.log("\n▶ Personal projects");
    for (const { slug, raw } of readMdxDir("personal")) {
        if (await alreadyExists("personal-projects", slug)) {
            console.log(`  • ${slug} (exists, skipped)`);
            continue;
        }
        const { data: fm, body } = parseFrontmatter(raw);
        console.log(`  • ${slug}`);
        await payload.create({
            collection: "personal-projects",
            data: {
                title: fm.title,
                description: fm.description,
                body: await bodyToLexical(body),
                projectTypes: fm.projectTypes,
                projectLink: fm.projectLink,
                ...(fm.sourceLink ? { sourceLink: fm.sourceLink } : {}),
                locationText: fm.locationText,
                icon: await ensureMedia(fm.icon, fm.title),
                seoImage: await ensureMedia(fm.seoImage, fm.title),
                ...(fm.cardMedia ? { cardMedia: await ensureMedia(fm.cardMedia, fm.title) } : {}),
                cardAspect: fm.cardAspect || "16/9",
                accent: fm.accent,
                ...(fm.accentForeground ? { accentForeground: fm.accentForeground } : {}),
                slug,
                sortDate: toISO(fm.sortDate),
            },
        });
    }
}

async function seedSiteSettings() {
    console.log("\n▶ Site settings");
    const siteConfig = (await import("../src/siteConfig")).default;
    await payload.updateGlobal({
        slug: "site-settings",
        data: { title: siteConfig.title, description: siteConfig.description, siteUrl: siteConfig.siteUrl },
    });
    console.log("  • updated");
}

async function wipe(collection: "work-projects" | "personal-projects") {
    const all = await payload.find({ collection, limit: 1000, depth: 0 });
    for (const doc of all.docs) {
        await payload.delete({ collection, id: doc.id });
    }
    if (all.docs.length) console.log(`  – cleared ${all.docs.length} ${collection}`);
}

async function main() {
    payload = await getPayload({ config });
    editorConfig = await editorConfigFactory.fromFeatures({
        config: payload.config,
        features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: [ImageBlock, GalleryBlock, VideoBlock] })],
    });

    if (FRESH) {
        console.log("▶ --fresh: clearing project collections");
        await wipe("work-projects");
        await wipe("personal-projects");
    }

    await importWork();
    await importPersonal();
    await seedSiteSettings();

    console.log("\n✅ Migration complete.");
    process.exit(0);
}

main().catch((err) => {
    console.error("\n❌ Migration failed:");
    console.error(err);
    process.exit(1);
});
