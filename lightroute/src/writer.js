import { mkdir, lstat, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function assertNoSymlink(file, root) {
  const current = path.resolve(root);
  const target = path.resolve(file);
  if (!target.startsWith(`${current}${path.sep}`)) throw new Error('Unsafe output path rejected.');
  const volume = path.parse(target).root;
  const segments = path.relative(volume, target).split(path.sep);
  for (const part of [volume, ...segments.map((_, index) => path.join(volume, ...segments.slice(0, index + 1)))]) {
    try { if ((await lstat(part)).isSymbolicLink()) throw new Error('Unsafe output path rejected.'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}

export async function writeMarkdown(file, content, outputDir) {
  await assertNoSymlink(file, outputDir);
  await mkdir(path.dirname(file), { recursive: true });
  await assertNoSymlink(file, outputDir);
  await writeFile(file, content, 'utf8');
}
