import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/** Coordinates a native desktop scroll reveal and a brief, optional phone intro. */
export function useFeaturedProjectReveal(section:RefObject<HTMLElement|null>) {
  const played=useRef(false);
  const [progress,setProgress]=useState(0);
  const [mobile,setMobile]=useState(false);
  const [still,setStill]=useState(false);
  const [reducedMotion,setReducedMotion]=useState(false);
  const [nearViewport,setNearViewport]=useState(false);
  const [graphicsReady,setGraphicsReady]=useState(false);
  const [graphicsFailed,setGraphicsFailed]=useState(false);
  const [phoneProgress,setPhoneProgress]=useState(0);
  const finishPhone=useCallback(()=>{played.current=true;setPhoneProgress(1);},[]);
  const onReady=useCallback(()=>setGraphicsReady(true),[]);
  const onFailure=useCallback(()=>{setGraphicsFailed(true);finishPhone();},[finishPhone]);

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
      const next=naturalLayout?(innerHeight*.45-r.top)/(innerHeight*.85):-r.top/Math.max(1,el.offsetHeight-innerHeight);
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

  useEffect(()=>{
    const el=section.current;
    if(!el||!mobile||still||!nearViewport||graphicsFailed||played.current)return;
    let frame=0,timeout=0,started=false,disposed=false;
    const begin=()=>{
      if(started||disposed||played.current)return;
      started=true;
      const start=performance.now();
      const tick=(now:number)=>{
        if(disposed||played.current)return;
        const p=Math.min(1,(now-start)/1500);
        setPhoneProgress(p);
        if(p<1)frame=requestAnimationFrame(tick);else played.current=true;
      };
      frame=requestAnimationFrame(tick);
    };
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)begin();},{rootMargin:'-5% 0px -25% 0px'});
    if(graphicsReady)observer.observe(el);
    else timeout=window.setTimeout(finishPhone,1500);
    return()=>{disposed=true;cancelAnimationFrame(frame);clearTimeout(timeout);observer.disconnect();};
  },[section,mobile,still,nearViewport,graphicsReady,graphicsFailed,finishPhone]);

  const effectProgress=mobile?phoneProgress:progress;
  const t=Math.max(0,Math.min(1,(phoneProgress-.52)/.48));
  return {
    mobile,still,reducedMotion,nearViewport,graphicsReady,graphicsFailed,onReady,onFailure,finishPhone,
    effectProgress,
    cover:still||graphicsFailed?1:t*t*(3-2*t),
    reveal:reducedMotion?1:Math.max(0,Math.min(1,(effectProgress-.12)/.45)),
    light:reducedMotion?1:Math.max(0,Math.min(1,(effectProgress-.24)/.56)),
    phoneIntro:mobile&&!still&&nearViewport&&!graphicsFailed,
  };
}
