#!/usr/bin/env node
// Generate AVIF + WebP variants of the About image at multiple widths.
// Run with: node scripts/optimize-about.mjs

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { statSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'public/images/about_ingecon_bogota.webp');
const OUT = join(__dirname, '..', 'public/images');

const widths = [400, 640, 960];

const tasks = [];
for (const w of widths) {
  tasks.push(
    sharp(SRC).resize({ width: w }).avif({ quality: 60 }).toFile(join(OUT, `about-${w}.avif`)),
    sharp(SRC).resize({ width: w }).webp({ quality: 78 }).toFile(join(OUT, `about-${w}.webp`)),
  );
}

const results = await Promise.all(tasks);
console.log(`Generated ${results.length} About variants:`);
for (const r of results) {
  console.log(`  ${r.width}x${r.height} ${(r.size / 1024).toFixed(1)} KB`);
}
console.log(`(original: ${(statSync(SRC).size / 1024).toFixed(1)} KB)`);
