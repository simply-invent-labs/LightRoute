# LightRoute Phase 2

LightRoute turns an explicit set of public HTML routes into deterministic Markdown files. This package is the extraction CLI. The adjacent reference site is built separately and now emits static HTML for its seven approved routes.

## Install and use

From this directory:

```bash
npm install
node src/cli.js build --route /docs/getting-started
npm run build:md
npm test
npm run test:fixtures
```

The CLI fetches `https://lightroute-phase2.vercel.app` by default. From the repository root, `npm run build` produces static HTML in `dist/` for all seven approved routes. Then `npm run verify:built-site` in this directory builds from that local HTML without relying on the deployment.

## Configuration and architecture

`config.json` declares `baseUrl`, `outputDir`, `language`, and `routes.allow`/`routes.deny`. Routes are processed only when explicitly allowed. The pipeline loads and validates config, checks each route, fetches HTML, extracts `main article` (then `article`, then `main`), extracts page metadata, converts article HTML with Turndown and GFM table support, validates the document, maps the route to a safe file path, and writes it. Header, navigation, sidebar, footer, forms, scripts, and likely UI-only elements are removed before conversion.

Output mapping includes `/` to `generated/index.md`, `/docs` to `generated/docs/index.md`, and other routes to corresponding `.md` paths. Generated files use YAML-safe quoted frontmatter and LF line endings, with one final newline and no volatile fields. `generated/` is ignored by Git.

Route policy is deny by default. Traversal, encoded traversal, external route URLs, unsafe redirects, non-HTML responses, unsafe link protocols, and output escapes are rejected. The writer checks for symbolic links in the destination path. `/draft` and `/private` are never generated. Broken or empty pages fail with a nonzero exit status.

Tests use local HTML fixtures for Getting Started, Installation, and API. They cover route and config safety, output paths, extraction, metadata, Markdown structure, redirects, and end-to-end document generation. The expected Markdown in `expected/` is approximate; tests compare key structural content rather than exact prose.

## Limitations and next phase

Phase 2 processes HTML that already contains meaningful rendered content. It does not execute client-side JavaScript. Pages containing only an empty React application shell require prerendering, SSR, build-time content access, or a future rendering adapter. The included static site build provides prerendered HTML. There is no crawler, discovery, browser automation, backend, or storage in this package. Phase 3 can add a publishing path for approved Markdown.
