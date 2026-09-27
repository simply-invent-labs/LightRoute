import * as cheerio from 'cheerio';

export function extractArticle(html, route) {
  const $ = cheerio.load(html);
  for (const selector of ['main article', 'article', 'main']) {
    const candidate = $(selector).first().clone();
    if (!candidate.length) continue;
    candidate.find('header, nav, aside, footer, script, style, noscript, form, button, .sidebar, .navigation, .nav, .footer, .header, .breadcrumb, .code-label, .eyebrow, [aria-hidden="true"]').remove();
    const content = candidate.text().replace(/\s+/g, ' ').trim();
    if (content.length >= 20 && candidate.find('h1,h2,h3,h4,h5,h6,p,li,pre,table,blockquote').length) return candidate.html();
  }
  throw new Error(`No meaningful article content found for "${route}".`);
}
