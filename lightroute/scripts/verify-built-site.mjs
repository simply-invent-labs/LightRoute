import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { buildRoute } from '../src/index.js';
import { loadConfig } from '../src/config.js';

const config = await loadConfig();
for (const route of config.routes.allow) {
  const htmlPath = path.resolve('..', 'dist', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  const html = await readFile(htmlPath, 'utf8');
  const url = `${config.baseUrl}${route}`;
  const file = await buildRoute(route, config, async () => ({ ok: true, url, headers: new Headers({ 'content-type': 'text/html' }), text: async () => html }));
  console.log(`✓ ${route} -> ${path.relative(process.cwd(), file)}`);
}
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) await walk(path.join(dir, entry.name));
    else files.push(path.relative(config.outputDir, path.join(dir, entry.name)));
  }
}
await walk(config.outputDir);
if (files.length !== config.routes.allow.length || files.some(file => /(?:draft|private)\.md$/.test(file))) throw new Error('Generated output did not match the approved route set.');
console.log(`Verified ${files.length} generated files from built site HTML.`);
