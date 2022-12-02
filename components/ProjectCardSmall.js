import React from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react';

const ProjectCardSmall = (props) => {
    var ProjectUrl = props.ProjectUrl;
    return (
        <a href={props.ProjectUrl} className='relative hover:text-blue-500 flex items-center font-bold transition rounded-2xl hover:bg-gray-900 p-3 w-full lg:w-1/3' target='_blank' rel="noreferrer">
            <Image className='mr-8 rounded-lg' src={props.ImagePath} width={50} height={50} alt={props.ImageAlt} />
            <div>
                {props.ProjectName}
                <p className='font-bold text-sm text-gray-500 flex items-center'>{props.ProjectSoftware}
                    {ProjectUrl &&
                        <ExternalLink className="ml-2" size={12} />
                    }
                </p>
            </div>
        </a>
    )
}

export default ProjectCardSmall