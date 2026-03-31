# ulisesantana.dev

Personal blog by **Ulises Santana** — bilingual (Spanish/English), built with **Astro 5**, **Tailwind CSS 4**, and **MDX**. Deployed at [ulisesantana.dev](https://ulisesantana.dev).

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static Site Generator (SSG) |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling + `@tailwindcss/typography` |
| MDX | Blog posts with components |
| [Shiki](https://shiki.style) | Syntax highlighting (`min-light` / `night-owl`) |
| [Pagefind](https://pagefind.app) | Full-text search (both languages) |
| Vitest | Unit tests |
| ESLint + Prettier | Linting & formatting |

## 📂 Project Structure

```
src/
├── config.ts              # Global site config (SITE)
├── config/i18n.ts         # UI translations – use t(locale, key)
├── content.config.ts      # Content collection schema
├── data/
│   ├── nav.ts             # Navigation items per locale
│   └── blog/              # Posts organised by year
│       └── {year}/{slug}/
│           ├── es.md(x)   # Spanish version
│           ├── en.md(x)   # English version (if translated)
│           └── *.png/jpg  # Images shared between translations
├── components/            # Astro components
├── layouts/               # Layout, Main, PostDetails, AboutLayout
├── pages/
│   ├── index.astro        # Home EN  →  /
│   ├── blog/              # Blog EN  →  /blog/
│   ├── tags/              # Tags EN  →  /tags/
│   ├── rss.xml.ts         # RSS EN
│   └── es/                # All routes mirrored for ES  →  /es/*
├── styles/
│   ├── global.css         # CSS variables (colors, theme)
│   └── typography.css     # Prose styles, fonts, headings
└── utils/                 # Pure utility functions
```

## 🌍 Bilingual System (i18n)

- **English** (default): `/`, `/blog/`, `/tags/`, `/about/`, `/rss.xml`
- **Spanish** (`/es/` prefix): `/es/`, `/es/blog/`, `/es/tags/`, `/es/sobre-mi/`, `/es/rss.xml`
- Each post has `lang: "en" | "es"` in its frontmatter (defaults to `"en"`)
- UI translations are centralised in `src/config/i18n.ts` — always use `t(locale, key)`
- Each language has its own RSS feed and Pagefind search index
- `Layout.astro` automatically generates `<link rel="alternate" hreflang="en|es|x-default">` tags

## ✍️ Creating a Blog Post

### Spanish post

1. Create `src/data/blog/{year}/{slug}/es.md` (or `.mdx` for components)
2. Add `lang: es` to frontmatter
3. Co-locate images in the same folder and reference them with relative paths

```yaml
---
title: Mi nuevo post
pubDatetime: 2026-03-21
description: Descripción corta.
tags: [javascript, astro]
ogImage: ./cover.png
draft: false
lang: es
---
```

### English post

Same structure but name the file `en.md` (or `en.mdx`) — `lang: en` is the default.

### Posts with components (MDX)

```mdx
---
title: My post
pubDatetime: 2026-03-21
description: Short description.
tags: [javascript]
lang: es
---
import Tldr from "@/components/Tldr.astro"
import YouTubeVideo from "@/components/YouTubeVideo.astro"
import Img from "@/components/Img.astro"

<Tldr>Short summary.</Tldr>

Content...

<YouTubeVideo videoId="abc123" />
```

### Available MDX components

| Component | Description |
|---|---|
| `Tldr` | "TL;DR 🔥" button opening a summary modal |
| `YouTubeVideo` | Responsive YouTube embed (`videoId` prop) |
| `Img` | Image with caption |
| `XEmbed` | Embedded tweet |

## 🛠️ Commands

```bash
npm run dev           # Start Astro dev server
npm run build         # Type check + build + Pagefind index
npm run preview       # Preview the production build
npm run test          # Run Vitest unit tests
npm run lint          # ESLint
npm run format        # Prettier (write)
npm run format:check  # Prettier (check only)
```

## 🎨 Theme System

- **Light**: `html[data-theme="light"]` — green accent (`#44853e`)
- **Dark**: `html[data-theme="dark"]` — yellow accent (`#F7E018`)
- CSS variables in `src/styles/global.css`: `--background`, `--foreground`, `--accent`, `--accent-alt`, `--muted`

## 📋 Code Conventions

- All code, comments, and commits in **English**
- TypeScript everywhere; `@/` alias → `src/`
- `no console.log` (ESLint rule enforced)
- Filter posts by language: `getCollection("blog", ({ data }) => data.lang === "es")`
- Generate URLs with `getPath(id, filePath, includeBase, lang, slug)` from `@/utils/getPath`
- Sort posts with `getSortedPosts()` from `@/utils/getSortedPosts`

## 📄 License

MIT
