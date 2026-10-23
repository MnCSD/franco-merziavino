// Converts each bottle PNG in public/images/bottles to a lighter WebP (alpha kept, max 1000px tall).
// Runs before `dev` and `build`; only re-encodes PNGs newer than their WebP.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public/images/bottles');
const mtime = (f) => stat(f).then((s) => s.mtimeMs, () => 0);

let made = 0;
for (const file of await readdir(dir)) {
  if (!file.endsWith('.png')) continue;
  const src = path.join(dir, file);
  const out = src.replace(/\.png$/, '.webp');
  if ((await mtime(out)) >= (await mtime(src))) continue;
  await sharp(src).resize({ height: 1000, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(out);
  made++;
}
console.log(`optimize-bottles: ${made} WebP file(s) written`);
