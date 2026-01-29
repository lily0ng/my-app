---
title: Writing Guides in Markdown
description: Use frontmatter, code blocks, tables, and best practices for clean docs.
section: Core Concepts
order: 1
slug: markdown-style
updated: 2026-01-28
---

# Writing Guides in Markdown

Guides are plain `.md` files with optional **frontmatter**.

## Frontmatter

Frontmatter goes at the top:

```md
---
title: Writing Guides in Markdown
description: Use frontmatter, code blocks, tables, and best practices.
section: Core Concepts
order: 1
slug: markdown-style
updated: 2026-01-28
---
```

## Formatting

### Code blocks

```ts
export const hello = (name: string) => `Hello, ${name}`;
```

### Tables

| Item | Notes |
| --- | --- |
| `title` | Shown on cards + sidebar |
| `description` | Shown on cards |
| `section` | Sidebar grouping |
| `order` | Ordering inside a section |
| `slug` | URL: `/docs/guides/:slug` |

### Task lists

- [x] Write the outline
- [ ] Add screenshots
- [ ] Publish

## Best practices

- Keep sections small and scannable
- Add a short description (1 sentence)
- Prefer actionable headings ("Deploy", "Configure", "Troubleshoot")

## Publishing checklist

1. Title is clear
2. Description is short
3. Links are working
4. Code blocks have language tags (e.g. `ts`, `bash`)
