#!/usr/bin/env node
import { build } from './index.js';

const args = process.argv.slice(2);
if (args[0] !== 'build' || (args.length !== 1 && !(args.length === 3 && args[1] === '--route' && args[2]))) {
  console.error('Usage: node src/cli.js build [--route /approved-route]');
  process.exitCode = 2;
} else {
  try { await build({ route: args[2] }); }
  catch (error) { console.error(`[LightRoute] ${error.message}`); process.exitCode = 1; }
}
