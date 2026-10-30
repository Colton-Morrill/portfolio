import Image from 'next/image';
import { ArrowUpRight, AudioLines, PanelsTopLeft, Smartphone } from 'lucide-react';
import type { ProjectArchiveEntry, ProjectCaseStudy } from '@/data/portfolio';
import styles from '@/styles/RemainingProjects.module.css';

function Tools({items}:{items:string[]}) {
  return <ul className={styles.tools} aria-label="Tools and technologies">{items.map(item=><li key={item}>{item}</li>)}</ul>;
}

export default function RemainingProjects({projects,archive}:{projects:ProjectCaseStudy[];archive:ProjectArchiveEntry[]}) {
  const condensed:ProjectArchiveEntry[]=[...projects.map(project=>({
    title:project.title,href:project.href,category:project.category,stack:project.stack,
    icon:project.title==='My Wellness Curriculum'?'/projects/wellness-mark.svg':project.title==='SiCoustics'?'/projects/sicoustics-logo.png':undefined,
    note:project.title==='My Wellness Curriculum'?'A calmer mobile wellness experience with clearer content and simpler navigation.':project.title==='SiCoustics'?'A modern website that makes specialized acoustics services easier to understand.':project.summary,
  })),...archive];
  return <div className={styles.collection} data-remaining-projects>
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}>More work</p><h3>More builds & experiments.</h3></div>
      <span className={styles.count}>{String(projects.length+archive.length).padStart(2,'0')} more projects</span>
    </header>
      <div className={styles.rows}>
        {condensed.map(project=>{
          const Icon=project.title==='SiCoustics'?AudioLines:project.category==='Mobile health education'?Smartphone:PanelsTopLeft;
          const content=<>
            <div className={styles.icon} data-brand={project.title}>{project.icon?<Image src={project.icon} alt="" fill sizes={project.title==='SiCoustics'?'299px':'48px'} unoptimized={project.title==='SiCoustics'}/>:<Icon size={23} aria-hidden="true"/>}</div>
            <div className={styles.identity}><p className={styles.eyebrow}>{project.category}</p><h4>{project.title}</h4><p className={styles.note}>{project.note}</p></div>
            <Tools items={project.stack}/>
            {project.href?<ArrowUpRight className={styles.arrow} size={19} aria-hidden="true"/>:<span className={styles.internal}>Internal</span>}
          </>;
          return project.href?<a key={project.title} className={styles.row} href={project.href} target="_blank" rel="noreferrer" data-archive-project>{content}</a>:<article key={project.title} className={styles.row} data-archive-project>{content}</article>;
        })}
      </div>
  </div>;
}
