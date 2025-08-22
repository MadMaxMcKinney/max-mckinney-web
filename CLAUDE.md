# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Max McKinney's personal portfolio website built with Next.js 14, showcasing professional work and personal projects. The site features MDX-based content management for project case studies and a custom design system built with Tailwind CSS.

## Commands

**Development:**
```bash
npm run dev                    # Start development server on localhost:3000
npm run build                  # Create production build
npm run start                  # Start production server
npm run lint                   # Run ESLint
```

**Supabase Integration:**
```bash
npm run update-supabase-types  # Generate TypeScript types from Supabase schema
```

## Architecture

### Project Structure
- **src/app/**: Next.js App Router pages and API routes
- **src/personal/**: MDX files for personal project case studies
- **src/work/**: MDX files for professional work case studies
- **src/app/components/**: React components organized by type (Buttons, Cards, etc.)
- **src/assets/**: Static assets (images, Lottie animations)
- **public/**: Public assets organized by project type (personal/, work/)

### Key Technologies
- **Next.js 14** with App Router
- **MDX** for content management (@mdx-js/react, next-mdx-remote)
- **Tailwind CSS** with custom animations and typography plugin
- **Plaiceholder** for image optimization
- **Vercel Analytics** for tracking

### Content Management
The site uses a hybrid approach:
- **Static MDX files** in `/src/personal/` and `/src/work/` for case study content
- **Dynamic routing** with `[slug]` pages that load corresponding MDX files

### Component Architecture
Components are organized functionally:
- **Cards/**: Project display components (PersonalProjectCard, ProfessionalProjectCard)
- **Buttons/**: Various button types with consistent styling
- **ImageContainer/**: Custom image wrapper with optimization
- **Typography/**: Text components following design system
- **Utils/**: Utility components (BodyColorizer, DynamicLink)

### Styling System
- Custom Tailwind config with extended animations and color schemes
- Typography plugin configured for MDX content rendering
- Custom keyframe animations for interactive elements
- Design optimized for dark theme with white text (#ffffff)

### Data Flow
1. MDX content files define project metadata and content
2. Dynamic pages (`[slug]/page.tsx`) load and render MDX content
3. Components use fetchers from `/src/app/fetchers/` for data access

## Development Notes

- The site uses mixed file extensions (.tsx, .jsx, .js) - maintain existing patterns per component
- Image assets are organized by project in `/public/personal/` and `/public/work/`
- Site metadata is centralized in `/src/siteConfig.ts`
- Remote image patterns are configured in `next.config.mjs` to allow any hostname