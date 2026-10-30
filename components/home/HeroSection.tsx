import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import SectionShell from "@/components/home/SectionShell";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import styles from '@/styles/HeroSection.module.css';

type HeroWord = {
  text: string;
  gradient?: "purple" | "green" | "gold";
  suffix?: string;
};

const heroTextLines: HeroWord[][] = [
  [
    { text: "Frontend" },
    { text: "Engineering", gradient: "purple" },
  ],
  [
    { text: "with" },
    { text: "Design" },
    { text: "Instinct", gradient: "green", suffix: "," },
  ],
  [
    { text: "and" },
    { text: "Code", gradient: "gold" },
    { text: "That", gradient: "gold" },
    { text: "Delivers", gradient: "gold" },
  ],
] as const;

type HeroSectionProps = {
  gradientPurple: CSSProperties;
  gradientGreen: CSSProperties;
  gradientGold: CSSProperties;
};

export default function HeroSection({
  gradientPurple,
  gradientGreen,
  gradientGold,
}: HeroSectionProps) {
  const gradientStyles = {
    purple: gradientPurple,
    green: gradientGreen,
    gold: gradientGold,
  } as const;

  return (
    <main
      id="hero"
      className="relative mb-0 flex min-h-[50rem] w-full items-center overflow-hidden sm:mt-24 lg:-mt-10 lg:min-h-screen"
    >
      <div className="hero-backdrop-blend pointer-events-none absolute inset-0" aria-hidden="true">
        <HeroGeometric className="hero-wave-layer opacity-95" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_top,rgba(91,104,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.08),transparent_20%),linear-gradient(180deg,rgba(3,7,18,0.12)_0%,rgba(3,7,18,0.38)_46%,rgba(0,0,0,0.92)_100%)]" />
        <div className="hero-fade-veil pointer-events-none absolute inset-0 z-[3] opacity-0 bg-[linear-gradient(180deg,rgba(3,7,18,0)_10%,rgba(3,7,18,0.18)_40%,rgba(0,0,0,0.76)_76%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[4] h-80 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.26)_26%,rgba(0,0,0,0.74)_62%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-10rem] z-[4] h-64 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_62%)] blur-3xl" />
      </div>
      <SectionShell className="hero-content relative z-10 flex flex-col justify-center overflow-visible pt-32 pb-32 sm:pt-44 lg:pt-44 lg:pb-28">
        <p className="hero-eyebrow text-[0.6rem] font-medium uppercase tracking-[0.28em] text-slate-500 pb-4">
          Frontend Engineer
        </p>
        <h1 className="text hidden  overflow-visible pr-12 text-[clamp(4.1rem,6.8vw,6.35rem)] font-semibold leading-[1.12] tracking-[-0.06em] sm:block lg:pr-16">
          {heroTextLines.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map((word) => (
                <span
                  key={`${lineIndex}-${word.text}`}
                  className={`hero-word inline-block ${word.gradient ? "gradient-text font-black" : ""}`}
                  style={word.gradient ? gradientStyles[word.gradient] : undefined}
                >
                  {word.text}
                  {word.suffix ?? ""}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="space-y-3 sm:hidden">
          {heroTextLines.map((line, lineIndex) => (
            <h1
              key={lineIndex}
              className={`mobile-text${lineIndex + 1} text-[2.65rem] font-semibold leading-[1.15] tracking-[-0.05em]`}
            >
              {line.map((word) => (
                <span
                  key={`${lineIndex}-${word.text}`}
                  className={`hero-word inline-block ${word.gradient ? "gradient-text font-black" : ""}`}
                  style={word.gradient ? gradientStyles[word.gradient] : undefined}
                >
                  {word.text}
                  {word.suffix ?? ""}
                </span>
              ))}
            </h1>
          ))}
        </div>
        <div className="hero-subcopy mt-12 max-w-3xl space-y-5 lg:mt-14">
          <p className="text-left text-[1.18rem] font-semibold leading-[1.48] text-slate-100 lg:text-[1.36rem]">
            I’m Colton Morrill, a <span className="soft-accent">product-minded frontend engineer</span> with{" "}
            <span className="soft-accent">6+ years of experience</span> bringing design and development together.
          </p>
          <p className="max-w-2xl text-left text-[1rem] font-medium leading-[1.72] text-slate-300 lg:text-[1.08rem]">
            I’ve built major product features, led interface redesigns, and shipped web and mobile
            experiences with React, Next.js, TypeScript, and React Native
            <br/>
            -
            <br/>
            From the first design
            decisions through release.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-3">
            <a href="#projects" className={`${styles.workLink} inline-flex min-h-11 items-center gap-2 rounded-full border border-violet-200/20 bg-violet-200/[0.07] px-5 py-2 text-sm font-medium text-slate-100 transition-colors hover:border-violet-200/40 hover:bg-violet-200/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-200 motion-reduce:transition-none`}>
              <svg className={styles.laser} aria-hidden="true" focusable="false">
                {Array.from({length:14},(_,i)=><rect key={i} rx="22" ry="22" pathLength="100" style={{'--trail-offset':(13-i)*.75,opacity:Math.pow((i+1)/14,2)*.7} as CSSProperties}/>)}
                <rect rx="22" ry="22" pathLength="100" className={styles.laserPoint}/>
              </svg>
              See my work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-200 motion-reduce:transition-none">
              Get in touch <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
