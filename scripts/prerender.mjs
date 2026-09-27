import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://lightroute-phase2.vercel.app';
const { routes: { allow: routes } } = JSON.parse(await readFile('lightroute/config.json', 'utf8'));
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: Router } = await server.ssrLoadModule('/src/routes/router.jsx');
  const template = await readFile('dist/index.html', 'utf8');
  for (const route of routes) {
    const expectedPath = path.join('lightroute', 'expected', route === '/' ? 'index.md' : route === '/docs' ? 'docs/index.md' : `${route.slice(1)}.md`);
    const expected = await readFile(expectedPath, 'utf8');
    const title = expected.match(/^title: (.+)$/m)?.[1];
    const description = expected.match(/^description: (.+)$/m)?.[1];
    const language = expected.match(/^language: (.+)$/m)?.[1] || 'en';
    if (!title || !description) throw new Error(`Missing expected metadata for ${route}`);
    const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    const originalError = console.error;
    console.error = (...args) => {
      if (!String(args[0]).startsWith('Warning: useLayoutEffect does nothing on the server')) originalError(...args);
    };
    let article;
    try { article = renderToString(React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(Router))); }
    finally { console.error = originalError; }
    const html = template
      .replace('<html lang="en">', `<html lang="${escape(language)}">`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(description)}">\n    <link rel="canonical" href="${origin}${route}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
      .replace('<div id="root"></div>', `<div id="root">${article}</div>`);
    const output = path.join('dist', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, html, 'utf8');
  }
} finally {
  await server.close();
}
