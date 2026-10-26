// Extracts slide text + media mapping from a PPTX. Usage: node pptx-extract.mjs <pptx> <outDir>
import AdmZip from 'adm-zip';
import fs from 'node:fs';
import path from 'node:path';
const [,, file, out] = process.argv;
const zip = new AdmZip(file);
fs.mkdirSync(path.join(out,'media'),{recursive:true});
const entries = zip.getEntries();
for (const e of entries) if (e.entryName.startsWith('ppt/media/')) fs.writeFileSync(path.join(out,'media',path.basename(e.entryName)), e.getData());
const slides = entries.filter(e=>/^ppt\/slides\/slide\d+\.xml$/.test(e.entryName)).sort((a,b)=>parseInt(a.entryName.match(/(\d+)\.xml/)[1])-parseInt(b.entryName.match(/(\d+)\.xml/)[1]));
const report=[];
for (const s of slides){
  const n = s.entryName.match(/slide(\d+)\.xml/)[1];
  const xml = s.getData().toString('utf8');
  const text = [...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map(m=>m[1]).join(' ').replace(/\s+/g,' ').trim();
  const relE = zip.getEntry(`ppt/slides/_rels/slide${n}.xml.rels`);
  const rels = relE ? relE.getData().toString('utf8') : '';
  const rmap = {}; for (const m of rels.matchAll(/Id="([^"]+)"[^>]*Target="([^"]+)"/g)) rmap[m[1]]=m[2];
  for (const m of rels.matchAll(/Target="([^"]+)"[^>]*Id="([^"]+)"/g)) rmap[m[2]]=m[1];
  const embeds=[...xml.matchAll(/r:embed="([^"]+)"/g)].map(m=>rmap[m[1]]).filter(Boolean).map(t=>path.basename(t));
  report.push(`--- slide ${n} | media: ${[...new Set(embeds)].join(', ')}\n${text}`);
}
fs.writeFileSync(path.join(out,'report.txt'), report.join('\n'));
console.log(slides.length,'slides', fs.readdirSync(path.join(out,'media')).length,'media');
