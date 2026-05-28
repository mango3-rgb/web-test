import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, '../public/og-image-mystic.svg');
const pngPath = join(__dirname, '../public/og-image-mystic.png');

const svgBuffer = readFileSync(svgPath);

await sharp(svgBuffer)
  .resize(1200, 630)
  .png({ quality: 95 })
  .toFile(pngPath);

// also copy to docs/
const pngBuffer = readFileSync(pngPath);
writeFileSync(join(__dirname, '../docs/og-image-mystic.png'), pngBuffer);

console.log('✅ og-image-mystic.png generated (1200×630)');
