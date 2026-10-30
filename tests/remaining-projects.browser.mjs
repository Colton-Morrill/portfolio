import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const tabs=await(await fetch('http://127.0.0.1:9223/json')).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);
let id=0;const jobs=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const j=jobs.get(m.id);jobs.delete(m.id);m.error?j.reject(m.error):j.resolve(m.result);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{jobs.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const wait=ms=>new Promise(r=>setTimeout(r,ms));

try{
 await send('Page.enable');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await send('Page.navigate',{url:process.env.PORTFOLIO_TEST_ORIGIN||'http://localhost:3101'});
 await wait(1800);
 for(const width of [1440,900,390,320]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<901});await wait(400);
  await run("document.querySelector('[data-remaining-projects]').scrollIntoView()");await wait(700);
  await run("Promise.all(Array.from(document.querySelectorAll('[data-remaining-projects] img')).map(i=>{i.loading='eager';return i.decode().catch(()=>null)}))");
  const result=await run(`(()=>{const root=document.querySelector('[data-remaining-projects]');const cards=[...root.querySelectorAll('[data-secondary-project]')];const rows=[...root.querySelectorAll('[data-archive-project]')];return {overflow:document.documentElement.scrollWidth>innerWidth,cards:cards.map(c=>({top:c.getBoundingClientRect().top,left:c.getBoundingClientRect().left,href:c.querySelector('a').href,image:c.querySelector('img').complete&&c.querySelector('img').naturalWidth>0})),rows:rows.length,links:rows.filter(r=>r.tagName==='A').length,internal:rows.find(r=>r.tagName==='ARTICLE')?.textContent}})()`);
  assert.equal(result.overflow,false,'No horizontal overflow at '+width);
  assert.equal(result.cards.length,0);assert.equal(result.rows,7);assert.equal(result.links,6);
  assert.ok(result.cards.every(c=>c.image&&c.href));assert.match(result.internal,/Document Imaging System/);
  const missing=await run("Array.from(document.querySelectorAll('[data-archive-project] img')).filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)");assert.deepEqual(missing,[],'All archive icons load');
  console.log(width+'px: condensed project rows, project links, internal entry, images, and overflow passed.');
  if(width===1440||width===390){const shot=await send('Page.captureScreenshot',{format:'png'});writeFileSync('.next/remaining-projects-'+width+'.png',Buffer.from(shot.data,'base64'));}
 }
}finally{ws.close();}
