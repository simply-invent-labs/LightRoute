import { loadConfig } from './config.js';
import { assertApproved } from './routes.js';
import { fetchPage } from './fetcher.js';
import { extractArticle } from './extractor.js';
import { extractMetadata, frontmatter } from './metadata.js';
import { htmlToMarkdown } from './markdown.js';
import { validateDocument } from './validator.js';
import { outputPath } from './paths.js';
import { writeMarkdown } from './writer.js';

export async function buildRoute(route, config, fetchImpl = fetch) {
  route = assertApproved(route, config);
  const { html, url } = await fetchPage(route, config, fetchImpl);
  const article = extractArticle(html, route);
  const metadata = extractMetadata(html, url, config.language);
  const body = htmlToMarkdown(article, config.baseUrl);
  validateDocument(route, metadata, body, config);
  const file = outputPath(route, config);
  await writeMarkdown(file, frontmatter(metadata) + body, config.outputDir);
  return file;
}

export async function build({ route, configPath, fetchImpl, log = console.log } = {}) {
  const config = await loadConfig(configPath);
  const routes = route ? [assertApproved(route, config)] : config.routes.allow;
  log('LightRoute v0.1');
  log(`Processing ${routes.length} approved route${routes.length === 1 ? '' : 's'}...`);
  for (const approved of routes) {
    const file = await buildRoute(approved, config, fetchImpl);
    log(`✓ ${approved} -> ${file}`);
  }
  log(`Generated ${routes.length} Markdown file${routes.length === 1 ? '' : 's'}.`);
  if (!route) log(`Skipped ${config.routes.deny.length} denied routes.`);
  return routes.length;
}
