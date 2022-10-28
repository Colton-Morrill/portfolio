import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Mail, ArrowDownCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Home({ Component, pageProps }) {
  useEffect(() => {

    let today = new Date()
    let past = new Date("04-01-2021")

function calcDate(date1,date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);

    var message = "";
  

    var year = 0;
    var month = 0;

    if (years === 1) {
      year = 12;
      month = months - year;
    }
    message += years + " yr " + month + " mo "

    return message
    }


    let a = calcDate(today,past)

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
    <div className={styles.container} data-scroll-container>
      <Head>
        <title>Colton Morrill | Frontend Developer</title>
        <meta name="description" content="Web Designer specializing in front end technologies (HTML, CSS, JavaScript, SASS, Flutter, .NET, React, Nextjs, and ThreeJS)." />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://www.coltonmorrill.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Colton Morrill | Frontend Developer" />
        <meta property="og:description" content="Web Designer specializing in front end technologies (HTML, CSS, JavaScript, SASS, Flutter, .NET, React, Nextjs, and ThreeJS)." />
        <meta property="og:image" content="https://www.coltonmorrill.com/colton-anna.jpeg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="coltonmorrill.com" />
        <meta property="twitter:url" content="https://www.coltonmorrill.com/" />
        <meta name="twitter:title" content="Colton Morrill | Frontend Developer" />
        <meta name="twitter:description" content="Web Designer specializing in front end technologies (HTML, CSS, JavaScript, SASS, Flutter, .NET, React, Nextjs, and ThreeJS)." />
        <meta name="twitter:image" content="https://www.coltonmorrill.com/colton-anna.jpeg" />
      </Head>

      <main className="flex justify-center items-center flex-col h-screen w-full relative">
        <h1 className='text-8xl' data-scroll data-scroll-direction='horizontal' data-scroll-speed='2'>
          I Get <span className="text-sky-500 font-bold text-left">$H!T</span> Done
        </h1>
        <div id="about" className='mt-20' data-scroll data-scroll-direction='horizontal' data-scroll-speed='-2'>
          <p className='font-semibold text-left lg:text-center text-2xl'>Hello, I am Colton Morrill, an experienced <span className='linear-wipe font-bold'>Frontend Developer</span> and <span className='linear-wipe font-bold'>Graphic Designer</span>.</p>
          <p className='font-semibold text-left lg:text-center text-2xl mt-16'>I specialize in React, Next.js, Flutter, and the .NET framework</p>
        </div>
        <ArrowDownCircle className='absolute bottom-8 lg:bottom-16 animate-bounce' />
      </main>

      <div className='flex mb-16 lg:mb-40 flex-col lg:flex-row'>
        <div className='w-full lg:w-1/3 h-96'>
          <a href="https://profile.presssportsapp.com/media/PressSportsOfficial" target='_blank' rel="noreferrer" className='relative w-full h-full block'>
            <div className='absolute bg-cyan-900 h-full w-full z-10 bg-opacity-60 hover:bg-opacity-0 transition'></div>
            <video className='h-full w-full object-cover' muted autoPlay loop src='/Press-Sports-Background.mp4' />
          </a>
          <p className='font-bold text-lg text-right items-center'>Press Sports</p>
          <p className='font-bold text-sm text-gray-500 text-right'>Next.Js</p>
        </div>

        <div className='w-full lg:w-1/3 h-96 ml-0 lg:ml-8 mt-16 lg:mt-0' data-scroll data-scroll-speed="2">
          <a href="https://sicoustics.com/" target='_blank' rel="noreferrer" className='relative w-full h-full block'>
            <div className='absolute bg-cyan-900 h-full w-full z-10 bg-opacity-60 hover:bg-opacity-0 transition'></div>
            <video className='h-full w-full object-cover' muted autoPlay loop src='/sicoustics-video.mp4' />
          </a>
          <p className='font-bold text-lg text-right'>SiCoustics</p>
          <p className='font-bold text-sm text-right text-gray-500'>Wordpress</p>
        </div>
      </div>

      <div className='flex justify-end mb-16 lg:mb-40 flex-col lg:flex-row'>
        <div className='w-full lg:w-1/3 h-96' data-scroll data-scroll-speed="1">
          <a href="https://tacksystems.com/" target='_blank' rel="noreferrer" className='relative w-full h-full block'>
            <div className='absolute bg-cyan-900 h-full w-full z-10 bg-opacity-20 hover:bg-opacity-0 transition'></div>
            <video className='h-full w-full object-cover' muted autoPlay loop src='/tack.mp4' />
          </a>
          <p className='font-bold text-lg text-right'>Tack Systems LLC</p>
          <p className='font-bold text-sm text-right text-gray-500'>.NET</p>
        </div>

        <div className='w-full lg:w-1/3 h-96 ml-0 lg:ml-8 mt-16 lg:mt-0'>
          <a href="https://play.google.com/store/apps/details?id=com.tacksystems.littlepatriots&hl=en_US&gl=US" target='_blank' rel="noreferrer" className='relative w-full h-full block'>
            <div className='absolute bg-cyan-900 h-full w-full z-10 bg-opacity-30 hover:bg-opacity-0 transition'></div>
            <Image className='object-cover' src='/loginmockup-01.svg' fill sizes='100%' alt="Promotional Image of the Little Patriots mobile application" />
          </a>
          <p className='font-bold text-lg text-right'>Little Patriots</p>
          <p className='font-bold text-sm text-right text-gray-500'>Google Flutter</p>
        </div>
      </div>

      <div className='flex mb-36 lg:mb-40 flex-col lg:flex-row'>
        <div className='w-full lg:w-1/3 h-96'>
          <a href="https://vibility.com/" target='_blank' rel="noreferrer" className='relative w-full h-full block'>
            <div className='absolute bg-cyan-900 h-full w-full z-10 bg-opacity-60 hover:bg-opacity-0 transition'></div>
            <Image className='object-cover' src='/vibility.png' fill sizes='100%' alt="Screenshot of the Vibility websites homepage" />
          </a>
          <p className='font-bold text-lg text-right'>Vibility LMS</p>
          <p className='font-bold text-sm text-right text-gray-500'>.NET</p>
        </div>

        <div className='w-full lg:w-1/3 h-96 ml-0 lg:ml-8 mt-16 lg:mt-0' data-scroll data-scroll-speed="2">
          <a href="https://www.taga1.com/" target='_blank' rel="noreferrer" className='relative w-full h-full block'>
            <div className='absolute bg-cyan-900 h-full w-full z-10 bg-opacity-60 hover:bg-opacity-0 transition'></div>
            <video className='h-full w-full object-cover' muted autoPlay loop src='/taga.mp4' />
          </a>
          <p className='font-bold text-lg text-right'>Tejas General American Agency</p>
          <p className='font-bold text-sm text-right text-gray-500'>Wordpress</p>
        </div>
      </div>

      <div className='flex justify-center items-center w-full mt-8 mb-10 lg:mb-40 flex-col lg:flex-row max-w-screen-lg mx-auto'>
        <div className='mx-10'>
          <Image className='rounded-2xl' src="/colton-anna.jpeg" width={600} height={100} alt="Picture of Colton Morrill with his wife Anna, as they pose against a rocky wooded background" />
        </div>
        <div className='m-10'>
          <p className='font-bold mb-4'>Based in in Salt Lake City, Utah</p>
          <p className='font-bold mb-4'>I am married and have one elderly cat and two guinea pigs. In my free time I like to play piano, play video games, and make digital art.</p>
          <p className='font-bold mb-2'>I graduated from Brigham Young University - Idaho with a degree in Web Design and Developement with an emphasis on Design.</p>
          <p className='mb-4 text-sm text-gray-300'>While in school I focused heavily on the fundamentals of creating applications for the web and alongside that I gained exceptional skills in graphic design. </p>
        </div>
      </div>
      <div className='mt-8 mb-20 flex flex-col items-center'>
        <h3 className='text-4xl font-bold text-center mb-20'>Experience</h3>
        <div>
          <div className='flex items-center mb-10'>
            <Image className='mr-8' src='/tackicon.png' width={50} height={50} alt='Icon of the Tack Systems Logo' />
            <ul className='list-none'>
              <li className='font-bold text-xl'>Lead Web Designer</li>
              <li className=''>Tack Systems LLC | Full Time</li>
              <li className=''>April 2021 - Present | <span id="current-job"></span></li>
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

      <div className='mt-8 mb-40 flex flex-col items-center'>
        <h3 className='text-4xl font-bold text-center mb-16'>Contact</h3>
        <a className='hover:text-blue-500 flex font-bold transition' href="mailto: cjmorrill@gmai.com"><Mail className='mr-4' /> cjmorrill@gmail.com</a>
      </div>

      <footer className={styles.footer}>
        <div>
        <p className='text-center'>© <span id='year'></span> Colton Morrill</p>
        <br />
        <p className='text-center text-sm text-gray-500'>Built with Next.js and Tailwind</p>
        </div>
      </footer>
    </div>
  )
}
