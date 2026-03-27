# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start Astro dev server
npm run build         # Type check + build + generate Pagefind search index
npm run preview       # Preview built site
npm run lint          # Run ESLint
npm run format        # Run Prettier (write)
npm run format:check  # Run Prettier (check only)
npm run test          # Run Vitest unit tests once
```

> No `console.log` is allowed (ESLint rule). Build runs `astro check` for TypeScript before compiling.

## Architecture

This is a bilingual (English/Spanish) personal blog built with **Astro 5** (SSG), **Tailwind CSS 4**, and **MDX**. Deployed to Cloudflare Pages at ulisesantana.dev.

### i18n System

- English routes: `/`, `/blog/`, `/tags/`, `/rss.xml`
- Spanish routes: `/es/`, `/es/blog/`, `/es/tags/`, `/es/rss.xml`
- Each post has a `lang: "en" | "es"` frontmatter field
- UI translations live in `src/config/i18n.ts` — use `t(locale, key)` in components
- `src/pages/es/` mirrors the English `src/pages/` structure exactly

### Blog Post Structure

Posts live in `src/data/blog/{year}/{slug}/` with language files:
- `en.md` or `en.mdx` for English
- `es.md` or `es.mdx` for Spanish
- Images are co-located and shared between translations (relative paths: `./image.png`)
- Use `.mdx` extension when the post includes components

### Key Utilities (`src/utils/`)

| Utility | Purpose |
|---|---|
| `getPath(id, filePath, includeBase, lang)` | Generate language-aware URLs |
| `getSortedPosts()` | Sort posts by date |
| `getPostsByLang()` | Filter collection by `lang` field |
| `getTranslatedPostUrl()` | Get the URL for the same post in the other language |
| `postFilter` | Exclude drafts in production |

### Content Schema

Defined in `src/content.config.ts`. Required fields: `author`, `pubDatetime`, `title`, `tags`, `description`. Notable optional fields: `lang` (defaults to `"en"`), `draft`, `featured`, `modDatetime`.

### Theme System

- Light theme: `html[data-theme="light"]` — green accent (`#44853e`)
- Dark theme: `html[data-theme="dark"]` — yellow accent (`#F7E018`)
- CSS variables defined in `src/styles/global.css`: `--background`, `--foreground`, `--accent`, `--accent-alt`, `--muted`

### MDX Components (available in posts)

- `Tldr` — summary modal
- `YouTubeVideo` — responsive embed
- `Img` — image with caption
- `XEmbed` — embedded tweet

### OG Image Generation

Dynamic OG images via Satori in `src/utils/generateOgImages.ts` with templates in `src/utils/og-templates/`. Fonts loaded via `src/utils/loadGoogleFont.ts`.

## Conventions

- All code, comments, and commits in **English**
- TypeScript for all code; use `@/` alias for `src/`
- Filter blog posts by language with `getCollection("blog", ({data}) => data.lang === "es")`
- `getStaticPaths()` in each route handles language-specific filtering
- Fonts: Fira Sans (body), Fira Code (monospace)
- Global site config in `src/config.ts` (SITE object), social links in `src/constants.ts`
