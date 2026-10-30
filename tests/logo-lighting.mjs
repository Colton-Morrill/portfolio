import assert from 'node:assert/strict';
import {logoLighting} from '../lib/logoLighting.ts';

assert.deepEqual(logoLighting(0),{sweep:.32,charge:0});
assert.deepEqual(logoLighting(1),{sweep:1,charge:1});
assert.equal(logoLighting(.24).charge,0,'Shine precedes ignition on every viewport');
assert.equal(logoLighting(.8).charge,1,'Neon is fully charged at the desktop threshold');
let previous=logoLighting(0);
const forward=[];
for(let i=1;i<=180;i++){
  const next=logoLighting(i/180);
  assert.ok(next.sweep>=previous.sweep&&next.charge>=previous.charge);
  forward.push(next);
  previous=next;
}
for(let i=180;i>=1;i--)assert.deepEqual(logoLighting(i/180),forward[i-1],'Scrolling backward retraces the same lighting sequence');
console.log('Shared lighting thresholds, monotonic ignition, and exact reverse sequence passed.');
