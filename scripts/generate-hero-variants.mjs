#!/usr/bin/env node
// Generate AVIF and WebP variants of the hero image at multiple widths
// so the browser can pick the smallest file that fits the viewport.
// Run with: node scripts/generate-hero-variants.mjs

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'public/images/calle-92-654YlBhL.webp');
const OUT_DIR = join(ROOT, 'public/images');

const widths = [640, 1024, 1600];

const tasks = [];
for (const w of widths) {
  tasks.push(
    sharp(SRC).resize({ width: w }).avif({ quality: 55 }).toFile(join(OUT_DIR, `hero-${w}.avif`)),
    sharp(SRC).resize({ width: w }).webp({ quality: 78 }).toFile(join(OUT_DIR, `hero-${w}.webp`)),
  );
}
const results = await Promise.all(tasks);
console.log(`Generated ${results.length} hero variants in public/images/`);
for (const r of results) console.log(`  ${r.width}x${r.height} -> ${(r.size / 1024).toFixed(1)} KB`);
