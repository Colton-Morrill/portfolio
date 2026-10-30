import assert from 'node:assert/strict';
const tabs=await(await fetch('http://127.0.0.1:9223/json')).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);
let id=0;const jobs=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const j=jobs.get(m.id);jobs.delete(m.id);m.error?j.reject(m.error):j.resolve(m.result);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{jobs.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const run=async expression=>{
  const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
try{
  await send('Page.enable');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Page.navigate',{url:process.env.PORTFOLIO_TEST_ORIGIN||'http://localhost:3101'});
  await wait(2000);
  for(const width of [1440,390]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<901});
    await wait(500);
    for(const identity of ['fund-launch','press-sports','vibility','aptogenix']){
      for(const progress of [.15,.5,.9,.5,.15]){
        await run(`(()=>{const section=document.querySelector('[data-featured-project="${identity}"]');const logo=section.querySelector('[data-project-logo]');document.documentElement.style.scrollBehavior='auto';document.body.style.scrollBehavior='auto';const top=scrollY+( ${width}<901?logo:section).getBoundingClientRect().top;scrollTo({top:${width}<901?top-innerHeight*.85+innerHeight*.5*${progress}:top+(section.offsetHeight-innerHeight)*${progress},behavior:'instant'});})()`);
        await wait(180);
        const light=()=>run(`Number(document.querySelector('[data-featured-project="${identity}"] > div').style.getPropertyValue('--light'))`);
        const actual=await light(),expected=Math.max(0,Math.min(1,(progress-.24)/.56));
        assert.ok(Math.abs(actual-expected)<.02,`${width}px ${identity} scroll progress ${progress}: expected ${expected}, got ${actual}`);
        if(progress===.5){await wait(500);assert.equal(await light(),actual,'Pausing scroll must pause reveal rather than autoplay');}
      }
    }
    console.log(`${width}px: all four projects follow scroll, hold when stopped, and reverse through identical light thresholds.`);
  }
}finally{await send('Browser.close').catch(()=>{});ws.close();}
