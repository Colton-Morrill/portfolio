import React from 'react'
import Image from 'next/image'
import RainbowText from './RainbowText'

const ProjectCard = (props) => {
    const images = props.ImagePath;
    return (
        <div className={`w-full lg:w-1/3 h-96 group ${props.Spacer}`} data-scroll data-scroll-speed={props.Scroll}>
            <a href={props.UrlPath} target='_blank' rel="noreferrer" className='w-full h-full block overflow-hidden'>
                <div className={'relative w-full h-full bg-opacity-60 hover:bg-opacity-0 transition ' + props.className}>
                    {images && images.map((image, i) => {
                        var animateRule = '';
                        var delay = '';
                        if (image.code === 'mwc') {
                            animateRule = "group-hover:-translate-y-1/3";
                            if (i === 0) {
                                delay = "delay-0";
                            }
                            else if (i === 1) {
                                delay = "delay-50";
                            }
                            else if (i === 2) {
                                delay = "delay-100";
                            }
                            else if (i === 3) {
                                delay = "delay-300";
                            }
                            else {
                                delay = "delay-500"
                            }
                        }
                        else if (image.code === 'apto') {
                            if (i === 0) {
                                animateRule = "group-hover:-translate-y-1/4";
                            }
                            else if (i === 1) {
                                animateRule = "group-hover:-translate-y-1/4";
                            }
                            else {
                                animateRule = "group-hover:-translate-y-3/4";
                            }
                        }
                        else if (image.code === 'vibility') {
                            if (i === 0) {
                                animateRule = "group-hover:-translate-y-2/3";
                            }
                            else if (i === 1) {
                                animateRule = "group-hover:-translate-y-2/3";
                            }
                            else if (i === 2) {
                                animateRule = "group-hover:-translate-y-1/4";
                            }
                            else {
                                
                                animateRule = "group-hover:-translate-y-3/4";
                            }
                        }
                        else if (image.code === 'clean') {
                            if (i === 0) {
                                animateRule = "group-hover:-translate-y-1/3";
                            }
                            else if (i === 1) {
                                animateRule = "group-hover:-translate-y-2/3";
                            }
                            else if (i === 2) {
                                animateRule = "group-hover:-translate-y-2/3";
                            }
                            else {
                                animateRule = "group-hover:-translate-y-1/3";
                            }
                        }
                        else {
                            if (i === 0) {
                                animateRule = "group-hover:-translate-y-2/3";
                            }
                            else if (i === 1) {
                                animateRule = "group-hover:-translate-y-1/3";
                            }
                            else if (i === 2) {
                                animateRule = "group-hover:-translate-x-1/3";
                            }
                            else  {
                                animateRule = "group-hover:-translate-x-2/3";
                            }
                        }
                        return (
                            <Image key={i} className={'scale-150 xl:scale-100 absolute w-full rounded transition duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' + animateRule + " " + delay} src={image.image} width={0} height={0} sizes='100%' alt={image.image} />
                        )
                    })}
                </div>
            </a>
            <p className='font-bold text-lg text-right items-center text-white group-hover:hidden'>{props.ProjectTitle}</p>
            <RainbowText className='!font-bold text-lg !text-right items-center hidden group-hover:block' text={props.ProjectTitle} />
            <p className='!font-bold text-sm text-gray-500 text-right group-hover:hidden'>{props.ProjectSoftware}</p>
            <RainbowText className='!font-bold !text-right text-sm text-gray-500 text-right hidden group-hover:block' text={props.ProjectSoftware} />
        </div>
    )
}

export default ProjectCard