# Astro Personal Site

Personal portfolio website built with [Astro](https://astro.build).

Tech stack: Astro 7, CSS Custom Properties, MDX Content Collections, Tailwind CSS 4.

## Features

- Bento grid portfolio layout
- Bilingual i18n (Chinese / English)
- Dark/light theme with glassmorphism
- Tab-based single-page interface
- Drag-and-drop work reordering
- Pagefind full-text search

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # UI components
├── content/        # MDX collections (blog, works)
├── data/           # Config (i18n, profile)
├── layouts/        # Page layouts
├── pages/          # Routes
└── styles/         # Global CSS
```

## Deployment

Deploys to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).
