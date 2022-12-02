import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Mail, ArrowDownCircle, ExternalLink, Linkedin, Github } from 'lucide-react';
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import ProjectCard from '../components/ProjectCard';

export default function Home({ Component, pageProps }) {
  useEffect(() => {

    let today = new Date()
    let past = new Date("11-30-2022")

    function calcDate(date1, date2) {
      var diff = Math.floor(date1.getTime() - date2.getTime());
      var day = 1000 * 60 * 60 * 24;

      var days = Math.floor(diff / day);
      var months = Math.floor(days / 31);
      var years = Math.floor(months / 12);

      var message = "";


      var year = 0;
      var month = 0;

      if (years === 1) {
        year = 12;
        month = months - year;
      }
      message += month + " mo "

      return message
    }


    let a = calcDate(today, past)

    document.getElementById("current-job").innerHTML = a;

    document.getElementById("year").innerHTML = new Date().getFullYear();
    let scroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        smoothMobile: false,
        resetNativeScroll: true,
        reloadOnContextChange: true,
        smartphone: {
          smooth: false,
        },
        tablet: {
          smooth: true,
        }
      });
    });

    // `useEffect`'s cleanup phase
    return () => {
      if (scroll) scroll.destroy();
    }
  });
  return (
    <div className={styles.container} data-scroll-container id='scroll-container'>
      <Head>
        <title>Colton Morrill | Frontend Developer</title>
        <meta name="description" content="Frontend Developer specializing in front end technologies (HTML, CSS, JavaScript, SASS, Flutter, .NET, React, Nextjs, and ThreeJS)." />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://www.coltonmorrill.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Colton Morrill | Frontend Developer" />
        <meta property="og:description" content="Frontend Developer specializing in front end technologies (HTML, CSS, JavaScript, SASS, Flutter, .NET, React, Nextjs, and ThreeJS)." />
        <meta property="og:image" content="https://www.coltonmorrill.com/colton-anna.jpeg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="coltonmorrill.com" />
        <meta property="twitter:url" content="https://www.coltonmorrill.com/" />
        <meta name="twitter:title" content="Colton Morrill | Frontend Developer" />
        <meta name="twitter:description" content="Frontend Developer specializing in front end technologies (HTML, CSS, JavaScript, SASS, Flutter, .NET, React, Nextjs, and ThreeJS)." />
        <meta name="twitter:image" content="https://www.coltonmorrill.com/colton-anna.jpeg" />
      </Head>
      <Navbar />
      <div id='projects2' className='scroll-spacer'></div>
      <main className="flex justify-center items-center flex-col h-screen w-full relative mt-40 lg:-mt-16 mb-52 lg:mb-0">
        <h1 className='text-8xl font-bold lg:-mr-8' data-scroll data-scroll-direction='horizontal' data-scroll-speed='2'>
          I <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 font-black text-left">Design</span>, I<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-600 font-black text-left"> Code</span>, I Get It <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 font-black text-left">Done</span>
        </h1>
        <div className='mt-20' data-scroll data-scroll-direction='horizontal' data-scroll-speed='-2'>
          <p className='font-semibold text-left lg:text-center text-2xl'>Hello, I am Colton Morrill, an experienced <span className='linear-wipe font-bold'>Frontend Developer</span> and <span className='linear-wipe font-bold'>Graphic Designer</span>.</p>
          <p className='font-semibold text-left lg:text-center text-2xl mt-16'>I specialize in React, Next.js, Flutter, and the .NET framework</p>
        </div>
        <a href="#projects" className='hidden lg:block absolute bottom-8 lg:bottom-16 animate-bounce group' data-scroll-to><ArrowDownCircle className='group-hover:text-blue-500 group-hover:transition' /></a>
      </main>
      <div id='projects' className='scroll-spacer'></div>
      <div className='flex mb-16 lg:mb-40 flex-col lg:flex-row'>
        <ProjectCard UrlPath="https://profile.presssportsapp.com/media/PressSportsOfficial" ImagePath="/Press-Sports-Background.mp4" ProjectTitle="Press Sports" ProjectSoftware="Next.Js" />
        <ProjectCard UrlPath="https://sicoustics.com/" ImagePath="/sicoustics-video.mp4" ProjectTitle="SiCoustics" ProjectSoftware="Wordpress" Scroll="2" Spacer="ml-0 lg:ml-8 mt-16 lg:mt-0" />
      </div>

      <div className='flex justify-end mb-16 lg:mb-40 flex-col lg:flex-row'>
        <ProjectCard UrlPath="https://tacksystems.com/" ImagePath="/tack-updated.mp4" ProjectTitle="Tack Systems LLC" ProjectSoftware=".NET" Scroll="1" />
        <ProjectCard UrlPath="https://play.google.com/store/apps/details?id=com.tacksystems.littlepatriots&hl=en_US&gl=US" ImagePath="/loginmockup-01.svg" ImageAlt="Promotional Image of the Little Patriots mobile application" ProjectTitle="Little Patriots" ProjectSoftware="Google Flutter" Spacer="ml-0 lg:ml-8 mt-16 lg:mt-0" />
      </div>

      <div className='flex mb-36 lg:mb-40 flex-col lg:flex-row'>
        <ProjectCard UrlPath="https://vibility.com/" ImagePath="/vibility.png" ProjectTitle="Vibility LMS" ProjectSoftware=".NET" ImageAlt="Screenshot of the Vibility websites homepage" />
        <ProjectCard UrlPath="https://cleanrcans.com/" ImagePath="/cleanrcans.mp4" ProjectTitle="CleanRCans" ProjectSoftware="Wordpress" Scroll="2" Spacer="ml-0 lg:ml-8 mt-16 lg:mt-0" />
      </div>

      <div className='mt-8 mb-40 flex flex-col items-center'>
        <h3 className='text-4xl font-bold text-center mb-16'>More Projects</h3>
        <div className='flex flex-col flex-wrap lg:flex-row justify-start lg:justify-center items-start lg:items-center ml-0 lg:ml-36'>
          <div className='flex items-center font-bold transition rounded-2xl p-3 w-full lg:w-1/3' >
            <Image className='mr-8' src='/tackicon.png' width={50} height={50} alt='Icon of the Tack Systems Logo' />
            <div>
              Tackify
              <p className='font-bold text-sm text-gray-500'>.NET</p>
            </div>
          </div>
          <div className='flex items-center font-bold transition rounded-2xl p-3 w-full lg:w-1/3'>
            <Image className='mr-8' src='/tackicon.png' width={50} height={50} alt='Icon of the Tack Systems Logo' />
            <div>
              TackUI
              <p className='font-bold text-sm text-gray-500'>.NET/SCSS</p>
            </div>
          </div>
          <a className='relative hover:text-blue-500 flex items-center font-bold transition rounded-2xl hover:bg-gray-900 p-3 w-full lg:w-1/3' href="https://provider.tacksys.com/provider-match.aspx" target='_blank' rel="noreferrer">
            <Image className='mr-8' src='/advisor-white.png' width={50} height={50} alt='Icon of the Vibility Logo' />
            <div>
              Vibility Advisor
              <p className='font-bold text-sm text-gray-500 flex items-center'>.NET/SCSS <ExternalLink className="ml-2" size={12} /></p>
            </div>
          </a>
          <a className='hover:text-blue-500 flex items-center font-bold transition rounded-2xl hover:bg-gray-900 p-3 w-full lg:w-1/3' href="https://play.google.com/store/apps/details?id=com.ctay.robal&hl=en_US&gl=US" target='_blank' rel="noreferrer">
            <Image className='mr-8 object-fit' src='/robal.png' width={50} height={50} alt='Icon of the Robal Logo' />
            <div>
              Robal
              <p className='font-bold text-sm text-gray-500 flex items-center'>.NET <ExternalLink className="ml-2" size={12} /></p>
            </div>
          </a>
          <div className='flex items-center font-bold transition rounded-2xl p-3 w-full lg:w-1/3'>
            <Image className='mr-8' src='/docs-logo.png' width={50} height={50} alt='Icon of the DOCS Logo' />
            <div>
              Document Imaging System
              <p className='font-bold text-sm text-gray-500'>XAML</p>
            </div>
          </div>
          <a className='hover:text-blue-500 flex items-center font-bold transition rounded-2xl hover:bg-gray-900 p-3 w-full lg:w-1/3' href="https://vaporwave.coltonmorrill.com/" target='_blank' rel="noreferrer">
            <Image className='mr-8 rounded-lg' src='/vaporwave-01.svg' width={50} height={50} alt='Icon of the Vaporwave Demo Logo' />
            <div>
              Vaporwave 3D Demo
              <p className='font-bold text-sm text-gray-500 flex items-center'>Threejs <ExternalLink className="ml-2" size={12} /></p>
            </div>
          </a>
        </div>
      </div>
      <div id='about-me' className='scroll-spacer'></div>
      <div className='flex justify-center items-center w-full mt-8 mb-10 lg:mb-40 flex-col lg:flex-row max-w-screen-lg mx-auto'>
        <div className='mx-10'>
          <Image className='rounded-2xl' src="/colton-anna.jpeg" width={600} height={100} alt="Picture of Colton Morrill with his wife Anna, as they pose against a rocky wooded background" />
        </div>
        <div className='m-10'>
          <p className='font-bold mb-4'>Based in <span className='linear-wipe font-bold'>Salt Lake City, Utah</span></p>
          <p className='font-bold mb-4'>I am married and have one cat and one guinea pig. In my free time I like to play piano, play video games, and make digital art.</p>
          <p className='font-bold mb-2'>I graduated from Brigham Young University - Idaho with a degree in <span className='linear-wipe font-bold'>Web Design and Developement with an emphasis on Design</span>.</p>
          <p className='mb-4 text-sm text-gray-300'>While in school I focused heavily on the fundamentals of creating applications for the web alongside gaining exceptional skills in graphic design. </p>
        </div>
      </div>
      <div id='experience' className='scroll-spacer'></div>
      <div className='mt-8 mb-20 flex flex-col items-center'>
        <h3 className='text-4xl font-bold text-center mb-20'>Experience</h3>
        <div>
          <div className='flex items-center mb-10'>
            <Image className='mr-8' src='/vibility-icon.png' width={50} height={50} alt='Icon of the Vibility Logo' />
            <ul className='list-none'>
              <li className='font-bold text-xl'>Frontend Developer</li>
              <li className=''>Vibility | Full Time</li>
              <li className=''>December 2022 - Present | <span id="current-job"></span></li>
            </ul>
          </div>
          <div className='flex items-center mb-10'>
            <Image className='mr-8' src='/tackicon.png' width={50} height={50} alt='Icon of the Tack Systems Logo' />
            <ul className='list-none'>
              <li className='font-bold text-xl'>Lead Web Designer</li>
              <li className=''>Tack Systems LLC | Full Time</li>
              <li className=''>April 2021 - November 2022 | 1 yr 7 mo</li>
            </ul>
          </div>
          <div className='flex items-center mb-10'>
            <Image className='mr-8 rounded' src='/seo-rei.jpg' width={50} height={50} alt='CEO of SEO4REI' />
            <ul className='list-none'>
              <li className='font-bold text-xl'>Director of Web/UI/UX Design</li>
              <li className=''>SEO For Real Estate Investors | Full Time</li>
              <li className=''>November 2020 - April 2021 | 5 mo</li>
            </ul>
          </div>
          <div className='flex items-center mb-10'>
            <Image className='mr-8 rounded' src='/seo-rei.jpg' width={50} height={50} alt='CEO of SEO4REI' />
            <ul className='list-none'>
              <li className='font-bold text-xl'>Web Designer and SEO Support</li>
              <li className=''>SEO For Real Estate Investors | Full Time</li>
              <li className=''>June 2020 - November 2021 | 5 mo</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='mt-8 mb-40 flex flex-col items-center' id="contact">
        <h3 className='text-4xl font-bold text-center mb-16'>Contact</h3>
        <a className='hover:text-blue-500 flex font-bold transition' href="mailto: cjmorrill@gmai.com"><Mail className='mr-4' /> cjmorrill@gmail.com</a>
        <div className='flex items-center justify-center mt-6'>
          <a className='hover:text-blue-500 flex font-bold transition' href="https://www.linkedin.com/in/colton-morrill-0b0aa4187/" target='_blank' rel="noreferrer"><Linkedin className='mx-1' /></a>
          <a className='hover:text-blue-500 flex font-bold transition' href="https://github.com/Colton-Morrill" target='_blank' rel="noreferrer"><Github className='mx-1' /></a>
        </div>
      </div>

      <footer className={styles.footer}>
        <div>
          <p className='text-center'>© <span id='year'></span> Colton Morrill</p>
          <br />
          <p className='text-center text-sm text-gray-500'>Built with <a className='inline-block text-blue-500 hover:text-blue-300 transition' href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a> and <a className='inline-block text-blue-500 hover:text-blue-300 transition' href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a></p>
        </div>
      </footer>
    </div>
  )
}
