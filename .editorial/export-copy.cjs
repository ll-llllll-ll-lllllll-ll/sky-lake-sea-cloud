'use strict';
const fs=require('fs'),path=require('path'),Module=require('module');
let acorn;try{acorn=require('acorn')}catch(e){const m=new Module('acorn');m._compile(process.binding('natives')['internal/deps/acorn/acorn/dist/acorn'],'internal/acorn.js');acorn=m.exports;}
const root=process.cwd(), langs=['zh','en','ja'], out=[], seen=new Set();
const files=['script.js','calendar-motion.js','seawater-space-time.js','ruin-mini-detail-v4.js','ruin-mini-frame-v3.js','calendar/library.js'];
const key=n=>n&&(n.name!==undefined?n.name:n.value!==undefined?String(n.value):null);
const props=n=>{const a={};if(n&&n.type==='ObjectExpression')for(const p of n.properties)if(p.type==='Property'&&!p.computed){const k=key(p.key);if(k!==null)a[k]=p.value}return a};
function makeItem(n,s){if(!n)return null;if(n.type==='Literal'&&typeof n.value==='string')return {value:n.value,start:n.start,end:n.end,syntax:'literal'};if(n.type==='TemplateLiteral'&&!n.expressions.length)return {value:n.quasis[0].value.cooked,start:n.start,end:n.end,syntax:'template'};return null}
function locObj(n,s){let p=props(n),v={};for(const l of langs){const e=p[l];if(!e)return null;if(e.type==='ArrayExpression'){v[l]=e.elements.map(n=>makeItem(n,s));if(v[l].some(x=>!x))return null}else{const t=makeItem(e,s);if(!t)return null;v[l]=[t]}}return v}
function add(file,s,path,vals,kind='translation'){if(!vals)return;const max=Math.max(...langs.map(l=>vals[l].length));for(let i=0;i<max;i++){const q={};for(const l of langs)q[l]=vals[l][i]||null;const cells=langs.map(l=>q[l]).filter(Boolean);if(!cells.length)continue;const sig=file+'|'+path+'|'+i+'|'+cells[0].start;if(seen.has(sig))continue;seen.add(sig);const start=Math.min(...cells.map(c=>c.start));out.push({file,path:path+(max>1?'['+i+']':''),kind,line:s.slice(0,start).split('\n').length,languages:Object.fromEntries(langs.map(l=>[l,q[l]?.value||''])),source:Object.fromEntries(langs.map(l=>[l,q[l]?{start:q[l].start,end:q[l].end,syntax:q[l].syntax,original:q[l].value}:null]))})}}
for(const file of files){const loc=path.join(root,file);if(!fs.existsSync(loc))continue;const s=fs.readFileSync(loc,'utf8'),ast=acorn.parse(s,{ecmaVersion:'latest',sourceType:'script'});
 function scan(n,ctx){if(!n||typeof n!=='object')return;
 if(n.type==='VariableDeclarator'&&n.id?.type==='Identifier'){
   const v=n.id.name;
   if(v==='labels'){const lp=props(n.init),ks=new Set();for(const l of langs)Object.keys(props(lp[l])).forEach(k=>ks.add(k));for(const k of ks){let tr={},okay=true;for(const l of langs){const el=props(lp[l])[k];if(el?.type==='ArrayExpression'){tr[l]=el.elements.map(x=>makeItem(x,s));if(tr[l].some(x=>!x))okay=false}else{const x=makeItem(el,s);if(!x)okay=false;tr[l]=x?[x]:[]}}if(okay)add(file,s,'labels.'+k,tr,'interface')}}
   else scan(n.init,v);return;
 }
 if(n.type==='AssignmentExpression'){scan(n.right,s.slice(n.left.start,n.left.end).replace(/\s+/g,''));return;}
 if(n.type==='ObjectExpression'){const tr=locObj(n,s);if(tr){add(file,s,ctx,tr);return;}for(const p of n.properties)if(p.type==='Property'){const k=key(p.key);if(k!==null)scan(p.value,ctx+'.'+k)}return;}
 if(n.type==='ArrayExpression'){n.elements.forEach((x,i)=>scan(x,ctx+'['+i+']'));return;}
 for(const [k,v] of Object.entries(n)){if(['start','end','raw','value','loc'].includes(k))continue;if(v&&typeof v==='object'){if(Array.isArray(v))v.forEach(x=>scan(x,ctx));else scan(v,ctx)}}
 }
 scan(ast,file.replace(/\W/g,'_'));
}
const texts=out.filter(r=>!(r.file==='script.js'&&r.path.startsWith('collections[2]')));
texts.forEach((r,i)=>r.id='TXT-'+String(i+1).padStart(4,'0'));
const doc={schema:'site-copy-map/v1',revision:process.env.GITHUB_SHA,generated:new Date().toISOString(),records:texts};
fs.mkdirSync('.editorial',{recursive:true});fs.writeFileSync('.editorial/site-copy-map.json',JSON.stringify(doc,null,2)+'\n');
console.log('Extracted',texts.length,'multilingual text blocks');
