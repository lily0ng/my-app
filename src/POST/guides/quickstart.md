---
title: Quickstart
description: Create your first app, deploy it, and understand the project structure.
section: Getting Started
order: 2
slug: quickstart
updated: 2026-01-28
---

# Quickstart

This guide walks you through the fastest path to a working setup.

## 1) Start the dev server

```bash
npm install
npm run dev
```

Open:

- `http://localhost:5173/`

## 2) Project structure

Common folders you’ll use:

- `src/pages/` — page routes
- `src/components/` — reusable UI components
- `src/POST/guides/` — **markdown guides** (this page)

## 3) Create a new guide

1. Create a file in `src/POST/guides/` like `my-new-guide.md`
2. Add frontmatter:

```md
---
title: My New Guide
description: What this guide teaches.
section: Core Concepts
order: 1
slug: my-new-guide
updated: 2026-01-28
---
```

3. Write your markdown content below the frontmatter.

## 4) Tips

- Use **short headings** so the sidebar stays clean.
- Put “Core Concepts” or “How‑to” in `section` to group guides.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Guides page is empty | Ensure files are in `src/POST/guides/*.md` and refresh |
| A guide doesn’t appear | Check the frontmatter `title` and `slug` |
