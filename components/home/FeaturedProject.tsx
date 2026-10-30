import { useRef, useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowUpRight, Images, Layers3, PanelsTopLeft, Sparkles } from 'lucide-react';
import type { ProjectCaseStudy } from '@/data/portfolio';
import { useFeaturedProjectReveal } from '@/hooks/useFeaturedProjectReveal';
import styles from '@/styles/FeaturedProject.module.css';

const ProjectLogo=dynamic(()=>import('@/components/home/ProjectLogo'),{ssr:false});
const ProjectGallery=dynamic(()=>import('@/components/home/ProjectGallery'),{ssr:false});

const rgb=(hex:string)=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)).join(' ');

export default function FeaturedProject({project,index=0}:{project:ProjectCaseStudy;index?:number}) {
  const section=useRef<HTMLElement>(null);
  const [galleryOpen,setGalleryOpen]=useState(false);
  const reveal=useFeaturedProjectReveal(section);
  const identity=project.featured;
  if(!identity)return null;
  return (
    <section ref={section} id={`project-${identity.id}`} data-featured-project={identity.id} data-layout={index%2?'logo-first':'card-first'} aria-labelledby={`${identity.id}-title`} className={`${styles.story} ${reveal.still?styles.still:''}`} style={{'--brand':rgb(identity.color),'--brand-light':rgb(identity.light)} as CSSProperties}>
      <div className={styles.stage} style={{'--reveal':reveal.reveal,'--light':reveal.light} as CSSProperties}>
        <div className={styles.ambient} aria-hidden="true"/>
        <div className={styles.logo} data-project-logo aria-hidden="true">
          <Image src={`/projects/${identity.id}-mark.svg`} alt="" fill sizes="(max-width:900px) 90vw, 45vw" className={`${styles.fallback} ${reveal.graphicsReady&&!reveal.graphicsFailed?styles.fallbackHidden:''}`}/>
          {reveal.nearViewport&&!reveal.graphicsFailed?<ProjectLogo identity={identity.id} color={identity.color} progress={reveal.effectProgress} still={reveal.reducedMotion} onReady={reveal.onReady} onFailure={reveal.onFailure}/>:null}
        </div>
        <div className={styles.cardWrap}>
          <article className={styles.card}>
            <div className={styles.cardTop}><span><i/> Design & frontend development</span><span>{project.year}</span></div>
            <p className={styles.category}>{project.category}</p>
            <h3 id={`${identity.id}-title`} className={styles.title}><span>{project.title}</span></h3>
            <p className={styles.description}>{identity.outcome}</p>
            <ul className={styles.highlights} aria-label="Project highlights">
              {identity.highlights.map((highlight,i)=>{
                const Icon=[PanelsTopLeft,Layers3,Sparkles][i%3];
                return <li key={highlight}><Icon size={20} strokeWidth={1.4} aria-hidden="true"/><span>{highlight}</span></li>;
              })}
            </ul>
            <div className={styles.contribution}><h4>My contribution</h4><p>{identity.contribution}</p></div>
            <div className={styles.technology}><ul aria-label="Tools and technologies">{project.stack.map(item=><li key={item}>{item}</li>)}</ul></div>
            <div className={styles.actions}>
              <a href={project.href} target="_blank" rel="noreferrer">See {project.title.replace(' AI','')} <ArrowUpRight size={16}/></a>
              <a href={identity.preview} aria-haspopup="dialog" className={styles.secondary} onClick={event=>{event.preventDefault();setGalleryOpen(true);}}><Images size={15} aria-hidden="true"/> See the interface <span className={styles.screenCount}>{identity.screens.length} screens</span></a>
            </div>
          </article>
        </div>
      </div>
      {galleryOpen?<ProjectGallery project={project} onClose={()=>setGalleryOpen(false)}/>:null}
    </section>
  );
}
