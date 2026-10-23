#!/usr/bin/env node
/**
 * Convert gift JPEGs to WebP for better compression.
 * Run: node scripts/optimize-gifts.mjs
 */
import { execSync } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import { join, parse } from 'path';

const GIFTS_DIR = 'public/images/gifts';

// Check if sharp-cli is available, if not use a simpler approach with Next.js image optimization
const files = readdirSync(GIFTS_DIR).filter(f => f.endsWith('.jpg'));
let converted = 0;

for (const file of files) {
  const { name } = parse(file);
  const webpPath = join(GIFTS_DIR, `${name}.webp`);

  if (!existsSync(webpPath)) {
    try {
      // Use ImageMagick's convert if available (common on most systems)
      execSync(`magick "${join(GIFTS_DIR, file)}" -quality 80 "${webpPath}"`, { stdio: 'ignore' });
      converted++;
    } catch {
      try {
        // Fallback to cwebp if available
        execSync(`cwebp -q 80 "${join(GIFTS_DIR, file)}" -o "${webpPath}"`, { stdio: 'ignore' });
        converted++;
      } catch {
        // Skip if no conversion tool available - Next.js will handle optimization
        console.log(`Skipping ${file} - no conversion tool available`);
      }
    }
  }
}

console.log(`optimize-gifts: ${converted} WebP file(s) written`);
