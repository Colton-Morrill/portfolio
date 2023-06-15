import React from 'react'
import Image from 'next/image'

const ProjectCard = (props) => {
    var fileExtension = props.ImagePath.substring(props.ImagePath.lastIndexOf('.')+1, props.ImagePath.length) || props.ImagePath;
    var isVideo = null;
    if (fileExtension === "mp4") {
        isVideo = true;
    }
    else {
        isVideo = false;
    }
    return (
        <div className={`w-full lg:w-1/3 h-96 ${props.Spacer}`} data-scroll data-scroll-speed={props.Scroll}>
            <a href={props.UrlPath} target='_blank' rel="noreferrer" className='relative w-full h-full block'>
                <div className='absolute h-full w-full z-10 bg-opacity-60 hover:bg-opacity-0 transition'></div>
                {isVideo &&
                <video className='h-full w-full object-cover' muted autoPlay loop src={props.ImagePath} />
                }
                {!isVideo &&
                <Image className='object-cover' src={props.ImagePath} fill sizes='100%' alt={props.ImageAlt} />
                }
            </a>
            <p className='font-bold text-lg text-right items-center'>{props.ProjectTitle}</p>
            <p className='font-bold text-sm text-gray-500 text-right'>{props.ProjectSoftware}</p>
        </div>
    )
}

export default ProjectCard