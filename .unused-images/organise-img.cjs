const fs=require('fs'),path=require('path');
const root='assets/img';
const rules=[
 [/^crown-/,'projects/rustomjee-crown'],[/^khar-/,'projects/rustomjee-paramount-khar'],[/^gcorp-/,'projects/g-corp-tech-park'],
 [/^trees-/,'projects/godrej-the-trees'],[/^khalapur-/,'projects/godrej-boyce-khalapur'],[/^urbanfarm-/,'projects/godrej-urban-farm'],
 [/^kilbill-/,'projects/kilbill-bungalow'],[/^nirlon-/,'projects/nirlon-goregaon'],[/^oberoi-/,'projects/oberoi-enigma-mulund'],
 [/^vaikunth-/,'projects/piramal-vaikunth'],[/^seawoods-/,'projects/seawoods-ambedkar-garden'],
 [/^hs-/,'services/hardscape'],[/^vg-/,'services/vertical-gardens'],[/^terrace-/,'services/terrace-gardens'],
 [/^tt-/,'services/tree-transplantation'],[/^irrigation-/,'services/irrigation'],[/^nursery-/,'services/plant-nursery'],
 [/^(bg-|hero-|garden-)/,'general']];
const map={};
for(const f of fs.readdirSync(root,{withFileTypes:true})){
 if(!f.isFile())continue;
 const r=rules.find(([re])=>re.test(f.name));if(!r){console.log('NO RULE',f.name);continue}
 const dir=path.join(root,r[1]);fs.mkdirSync(dir,{recursive:true});
 fs.renameSync(path.join(root,f.name),path.join(dir,f.name));map[f.name]=r[1]+'/'+f.name;
}
fs.writeFileSync('.unused-images/img-move-map.json',JSON.stringify(map,null,1));
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?(/node_modules|\.git$|\.unused|\.backup|7petal-pdf|^assets.img$/.test(e.name)?[]:walk(p)):[p]})}
let changed=0;
for(const f of walk('.').filter(f=>/\.(html|css|js|xml|json|mjs)$/.test(f)&&!f.includes('tools'+path.sep)&&!/package/.test(f))){
 let s=fs.readFileSync(f,'utf8');
 const n=s.replace(/(assets\/img\/|\.\.\/img\/)([A-Za-z0-9_-]+\.(?:webp|jpg|png))/g,(m,p,name)=>map[name]?p+map[name]:m);
 if(n!==s){fs.writeFileSync(f,n);changed++}
}
console.log('moved',Object.keys(map).length,'files; updated',changed,'files');
