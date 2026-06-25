import { getPayload } from "payload";
import { draftMode } from "next/headers";
import config from "@payload-config";
import type { WorkProject, PersonalProject, Media } from "@payload-types";

export type { WorkProject, PersonalProject, Media };

async function client() {
    return getPayload({ config });
}

/**
 * Whether Next.js Draft Mode is on for this request (set by /next/preview).
 * Returns false outside a request scope (e.g. during generateStaticParams).
 */
async function draftEnabled(): Promise<boolean> {
    try {
        return (await draftMode()).isEnabled;
    } catch {
        return false;
    }
}

/**
 * Lists only enforce access control (`overrideAccess: false`) so the public site
 * and generateStaticParams see published projects only — never drafts.
 */

/** All work projects, newest first. depth 1 populates thumb/header Media. */
export async function getAllWorkProjects(): Promise<WorkProject[]> {
    const payload = await client();
    const { docs } = await payload.find({ collection: "work-projects", limit: 200, sort: "-sortDate", depth: 1, overrideAccess: false });
    return docs;
}

/** A single work project (depth 2 also populates Media inside the rich-text body). */
export async function getWorkProjectBySlug(slug: string): Promise<WorkProject | null> {
    const payload = await client();
    const draft = await draftEnabled();
    const { docs } = await payload.find({ collection: "work-projects", where: { slug: { equals: slug } }, limit: 1, depth: 2, draft, overrideAccess: draft });
    return docs[0] ?? null;
}

/** All personal projects, newest first. */
export async function getAllPersonalProjects(): Promise<PersonalProject[]> {
    const payload = await client();
    const { docs } = await payload.find({ collection: "personal-projects", limit: 200, sort: "-sortDate", depth: 1, overrideAccess: false });
    return docs;
}

/** A single personal project (depth 2 populates body Media). */
export async function getPersonalProjectBySlug(slug: string): Promise<PersonalProject | null> {
    const payload = await client();
    const draft = await draftEnabled();
    const { docs } = await payload.find({ collection: "personal-projects", where: { slug: { equals: slug } }, limit: 1, depth: 2, draft, overrideAccess: draft });
    return docs[0] ?? null;
}

export async function getSiteSettings() {
    const payload = await client();
    return payload.findGlobal({ slug: "site-settings" });
}

/** Resolve a Media relationship (populated object or raw id) to its URL. */
export function mediaURL(value: string | Media | null | undefined): string | null {
    if (!value || typeof value === "string") return null;
    return value.url ?? null;
}

/** Resolve a Media relationship to its alt text. */
export function mediaAlt(value: string | Media | null | undefined): string {
    if (!value || typeof value === "string") return "";
    return value.alt ?? "";
}
