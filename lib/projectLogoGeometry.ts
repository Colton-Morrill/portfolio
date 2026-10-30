import * as THREE from 'three';

/** Contours use clockwise outer boundaries and counterclockwise holes. */
export function createLogoShapes(contours:number[][][],preserveCorners=false) {
  const paths=new THREE.ShapePath();
  paths.subPaths=contours.map(points=>{
    const shape=new THREE.Shape();
    const midpoint=(a:number[],b:number[])=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
    const start=midpoint(points[points.length-1],points[0]);
    shape.moveTo(start[0],start[1]);
    points.forEach((point,i)=>{
      const next=midpoint(point,points[(i+1)%points.length]);
      const previous=points[(i+points.length-1)%points.length],following=points[(i+1)%points.length];
      const sharp=preserveCorners&&((point[0]-previous[0])*(following[0]-point[0])+(point[1]-previous[1])*(following[1]-point[1]))<0;
      if(sharp){shape.lineTo(point[0],point[1]);shape.lineTo(next[0],next[1]);}
      else shape.quadraticCurveTo(point[0],point[1],next[0],next[1]);
    });
    shape.closePath();
    return shape;
  });
  return paths.toShapes(false);
}
