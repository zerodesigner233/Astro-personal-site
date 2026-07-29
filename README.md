# Astro Personal Site

Personal portfolio and blog built with [Astro 7](https://astro.build), featuring a bento grid portfolio layout, bilingual i18n (Chinese/English), dark/light theme with glassmorphism, and a tab-based single-page interface.

> Live demo: https://zerodesigner233.github.io/Astro-personal-site

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 7](https://astro.build) — static site generation, Islands architecture |
| Content | MDX + [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) with Zod validation |
| Styling | CSS Custom Properties, [Tailwind CSS 4](https://tailwindcss.com) (utility classes), backdrop-filter glassmorphism |
| Search | [Pagefind](https://pagefind.app) — static full-text search, zero runtime |
| Icons | Inline SVGs (GitHub, Bilibili, Email) |
| Deployment | GitHub Pages via GitHub Actions |

## Features

- **Bento Grid Portfolio** — CSS Grid layout with `align-items: start` for natural image aspect ratios
- **Bilingual i18n** — Zero-dependency data-attribute driven Chinese/English switching
- **Dark / Light Theme** — CSS custom properties + `prefers-color-scheme` + localStorage persistence
- **Tab-based SPA-like Navigation** — Pure CSS tab switching with `history.replaceState` for deep linking
- **Drag-and-drop Work Reordering** — HTML5 Drag & Drop API with localStorage persistence
- **Full-text Search** — Pagefind indexes static content for offline-capable search
- **Glassmorphism UI** — `backdrop-filter: blur()` with light/dark adaptive glass surfaces
- **Responsive** — 3-column → 2-column → 1-column breakpoints
- **Animated Entry** — Staggered `@keyframes` entrance animations per item

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Header.astro          # Site header, nav tabs, theme/lang toggles
│   └── tabs/
│       ├── WorksTab.astro         # Bento grid portfolio with drag-and-drop
│       ├── BlogTab.astro          # Post list with tag filters & Pagefind search
│       └── AboutTab.astro         # Bio, social links, stat counters
├── content/
│   ├── blog/                      # MDX blog posts
│   │   └── website-build-journey.mdx
│   └── works/                     # MDX work entries with YAML frontmatter
│       ├── vast-desert.mdx
│       ├── fishing-at-sea.mdx
│       ├── sailing-the-end.mdx
│       └── bilibili-ranking-tool.mdx
├── data/
│   ├── profile.ts                 # Personal info, social links, stats
│   └── i18n.ts                    # Translation dictionary (en/zh)
├── layouts/
│   ├── BaseLayout.astro           # HTML shell, theme/i18n/tab JS, footer
│   └── DetailLayout.astro         # Wrapper for blog/work detail pages
├── pages/
│   ├── blog/[...slug].astro       # Blog post detail (dynamic route)
│   ├── works/[...slug].astro      # Work detail (dynamic route)
│   └── index.astro                # Home page (all tabs)
├── content.config.ts              # Collection schemas (Zod)
└── styles/
    └── global.css                 # All global styles, themes, components
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (includes Pagefind indexing)
npm run build

# Preview production build
npm run preview
```

## Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Checks out the repository
2. Installs dependencies with `npm ci`
3. Builds the site with `npm run build`
4. Uploads the `dist/` folder as a GitHub Pages artifact
5. Deploys to GitHub Pages

### Setting up GitHub Pages

1. Go to repo **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` branch — the workflow runs automatically

The site will be available at `https://<username>.github.io/Astro-personal-site`.

## Customization

### Personal Info

Edit `src/data/profile.ts`:

```ts
name: 'Your Name',
email: 'your@email.com',
links: [
  { label: 'GitHub', url: '...', icon: 'github' },
  { label: 'Bilibili', url: '...', icon: 'bilibili' },
  { label: 'Email', url: 'mailto:...', icon: 'email' },
],
```

### Theme Colors

Edit CSS custom properties in `src/styles/global.css` under `:root` and `[data-theme="dark"]`:

```css
--color-accent: #3B82F6;
--bg: #FAFAF9;
```

### Adding a Work

Create an MDX file in `src/content/works/`:

```mdx
---
title: "My Project"
title_zh: "我的项目"
date: 2026-07-29
category: "code"
cover: "/image/code/my-project.png"
tags: ["Astro", "CSS"]
featured: true
description: "English description"
description_zh: "中文描述"
links:
  - label: "GitHub"
    url: "https://github.com/..."
---
Article body (optional, supports MDX).
```

### Adding a Blog Post

Create an MDX file in `src/content/blog/`:

```mdx
---
title: "Post Title"
date: 2026-07-29
excerpt: "Brief summary..."
tags: ["Astro", "CSS"]
cover: "/image/blog/cover.png"    # optional
draft: false
---
Post content here.
```

## i18n Architecture

Instead of a heavy i18n library, the site uses a data-attribute approach:

1. Elements are marked with `data-i18n="key.name"`
2. A small inline JS dictionary maps keys to translated strings
3. `setLang()` replaces textContent for all marked elements
4. Dynamic content (titles, descriptions) uses `data-en` / `data-zh` attributes

Switching language is O(n) DOM text replacement — no routing, no re-render.

## License

MIT
