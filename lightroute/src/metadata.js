import * as cheerio from 'cheerio';

export function extractMetadata(html, source, fallbackLanguage = 'en') {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim();
  const description = $('meta[name="description"]').first().attr('content')?.trim() || '';
  const canonicalRaw = $('link[rel~="canonical"]').first().attr('href');
  let canonical = source;
  if (canonicalRaw) {
    try { canonical = new URL(canonicalRaw, source).href; } catch { throw new Error('Invalid canonical URL.'); }
  }
  const language = $('html').attr('lang')?.trim() || fallbackLanguage;
  return { source, canonical, title, description, language };
}

export function yamlScalar(value) {
  return JSON.stringify(String(value));
}

export function frontmatter(metadata) {
  return `---\n${['source', 'canonical', 'title', 'description', 'language'].map(key => `${key}: ${yamlScalar(metadata[key])}`).join('\n')}\n---\n\n`;
}
