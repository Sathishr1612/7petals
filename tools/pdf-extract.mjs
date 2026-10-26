// Dumps page text and embedded images from a PDF. Usage: node pdf-extract.mjs <pdf> <outDir> [maxPages]
import * as mupdf from 'mupdf';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const [,, file, out, max] = process.argv;
fs.mkdirSync(path.join(out,'img'),{recursive:true});
const doc = mupdf.Document.openDocument(fs.readFileSync(file), 'application/pdf');
const n = doc.countPages();
let txt=[]; let count=0;
for (let i=0;i<Math.min(n, +max||n);i++){
  const page = doc.loadPage(i);
  const st = page.toStructuredText('preserve-images');
  txt.push(`--- page ${i+1}\n`+ st.asText().replace(/\n{2,}/g,'\n').trim());
  // collect images
  const imgs=[];
  st.walk({ onImageBlock(bbox, transform, image){ imgs.push({bbox,image}); } });
  let k=0;
  for (const {bbox,image} of imgs){
    try{
      const pix = image.toPixmap();
      if (pix.getWidth()<300||pix.getHeight()<200) continue;
      const buf = Buffer.from(pix.asPNG());
      await sharp(buf).jpeg({quality:88}).toFile(path.join(out,'img',`p${String(i+1).padStart(2,'0')}_${++k}.jpg`));
      count++;
    }catch(e){}
  }
}
fs.writeFileSync(path.join(out,'text.txt'), txt.join('\n'));
console.log(path.basename(file), n,'pages', count,'images');
