import type { CSSProperties } from "react";
import Head from "next/head";

import Navbar from "@/components/NavBar";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import { aboutStackIcons, experienceItems, heroGradientStyles, projectArchive, projectCaseStudies, projectSectionStats } from "@/data/portfolio";
import { siteMetadata } from "@/data/site";
import { useHomePageAnimations } from "@/hooks/useHomePageAnimations";
import styles from "@/styles/Home.module.css";

const gradientPurple = heroGradientStyles.purple as CSSProperties;
const gradientGreen = heroGradientStyles.green as CSSProperties;
const gradientGold = heroGradientStyles.gold as CSSProperties;

export default function Home() {
  useHomePageAnimations();

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{siteMetadata.title}</title>
          <meta name="description" content={siteMetadata.description} />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:url" content={siteMetadata.url} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={siteMetadata.title} />
          <meta property="og:description" content={siteMetadata.description} />
          <meta property="og:image" content={siteMetadata.image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="coltonmorrill.com" />
          <meta property="twitter:url" content={siteMetadata.url} />
          <meta name="twitter:title" content={siteMetadata.title} />
          <meta name="twitter:description" content={siteMetadata.description} />
          <meta name="twitter:image" content={siteMetadata.image} />
        </Head>

        <Navbar />
        <HeroSection
          gradientPurple={gradientPurple}
          gradientGreen={gradientGreen}
          gradientGold={gradientGold}
        />
        <div id="projects" className="scroll-spacer"></div>
        <ProjectsSection
          caseStudies={projectCaseStudies}
          archive={projectArchive}
          stats={projectSectionStats}
        />
        <div id="about-me" className="scroll-spacer"></div>
        <AboutSection stackIcons={aboutStackIcons} />
        <div id="experience" className="scroll-spacer"></div>
        <ExperienceSection items={experienceItems} />
        <section className="contact-zone relative isolate flex h-screen min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(2,4,10,0.74)_0%,rgba(2,4,10,0.92)_34%,#02040a_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[linear-gradient(180deg,rgba(2,4,10,0)_0%,rgba(2,4,10,0.28)_52%,rgba(2,4,10,0.72)_100%)]" />
          <ContactSection />
        </section>
      </div>
    </>
  );
}
