import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { validateConfig } from '../src/config.js';
import { normalizeRoute, assertApproved } from '../src/routes.js';
import { extractArticle } from '../src/extractor.js';
import { extractMetadata, frontmatter } from '../src/metadata.js';
import { htmlToMarkdown } from '../src/markdown.js';
import { outputPath } from '../src/paths.js';
import { fetchPage } from '../src/fetcher.js';
import { writeMarkdown } from '../src/writer.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const raw = JSON.parse(await readFile(path.join(root, 'config.json'), 'utf8'));
const config = validateConfig(raw, path.join(root, 'config.json'));

describe('route and configuration safety', () => {
  it('allows only approved routes', () => {
    expect(assertApproved('/docs/getting-started', config)).toBe('/docs/getting-started');
    for (const route of ['/private', '/draft', '/admin', '/customer/123']) expect(() => assertApproved(route, config)).toThrow(/not allow-listed/);
    for (const route of ['../admin', '/docs/../private', 'https://evil.example', '//evil.example', '/docs/%2e%2e/private', '/docs/%252e%252e/private']) expect(() => normalizeRoute(route)).toThrow();
  });
  it('rejects incomplete and conflicting configuration', () => {
    for (const change of [{ baseUrl: '' }, { outputDir: '' }, { routes: {} }, { routes: { allow: ['/private'], deny: ['/private'] } }, { routes: { allow: ['/docs/../private'], deny: [] } }]) expect(() => validateConfig({ ...raw, ...change })).toThrow();
  });
  it('maps every route inside outputDir', () => {
    const expected = { '/': 'index.md', '/about': 'about.md', '/pricing': 'pricing.md', '/docs': 'docs/index.md', '/docs/getting-started': 'docs/getting-started.md', '/docs/installation': 'docs/installation.md', '/docs/api': 'docs/api.md' };
    for (const [route, file] of Object.entries(expected)) expect(path.relative(config.outputDir, outputPath(route, config))).toBe(path.normalize(file));
    expect(() => outputPath('/docs/../private', config)).toThrow();
  });
  it('refuses a direct write outside outputDir', async () => {
    await expect(writeMarkdown(path.resolve(config.outputDir, '..', 'escape.md'), 'bad', config.outputDir)).rejects.toThrow(/Unsafe output path/);
  });
});

describe('content processing', () => {
  it('extracts metadata and safe frontmatter', () => {
    const html = '<html lang="fr"><head><title>A: "test"</title><meta name="description" content="Line one\n---"><link rel="canonical" href="/docs/api"></head></html>';
    const meta = extractMetadata(html, 'https://lightroute-reference.vercel.app/docs/api');
    expect(meta).toMatchObject({ title: 'A: "test"', language: 'fr', canonical: 'https://lightroute-reference.vercel.app/docs/api' });
    expect(frontmatter(meta)).toContain('title: "A: \\"test\\""');
  });
  it('removes layout and refuses empty application shells', async () => {
    const html = await readFile(path.join(root, 'fixtures/html/getting-started.html'), 'utf8');
    const article = extractArticle(html, '/docs/getting-started');
    expect(article).toContain('Getting Started');
    expect(article).not.toMatch(/Website header|Site navigation|Docs sidebar|Website footer/);
    expect(() => extractArticle('<html><body><div id="root"></div></body></html>', '/docs')).toThrow(/No meaningful article/);
  });
  it('converts code, links, tables, images, lists and blockquotes', async () => {
    const html = await readFile(path.join(root, 'fixtures/html/api.html'), 'utf8');
    const md = htmlToMarkdown(extractArticle(html, '/docs/api'), config.baseUrl);
    expect(md).toContain('# API Reference');
    expect(md).toContain('| Name | Type | Required | Description |');
    expect(md).toContain('```json');
    expect(md).toContain('> Illustrative documentation only.');
    const special = htmlToMarkdown('<ul><li>One</li></ul><p><a href="https://lightroute-reference.vercel.app/docs/api">API</a> <a href="javascript:alert(1)">bad</a></p><img alt="Architecture" src="/images/architecture.svg"><img src="/no-alt.svg">', config.baseUrl);
    expect(special).toContain('[API](/docs/api)');
    expect(special).toContain('![Architecture](/images/architecture.svg)');
    expect(special).not.toMatch(/javascript:|no-alt/);
  });
  it('rejects unsafe redirects and non-HTML responses', async () => {
    const response = (url, type = 'text/html') => ({ ok: true, url, headers: new Headers({ 'content-type': type }), text: async () => '<main><article><h1>Test</h1><p>Some real content here.</p></article></main>' });
    await expect(fetchPage('/docs', config, async () => response('https://evil.example/docs'))).rejects.toThrow(/unsafe redirect/);
    await expect(fetchPage('/docs', config, async () => response('https://lightroute-reference.vercel.app/docs', 'application/json'))).rejects.toThrow(/not HTML/);
  });
});
