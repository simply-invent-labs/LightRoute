import path from 'node:path';
import { assertApproved } from './routes.js';

export function outputPath(route, config) {
  route = assertApproved(route, config);
  const relative = route === '/' ? 'index.md' : route === '/docs' ? 'docs/index.md' : `${route.slice(1)}.md`;
  const file = path.resolve(config.outputDir, relative);
  if (!file.startsWith(`${path.resolve(config.outputDir)}${path.sep}`)) throw new Error('Unsafe output path rejected.');
  return file;
}
