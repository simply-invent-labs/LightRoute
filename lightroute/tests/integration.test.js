import { describe, expect, it } from 'vitest';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoute } from '../src/index.js';
import { validateConfig } from '../src/config.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const baseUrl = 'https://lightroute-reference.vercel.app';
const raw = JSON.parse(await readFile(path.join(root, 'config.json'), 'utf8'));

describe('offline build and expected fixture structure', () => {
  it.each(['getting-started', 'installation', 'api'])('builds docs/%s', async name => {
    const temp = await mkdtemp(path.join(os.tmpdir(), 'lightroute-'));
    try {
      const config = validateConfig({ ...raw, outputDir: temp });
      const html = await readFile(path.join(root, `fixtures/html/${name}.html`), 'utf8');
      const route = `/docs/${name}`;
      const file = await buildRoute(route, config, async () => ({ ok: true, url: `${baseUrl}${route}`, headers: new Headers({ 'content-type': 'text/html' }), text: async () => html }));
      const generated = await readFile(file, 'utf8');
      const expected = await readFile(path.join(root, `../lightroute/expected/docs/${name}.md`), 'utf8');
      expect(file).toBe(path.join(temp, 'docs', `${name}.md`));
      expect(generated).toContain(`# ${name === 'api' ? 'API Reference' : name === 'installation' ? 'Installation' : 'Getting Started'}`);
      expect(generated).toContain(`source: "${baseUrl}${route}"`);
      expect(generated).not.toMatch(/Website header|Site navigation|Docs sidebar|Website footer/);
      for (const heading of expected.match(/^## .+$/gm) || []) if (html.includes(heading.slice(3))) expect(generated).toContain(heading);
      if (name === 'api') expect(generated).toMatch(/\| Name \| Type \|/);
      if (name === 'getting-started') expect(generated).toMatch(/```shell[\s\S]*npm install/);
      await stat(file);
      expect(await readFile(file, 'utf8')).toBe(generated);
      await buildRoute(route, config, async () => ({ ok: true, url: `${baseUrl}${route}`, headers: new Headers({ 'content-type': 'text/html' }), text: async () => html }));
      expect(await readFile(file, 'utf8')).toBe(generated);
      expect(generated.endsWith('\n')).toBe(true);
      expect(generated.endsWith('\n\n')).toBe(false);
      expect(generated).not.toContain('\r');
    } finally { await rm(temp, { recursive: true, force: true }); }
  });
});
