# Copilot Instructions — ulisesantana.dev

## Project

Bilingual personal blog (Spanish/English) by Ulises Santana, built with **Astro 5**, **Tailwind CSS 4**, **MDX**, and based on the AstroPaper theme. Deployed at `https://ulisesantana.dev/`.

## Tech Stack

- **Framework**: Astro 5 (SSG, static output)
- **Styling**: Tailwind CSS 4 with `@tailwindcss/vite` + `@tailwindcss/typography` + CSS custom properties
- **Content**: Markdown (`.md`) and MDX (`.mdx`) with Astro content collections
- **Syntax highlighting**: Shiki (themes `min-light` / `night-owl`)
- **Testing**: Vitest
- **Linting**: ESLint
- **Fonts**: Fira Sans (body text) and Fira Code (code blocks), loaded from Google Fonts

## Project Architecture

### Key Folder Structure

```
src/
├── config.ts              # Global site configuration (SITE)
├── config/i18n.ts         # UI translations with t(locale, key) function
├── content.config.ts      # Content collection schema (blog, pages)
├── data/
│   ├── nav.ts             # Navigation items per locale
│   └── blog/              # Blog posts (co-located with images)
│       ├── 2020/          # Posts organized by year
│       │   └── my-post/   # Each post is a folder
│       │       ├── es.md  # Spanish version
│       │       ├── en.md  # English version (if translated)
│       │       ├── cover.png  # Images shared between translations
│       │       └── photo.jpg
│       ├── 2021/
│       ├── 2022/
│       ├── drafts/        # Drafts (draft: true)
│       └── _releases/     # AstroPaper release posts (excluded by _ prefix)
```
├── layouts/               # Layouts (Layout, Main, PostDetails, AboutLayout)
├── pages/
│   ├── index.astro        # Home EN
│   ├── blog/              # Blog routes EN
│   ├── tags/              # Tag routes EN
│   ├── rss.xml.ts         # RSS feed EN
│   └── es/                # All routes duplicated for ES
│       ├── index.astro
│       ├── blog/
│       ├── tags/
│       └── rss.xml.ts
├── styles/
│   ├── global.css         # Theme CSS variables (colors, z-index, transitions)
│   └── typography.css     # Tailwind typography plugin + fonts + headings
└── utils/                 # Pure utility functions
```

### Bilingual System (i18n)

The blog supports **English** (default) and **Spanish**:

- **Default language**: English (`/`, `/blog/`, `/tags/`)
- **Spanish**: `/es/` prefix (`/es/`, `/es/blog/`, `/es/tags/`)
- Each post has a `lang: "en" | "es"` field in its frontmatter (defaults to `"en"`)
- Pages under `/es/` filter posts by `lang === "es"` and pages under `/` filter by `lang === "en"`
- UI translations are centralized in `src/config/i18n.ts`. Always use `t(locale, key)` for interface strings — never hardcode them
- Per-locale navigation is defined in `src/data/nav.ts`
- The `LanguageSwitch.astro` component toggles between languages using 🇬🇧/🇪🇸 emoji flags
- Each language has its own RSS feed (`/rss.xml` and `/es/rss.xml`)

### Content Collections

Posts live in `src/data/blog/` and use the following schema (`content.config.ts`):

```typescript
z.object({
  author: z.string().default(SITE.author),
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  title: z.string(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  ogImage: image().or(z.string()).optional(),
  description: z.string(),
  canonicalURL: z.string().optional(),
  hideEditPost: z.boolean().optional(),
  timezone: z.string().optional(),
  lang: z.enum(["en", "es"]).default("en"),
})
```

- Files inside folders prefixed with `_` (e.g. `_releases/`) are excluded from the content loader
- Drafts (`draft: true`) are filtered out in `getStaticPaths` and in the prev/next list in `PostDetails.astro`

### Theme System (Light / Dark)

- Light theme: `html[data-theme="light"]` — green accent (`#44853e`), white background
- Dark theme: `html[data-theme="dark"]` — yellow accent (`#F7E018`), dark background
- Key CSS variables: `--background`, `--foreground`, `--accent`, `--accent-alt`, `--muted`
- Tailwind colors are mapped in `global.css` via `@theme inline`

### Styling and Typography

- **Do not use `!important`** in Tailwind Typography (`.prose`) utilities. All `!` prefixes were intentionally removed so that component styles can override them
- Headings (`h2`–`h6`) have a `border-left` with the accent color and `color: var(--accent)`, defined in `typography.css`
- `strong` elements use a yellow background with dark text (highlighter style)
- Fonts are declared as CSS variables: `--font-family-1` (Fira Sans) for body text, `--font-family-2` (Fira Code) for code

## Conventions for Creating / Editing Posts

### Co-located folder structure

Each post lives in its own folder: `src/data/blog/{year}/{slug}/`. The folder contains the post file(s) named by language (`es.md`, `en.md`, `es.mdx`, etc.) and all related images. Images are shared between translations of the same post.

### Creating a new Spanish post

1. Create the folder at `src/data/blog/{year}/{slug}/`
2. Create the post file as `es.md` (or `es.mdx` if it uses components)
3. Place images directly in the same folder
4. Always include `lang: es` in the frontmatter
5. Use `pubDatetime` as the date (type `Date`, format `YYYY-MM-DD`)
6. Tags are an array of lowercase strings
7. Reference images with relative paths: `./cover.png`

Frontmatter example:

```yaml
---
title: Mi nuevo post
pubDatetime: 2026-03-21
description: Descripción corta del post.
tags: [javascript, astro]
ogImage: ./cover.png
draft: false
lang: es
---
```

### Creating a new English post

Same as Spanish but name the file `en.md` (or `en.mdx`) and use `lang: en` (or omit the `lang` field entirely, since `"en"` is the default).

### Referencing images in posts

Since images are co-located with the post, always use **relative paths**:

- In Markdown: `![alt text](./my-image.png)`
- In MDX with `Img` component: `<Img src={import("./my-image.png")} alt="..." />`
- In frontmatter `ogImage`: `ogImage: ./cover.png`

### Using Components in Posts

If a post needs Astro components (e.g. `Tldr`, `YouTubeVideo`, `Img`), the file **must be `.mdx`** and import the components:

```mdx
---
title: My post
pubDatetime: 2026-03-21
description: Short description.
tags: [javascript]
ogImage: ./cover.png
lang: es
---
import Tldr from "@/components/Tldr.astro"
import YouTubeVideo from "@/components/YouTubeVideo.astro"
import Img from "@/components/Img.astro"

<Tldr>
  Short summary of the post.
</Tldr>

Post content...

<Img src={import("./diagram.png")} alt="A diagram" />

<YouTubeVideo videoId="abc123" />
```

### Available Components for Posts

- `Tldr` — "TL;DR 🔥" button that opens a modal with a summary
- `YouTubeVideo` — Responsive YouTube embed (`videoId` prop)
- `Img` — Image with caption
- `JsRepl` — Interactive JavaScript REPL (legacy, 11ty compatibility)

## Code Conventions

- **All code, comments, commit messages, and documentation must be written in English**, regardless of the language the user communicates in. The only Spanish content should be blog post bodies (`lang: es`), UI translation values in `i18n.ts`, and user-facing strings in the `es` locale
- Use **TypeScript** for all code
- The `@/` alias points to `src/`
- Pure utility functions go in `src/utils/`
- Always use `getPath(id, filePath, includeBase, lang)` from `@/utils/getPath` to generate post URLs
- Use `getSortedPosts()` from `@/utils/getSortedPosts` to sort posts
- Filter by language with `getCollection("blog", ({ data }) => data.lang === "es")`
- The language type is `Language` (`"en" | "es"`) or `Locale` from `@/config/i18n`

## Commands

- `npm run dev` — Development server
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview the production build
- `npm run test` — Run tests with Vitest
- `npm run lint` — Lint with ESLint
