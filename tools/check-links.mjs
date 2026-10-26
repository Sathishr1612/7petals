// Verifies every local href/src/srcset in generated pages resolves to a file, and every in-page #anchor exists.
import fs from 'node:fs'; import path from 'node:path';
const root = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const pages = []; (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', 'tools', 'dist', 'src', '.git', '7petal-pdf', '.backup-pre-redesign'].includes(f.name)) continue; const fp = path.join(d, f.name); if (f.isDirectory()) walk(fp); else if (/\.html$/.test(f.name) && !['index.backup.html', 'header.html', 'footer.html'].includes(f.name)) pages.push(fp); } })(root);
let bad = 0, n = 0;
for (const pg of pages) {
  const html = fs.readFileSync(pg, 'utf8'); const dir = path.dirname(pg);
  const refs = [...html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)].map((m) => m[1]);
  for (const m of html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)) refs.push(...m[1].split(',').map((s) => s.trim().split(' ')[0]));
  for (const r of new Set(refs)) { if (/^(https?:|mailto:|tel:|data:)/.test(r)) continue; n++; const f = path.join(dir, r.split('#')[0].split('?')[0]); if (!fs.existsSync(f)) { bad++; console.log('MISSING', path.relative(root, pg), '->', r); } }
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) { bad++; console.log('BAD ANCHOR', path.relative(root, pg), m[1]); }
  const h1 = (html.match(/<h1[\s>]/g) || []).length; if (h1 !== 1 && !/404/.test(pg)) console.log('H1 count', h1, path.relative(root, pg));
}
console.log(`${pages.length} pages, ${n} refs checked, ${bad} problems`);
