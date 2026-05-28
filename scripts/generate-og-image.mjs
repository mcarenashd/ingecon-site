#!/usr/bin/env node
// Generate a 1200x630 branded OG image:
//   hero photo, dark gradient overlay, logo top-left, headline + tagline,
//   green brand accent bar at the bottom.
// Run with: node scripts/generate-og-image.mjs

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { statSync, readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const HERO = join(ROOT, 'public/images/calle-92-654YlBhL.webp');
const LOGO = join(ROOT, 'public/images/logo-ingecon-CUG5jr9Z.webp');
const OUT = join(ROOT, 'public/og-image.jpg');

const W = 1200;
const H = 630;
const GREEN = '#6a9a10';
const LIME = '#c5db5a';

// 1. Resize hero to OG dimensions (cover crop).
const heroBuf = await sharp(HERO).resize(W, H, { fit: 'cover', position: 'center' }).toBuffer();

// 2. Prepare logo. White background mark scales nicely; size to 80px height.
const logoBuf = await sharp(LOGO).resize({ height: 80, withoutEnlargement: false }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();

// 3. Build SVG overlay with gradient, text and green bar.
const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#000" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#000" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.85"/>
    </linearGradient>
    <style>
      .eyebrow { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 4px; fill: ${LIME}; text-transform: uppercase; }
      .head    { font-family: Georgia, 'Roboto Slab', serif; font-size: 68px; font-weight: 700; fill: #ffffff; }
      .accent  { fill: ${LIME}; }
      .sub     { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 26px; font-weight: 500; fill: #e6e6e6; }
      .url     { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 20px; font-weight: 600; fill: #ffffff; letter-spacing: 2px; }
    </style>
  </defs>

  <!-- dark gradient over photo -->
  <rect width="${W}" height="${H}" fill="url(#g)"/>

  <!-- bottom green accent bar -->
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${GREEN}"/>

  <!-- eyebrow -->
  <text x="60" y="280" class="eyebrow">Más de 25 años en Colombia</text>

  <!-- headline (two lines) -->
  <text x="60" y="370" class="head">Interventoría e Ingeniería</text>
  <text x="60" y="450" class="head accent">con respaldo institucional</text>

  <!-- subline -->
  <text x="60" y="510" class="sub">Infraestructura pública — INVIAS · IDU · ANI · Aerocivil</text>

  <!-- domain -->
  <text x="60" y="${H - 35}" class="url">ingecon.com.co</text>
</svg>`;

const overlayBuf = Buffer.from(svg);

// 4. Composite: hero base + svg overlay + logo top-right.
const composed = await sharp(heroBuf)
  .composite([
    { input: overlayBuf, top: 0, left: 0 },
    { input: logoBuf, top: 50, left: W - (logoMeta.width || 200) - 60 },
  ])
  .jpeg({ quality: 86 })
  .toFile(OUT);

console.log(`OG image: ${composed.width}x${composed.height} - ${(statSync(OUT).size / 1024).toFixed(1)} KB`);
console.log(`  ${OUT}`);
