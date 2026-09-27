export function normalizeRoute(input) {
  if (typeof input !== 'string' || !input.startsWith('/') || input.startsWith('//') || input.includes('\\') || input.includes('?') || input.includes('#')) {
    throw new Error(`Malformed route: ${String(input)}`);
  }
  let decoded = input;
  for (let i = 0; i < 3; i++) {
    let next;
    try { next = decodeURIComponent(decoded); } catch { throw new Error(`Malformed route: ${input}`); }
    if (next === decoded) break;
    decoded = next;
  }
  if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.includes('\\') || decoded.includes('?') || decoded.includes('#') || /[\u0000-\u001f\u007f]/.test(decoded)) {
    throw new Error(`Unsafe route: ${input}`);
  }
  if (decoded !== '/' && (decoded.endsWith('/') || decoded.includes('//'))) throw new Error(`Malformed route: ${input}`);
  if (decoded.split('/').some(part => part === '.' || part === '..')) throw new Error(`Unsafe route: ${input}`);
  if (!/^\/(?:[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*)?$/.test(decoded)) throw new Error(`Malformed route: ${input}`);
  return decoded;
}

export function assertApproved(route, config) {
  const normalized = normalizeRoute(route);
  if (!config.routes.allow.includes(normalized) || config.routes.deny.some(denied => normalized === denied || normalized.startsWith(`${denied}/`))) {
    throw new Error(`Route "${normalized}" is not allow-listed.`);
  }
  return normalized;
}
