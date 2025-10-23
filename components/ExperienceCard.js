import React from 'react'
import Image from 'next/image'
import RainbowText from './RainbowText'

const ExperienceCard = (props) => {
    return (
        <div className='flex items-start mb-10'>
            <Image className='mr-8 rounded-sm' src={props.ImagePath} width={50} height={50} alt={props.ImageAlt} />
            <ul className='list-none'>
                <RainbowText className="font-bold text-xl leading-none" text={props.JobPosition} />
                <li className='font-bold text-xl'></li>
                <li className='font-bold'>{props.Company}</li>
                <li className={'text-gray-400 text-sm'}>{props.location}</li>
                <li className=''>{props.Duration} <span id="current-job"></span></li>
            </ul>
        </div>
    )
}

export default ExperienceCard