# LifeServe V2

LifeServe V2 is a static website prototype for a nonprofit or service-focused organization. The current page is primarily a frontend style and component specimen, backed by a small Sass/Gulp build pipeline.

## What is in this repository

- `index.html` — the static markup and component specimen.
- `assets/sass/` — maintained Sass source for base rules, typography, helpers, and alignment utilities.
- `style.css` — compiled stylesheet consumed by the page.
- `gulpfile.js` — build tasks for Sass compilation, optional JavaScript bundling, cache busting, and watch mode.
- `docs/` — project notes and repository artwork.

The repository does not currently contain a full production nonprofit application or a populated JavaScript source directory. Documentation should describe what exists rather than imply unfinished features are already implemented.

## Development

Install dependencies and build the static assets:

```bash
npm install
npm run build
```

The default Gulp task also watches the authored Sass source for changes.

## Source conventions

The Sass tree is intentionally small. New folders or partials should be introduced only when they own real styles. Empty layout and page placeholders have been removed so the directory structure reflects maintained code instead of a hypothetical future architecture.

Generated files such as `style.css` and `style.css.map` should be regenerated through the build pipeline rather than edited independently when the Sass source changes.

## Repository maintenance

Keep changes focused on the static prototype, preserve the existing browser behavior, and avoid committing editor-specific files, temporary diagnostics, generated repository reports, or automated README-rewriting machinery.

## Status

This repository is a legacy frontend prototype. It is useful as a design/style reference and can be evolved into a fuller LifeServe site when real content and product requirements are available.
