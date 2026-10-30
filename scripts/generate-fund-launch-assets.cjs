// Rebuild the featured project logo assets from their original brand images.
// Uses sharp, already installed with this Next.js application's dependencies.
const fs = require('fs');
const sharp = require('sharp');
function simplify(points, epsilon) {
  if (points.length < 3) return points;
  const a=points[0], b=points[points.length-1];
  let maximum=0,index=0;
  for(let i=1;i<points.length-1;i++) {
    const dx=b[0]-a[0],dy=b[1]-a[1];
    const t=Math.max(0,Math.min(1,((points[i][0]-a[0])*dx+(points[i][1]-a[1])*dy)/(dx*dx+dy*dy||1)));
    const distance=Math.hypot(points[i][0]-a[0]-t*dx,points[i][1]-a[1]-t*dy);
    if(distance>maximum){maximum=distance;index=i;}
  }
  return maximum>epsilon?[...simplify(points.slice(0,index+1),epsilon).slice(0,-1),...simplify(points.slice(index),epsilon)]:[a,b];
}
function distance(field,n) {
  for(let y=0;y<n;y++)for(let x=0;x<n;x++) {
    const i=y*n+x;
    if(x)field[i]=Math.min(field[i],field[i-1]+1);
    if(y)field[i]=Math.min(field[i],field[i-n]+1);
    if(x&&y)field[i]=Math.min(field[i],field[i-n-1]+Math.SQRT2);
    if(x<n-1&&y)field[i]=Math.min(field[i],field[i-n+1]+Math.SQRT2);
  }
  for(let y=n-1;y>=0;y--)for(let x=n-1;x>=0;x--) {
    const i=y*n+x;
    if(x<n-1)field[i]=Math.min(field[i],field[i+1]+1);
    if(y<n-1)field[i]=Math.min(field[i],field[i+n]+1);
    if(x<n-1&&y<n-1)field[i]=Math.min(field[i],field[i+n+1]+Math.SQRT2);
    if(x&&y<n-1)field[i]=Math.min(field[i],field[i+n-1]+Math.SQRT2);
  }
}
(async()=>{
  const aptogenix=process.argv.includes('--aptogenix');
  const vibility=process.argv.includes('--vibility');
  const press=process.argv.includes('--press-sports');
  const identity=aptogenix?'aptogenix':vibility?'vibility':press?'press-sports':'fund-launch';
  const color=aptogenix?'#46d6bc':vibility?'#5844ff':press?'#4fe0ff':'#4843f6';
  const svg=fs.readFileSync('public/fundlaunchicon.svg','utf8');
  const embedded=svg.match(/base64,([^\"]+)/);
  if(!embedded)throw Error('Expected embedded brand image');
  const n=1024;
  let data;
  if(aptogenix||vibility||press){
    let input=aptogenix?'public/aptogenix.png':press?'public/Press-Sports-Favicon.png':'public/icon.png';
    if(press){
      // The favicon includes opaque black cutouts as well as transparency.
      const {data:pixels,info}=await sharp(input).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      for(let i=0;i<pixels.length;i+=4){pixels[i+3]=Math.round(pixels[i+3]*Math.min(pixels[i],pixels[i+1],pixels[i+2])/255);pixels[i]=pixels[i+1]=pixels[i+2]=255;}
      input=await sharp(pixels,{raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
    }
    const source=await sharp(input).trim().resize({width:800,height:800,fit:'inside'}).png().toBuffer();
    data=await sharp(source).resize(n,n,{fit:'contain',withoutEnlargement:true,background:'#00000000'}).ensureAlpha().raw().toBuffer();
  }else{
    ({data}=await sharp(Buffer.from(embedded[1],'base64')).resize(888,552,{fit:'fill'}).extend({top:236,bottom:236,left:68,right:68,background:'#00000000'}).ensureAlpha().raw().toBuffer({resolveWithObject:true}));
  }
  const mask=new Uint8Array(n*n);
  const inside=new Float32Array(n*n),outside=new Float32Array(n*n);
  for(let i=0;i<mask.length;i++){mask[i]=data[i*4+3]>127?1:0;inside[i]=mask[i]?0:9999;outside[i]=mask[i]?9999:0;}
  distance(inside,n);distance(outside,n);
  const sdf=Buffer.alloc(n*n);
  for(let i=0;i<sdf.length;i++)sdf[i]=Math.max(0,Math.min(255,Math.round(128+(inside[i]-outside[i])/4)));
  await sharp(sdf,{raw:{width:n,height:n,channels:1}}).png().toFile(`public/projects/${identity}-distance.png`);
  const occupied=(x,y)=>x>=0&&y>=0&&x<n&&y<n&&mask[y*n+x];
  const edges=new Map();
  const add=(x,y,a,b)=>{const key=x+','+y;if(!edges.has(key))edges.set(key,[]);edges.get(key).push([a,b]);};
  for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(occupied(x,y)) {
    if(!occupied(x,y-1))add(x,y,x+1,y);
    if(!occupied(x+1,y))add(x+1,y,x+1,y+1);
    if(!occupied(x,y+1))add(x+1,y+1,x,y+1);
    if(!occupied(x-1,y))add(x,y+1,x,y);
  }
  const contours=[];
  while(edges.size) {
    const key=edges.keys().next().value;
    let point=key.split(',').map(Number);const path=[point];
    for(let i=0;i<n*n;i++) {
      const k=point.join(','),next=edges.get(k);if(!next)break;
      point=next.pop();if(!next.length)edges.delete(k);path.push(point);
      if(point.join(',')===key)break;
    }
    if(path.length<100)continue;
    const polygon=simplify(path,1.5).slice(0,-1);
    contours.push(polygon.map(([x,y])=>[Number(((x/n-.5)*5.4).toFixed(5)),Number(((.5-y/n)*5.4).toFixed(5))]));
  }
  fs.writeFileSync(`public/projects/${identity}-contours.json`,JSON.stringify(contours));
  const paths=contours.map(points=>{const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];const p=mid(points.at(-1),points[0]);return 'M'+p.join(' ')+points.map((point,i)=>{const end=mid(point,points[(i+1)%points.length]);return 'Q'+point.join(' ')+' '+end.join(' ')}).join('')+'Z';});
  const points=contours.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>-p[1]);
  const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  const side=(Math.max(maxX-minX,maxY-minY)+.05)*1.28;
  const viewBox=[(minX+maxX-side)/2,(minY+maxY-side)/2,side,side].map(n=>n.toFixed(5)).join(' ');
  fs.writeFileSync(`public/projects/${identity}-mark.svg`,'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+viewBox+'"><g transform="scale(1 -1)" fill="'+color+'"><path fill-rule="evenodd" d="'+paths.join(' ')+'"/></g></svg>');
  console.log(`Generated ${identity} distance field, contours, and static mark:`,contours.map(p=>p.length));
})();
