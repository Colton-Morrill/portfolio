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
 await send('Emulation.setEmulatedMedia',{features:process.env.PORTFOLIO_TEST_MOTION==='normal'?[]:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await send('Page.navigate',{url:process.env.PORTFOLIO_TEST_ORIGIN||'http://localhost:3101'});await wait(1800);
 for(const width of [1440,390,320]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<901});await wait(300);
  for(const project of ['fund-launch','press-sports','vibility','aptogenix']){
   const point=await run('(()=>{const a=document.querySelector('+JSON.stringify('[data-featured-project="'+project+'"] [aria-haspopup="dialog"]')+');a.scrollIntoView({block:"center",behavior:"instant"});return true})()');
   assert.ok(point);
   await wait(200);
   const target=await run('(()=>{const a=document.querySelector('+JSON.stringify('[data-featured-project="'+project+'"] [aria-haspopup="dialog"]')+');const r=a.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()');
   await send('Input.dispatchMouseEvent',{type:'mousePressed',...target,button:'left',clickCount:1});
   await send('Input.dispatchMouseEvent',{type:'mouseReleased',...target,button:'left',clickCount:1});
   await wait(1000);
   const info=await run(`(()=>{const d=document.querySelector('dialog[open]');return d?{title:d.querySelector('h2').textContent,count:d.querySelectorAll('[aria-label="Choose a screenshot"] button').length,locked:document.body.style.overflow,rect:d.getBoundingClientRect().toJSON(),overflow:d.scrollWidth>d.clientWidth}:null})()`);
   assert.ok(info,'Gallery must open for '+project);assert.ok(info.count>=3);assert.equal(info.locked,'hidden');assert.equal(info.overflow,false);
   assert.ok(info.rect.left>=0&&info.rect.right<=width+1,'Dialog fits viewport');
   assert.ok(info.rect.top>=0&&info.rect.bottom<=1001,'Dialog fits viewport vertically');
   await run(`document.querySelector('[aria-label="Next screenshot"]').click()`);
   assert.equal(await run(`document.querySelector('[data-gallery-screen]').dataset.galleryScreen`),'1');
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowLeft',code:'ArrowLeft'});
   assert.equal(await run(`document.querySelector('[data-gallery-screen]').dataset.galleryScreen`),'0');
   await run(`document.querySelector('[aria-label="Choose a screenshot"]').lastElementChild.click()`);
   assert.equal(await run(`document.querySelector('[data-gallery-screen]').dataset.galleryScreen`),String(info.count-1));
   await run(`document.querySelector('[aria-label="Enlarge screenshot"]').click()`);
   assert.ok(await run(`document.querySelector('[data-gallery-viewport]').scrollWidth>document.querySelector('[data-gallery-viewport]').clientWidth`),'Detail view allows inspection');
   await run(`document.querySelector('[aria-label="Fit screenshot"]').click()`);
   const imagePath=await run(`document.querySelector('[aria-label="Open original screenshot"]').getAttribute('href')`);
   assert.equal((await fetch((process.env.PORTFOLIO_TEST_ORIGIN||'http://localhost:3101')+imagePath)).status,200,'Screenshot asset loads');
   assert.ok(await run(`(async()=>{const image=document.querySelector('[data-gallery-screen] img');if(!image)return true;try{await image.decode();return image.naturalWidth>0}catch{return false}})()`),'Displayed screenshot decodes successfully');
   if(project==='fund-launch'&&width===1440||project==='press-sports'&&width===390){const shot=await send('Page.captureScreenshot',{format:'png'});writeFileSync('.next/gallery-'+width+'.png',Buffer.from(shot.data,'base64'));}
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});await wait(100);
   assert.equal(await run(`!!document.querySelector('dialog[open]')`),false,'Escape closes gallery');
   assert.equal(await run(`document.body.style.overflow`),'','Body scroll restored');
   assert.equal(await run(`document.activeElement.getAttribute('aria-haspopup')`),'dialog','Focus restored to gallery trigger');
  }
  console.log(width+'px: all four galleries, multiple images, navigation, thumbnails, detail view, Escape, focus, and overflow passed.');
 }
}finally{ws.close();}
