# LightRoute reference site

A controlled Vite + React documentation site for testing a future LightRoute build-time Markdown converter. The pages deliberately contain different content shapes, metadata, links, layouts, and nested routes.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. To build a production bundle, run:

```bash
npm run build
```

Run `npm run check:reference` to check route policy, fixture coverage, and local imports.

`npm run preview` serves the built bundle locally. Vite's SPA fallback supports direct visits to nested routes during local development and preview.

## Route policy

Public routes: `/`, `/about`, `/pricing`, `/docs`, `/docs/getting-started`, `/docs/installation`, `/docs/api`.

Excluded test routes: `/draft`, `/private`. They remain visitable in the React router to exercise future exclusion checks. Do not publish their content as Markdown. `robots.txt` also disallows them, but the authoritative test policy is the allow/deny configuration.

`lightroute/config/routes.json` stores the compact route policy. `lightroute.config.json` additionally records the proposed output directory, canonical site URL, and default language. These JSON files are fixtures; no runtime code reads them yet.

## Expected output and negative fixtures

`lightroute/expected/` contains seven manually written Markdown files, one per approved public route. They approximate the desired future output, including front matter, while omitting header, sidebar, and footer content. There are no expected Markdown files for `/draft` or `/private`.

`lightroute/fixtures/` holds separate negative examples for broken links, invalid metadata, and unsafe routes. The intentionally broken links are fixture data, not links rendered on the site.

The actual LightRoute converter, crawler, CLI, deployment, and authentication are intentionally not implemented in this phase. The endpoint on the API page and pricing plans are sample documentation content.
