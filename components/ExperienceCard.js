import React from 'react'
import Image from 'next/image'
import RainbowText from './RainbowText'

const ExperienceCard = (props) => {
    return (
        <div className='flex items-start gap-5 rounded-[1.5rem] bg-white/[0.02] px-4 py-5 ring-1 ring-white/6'>
            <Image className='rounded-2xl bg-slate-950/40 p-2 ring-1 ring-white/10' src={props.ImagePath} width={60} height={60} alt={props.ImageAlt} />
            <ul className='list-none'>
                <RainbowText className="text-xl font-bold leading-none" text={props.JobPosition} />
                <li className='mt-2 text-lg font-semibold text-white'>{props.Company}</li>
                {props.location ? <li className={'mt-1 text-sm text-slate-500'}>{props.location}</li> : null}
                <li className='mt-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-500'>{props.Duration} <span id="current-job"></span></li>
            </ul>
        </div>
    )
}

export default ExperienceCard
