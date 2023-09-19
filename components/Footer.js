import React from 'react'
import styles from '../styles/Home.module.css'

const Footer = () => {
    return (
        <footer className={" "}>
            <div>
                <p className='text-center'>© <span id='year'></span> Colton Morrill</p>
                <br />
                <p className='text-center text-sm text-gray-500'>Built with <a className='inline-block text-blue-500 hover:text-blue-300 transition' href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a> and <a className='inline-block text-blue-500 hover:text-blue-300 transition' href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a></p>
            </div>
        </footer>
    )
}

export default Footer