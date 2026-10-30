import { useCallback, useEffect, useState, type RefObject } from 'react';

/** One reversible, scroll-driven reveal across desktop and stacked layouts. */
export function useFeaturedProjectReveal(section:RefObject<HTMLElement|null>) {
  const [progress,setProgress]=useState(0);
  const [mobile,setMobile]=useState(false);
  const [still,setStill]=useState(false);
  const [reducedMotion,setReducedMotion]=useState(false);
  const [nearViewport,setNearViewport]=useState(false);
  const [graphicsReady,setGraphicsReady]=useState(false);
  const [graphicsFailed,setGraphicsFailed]=useState(false);
  const onReady=useCallback(()=>setGraphicsReady(true),[]);
  const onFailure=useCallback(()=>setGraphicsFailed(true),[]);

  useEffect(()=>{
    const el=section.current;if(!el)return;
    const phone=matchMedia('(max-width:900px)');
    const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    const short=matchMedia('(max-height:780px)');
    let frame=0;
    const update=()=>{
      frame=0;
      const r=el.getBoundingClientRect();
      setMobile(phone.matches);
      const card=el.querySelector('article');
      const tooTall=card?card.offsetHeight+192>innerHeight:false;
      const naturalLayout=!phone.matches&&(innerWidth<=1100||short.matches||tooTall);
      setReducedMotion(reduced.matches);
      setStill(reduced.matches||naturalLayout);
      // Natural layouts have no sticky scroll runway. Reveal while the logo enters,
      // rather than treating a layout fallback as a request to disable animation.
      const logoTop=(el.querySelector('[data-project-logo]')??el).getBoundingClientRect().top;
      const next=phone.matches||naturalLayout?(innerHeight*.85-logoTop)/(innerHeight*.5):-r.top/Math.max(1,el.offsetHeight-innerHeight);
      setProgress(Math.max(0,Math.min(1,next)));
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setNearViewport(true);observer.disconnect();}
    },{rootMargin:'400px 0px'});
    observer.observe(el);
    const cardResize=new ResizeObserver(request);
    const card=el.querySelector('article');if(card)cardResize.observe(card);
    request();
    addEventListener('scroll',request,{passive:true});addEventListener('resize',request);
    [phone,reduced,short].forEach(q=>q.addEventListener('change',request));
    return()=>{
      cancelAnimationFrame(frame);observer.disconnect();cardResize.disconnect();
      removeEventListener('scroll',request);removeEventListener('resize',request);
      [phone,reduced,short].forEach(q=>q.removeEventListener('change',request));
    };
  },[section]);

  const effectProgress=progress;
  return {
    mobile,still,reducedMotion,nearViewport,graphicsReady,graphicsFailed,onReady,onFailure,
    effectProgress,
    reveal:reducedMotion?1:Math.max(0,Math.min(1,(effectProgress-.12)/.45)),
    light:reducedMotion?1:Math.max(0,Math.min(1,(effectProgress-.24)/.56)),
  };
}
