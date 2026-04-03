import type { CSSProperties } from "react";
import Head from "next/head";

import Navbar from "@/components/NavBar";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import FooterOrbBackdrop from "@/components/ui/footer-orb-backdrop";
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
        <div id="projects2" className="scroll-spacer"></div>
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
          <div className="pointer-events-none absolute inset-x-0 -top-40 z-0 h-56 bg-[linear-gradient(180deg,rgba(2,4,10,0)_0%,rgba(2,4,10,0.1)_20%,rgba(2,4,10,0.32)_58%,rgba(2,4,10,0.7)_100%)] blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0 bg-[linear-gradient(180deg,rgba(1,2,8,0.3)_0%,rgba(2,4,10,0.52)_14%,rgba(3,8,18,0.72)_36%,#02040a_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_30%,rgba(99,102,241,0.08),transparent_18%),radial-gradient(circle_at_78%_28%,rgba(34,211,238,0.07),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(91,104,255,0.12),transparent_24%)]" />
          <div className="contact-map-veil pointer-events-none absolute inset-0 z-[1] opacity-0 bg-[linear-gradient(180deg,rgba(2,4,10,0.12)_0%,rgba(2,4,10,0.56)_18%,rgba(2,4,10,0.82)_38%,rgba(2,4,10,0.96)_100%)]" />
          <FooterOrbBackdrop stageClassName="contact-backdrop-stage" />
          <ContactSection />
        </section>
      </div>
    </>
  );
}
