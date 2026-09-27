import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeRoute } from './routes.js';

const defaultPath = fileURLToPath(new URL('../config.json', import.meta.url));

export function validateConfig(raw, configPath = defaultPath) {
  if (!raw || typeof raw !== 'object') throw new Error('Configuration must be an object.');
  if (typeof raw.baseUrl !== 'string' || !raw.baseUrl) throw new Error('baseUrl is required.');
  let base;
  try { base = new URL(raw.baseUrl); } catch { throw new Error('baseUrl must be a valid URL.'); }
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash || base.pathname !== '/') throw new Error('baseUrl must be a clean HTTP(S) origin.');
  if (typeof raw.outputDir !== 'string' || !raw.outputDir.trim()) throw new Error('outputDir is required.');
  if (!raw.routes || !Array.isArray(raw.routes.allow) || !raw.routes.allow.length || !Array.isArray(raw.routes.deny)) throw new Error('routes.allow and routes.deny arrays are required.');
  const allow = raw.routes.allow.map(normalizeRoute);
  const deny = raw.routes.deny.map(normalizeRoute);
  if (new Set(allow).size !== allow.length || new Set(deny).size !== deny.length) throw new Error('Duplicate routes are not allowed.');
  if (allow.some(route => deny.some(blocked => route === blocked || route.startsWith(`${blocked}/`)))) throw new Error('Allow and deny routes conflict.');
  if (raw.language !== undefined && (typeof raw.language !== 'string' || !/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]+)*$/.test(raw.language))) throw new Error('Invalid language.');
  return { baseUrl: base.origin, outputDir: path.resolve(path.dirname(configPath), raw.outputDir), language: raw.language || 'en', routes: { allow, deny } };
}

export async function loadConfig(configPath = defaultPath) {
  let raw;
  try { raw = JSON.parse(await readFile(configPath, 'utf8')); } catch (error) { throw new Error(`Cannot read config: ${error.message}`); }
  return validateConfig(raw, configPath);
}
