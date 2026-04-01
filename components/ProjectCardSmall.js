import React from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react';

const ProjectCardSmall = (props) => {
    const ProjectUrl = props.ProjectUrl;

    return (
        <a href={props.ProjectUrl} className='relative flex w-full items-center gap-5 rounded-[1.5rem] bg-white/[0.02] px-4 py-5 font-bold text-slate-100 ring-1 ring-white/6 transition duration-300 hover:translate-x-1 lg:w-[calc(33.333%-1rem)]' target='_blank' rel="noreferrer">
            <Image className='rounded-2xl bg-slate-950/40 p-2 ring-1 ring-white/10' src={props.ImagePath} width={58} height={58} alt={props.ImageAlt} />
            <div className='min-w-0'>
                <p className='truncate text-base'>{props.ProjectName}</p>
                <p className='mt-1 flex items-center text-sm font-medium text-slate-500'>{props.ProjectSoftware}
                    {ProjectUrl &&
                        <ExternalLink className="ml-2 shrink-0" size={12} />
                    }
                </p>
            </div>
        </a>
    )
}

export default ProjectCardSmall
