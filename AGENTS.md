# AGENTS.md

This file provides guidance to coding agents when working in this repository.

## Project Overview

Max McKinney's personal portfolio site: a Next.js (App Router) app that renders
professional work and personal project case studies from local MDX files, over a
custom Tailwind design system. Content is the data layer — there is no database
or CMS (Payload is planned but not yet installed).

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`). Node 20+.

```bash
pnpm dev              # Dev server on localhost:3000
pnpm build            # Production build (type-checks + prerenders static pages)
pnpm start            # Serve the production build (required to exercise next/image optimization)
pnpm lint             # ESLint via next lint
pnpm create:project   # Interactive scaffolder for a new MDX project (see below)
```

There are no automated tests. "Verifying" a change means `pnpm build` (catches
type + prerender errors) and, for image/runtime behavior, `pnpm build && pnpm start`
since `next/image` optimization does not run under `pnpm dev`.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (with the typography plugin)
- **MDX** via `next-mdx-remote/rsc`
- **GSAP** (`@gsap/react`) for animation; **lottie-react** for the logo
- **plaiceholder** + **sharp** for image processing; **Vercel Analytics**

### Next 15/16 conventions (easy to get wrong)

- Route `params` / `searchParams` are **Promises** — type them as `Promise<…>`
  and `await` them. Likewise `headers()` / `cookies()` are async.
- `generateStaticParams` returns **flat** param objects (`{ slug }`), not the
  legacy `{ params: { slug } }` wrapper.

## Architecture

### Content pipeline (the core of the app)

1. Case studies live as MDX in `src/work/` and `src/personal/`. Frontmatter is the
   project's metadata.
2. **`src/schemas/project.ts`** is the single source of truth for project shape —
   Zod schemas (`PersonalProjectSchema`, `WorkProjectSchema`) that also export the
   TS types re-exported from `src/types`.
3. **`src/app/fetchers/index.ts`** reads the MDX files from disk (`fs`) and compiles
   them with `compileMDX` using a fixed component map (`ImageContainer`, `Image`).
   Use `getAllWorkProjects`, `getAllPersonalProjects`, `getMarkdownBySlug`, etc.
   rather than reading files ad hoc.
4. Dynamic routes (`src/app/**/[slug]/page.tsx`) resolve a slug → MDX → rendered page.

### Scaffolding new content

`pnpm create:project` (`scripts/create-project.ts`) is an inquirer CLI that prompts
for fields defined by the Zod schemas and writes a valid MDX file. Prefer it over
hand-writing frontmatter so required fields stay correct.

### Styling (Tailwind v4)

- `src/app/globals.css` does `@import 'tailwindcss'` and `@config '../../tailwind.config.ts'`
  — the v3-style JS config is intentionally retained for theme, custom keyframe
  animations, fonts, and the typography plugin. Edit theme/animations there.
- Site-specific layout utilities (`page-grid`, `contained-content`, `page-grid-*`)
  are defined with `@utility` in `globals.css`.
- A base-layer `border-color` compatibility block is present because v4 changed the
  default border color to `currentColor`; don't remove it without auditing borders.
- Dark theme: black background, white text.

### Images

- Prefer **static imports** from `src/assets/img/...` (Next infers dimensions, enables
  optimization/blur, and gives typed `StaticImageData`) over `public/` string paths.
- `next/image` with `fill` must always include a `sizes` prop.
- `next.config.mjs` sets `images.formats: ["image/webp"]` and allows any remote host.
- `sharp` needs its native build: it's allow-listed via `pnpm.onlyBuiltDependencies`
  in `package.json`. After a fresh install run `pnpm rebuild sharp` if optimization fails.

### Components & client interactivity

- Components live under `src/app/components/<Name>/` with an `index.ts(x)` barrel.
- Animations are client components (`"use client"`) using `useGSAP` from `@gsap/react`
  (see `components/Anim/`, `components/Tooltip/`, `components/MaxShape/`).
- The tooltip system is global: `TooltipProvider` is mounted once in `app/layout.tsx`,
  and any element opts in by wrapping with `<Tooltip content={…}>`. It renders a single
  cursor-following element; per-trigger look is tuned via `edges` / `padding` props.
- Site metadata defaults live in `src/siteConfig.ts`.

## Conventions

- Mixed file extensions (`.tsx`, `.jsx`, `.js`) exist by design — match the
  extension and style of the file/area you're editing rather than converting it.
- Path aliases: `@/*` → `src/*`, `@components/*`, `@assets/*`, `@util/*`.

## MDX Authoring Notes

### ImageContainer array props

When using `ImageContainer` in MDX with multiple images, do **not** use expression
props like `srcs={["/a.png", "/b.png"]}`. Use pipe-delimited strings:

```mdx
<ImageContainer
  srcs="/work/example/a.png|/work/example/b.png"
  alts="Alt A|Alt B"
  subtitle="Example subtitle"
/>
```

Why: the MDX pipeline uses `next-mdx-remote/rsc`, where expression-valued props can
be dropped during compile. Simple string attributes are preserved and parsed by
`ImageContainer`.
