import { assertApproved } from './routes.js';
import { outputPath } from './paths.js';

export function validateDocument(route, metadata, body, config) {
  assertApproved(route, config);
  outputPath(route, config);
  if (!metadata.title?.trim()) throw new Error(`Missing title for "${route}".`);
  for (const key of ['source', 'canonical']) {
    let url;
    try { url = new URL(metadata[key]); } catch { throw new Error(`Invalid ${key} URL for "${route}".`); }
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error(`Invalid ${key} URL for "${route}".`);
  }
  if (!body?.trim() || body.replace(/```[\s\S]*?```/g, '').replace(/[#*`>|\[\]()!_\-\s]/g, '').length < 15) throw new Error(`No meaningful Markdown content for "${route}".`);
  if (/\]\(\s*(?:javascript|data|vbscript|file):/i.test(body)) throw new Error(`Unsafe link for "${route}".`);
}
