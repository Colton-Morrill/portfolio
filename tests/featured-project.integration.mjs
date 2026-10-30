import assert from 'node:assert/strict';

const origin=process.env.PORTFOLIO_TEST_ORIGIN || 'http://localhost:3101';
const homepage=await fetch(origin);
assert.equal(homepage.status,200,'Homepage must remain available');
const html=await homepage.text();
assert.match(html,/data-featured-project="fund-launch"/,'Homepage must render the integrated featured project');
assert.match(html,/data-featured-project="aptogenix"/,'The next project must share the featured treatment');
assert.equal((html.match(/data-featured-project=/g)||[]).length,4,'Show four distinct featured stories');
assert.match(html,/data-featured-project="press-sports"/,'Feature the consumer mobile project');
assert.match(html,/data-featured-project="vibility"/,'Feature the multi-stack product');
assert.match(html,/React Native/,'Preserve the confirmed mobile stack');
assert.match(html,/Expo/,'Preserve the confirmed Expo stack');
assert.deepEqual(Array.from(html.matchAll(/data-featured-project="([^"]+)"/g),match=>match[1]),['fund-launch','press-sports','vibility','aptogenix'],'Order the four stories deliberately');
assert.match(html,/Led the redesign toward a modern web app experience/,'Show the confirmed redesign leadership');
assert.match(html,/connected new APIs/,'Show confirmed API integration work');
assert.match(html,/aptogenix-mark\.svg/,'AptoGenix needs its own static identity');
assert.match(html,/Collaborated on design/,'The ownership story must be server rendered');
assert.match(html,/nearly every major frontend feature/,'The specific frontend contribution must remain visible');
assert.match(html,/shipped updates/,'The release contribution must be visible');
assert.equal((html.match(/aria-label="Project highlights"/g)||[]).length,4,'Each featured card must have scannable project highlights');
assert.doesNotMatch(html,/aria-label="What I worked on"/,'Numbered process steps must be removed from the cards');
assert.match(html,/fund-launch-mark\.svg/,'A static logo must be available without WebGL');
assert.match(html,/href="#contact"/,'Contact action must use the homepage contact section');
assert.match(html,/fund-launch-preview\.webp/,'Visitors must retain access to a product screenshot');
assert.doesNotMatch(html,/Neon palette|Replay light|MATERIAL STUDIES/,'Experimental controls must not ship on the homepage');
for(const path of ['/experiments/halo','/experiments/project-glass','/esp/experiments/halo','/esp/experiments/project-glass']){
  const response=await fetch(origin+path);
  assert.equal(response.status,404,`${path} must be removed from public routes`);
}
for(const path of ['/projects/fund-launch-preview.webp',...['fund-launch','aptogenix','press-sports','vibility'].flatMap(id=>['mark.svg','distance.png','contours.json'].map(asset=>`/projects/${id}-${asset}`))]){
  assert.equal((await fetch(origin+path)).status,200,`${path} must be available`);
}
assert.match(await (await fetch(origin+'/projects/fund-launch-mark.svg')).text(),/#4843f6/,'Static identity must use the approved brand primary');
assert.equal((await fetch(origin+'/experiments/fundlaunch-distance.png')).status,404,'Old experimental assets must not remain public');
console.log('Homepage SSR, product actions, fallback logo, and retired experiment routes passed.');
