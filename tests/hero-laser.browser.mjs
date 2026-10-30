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
try{
  await send('Page.enable');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:process.env.PORTFOLIO_TEST_ORIGIN||'http://localhost:3101'});
  await new Promise(r=>setTimeout(r,2000));
  const result=await run(`(()=>{
    const point=document.querySelector('#hero a[href="#projects"] svg rect:last-child');
    const animation=point.getAnimations()[0];animation.pause();
    const offsets=[500,1000,1500,2000].map(time=>{animation.currentTime=time;return parseFloat(getComputedStyle(point).strokeDashoffset)});
    const pointBox=point.getBoundingClientRect(),button=point.closest('a').getBoundingClientRect();
    const stage=document.querySelector('[data-featured-project] > div');
    return {offsets,button:{width:button.width,height:button.height},point:{width:pointBox.width,height:pointBox.height},stage:{align:getComputedStyle(stage).alignItems,content:getComputedStyle(stage).alignContent},navbar:getComputedStyle(document.querySelector('nav')).position};
  })()`);
  for(let i=1;i<result.offsets.length;i++)assert.ok(Math.abs(result.offsets[i]-result.offsets[i-1]+10)<.2,'Laser must interpolate continuously, not jump at half-cycle');
  assert.ok(Math.abs(result.button.width-result.point.width)<5);
  assert.ok(Math.abs(result.button.height-result.point.height)<5);
  assert.equal(result.stage.align,'center');assert.notEqual(result.stage.content,'start');
  assert.equal(result.navbar,'fixed');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  assert.equal(await run(`getComputedStyle(document.querySelector('#hero a[href="#projects"] svg rect:last-child')).animationName`),'none');
  console.log('Laser moves continuously along the button bounds; reduced motion disables it; project alignment and navbar positioning restored.',result.offsets);
}finally{await send('Browser.close').catch(()=>{});ws.close();}
