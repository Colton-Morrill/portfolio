import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import RainbowText from './RainbowText'

const ProjectCard = (props) => {
    const images = props.ImagePath;

    return (
        <div className={`group h-[28rem] w-full lg:w-1/3 ${props.Spacer} ${props.anim}`} data-scroll data-scroll-speed={props.Scroll}>
            <a href={props.UrlPath} target='_blank' rel="noreferrer" className='block h-full w-full overflow-hidden transition duration-500 hover:-translate-y-1'>
                <div className='flex h-full flex-col'>
                    <div className='mb-5 flex items-start justify-between gap-4 px-1'>
                        <div>
                            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-slate-500'>{props.ProjectSoftware}</p>
                            <p className='mt-3 text-2xl font-bold text-white'>{props.ProjectTitle}</p>
                        </div>
                        <span className='flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 transition group-hover:border-cyan-300/40 group-hover:text-cyan-300'>
                            <ArrowUpRight size={18} />
                        </span>
                    </div>
                    <div className={'relative h-full overflow-hidden rounded-[1.75rem] bg-slate-950/40 ring-1 ring-white/8 transition ' + props.className}>
                        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(15,23,42,0.14))]' />
                        {images && images.map((image, i) => {
                            let animateRule = '';
                            let delay = '';

                            if (image.code === 'mwc') {
                                animateRule = "group-hover:-translate-y-1/3";
                                if (i === 0) delay = "delay-0";
                                else if (i === 1) delay = "delay-50";
                                else if (i === 2) delay = "delay-100";
                                else if (i === 3) delay = "delay-300";
                                else delay = "delay-500";
                            } else if (image.code === 'apto') {
                                if (i === 0 || i === 1) animateRule = "group-hover:-translate-y-1/4";
                                else animateRule = "group-hover:-translate-y-3/4";
                            } else if (image.code === 'vibility') {
                                if (i === 0) animateRule = "group-hover:-translate-y-2/3";
                                else if (i === 1) animateRule = "group-hover:-translate-y-1/3";
                                else if (i === 2) animateRule = "group-hover:-translate-y-3/4";
                                else animateRule = "group-hover:-translate-y-1/4";
                            } else if (image.code === 'clean') {
                                if (i === 0) animateRule = "group-hover:-translate-y-1/3";
                                else if (i === 1 || i === 2) animateRule = "group-hover:-translate-y-2/3";
                                else animateRule = "group-hover:-translate-y-1/3";
                            } else {
                                if (i === 0) animateRule = "group-hover:-translate-y-2/3";
                                else if (i === 1) animateRule = "group-hover:-translate-y-1/3";
                                else if (i === 2) animateRule = "group-hover:-translate-x-1/3";
                                else animateRule = "group-hover:-translate-x-2/3";
                            }

                            return (
                                <Image key={i} className={'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-[1.2rem] transition duration-500 scale-[1.35] xl:scale-100 ' + animateRule + " " + delay} src={image.image} width={0} height={0} sizes='100%' alt={image.image} />
                            )
                        })}
                    </div>
                </div>
            </a>
            <div className='mt-4 flex items-center justify-between px-1 pt-2'>
                <p className='text-sm font-medium text-slate-500'>Selected case study</p>
                <RainbowText className='!text-sm !font-semibold' text='Open project' />
            </div>
        </div>
    )
}

export default ProjectCard
