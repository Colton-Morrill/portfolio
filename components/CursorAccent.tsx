import { useEffect, useRef } from 'react';
import styles from '@/styles/CursorAccent.module.css';

/** Decorative only: the operating-system pointer remains the interaction target. */
export default function CursorAccent() {
  const accent=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const node=accent.current;
    if(!node)return;
    const enabled=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference) and (forced-colors:none)');
    let frame=0,x=0,y=0,pressed=false;
    const particles=Array.from(node.children) as HTMLElement[];
    const animations=new Map<HTMLElement,Animation>();
    let previous:{x:number;y:number}|null=null,index=0,lastEmission=0;
    const hide=()=>{
      cancelAnimationFrame(frame);frame=0;
      node.dataset.visible='false';
      animations.forEach(animation=>animation.cancel());animations.clear();
      previous=null;lastEmission=0;
    };
    const move=(event:PointerEvent)=>{
      if(!enabled.matches||event.pointerType!=='mouse'||pressed){hide();return;}
      const target=event.target instanceof Element?event.target:null;
      if(!target){hide();return;}
      // Logo stages ignore pointer events, so check their bounds explicitly.
      const logo=target.closest('[data-featured-project]')?.querySelector('[data-project-logo]');
      const bounds=logo?.getBoundingClientRect();
      const overLogo=!!bounds&&event.clientX>=bounds.left&&event.clientX<=bounds.right&&event.clientY>=bounds.top&&event.clientY<=bounds.bottom;
      if((!target.closest('#hero')&&!overLogo)||target.closest('a,button,nav,[role="button"]')){hide();return;}
      const cursor=getComputedStyle(target).cursor;
      // Leave text editing, selection, disabled controls, and special cursors alone.
      if(target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),iframe,[disabled],[aria-disabled="true"]')||
        !['auto','default','pointer'].includes(cursor)||
        (!target.closest('a,button,[role="button"]')&&target.closest('p,h1,h2,h3,h4,h5,h6,li,pre,code,label'))){hide();return;}
      x=event.clientX;y=event.clientY;
      if(!frame)frame=requestAnimationFrame(()=>{
        frame=0;
        const now=performance.now();
        const origin=previous??{x,y};
        const distance=Math.hypot(x-origin.x,y-origin.y);
        if(previous&&(distance<18||now-lastEmission<65))return;
        // A bounded, reusable pool: no DOM allocation or continuous animation loop.
        const count=Math.min(2,Math.max(1,Math.floor(distance/24)));
        for(let i=0;i<count;i++){
          const particle=particles[index%particles.length];
          const seed=index++;
          const t=(i+1)/count;
          const px=origin.x+(x-origin.x)*t,py=origin.y+(y-origin.y)*t;
          const scatterX=Math.sin(seed*2.4)*4,scatterY=Math.cos(seed*1.7)*4;
          const driftX=scatterX,driftY=-4-(seed%3)*2;
          const start=`translate3d(${px+scatterX}px,${py+scatterY}px,0)`;
          animations.get(particle)?.cancel();
          const animation=particle.animate([
            {transform:`${start} scale(.7)`,opacity:.42},
            {transform:`translate3d(${px+scatterX+driftX}px,${py+scatterY+driftY}px,0) scale(.15)`,opacity:0},
          ],{duration:320+(seed%4)*35,easing:'ease-out'});
          animations.set(particle,animation);
          animation.onfinish=()=>{if(animations.get(particle)===animation)animations.delete(particle);};
        }
        previous={x,y};lastEmission=now;
        node.dataset.visible='true';
      });
    };
    const down=()=>{pressed=true;hide();};
    const up=()=>{pressed=false;};
    const leave=()=>{pressed=false;hide();};
    const key=(event:KeyboardEvent)=>{if(!['Shift','Control','Alt','Meta'].includes(event.key))hide();};
    const visibility=()=>{if(document.hidden)leave();};
    window.addEventListener('pointermove',move,{passive:true});
    window.addEventListener('pointerdown',down,{passive:true});
    window.addEventListener('pointerup',up,{passive:true});
    window.addEventListener('pointercancel',leave);
    window.addEventListener('blur',leave);
    window.addEventListener('keydown',key);
    window.addEventListener('scroll',hide,{passive:true,capture:true});
    document.documentElement.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',visibility);
    enabled.addEventListener('change',hide);
    return()=>{
      hide();
      window.removeEventListener('pointermove',move);
      window.removeEventListener('pointerdown',down);
      window.removeEventListener('pointerup',up);
      window.removeEventListener('pointercancel',leave);
      window.removeEventListener('blur',leave);
      window.removeEventListener('keydown',key);
      window.removeEventListener('scroll',hide,true);
      document.documentElement.removeEventListener('pointerleave',leave);
      document.removeEventListener('visibilitychange',visibility);
      enabled.removeEventListener('change',hide);
    };
  },[]);
  return <div ref={accent} className={styles.accent} aria-hidden="true" data-visible="false">{Array.from({length:12},(_,i)=><span key={i}/>)}</div>;
}
