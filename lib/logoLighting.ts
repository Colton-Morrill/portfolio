const clamp=(value:number)=>Math.max(0,Math.min(1,value));
const smooth=(value:number,start:number,end:number)=>{
  const t=clamp((value-start)/(end-start));
  return t*t*(3-2*t);
};

export function logoLighting(progress:number) {
  return {sweep:.32+.68*smooth(progress,.015,.42),charge:smooth(progress,.24,.8)};
}
