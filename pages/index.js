import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import IsoLevelWarp from "@/components/ui/isometric-wave-grid-background";
import {
  Mail,
  ArrowDownCircle,
} from "lucide-react";
import { useEffect } from "react";
import Navbar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSmall from "../components/ProjectCardSmall";
import RainbowText from "../components/RainbowText";
import ExperienceCard from "../components/ExperienceCard";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFigma,
  faReact,
  faGithub,
  faLinkedin,
  faWordpress,
  faAws,
  faMicrosoft,
  faJira,
  faHtml5,
  faCss3,
  faJs,
} from "@fortawesome/free-brands-svg-icons";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.innerHTML = String(new Date().getFullYear());
    }

    gsap.registerPlugin(SplitText, ScrollTrigger);

    let split;
    const mm = gsap.matchMedia();

    gsap.to("#year-counter", {
      scrollTrigger: {
        trigger: "#experience",
        start: "top center",
      },
      innerText: 5,
      fontSize: "4rem",
      duration: 2,
      snap: { innerText: 1 },
    });

    function animateText() {
      gsap.from(split.chars, {
        y: -100,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
      });
    }
    
    function setup() {
      split = new SplitText(".text", { type: "chars" });
    }

    const mobileSplit = new SplitText(".mobile-text1", { type: "chars" });
    const mobileSplit2 = new SplitText(".mobile-text2", { type: "chars" });
    const mobileSplit3 = new SplitText(".mobile-text3", { type: "chars" });
    const tl = gsap.timeline();
    tl.from(mobileSplit.chars, {
        y: -100,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
      }).from(mobileSplit2.chars, {
        y: -100,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
      }).from(mobileSplit3.chars, {
        y: -100,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
      });
    mm.add("(min-width: 768px)", () => {
      setup();
      animateText();
      gsap.fromTo(
        ".si-move",
        { y: 50 },
        {
          y: -100,
          scrollTrigger: {
            trigger: ".first-row",
            start: "top center",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".apto-move",
        { y: 50 },
        {
          y: -100,
          scrollTrigger: {
            trigger: ".second-row",
            start: "top center",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".clean-move",
        { y: 50 },
        {
          y: -100,
          scrollTrigger: {
            trigger: ".third-row",
            start: "top center",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      return () => {
        split?.revert();
      };
    });

    gsap.utils.toArray(".story-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 72 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        }
      );
    });

    return () => {
      split?.revert();
      mobileSplit.revert();
      mobileSplit2.revert();
      mobileSplit3.revert();
      mm.revert();
    };
  }, []);

  // Project Image Data
  const sectionShell =
    "story-section relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24";

  const projects = [
    {
      press: [
        {
          image: "/backdrop-01.png",
          code: "press",
        },
        {
          image: "/press-1-01.png",
          code: "press",
        },
        {
          image: "/press-2-01.png",
          code: "press",
        },
        {
          image: "/press-3-01.png",
          code: "press",
        },
      ],
      sic: [
        {
          image: "/backdrop-flipped-01.png",
          code: "press",
        },
        {
          image: "/sic-1-01.png",
          code: "sic",
        },
        {
          image: "/sic-3-01.png",
          code: "sic",
        },
        {
          image: "/sic-2-01.png",
          code: "sic",
        },
      ],
      apto: [
        {
          image: "/backdrop-flipped-01.png",
          code: "press",
        },
        {
          image: "/apto-1-01.png",
          code: "apto",
        },
        {
          image: "/apto-2-01.png",
          code: "apto",
        },
      ],
      mwc: [
        {
          image: "/backdrop-01.png",
          code: "press",
        },
        {
          image: "/mwc-1-01.png",
          code: "mwc",
        },

        {
          image: "/mwc-2-01.png",
          code: "mwc",
        },

        {
          image: "/mwc-3-01.png",
          code: "mwc",
        },

        {
          image: "/mwc-4-01.png",
          code: "mwc",
        },
      ],
      vib: [
        {
          image: "/backdrop-flipped-01.png",
          code: "press",
        },
        {
          image: "/vib-1-01.png",
          code: "vibility",
        },

        {
          image: "/vib-2-01.png",
          code: "vibility",
        },

        {
          image: "/vib-3-01.png",
          code: "vibility",
        },
      ],
      clean: [
        {
          image: "/backdrop-01.png",
          code: "press",
        },
        {
          image: "/clean-1-01.png",
          code: "clean",
        },

        {
          image: "/clean-2-01.png",
          code: "clean",
        },

        {
          image: "/clean-3-01.png",
          code: "clean",
        },
      ],
      fundLaunch: [
        {
          image: "/fl/image.png",
          code: "fundlaunch",
        },
        {
          image: "/fl/Screenshot 2026-03-31 094434 1@3x.png",
          code: "fundlaunch",
        },
        {
          image: "/fl/Screenshot 2026-03-31 094522 1@3x.png",
          code: "fundlaunch",
        },
        {
          image: "/fl/Screenshot 2026-03-31 094549 1@3x.png",
          code: "fundlaunch",
        },
        {
          image: "/fl/Screenshot 2026-03-31 094620 1@3x.png",
          code: "fundlaunch",
        },
      ],
    },
  ];
  return (
    <>
      <div
        className={styles.container}
        data-scroll-container
        id="scroll-container"
      >
        <Head>
          <title>Colton Morrill | Frontend Developer</title>
          <meta
            name="description"
            content="Frontend developer and designer building polished product experiences across Next.js, React, AI-assisted workflows, mobile apps, and modern marketing sites."
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:url" content="https://www.coltonmorrill.com/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Colton Morrill | Frontend Developer"
          />
          <meta
            property="og:description"
            content="Frontend developer and designer building polished product experiences across Next.js, React, AI-assisted workflows, mobile apps, and modern marketing sites."
          />
          <meta
            property="og:image"
            content="https://www.coltonmorrill.com/colton2026.jpeg"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="coltonmorrill.com" />
          <meta
            property="twitter:url"
            content="https://www.coltonmorrill.com/"
          />
          <meta
            name="twitter:title"
            content="Colton Morrill | Frontend Developer"
          />
          <meta
            name="twitter:description"
            content="Frontend developer and designer building polished product experiences across Next.js, React, AI-assisted workflows, mobile apps, and modern marketing sites."
          />
          <meta
            name="twitter:image"
            content="https://www.coltonmorrill.com/colton2026.jpeg"
          />
        </Head>
        <Navbar />
        <div id="projects2" className="scroll-spacer"></div>
        <main className="relative mt-24 flex h-[42rem] w-full flex-col justify-center overflow-hidden bg-black sm:mb-0 lg:-mt-6 lg:h-screen">
          <IsoLevelWarp
            color="129, 140, 248"
            density={54}
            speed={0.9}
            className="bg-[#040816]"
          />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.24),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.14),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.8)_55%,rgba(1,3,10,0.96)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[2] h-40 bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(3,7,18,0.72)_52%,rgba(3,7,18,0.98)_100%)]" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-28 sm:px-10 lg:px-16">
            <div
              className="grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed="-1"
            >
              <div className="max-w-4xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80 sm:text-sm">
                Colton Morrill • Frontend Developer • Product Designer
              </p>
              <h1 className="hidden text text-[4.35rem] font-black leading-[0.94] tracking-[-0.04em] text-white sm:block lg:text-[5.35rem]">
                Senior product design
                <br />
                and frontend execution
                <br />
                for teams that care
                <br />
                about clarity and taste.
              </h1>
              <div className="space-y-2 sm:hidden">
                <h1 className="mobile-text1 text-5xl font-black leading-[0.98] text-white">
                  Senior product design
                </h1>
                <h1 className="mobile-text2 text-5xl font-black leading-[0.98] text-white">
                  and frontend execution
                </h1>
                <h1 className="mobile-text3 text-5xl font-black leading-[0.98] text-white">
                  with taste.
                </h1>
              </div>
              <div className="mt-8 max-w-3xl space-y-5">
                <p className="text-lg font-semibold leading-[1.55] text-slate-100 sm:text-xl">
                  I design and build polished interfaces, product systems, and
                  high-trust user experiences across SaaS, AI workflows,
                  mobile, and modern web platforms.
                </p>
                <p className="max-w-2xl text-base leading-7 text-slate-300">
                  The work is visual, but the value is structural: sharper
                  product communication, stronger UX, and frontend delivery
                  that holds up under real constraints.
                </p>
              </div>
              </div>
              <div className="hidden self-end rounded-[1.75rem] border border-white/10 bg-black/25 p-5 backdrop-blur-sm lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Selected Focus
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-3xl font-semibold text-white">5+</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      years shipping product UI across startups, internal tools,
                      and growth-stage teams
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-white">React</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Next.js, design systems, motion, product UX, and modern
                      frontend delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            href="#projects"
            className="group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce lg:block"
            data-scroll-to
          >
            <ArrowDownCircle className="text-slate-200 transition group-hover:text-cyan-300" />
          </a>
        </main>
        <div id="projects" className="scroll-spacer"></div>
        <div className="relative -mt-12 overflow-hidden pb-24 pt-16 sm:-mt-16 sm:pt-20 lg:-mt-20 lg:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_58%),linear-gradient(180deg,rgba(2,6,23,0.9)_0%,rgba(2,6,23,0.4)_38%,rgba(2,6,23,0)_100%)]" />
        <section className={`${sectionShell} pt-20 sm:pt-24 lg:pt-28`}>
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-violet-300/75">
                Selected Work
              </p>
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                Portfolio work shaped like modern product experiences
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                I design interfaces the way strong platforms are designed:
                clear hierarchy, measurable UX decisions, and visual systems
                that feel sharp under real product constraints.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:w-[32rem]">
              <div className="pt-4">
                <p className="text-2xl font-bold text-white">12+</p>
                <p className="mt-1 text-sm text-slate-400">Product surfaces shipped</p>
              </div>
              <div className="pt-4">
                <p className="text-2xl font-bold text-white">5+</p>
                <p className="mt-1 text-sm text-slate-400">Years improving UX</p>
              </div>
              <div className="pt-4">
                <p className="text-2xl font-bold text-white">AI + UI</p>
                <p className="mt-1 text-sm text-slate-400">Workflow-first thinking</p>
              </div>
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-8 lg:flex-row first-row">
            <ProjectCard
              UrlPath="https://profile.presssportsapp.com/media/PressSportsOfficial"
              className="bg-gradient-to-br from-cyan-900 via-sky-800 to-slate-900"
              ImagePath={projects[0].press}
              ProjectTitle="Press Sports"
              ProjectSoftware="Next.js • Figma • Sports Media"
            />
            <ProjectCard
              UrlPath="https://sicoustics.com/"
              className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950"
              anim="si-move"
              ImagePath={projects[0].sic}
              ProjectTitle="SiCoustics"
              ProjectSoftware="WordPress • Adobe CC • Marketing"
              Scroll="2"
              Spacer="ml-0"
            />
          </div>
          <div className="mb-8 flex flex-col gap-8 lg:flex-row second-row">
            <ProjectCard
              UrlPath="https://www.fundlaunch.com/"
              className="bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950"
              anim="apto-move"
              ImagePath={projects[0].fundLaunch}
              ProjectTitle="Fund Launch AI"
              ProjectSoftware="Next.js • Product Design • AI UX"
              Scroll="1"
            />
            <ProjectCard
              UrlPath="https://shop.aptogenix.com"
              className="bg-gradient-to-br from-teal-900 via-cyan-800 to-slate-950"
              anim="apto-move"
              ImagePath={projects[0].apto}
              ProjectTitle="AptoGenix"
              ProjectSoftware=".NET • Ecommerce • Design"
              Scroll="1"
            />
          </div>
          <div className="flex flex-col gap-8 lg:flex-row third-row">
            <ProjectCard
              UrlPath="#"
              className="bg-gradient-to-br from-emerald-700 via-lime-700 to-slate-950"
              ImagePath={projects[0].mwc}
              ImageAlt="Promotional Image of the My Wellness Curriculum mobile application"
              ProjectTitle="My Wellness Curriculum"
              ProjectSoftware="React Native • Mobile UX"
            />
            <ProjectCard
              className="bg-gradient-to-br from-indigo-700 via-violet-800 to-slate-950"
              UrlPath="https://vibility.com/"
              ImagePath={projects[0].vib}
              ProjectTitle="Vibility LMS"
              ProjectSoftware=".NET • Figma • LMS Platform"
              ImageAlt="Screenshot of the Vibility websites homepage"
            />
            <ProjectCard
              className="bg-gradient-to-br from-cyan-500 via-blue-700 to-slate-950"
              anim="clean-move"
              UrlPath="https://cleanrcans.com/"
              ImagePath={projects[0].clean}
              ProjectTitle="CleanRCans"
              ProjectSoftware="WordPress • Brand Site"
              Scroll="2"
              Spacer="ml-0"
            />
          </div>
        </section>

        <section className={sectionShell}>
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/75">
                More Projects
              </p>
              <h3 className="text-3xl font-black text-white sm:text-4xl">
                Additional products, platforms, and experiments
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Smaller launches, app work, and side explorations that still show
              the same focus on clarity, responsiveness, and strong visual
              systems.
            </p>
          </div>
          <div className="flex flex-col flex-wrap gap-4 lg:flex-row">
            <ProjectCardSmall
              ProjectUrl="https://my.wellnesscurriculum.com/mwc/login"
              ImagePath="/icon.png"
              ImageAlt="Icon of the Vibility Logo"
              ProjectName="Vibility Member Portal"
              ProjectSoftware="Next.js"
            />
            <ProjectCardSmall
              ImagePath="/tackicon.png"
              ImageAlt="Icon of the Tack Systems Logo"
              ProjectName="Tackify"
              ProjectSoftware=".NET"
            />
            <ProjectCardSmall
              ProjectUrl="https://play.google.com/store/apps/details?id=com.tacksystems.littlepatriots&hl=en_US&gl=US"
              ImagePath="/little-pat.png"
              ImageAlt="Icon of the Tack Systems Logo"
              ProjectName="Little Patriots"
              ProjectSoftware="Google Flutter"
            />
            <ProjectCardSmall
              ProjectUrl="https://play.google.com/store/apps/details?id=com.ctay.robal&hl=en_US&gl=US"
              ImagePath="/robal.png"
              ImageAlt="Icon of the Robal Logo"
              ProjectName="Robal"
              ProjectSoftware=".NET"
            />
            <ProjectCardSmall
              ImagePath="/docs-logo.png"
              ImageAlt="Icon of the DOCS Logo"
              ProjectName="Document Imaging System"
              ProjectSoftware="XAML"
            />
            <ProjectCardSmall
              ProjectUrl="https://vaporwave.coltonmorrill.com/"
              ImagePath="/vaporwave-01.svg"
              ImageAlt="Icon of the Vaporwave Logo"
              ProjectName="Vaporwave 3D"
              ProjectSoftware="Three.js"
            />
          </div>
        </section>
        <div id="about-me" className="scroll-spacer"></div>
        <section className={`${sectionShell} grid max-w-[90rem] grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr]`}>
          <div className="p-0">
            <Image
              className="h-[26rem] rounded-[1.5rem] object-cover"
              src="/colton2026.jpeg"
              width={600}
              height={100}
              alt="Picture of Colton Morrill posing for the camera."
            />
            <div className="mt-5 grid grid-cols-5 gap-3">
              <FontAwesomeIcon icon={faReact} className="w-6 text-gray-600" />
              <FontAwesomeIcon icon={faFigma} className="w-6 text-gray-600" />
              <FontAwesomeIcon
                icon={faWordpress}
                className="w-6 text-gray-600"
              />
              <FontAwesomeIcon icon={faHtml5} className="w-6 text-gray-600" />
              <FontAwesomeIcon icon={faCss3} className="w-6 text-gray-600" />
              <FontAwesomeIcon icon={faJs} className="w-6 text-gray-600" />
              <FontAwesomeIcon icon={faAws} className="w-6 text-gray-600" />
              <FontAwesomeIcon
                icon={faMicrosoft}
                className="w-6 text-gray-600"
              />
              <FontAwesomeIcon icon={faJira} className="w-6 text-gray-600" />
              <FontAwesomeIcon icon={faGithub} className="w-6 text-gray-600" />
            </div>
          </div>
          <div className="p-0 lg:pt-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-violet-300/75">
              About Me
            </p>
            <h3 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              UX-centered frontend work with a designer&apos;s eye
            </h3>
            <p className="mt-6 text-lg font-semibold leading-8 text-slate-100">
              Based in <RainbowText text="Salt Lake City, Utah" />
            </p>
            <p className="mt-6 text-base leading-8 text-slate-300">
              Over the last five years I have worked across cybersecurity,
              startups, ecommerce, education, and mobile products, pairing
              frontend engineering with strong visual design instincts.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-300">
              I design and build interfaces that feel intentional, fast, and
              easy to use, from marketing sites to internal tools and
              AI-assisted product workflows.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-400">
              I graduated from Brigham Young University - Idaho with a degree
              in Web Design and Development and have spent my career helping
              teams turn complex requirements into clean, shippable UI.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="pl-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Focus</p>
                <p className="mt-2 text-lg font-semibold text-white">Design systems, flows, and product clarity</p>
              </div>
              <div className="pl-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Stack</p>
                <p className="mt-2 text-lg font-semibold text-white">React, Next.js, Tailwind, mobile, AI UI</p>
              </div>
            </div>
          </div>
        </section>
        <div id="experience" className="scroll-spacer"></div>
        <section className={sectionShell}>
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/75">
                Experience
              </p>
              <h3 className="text-4xl font-black text-white sm:text-5xl">
                Product-focused experience across platforms and industries
              </h3>
            </div>
            <div className="px-5 py-4">
              <h4 className="mb-1 text-center text-5xl font-black">
                <span
                  id="year-counter"
                  className="years-experience text-left font-black text-transparent bg-clip-text bg-gradient-to-b from-violet-300 to-cyan-300"
                >
                  0
                </span>
                <span className=" text-left font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                  {"+ "}
                </span>
              </h4>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Years of professional experience</p>
            </div>
          </div>
          <div className="grid gap-4">
            <ExperienceCard
              ImagePath="/68a3688eaf7f6564e1c46cb7_Fund Launch New Logo Favicon (2).svg"
              ImageAlt="Fund Launch AI application interface"
              JobPosition="Front End Software Engineer"
              Company="Fund Launch"
              Duration="November 2025 - Present"
            />
            <ExperienceCard
              ImagePath="/phoenix.jpg"
              ImageAlt="Phoenix Cyber branding"
              JobPosition="Frontend Developer"
              Company="Phoenix Cyber"
              Duration="July 2023 - June 2025 | 2 yrs"
            />
            <ExperienceCard
              ImagePath="/icon.png"
              ImageAlt="Vibility logo"
              JobPosition="Frontend Developer"
              Company="Vibility LLC"
              Duration="November 2022 - July 2023 | 8 mo"
            />
            <ExperienceCard
              ImagePath="/tackicon.png"
              ImageAlt="Tack Systems logo"
              JobPosition="Web Designer / Frontend Developer"
              Company="Tack Systems"
              Duration="April 2021 - November 2022 | 1 yr 7 mo"
            />
            <ExperienceCard
              ImagePath="/seo-rei.jpg"
              ImageAlt="SEO for Real Estate Investors"
              JobPosition="Web Designer & SEO Support"
              Company="SEO for Real Estate Investors"
              Duration="July 2020 - March 2021 | 9 mo"
            />
          </div>
        </section>

        <section className={sectionShell} id="contact">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-violet-300/75">Contact</p>
              <h3 className="text-4xl font-black text-white sm:text-5xl">
                Building something ambitious?
              </h3>
              <p className="mt-5 text-base leading-7 text-slate-300">
                I’m interested in frontend roles and contract work where product
                quality, UX thinking, and polished implementation actually
                matter.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                className="flex items-center border-b border-white/10 px-1 py-4 font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:text-cyan-200"
                href="mailto:cjmorrill@gmail.com"
              >
                <Mail className="mr-4" /> cjmorrill@gmail.com
              </a>
              <div className="flex items-center gap-3">
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-slate-100 transition hover:border-cyan-300/30 hover:text-cyan-200"
                  href="https://www.linkedin.com/in/colton-morrill-0b0aa4187/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-4" />
                </a>
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-slate-100 transition hover:border-cyan-300/30 hover:text-cyan-200"
                  href="https://github.com/Colton-Morrill"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
