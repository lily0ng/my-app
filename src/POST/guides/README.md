# Guides (Markdown)

Create guide posts by adding new `.md` files in this folder.

## Template

```md
---
title: My Guide Title
description: A short description shown on the Guides page.
section: Getting Started
order: 1
slug: my-guide-title
updated: 2026-01-28
---

# My Guide Title

Write your guide content here in markdown.

## Code example

```ts
console.log('hello');
```
```

## Notes

- `slug` defaults to the filename without `.md` if omitted.
- `section` controls sidebar grouping.
- `order` controls ordering within a section.
