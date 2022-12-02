import React from 'react'
import Image from 'next/image'

const ExperienceCard = (props) => {
    return (
        <div className='flex items-center mb-10'>
            <Image className='mr-8' src={props.ImagePath} width={50} height={50} alt={props.ImageAlt} />
            <ul className='list-none'>
                <li className='font-bold text-xl'>{props.JobPosition}</li>
                <li className=''>{props.Company}</li>
                <li className=''>{props.Duration} <span id="current-job"></span></li>
            </ul>
        </div>
    )
}

export default ExperienceCard