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
 await wait(2000);
 for(const width of [1440,1100,900,390,320]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<901});await wait(400);
  const boxes=await run(`Array.from(document.querySelectorAll('[data-featured-project]')).map(s=>{const card=s.querySelector('article').getBoundingClientRect();const logo=s.querySelector('article').parentElement.previousElementSibling.getBoundingClientRect();return {id:s.dataset.featuredProject,layout:s.dataset.layout,card:card.toJSON(),logo:logo.toJSON()}})`);
  assert.equal(boxes.length,4);
  assert.ok(await run('document.documentElement.scrollWidth<=innerWidth'),'No horizontal overflow at '+width);
  for(const [i,b] of boxes.entries()){
   assert.ok(Math.abs(b.logo.width-b.logo.height)<1,`${b.id} needs a square logo stage at ${width}`);
   assert.ok(Math.abs(b.logo.width-boxes[0].logo.width)<1,`All logo stages must match at ${width}`);
   if(width>1100){
    const gap=i%2?b.card.left-b.logo.right:b.logo.left-b.card.right;
    assert.ok(gap>=56,`${b.id} needs desktop breathing room: ${gap}`);
   }else assert.ok(b.card.top-b.logo.bottom>=31,`${b.id} needs a visible stacked gap`);
  }
  const lighting=await run(`Array.from(document.querySelectorAll('[data-featured-project]')).map(s=>({edge:getComputedStyle(s).getPropertyValue('--logo-edge').trim()}))`);
  if(width>1100)assert.deepEqual(lighting.map(x=>x.edge),['100%','0%','100%','0%'],'Card glows must follow the alternating logos');
  console.log(`${width}px: equal square logo stages, separated cards, correct alternating/stacked placement, no overflow.`);
  if(width===1440||width===390){
   await run(`document.querySelector('[data-featured-project="${width===1440?'press-sports':'fund-launch'}"]').scrollIntoView()`);await wait(800);
   const shot=await send('Page.captureScreenshot',{format:'png'});
   writeFileSync(`.next/project-layout-${width}.png`,Buffer.from(shot.data,'base64'));
  }
 }
 console.log('Directional card glows passed.');
}finally{ws.close();}
