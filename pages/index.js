import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Mail, ArrowDownCircle, Linkedin, Github } from 'lucide-react';
import { useEffect } from 'react';
import Navbar from '../components/NavBar';
import ProjectCard from '../components/ProjectCard';
import ProjectCardSmall from '../components/ProjectCardSmall';
import RainbowText from '../components/RainbowText';
import ExperienceCard from '../components/ExperienceCard';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFigma, faReact, faGithub, faWordpress, faAws, faMicrosoft, faJira, faHtml5, faCss3, faJs } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  useEffect(() => {

    let today = new Date()
    let past = new Date("12-1-2022")

    function calcDate(date1, date2) {
      var diff = Math.floor(date1.getTime() - date2.getTime());
      var day = 1000 * 60 * 60 * 24;

      var days = Math.floor(diff / day);
      var months = Math.floor(days / 31);
      var years = Math.floor(months / 12);

      var message = "";

      var fullYear = 0;
      var year = 0;
      var month = 0;

      console.log(months);
    }



    // let a = calcDate(today, past)

    // document.getElementById("current-job").innerHTML = a;

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

  const projects = [
    {
      press: [
        {
          image: '/backdrop-01.png',
          code: 'press',
        },
        {
          image: '/press-1-01.png',
          code: 'press',
        },
        {
          image: '/press-2-01.png',
          code: 'press',
        },
        {
          image: '/press-3-01.png',
          code: 'press',
        },
      ],
      sic: [
        {
          image: '/backdrop-flipped-01.png',
          code: 'press',
        },
        {
          image: '/sic-1-01.png',
          code: 'sic',
        },
        {
          image: '/sic-3-01.png',
          code: 'sic',
        },
        {
          image: '/sic-2-01.png',
          code: 'sic',
        },
      ],
      apto: [
        {
          image: '/backdrop-flipped-01.png',
          code: 'press',
        },
        {
          image: '/apto-1-01.png',
          code: 'apto',
        },
        {
          image: '/apto-2-01.png',
          code: 'apto',
        },
      ],
      mwc: [
        {
          image: '/backdrop-01.png',
          code: 'press',
        },
        {
          image: '/mwc-1-01.png',
          code: 'mwc',
        },

        {
          image: '/mwc-2-01.png',
          code: 'mwc',
        },

        {
          image: '/mwc-3-01.png',
          code: 'mwc',
        },

        {
          image: '/mwc-4-01.png',
          code: 'mwc',
        },
      ],
      vib: [
        {
          image: '/backdrop-flipped-01.png',
          code: 'press',
        },
        {
          image: '/vib-1-01.png',
          code: 'vibility',
        },

        {
          image: '/vib-2-01.png',
          code: 'vibility',
        },

        {
          image: '/vib-3-01.png',
          code: 'vibility',
        },
      ],
      clean: [
        {
          image: '/backdrop-01.png',
          code: 'press',
        },
        {
          image: '/clean-1-01.png',
          code: 'clean',
        },

        {
          image: '/clean-2-01.png',
          code: 'clean',
        },

        {
          image: '/clean-3-01.png',
          code: 'clean',
        },
      ],
    },
  ]
  return (
    <>
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
            <p className='font-semibold text-left lg:text-center text-2xl'>Hello, I am Colton Morrill, an experienced <RainbowText text="Frontend Developer" /> and <RainbowText text="Graphic Designer" />.</p>
            <p className='font-semibold text-left lg:text-center text-2xl mt-16'>I specialize in React, Next.js, React Native, WordPress, and the .NET framework</p>
          </div>
          <a href="#projects" className='hidden lg:block absolute bottom-8 lg:bottom-16 animate-bounce group' data-scroll-to><ArrowDownCircle className='group-hover:text-blue-500 group-hover:transition' /></a>
        </main>
        <div id='projects' className='scroll-spacer'></div>
        <div className='flex mb-16 lg:mb-40 flex-col lg:flex-row'>
          <ProjectCard UrlPath="https://profile.presssportsapp.com/media/PressSportsOfficial" className="bg-gradient-to-r from-cyan-800 to-sky-300" ImagePath={projects[0].press} ProjectTitle="Press Sports" ProjectSoftware="Next.Js, Figma" />
          <ProjectCard UrlPath="https://sicoustics.com/" className="bg-gradient-to-r from-blue-500 to-blue-900" ImagePath={projects[0].sic} ProjectTitle="SiCoustics" ProjectSoftware="Wordpress, Adobe CC" Scroll="2" Spacer="ml-0 lg:ml-8 mt-16 lg:mt-0" />
        </div>

        <div className='flex justify-end mb-16 lg:mb-40 flex-col lg:flex-row'>
          <ProjectCard UrlPath="https://shop.aptogenix.com" className="bg-gradient-to-r from-teal-900 to-teal-200" ImagePath={projects[0].apto} ProjectTitle="AptoGenix" ProjectSoftware=".NET, Figma, Adobe CC" Scroll="1" />
          <ProjectCard UrlPath="#" className="bg-gradient-to-r from-green-300 to-lime-100" ImagePath={projects[0].mwc} ImageAlt="Promotional Image of the My Wellness Curriculum mobile application" ProjectTitle="My Wellness Curriculum" ProjectSoftware="React Native, Adobe CC" Spacer="ml-0 lg:ml-8 mt-16 lg:mt-0" />
        </div>

        <div className='flex mb-36 lg:mb-40 flex-col lg:flex-row'>
          <ProjectCard className="bg-gradient-to-r from-indigo-600 to-violet-800" UrlPath="https://vibility.com/" ImagePath={projects[0].vib} ProjectTitle="Vibility LMS" ProjectSoftware=".NET, Figma, Adobe CC" ImageAlt="Screenshot of the Vibility websites homepage" />
          <ProjectCard className="bg-gradient-to-r from-cyan-200 to-blue-500" UrlPath="https://cleanrcans.com/" ImagePath={projects[0].clean} ProjectTitle="CleanRCans" ProjectSoftware="Wordpress, Adobe CC" Scroll="2" Spacer="ml-0 lg:ml-8 mt-16 lg:mt-0" />
        </div>

        <div className='mt-8 mb-40 flex flex-col items-center'>
          <h3 className='text-4xl font-bold text-center mb-16'>More Projects</h3>
          <div className='flex flex-col flex-wrap lg:flex-row justify-start lg:justify-center items-start lg:items-center ml-0 lg:ml-36'>
            <ProjectCardSmall ProjectUrl="https://my.wellnesscurriculum.com/mwc/login" ImagePath="/icon.png" ImageAlt="Icon of the Vibility Logo" ProjectName="Vibility Member Portal" ProjectSoftware="Next.js" />
            <ProjectCardSmall ImagePath="/tackicon.png" ImageAlt="Icon of the Tack Systems Logo" ProjectName="Tackify" ProjectSoftware=".NET" />
            <ProjectCardSmall ProjectUrl="https://play.google.com/store/apps/details?id=com.tacksystems.littlepatriots&hl=en_US&gl=US" ImagePath="/little-pat.png" ImageAlt="Icon of the Tack Systems Logo" ProjectName="Little Patriots" ProjectSoftware="Google Flutter" />
            <ProjectCardSmall ProjectUrl="https://play.google.com/store/apps/details?id=com.ctay.robal&hl=en_US&gl=US" ImagePath="/robal.png" ImageAlt="Icon of the Robal Logo" ProjectName="Robal" ProjectSoftware=".NET" />
            <ProjectCardSmall ImagePath="/docs-logo.png" ImageAlt="Icon of the DOCS Logo" ProjectName="Document Imaging System" ProjectSoftware="XAML" />
            <ProjectCardSmall ProjectUrl="https://vaporwave.coltonmorrill.com/" ImagePath="/vaporwave-01.svg" ImageAlt="Icon of the Vaporwave Logo" ProjectName="Vaporwave 3D" ProjectSoftware="Three.js" />
          </div>
        </div>
        <div id='about-me' className='scroll-spacer'></div>
        <div className='flex justify-center items-center w-full mt-8 mb-10 lg:mb-40 flex-col lg:flex-row max-w-screen-lg mx-auto'>
          <div className='mx-10'>
            <Image className='rounded-2xl h-80 object-cover' src="/headshot2023.jpg" width={600} height={100} alt="Picture of Colton Morrill posing for the camera." />
            <div className='flex flex-row justify-between items-center py-3'>
              <FontAwesomeIcon icon={faReact} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faFigma} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faWordpress} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faHtml5} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faCss3} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faJs} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faAws} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faMicrosoft} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faJira} className='w-6 text-gray-600' />
              <FontAwesomeIcon icon={faGithub} className='w-6 text-gray-600' />
            </div>
          </div>
          <div className='m-10'>
            <p className='font-bold mb-4'>Based in <RainbowText text="Salt Lake City, Utah" /></p>
            <p className='font-bold mb-4'>I am married and have one cat and two guinea pigs. In my free time I like to play piano, play video games, and make digital art.</p>
            <p className='font-bold mb-2'>I graduated from Brigham Young University - Idaho with a degree in <RainbowText text="Web Design and Development with an emphasis on Design" />.</p>
            <p className='mb-4 text-sm text-gray-300'>While in school I focused heavily on the fundamentals of creating applications for the web alongside gaining exceptional skills in graphic design. </p>
          </div>
        </div>
        <div id='experience' className='scroll-spacer'></div>
        <div className='mt-8 mb-20 flex flex-col items-center'>
          <h3 className='text-4xl font-bold text-center mb-20'>Experience</h3>
          <div>
            <ExperienceCard ImagePath="/phoenix.jpg" ImageAlt="Icon of the Vibility Logo" JobPosition="Frontend Developer" Company="Phoenix Cyber | Full Time" Duration="July 2023 - Present" />
            <ExperienceCard ImagePath="/icon.png" ImageAlt="Icon of the Vibility Logo" JobPosition="Frontend Developer" Company="Vibility | Full Time" Duration="November 2022 - July 2023 | 8 mo" />
            <ExperienceCard ImagePath="/tackicon.png" ImageAlt="Icon of the Tack Systems Logo" JobPosition="Lead Web Designer" Company="Tack Systems LLC | Full Time" Duration="April 2021 - November 2022 | 1 yr 7 mo" />
            <ExperienceCard ImagePath="/seo-rei.jpg" ImageAlt="CEO of SEO4REI" JobPosition="Director of Web/UI/UX Design & SEO Support" Company="SEO For Real Estate Investors | Full Time" Duration="June 2020 - April 2021 | 10 mo" />
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
        <Footer />
      </div>
    </>
  )
}
