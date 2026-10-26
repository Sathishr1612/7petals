// Contact sheet: node sheet.mjs <dir> <outPrefix> [cols=6] [rows=4] [cell=300]
import sharp from 'sharp'; import fs from 'node:fs'; import path from 'node:path';
const [,, dir, prefix, c='6', r='4', cl='300'] = process.argv;
const cols=+c, rows=+r, cell=+cl;
const files = fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
const per=cols*rows;
for (let p=0;p*per<files.length;p++){
  const chunk=files.slice(p*per,(p+1)*per); const comps=[];
  for (let i=0;i<chunk.length;i++){
    const x=(i%cols)*cell, y=Math.floor(i/cols)*(cell+22);
    let meta; try{ meta=await sharp(path.join(dir,chunk[i])).metadata(); }catch{continue}
    const buf=await sharp(path.join(dir,chunk[i])).resize(cell-6,cell-6,{fit:'contain',background:'#888'}).flatten({background:'#888'}).jpeg({quality:70}).toBuffer();
    comps.push({input:buf,left:x+3,top:y+3});
    const label=`${chunk[i]} ${meta.width}x${meta.height}`.replace(/&/g,'&amp;');
    comps.push({input:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="22"><rect width="100%" height="100%" fill="#fff"/><text x="4" y="15" font-size="13" font-family="Arial" fill="#000">${label}</text></svg>`),left:x,top:y+cell});
  }
  await sharp({create:{width:cols*cell,height:rows*(cell+22),channels:3,background:'#fff'}}).composite(comps).jpeg({quality:72}).toFile(`${prefix}_${p+1}.jpg`);
}
console.log(files.length,'files',Math.ceil(files.length/per),'sheets');
