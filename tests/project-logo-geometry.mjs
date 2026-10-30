import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createLogoShapes} from '../lib/projectLogoGeometry.ts';
import * as THREE from 'three';

const contours=id=>JSON.parse(readFileSync(new URL(`../public/projects/${id}-contours.json`,import.meta.url)));
const apto=createLogoShapes(contours('aptogenix'));
assert.equal(apto.length,2,'The helix body and head must be solid logo shapes');
assert.deepEqual(apto.map(shape=>shape.holes.length).sort(),[0,4],'Four gaps must remain holes, never mirror-filled shapes');
const fund=createLogoShapes(contours('fund-launch'),true);
assert.equal(fund.length,2,'Fund Launch retains its two solid parts');
assert.ok(fund.every(shape=>shape.holes.length===0));
const fundGeometry=new THREE.ExtrudeGeometry(fund,{depth:.12,bevelEnabled:false});
const fundMaterial=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
const fundMesh=new THREE.Mesh(fundGeometry,fundMaterial);fundMesh.updateMatrixWorld();
assert.ok(new THREE.Raycaster(new THREE.Vector3(1.10,.22,10),new THREE.Vector3(0,0,-1)).intersectObject(fundMesh).length>0,'The corner below the right swoop must remain solid');
fundGeometry.dispose();fundMaterial.dispose();
console.log('Logo geometry preserves solid bodies and all four AptoGenix gaps.');

for(const [id,emptyPoint,solidPoint] of [
  ['vibility',[0,0],[0,1.9]],
  ['press-sports',[.1,.4],[-.9,-1]],
]){
  const geometry=new THREE.ExtrudeGeometry(createLogoShapes(contours(id)),{depth:.12,bevelEnabled:false});
  const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(geometry,material);mesh.updateMatrixWorld();
  const hits=point=>new THREE.Raycaster(new THREE.Vector3(...point,10),new THREE.Vector3(0,0,-1)).intersectObject(mesh).length;
  assert.equal(hits(emptyPoint),0,`${id} must preserve the mark's open center`);
  assert.ok(hits(solidPoint)>0,`${id} must preserve its solid logo body`);
  geometry.dispose();material.dispose();
}
console.log('Press Sports and Vibility preserve their open centers and solid bodies.');
