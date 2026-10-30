import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, Minimize2, X } from 'lucide-react';
import type { ProjectCaseStudy, ProjectScreen } from '@/data/portfolio';
import styles from '@/styles/ProjectGallery.module.css';

const assetPath=(path:string)=>path.split('/').map(encodeURIComponent).join('/');

function Screen({screen,thumbnail=false}:{screen:ProjectScreen;thumbnail?:boolean}) {
  if(screen.crop)return <svg viewBox={screen.crop} role="img" aria-label={thumbnail?undefined:screen.label} aria-hidden={thumbnail||undefined} className={styles.image}><image href={assetPath(screen.image)} width="1000" height="1000"/></svg>;
  return <Image src={assetPath(screen.image)} alt={thumbnail?'':screen.label} fill sizes={thumbnail?'120px':'(max-width:768px) 94vw, 1100px'} className={styles.image} priority={!thumbnail}/>;
}

export default function ProjectGallery({project,onClose}:{project:ProjectCaseStudy;onClose:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  const viewport=useRef<HTMLDivElement>(null);
  const thumbs=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState(0);
  const [detail,setDetail]=useState(false);
  const identity=project.featured!;
  const screens=identity.screens;
  const screen=screens[active];
  const select=(index:number)=>{setActive((index+screens.length)%screens.length);setDetail(false);};

  useEffect(()=>{
    const node=dialog.current;
    const previousFocus=document.activeElement as HTMLElement|null;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    node?.showModal();
    return()=>{node?.close();document.body.style.overflow=overflow;previousFocus?.focus({preventScroll:true});};
  },[]);
  useEffect(()=>{
    viewport.current?.scrollTo({top:0,left:0});
    const thumb=thumbs.current?.children[active] as HTMLElement|undefined;
    if(thumb&&thumbs.current)thumbs.current.scrollTo({left:thumb.offsetLeft-thumbs.current.clientWidth/2+thumb.clientWidth/2,behavior:'instant'});
  },[active,detail]);

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="project-gallery-title" onClose={event=>{
    // Strict Mode reopens the dialog before its cleanup's queued close event fires.
    if(!event.currentTarget.open)onClose();
  }} onClick={event=>{if(event.target===event.currentTarget)onClose();}} onKeyDown={event=>{
    if(event.altKey||event.ctrlKey||event.metaKey)return;
    if(event.key==='ArrowRight'){event.preventDefault();select(active+1);}
    if(event.key==='ArrowLeft'){event.preventDefault();select(active-1);}
  }} style={{'--gallery-brand':identity.color,'--gallery-light':identity.light} as CSSProperties}>
    <div className={styles.panel}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>Inside the project <span>/ {project.year}</span></p><h2 id="project-gallery-title">{project.title}</h2></div>
        <button type="button" className={styles.close} aria-label="Close gallery" onClick={onClose} autoFocus><X size={20}/></button>
      </header>
      <div className={styles.workspace}>
        <div className={styles.toolbar}>
          <span className={styles.workspaceLabel}><i aria-hidden="true"/>{screen.label}</span>
          <button type="button" onClick={()=>setDetail(!detail)} aria-pressed={detail} aria-label={detail?'Fit screenshot':'Enlarge screenshot'}>{detail?<Minimize2 size={14}/>:<Maximize2 size={14}/>}<span>{detail?'Fit to view':'View details'}</span></button>
        </div>
        <div ref={viewport} className={`${styles.viewport} ${detail?styles.detail:''}`} data-gallery-viewport>
          <div key={screen.image} className={styles.screen} data-gallery-screen={active}><Screen screen={screen}/></div>
        </div>
      </div>
      <div className={styles.navigation}>
        <p aria-live="polite" aria-atomic="true"><span>{String(active+1).padStart(2,'0')}</span> / {String(screens.length).padStart(2,'0')}<span className={styles.caption}>{screen.label}</span></p>
        <div className={styles.navigationActions}>
          <a href={assetPath(screen.image)} target="_blank" rel="noreferrer" aria-label="Open original screenshot"><ArrowUpRight size={17}/></a>
          <span className={styles.divider}/>
          <button type="button" aria-label="Previous screenshot" onClick={()=>select(active-1)}><ArrowLeft size={18}/></button>
          <button type="button" aria-label="Next screenshot" onClick={()=>select(active+1)}><ArrowRight size={18}/></button>
        </div>
      </div>
      <div ref={thumbs} className={styles.thumbnails} role="group" aria-label="Choose a screenshot">
        {screens.map((item,index)=><button key={item.image} type="button" aria-label={`Show ${item.label}`} aria-pressed={active===index} onClick={()=>select(index)}><span className={styles.thumbnailImage}><Screen screen={item} thumbnail/></span><span className={styles.thumbnailLabel}>{item.label}</span></button>)}
      </div>
      <footer className={styles.footer}><span>{project.category}</span><span>Design & frontend development</span></footer>
    </div>
  </dialog>;
}
