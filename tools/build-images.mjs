// Generates responsive WebP variants for every image in images.config.mjs.
// Usage: node build-images.mjs [--force]
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGES } from './images.config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const outDir = path.join(root, 'assets', 'img');
const LARGE = 1280, SMALL = 714; // every photo is saved at exactly these two widths (smaller originals are scaled up)
const QUALITY = 88;

// Output sub-folders under assets/img (see README): projects/<slug>, services/<slug>, general
const FOLDERS = [
  [/^crown-/, 'projects/rustomjee-crown'], [/^khar-/, 'projects/rustomjee-paramount-khar'], [/^gcorp-/, 'projects/g-corp-tech-park'],
  [/^trees-/, 'projects/godrej-the-trees'], [/^khalapur-/, 'projects/godrej-boyce-khalapur'], [/^urbanfarm-/, 'projects/godrej-urban-farm'],
  [/^kilbill-/, 'projects/kilbill-bungalow'], [/^nirlon-/, 'projects/nirlon-goregaon'], [/^oberoi-/, 'projects/oberoi-enigma-mulund'],
  [/^vaikunth-/, 'projects/piramal-vaikunth'], [/^seawoods-/, 'projects/seawoods-ambedkar-garden'],
  [/^hs-/, 'services/hardscape'], [/^vg-/, 'services/vertical-gardens'], [/^terrace-/, 'services/terrace-gardens'],
  [/^tt-/, 'services/tree-transplantation'], [/^irrigation-/, 'services/irrigation'], [/^nursery-/, 'services/plant-nursery'],
];
const folderFor = (id) => (FOLDERS.find(([re]) => re.test(id)) || [0, 'general'])[1];
const force = process.argv.includes('--force');
fs.mkdirSync(outDir, { recursive: true });

function resolveSource(src) {
  const [kind, rest] = [src.slice(0, 1), src.slice(2)];
  if (kind === 'E') return path.join(root, 'assets', 'images', '7petals-projects', rest);
  if (kind === 'A') return path.join(root, 'assets', 'images', rest);
  if (kind === 'H') return path.join(here, '.cache', 'hard', rest);
  if (kind === 'P') return path.join(here, '.cache', 'prof', rest);
  if (kind === 'N') {
    const dir = path.join(here, '.cache', 'newppt');
    const hit = fs.readdirSync(dir).find((f) => f.replace(/\.[^.]+$/, '') === `image${rest}`);
    if (!hit) throw new Error(`Missing newppt image${rest}`);
    return path.join(dir, hit);
  }
  throw new Error(`Bad source ${src}`);
}

const manifest = {};
let written = 0;
for (const [id, src, cat, proj, cap, alt, opts = {}] of IMAGES) {
  const file = resolveSource(src);
  let pipeline = sharp(file).rotate(); // honour EXIF
  if (opts.rotate) pipeline = sharp(await pipeline.rotate(opts.rotate).toBuffer());
  const meta = await sharp(await pipeline.toBuffer()).metadata();
  const w = meta.width, h = meta.height;
  const buf = await pipeline.toBuffer();
  const uniq = [SMALL, LARGE]; // always exactly these two sizes
  for (const tw of uniq) {
    const dir = path.join(outDir, folderFor(id));
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${id}-${tw}.webp`);
    if (!force && fs.existsSync(out)) continue;
    await sharp(buf).resize({ width: tw, kernel: 'lanczos3' }).webp({ quality: QUALITY, effort: 5, smartSubsample: true }).toFile(out);
    written++;
  }
  manifest[id] = { w, h, widths: uniq, cat, proj, cap, alt };
}
fs.writeFileSync(path.join(here, 'images.manifest.json'), JSON.stringify(manifest, null, 1));
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const total = walk(outDir).reduce((s, f) => s + fs.statSync(f).size, 0);
console.log(`${Object.keys(manifest).length} images, ${written} files written, ${(total / 1048576).toFixed(1)} MB in assets/img`);
