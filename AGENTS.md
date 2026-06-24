# AGENTS.md

This file provides guidance to coding agents when working in this repository.

## Project Overview

Max McKinney's personal portfolio site: a Next.js (App Router) app whose content
(work + personal case studies, site metadata) is authored in **Payload CMS** and
stored in **MongoDB**, with media on **Vercel Blob**. The frontend renders that
content over a custom Tailwind design system.

## Commands

Package manager is **pnpm**. The project is **ESM** (`"type": "module"`) and runs
on Node 21+ (built/tested on Node 23).

```bash
pnpm dev                 # Dev server on localhost:3000 (frontend + /admin)
pnpm build               # Production build (type-checks + prerenders; needs DB access)
pnpm start               # Serve the production build
pnpm lint                # ESLint via next lint
pnpm payload             # Payload CLI
pnpm generate:types      # Regenerate src/payload-types.ts from the config
pnpm generate:importmap  # Regenerate the admin import map (after adding custom components)
```

`pnpm build` queries Payload during static generation, so it (and `pnpm dev`)
require the env vars below. There are no automated tests; "verifying" a change
means `pnpm build`, and `pnpm start` for image/runtime behavior.

### Environment

Copy `.env.example` → `.env`:

- `DATABASE_URL` — MongoDB connection string
- `PAYLOAD_SECRET` — token signing secret (keep stable)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob store token

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Payload 3.85** — `@payloadcms/db-mongodb`, `@payloadcms/storage-vercel-blob`,
  `@payloadcms/richtext-lexical` (Lexical editor)
- **Tailwind CSS v4** (with the typography plugin)
- **GSAP** (`@gsap/react`) for animation; **lottie-react** for the logo
- **sharp** for image processing; **Vercel Analytics**

### ESM / Node notes (easy to get wrong)

- The project is ESM. `postcss.config.mjs` uses `export default`; new config-style
  `.js` files must use ESM, not `module.exports`.
- Payload's bundled types pin an older `sharp`; `payload.config.ts` casts the
  installed `sharp` to `SharpDependency` to bridge harmless type drift.

### Next 15/16 conventions

- Route `params` / `searchParams` are **Promises** — type them as `Promise<…>`
  and `await`. Likewise `headers()` / `cookies()` are async.
- `generateStaticParams` returns **flat** param objects (`{ slug }`).

## Architecture

### Route groups

- `src/app/(frontend)/` — the public site (its own root layout). Route-group
  parentheses don't affect URLs.
- `src/app/(payload)/` — the Payload admin (`/admin`) and REST/GraphQL API routes.
  These files are largely generated; avoid hand-editing them.

### Payload config & collections

- **`src/payload.config.ts`** (`@payload-config` alias) wires Mongo + Vercel Blob +
  Lexical and registers collections/globals. Generated types live in
  `src/payload-types.ts` (`@payload-types`). Run `pnpm generate:types` after any
  schema change.
- **`src/collections/`** — `WorkProjects`, `PersonalProjects` (both grouped into
  admin **tabs** for authoring: Content / Details|Meta / Media / Theme), plus
  `Media` (Vercel Blob upload) and `Users` (admin auth).
- **`src/globals/SiteSettings.ts`** — site title/description/url + social links.
- **`src/fields/`** — reusable fields: `slugField` (auto-slug from title),
  `hexColorField`, `bodyField` (the Lexical body).
- **`src/blocks/MediaBlocks.ts`** — Lexical blocks embeddable in bodies:
  `ImageBlock`, `GalleryBlock`, `VideoBlock`.
- **`src/lib/projectTypes.ts`** — the `PROJECT_TYPES` select options for personal
  projects (note `iOS` is intentionally cased).

### Read layer (frontend)

- **`src/app/fetchers/index.ts`** is the only place that talks to Payload. Use
  `getAllWorkProjects` / `getWorkProjectBySlug` / `getAllPersonalProjects` /
  `getPersonalProjectBySlug` / `getSiteSettings`, plus `mediaURL` / `mediaAlt`
  helpers to resolve upload relationships. List queries use `depth: 1`; detail
  queries use `depth: 2` so Media inside the rich-text body is populated.
- **`src/app/components/RichText/`** renders a Lexical body with custom JSX
  converters for the Image/Gallery/Video blocks (visually matching the prose).
- Root metadata (`(frontend)/layout.tsx`) is derived from the `SiteSettings` global.

### Images

- CMS media is uploaded to **Vercel Blob** via the `Media` collection and served
  through `next/image` (`next.config.mjs` sets `images.formats: ["image/webp"]`
  and allows any remote host). `next/image` with `fill` must include `sizes`.
- For non-CMS images (e.g. the About page) prefer **static imports** from
  `src/assets/img/...`.
- `sharp` needs its native build: it's allow-listed via `pnpm.onlyBuiltDependencies`
  in `package.json` (also `esbuild`). After a fresh install run `pnpm rebuild sharp`
  if optimization fails.
- Note: `public/work/` and `public/personal/` still hold the original source
  images that predate the CMS. They're no longer referenced by the app (media now
  comes from Blob) and can be pruned.

### Components & client interactivity

- Components live under `src/app/components/<Name>/` with an `index.ts(x)` barrel.
- Animations are client components (`"use client"`) using `useGSAP` from `@gsap/react`
  (see `components/Anim/`, `components/Tooltip/`, `components/MaxShape/`).
- The tooltip system is global: `TooltipProvider` is mounted once in
  `(frontend)/layout.tsx`; opt in by wrapping with `<Tooltip content={…}>`.

### Styling (Tailwind v4)

- `src/app/globals.css` does `@import 'tailwindcss'` and `@config '../../tailwind.config.ts'`
  — the v3-style JS config is intentionally retained for theme, keyframes, fonts,
  and the typography plugin. Edit theme/animations there.
- Site-specific layout utilities (`page-grid`, `contained-content`, `page-grid-*`)
  are defined with `@utility` in `globals.css`.
- A base-layer `border-color` compatibility block exists because v4 changed the
  default border color to `currentColor`; don't remove it without auditing borders.
- Dark theme: black background, white text.

## Authoring content

Content is edited in the Payload admin at **`/admin`** (first visit prompts you to
create the initial user). To change the content model, edit the relevant file in
`src/collections/` or `src/globals/`, then run `pnpm generate:types` (and
`pnpm generate:importmap` if you added custom admin components).

## Conventions

- Mixed file extensions (`.tsx`, `.jsx`, `.js`) exist by design — match the
  extension and style of the file/area you're editing.
- Path aliases: `@/*` → `src/*`, `@components/*`, `@assets/*`, `@util/*`,
  `@payload-config`, `@payload-types`.
