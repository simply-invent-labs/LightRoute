import { assertApproved } from './routes.js';

export async function fetchPage(route, config, fetchImpl = fetch) {
  route = assertApproved(route, config);
  const url = new URL(route, `${config.baseUrl}/`);
  let response;
  try { response = await fetchImpl(url, { redirect: 'follow' }); } catch (error) { throw new Error(`Failed to fetch "${route}": ${error.message}`); }
  if (!response.ok) throw new Error(`Failed to fetch "${route}": HTTP ${response.status}`);
  const finalUrl = new URL(response.url || url);
  if (finalUrl.origin !== new URL(config.baseUrl).origin || finalUrl.pathname !== route || finalUrl.search || finalUrl.hash) throw new Error(`Failed to fetch "${route}": unsafe redirect.`);
  if (!/\btext\/html\b/i.test(response.headers.get('content-type') || '')) throw new Error(`Failed to fetch "${route}": response is not HTML.`);
  const html = await response.text();
  if (!html.trim()) throw new Error(`Failed to fetch "${route}": empty HTML.`);
  return { html, url: finalUrl.href };
}
