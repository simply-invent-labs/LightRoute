import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8').replace(/\r\n/g, '\n');
const routes = JSON.parse(read('lightroute/config/routes.json'));
const config = JSON.parse(read('lightroute.config.json'));
const router = read('src/routes/router.jsx');
const expected = new Map([
  ['/', 'index.md'],
  ['/about', 'about.md'],
  ['/pricing', 'pricing.md'],
  ['/docs', 'docs/index.md'],
  ['/docs/getting-started', 'docs/getting-started.md'],
  ['/docs/installation', 'docs/installation.md'],
  ['/docs/api', 'docs/api.md']
]);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(JSON.stringify(routes.allow) === JSON.stringify(config.allowedRoutes), 'Allow lists differ');
assert(JSON.stringify(routes.deny) === JSON.stringify(config.excludedRoutes), 'Deny lists differ');
assert(routes.allow.length === expected.size, 'Unexpected count of allowed routes');
assert(routes.deny.includes('/draft') && routes.deny.includes('/private'), 'Excluded routes missing');
for (const route of [...routes.allow, ...routes.deny]) {
  assert(router.includes(`path="${route}"`), `Router missing ${route}`);
}
for (const [route, fixture] of expected) {
  assert(routes.allow.includes(route), `Expected fixture route not allowed: ${route}`);
  const markdown = read(`lightroute/expected/${fixture}`);
  const canonical = `${config.canonicalSiteUrl}${route}`;
  assert(markdown.startsWith('---\n'), `Missing front matter: ${fixture}`);
  assert(markdown.includes(`source: ${canonical}\n`), `Source mismatch: ${fixture}`);
  assert(markdown.includes(`canonical: ${canonical}\n`), `Canonical mismatch: ${fixture}`);
  assert(markdown.includes('language: en\n'), `Language missing: ${fixture}`);
}
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)]);
const actual = walk(resolve(root, 'lightroute/expected')).map((path) => path.slice(resolve(root, 'lightroute/expected').length + 1).replaceAll('\\', '/'));
assert(actual.length === expected.size && actual.every((path) => [...expected.values()].includes(path)), 'Unexpected Markdown fixture');
for (const file of walk(resolve(root, 'src')).filter((path) => ['.js', '.jsx'].includes(extname(path)))) {
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/\bfrom\s+['"](\.[^'"]+)['"]/g)) {
    const target = resolve(dirname(file), match[1]);
    assert(existsSync(target) || existsSync(`${target}.jsx`) || existsSync(`${target}.js`), `Unresolved import ${match[1]} in ${file}`);
  }
}
console.log('Reference checks passed: 9 routes, 7 approved Markdown fixtures, imports and policies consistent.');
