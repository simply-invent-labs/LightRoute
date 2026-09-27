import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

function safeTarget(raw, baseUrl) {
  if (!raw || /[\u0000-\u001f\u007f]/.test(raw)) return null;
  const value = raw.trim();
  if (/^(javascript|data|vbscript|file):/i.test(value) || value.startsWith('//') || value.includes('\\')) return null;
  let decoded = value;
  for (let i = 0; i < 3; i++) {
    try { decoded = decodeURIComponent(decoded); } catch { return null; }
    if (decoded.split(/[/?#]/).some(part => part === '..' || part === '.')) return null;
  }
  if (value.startsWith('#')) return value;
  let url;
  try { url = new URL(value, `${baseUrl}/`); } catch { return null; }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
  if (url.origin === new URL(baseUrl).origin) return `${url.pathname}${url.search}${url.hash}`;
  return url.href;
}

export function htmlToMarkdown(html, baseUrl) {
  const $ = cheerio.load(html, null, false);
  $('iframe, object, embed, svg, input, select, textarea').remove();
  $('a').each((_, element) => {
    const safe = safeTarget($(element).attr('href'), baseUrl);
    if (safe) $(element).attr('href', safe);
    else $(element).replaceWith($(element).contents());
  });
  $('img').each((_, element) => {
    const alt = $(element).attr('alt')?.trim();
    const safe = safeTarget($(element).attr('src'), baseUrl);
    if (!alt || !/[\p{L}\p{N}]/u.test(alt) || !safe) $(element).remove();
    else $(element).attr('src', safe);
  });
  const service = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '*', strongDelimiter: '**' });
  service.use(gfm);
  service.addRule('fencedCodeWithLanguage', {
    filter: node => node.nodeName === 'PRE',
    replacement: (_content, node) => {
      const code = node.querySelector('code');
      const raw = code?.textContent ?? node.textContent ?? '';
      const language = (code?.getAttribute('class') || '').match(/(?:^|\s)language-([\w+-]+)/)?.[1] || '';
      const fence = '`'.repeat(Math.max(3, ...[...raw.matchAll(/`+/g)].map(match => match[0].length + 1)));
      return `\n\n${fence}${language}\n${raw.replace(/\r\n?/g, '\n').replace(/\n+$/, '')}\n${fence}\n\n`;
    }
  });
  return normalizeMarkdown(service.turndown($.root().html() || ''));
}

export function normalizeMarkdown(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n').map(line => line.replace(/[\t ]+$/, ''));
  const output = [];
  let fence = null;
  for (const line of lines) {
    const marker = line.match(/^(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
    }
    if (!fence && !line && output.at(-1) === '' && output.at(-2) === '') continue;
    output.push(line);
  }
  return `${output.join('\n').trim()}\n`;
}
