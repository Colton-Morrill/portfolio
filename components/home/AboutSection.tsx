import type { CSSProperties } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

import SectionShell from "@/components/home/SectionShell";

type AboutSectionProps = {
  stackIcons: IconDefinition[];
};

const ghostTextStyle = {
  WebkitTextStroke: "1px rgba(255,255,255,0.16)",
  color: "transparent",
} as CSSProperties;

export default function AboutSection({ stackIcons }: AboutSectionProps) {
  return (
    <section className="section-reveal relative overflow-hidden py-16 lg:py-22">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.1),transparent_18%),radial-gradient(circle_at_76%_22%,rgba(99,102,241,0.12),transparent_22%),linear-gradient(180deg,rgba(3,7,18,0.22)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0.24)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="about-marquee relative mb-8 w-screen overflow-hidden border-y border-white/10 bg-white/[0.03] py-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:mb-12 lg:py-6">
        <div className="about-marquee-track flex w-max items-center whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-8 pr-8 lg:gap-12 lg:pr-12">
              {[
                "REACT",
                "NEXT.JS",
                "TYPESCRIPT",
                "DESIGN SYSTEMS",
                "PRODUCT UI",
                "MOTION",
                "AI WORKFLOWS",
              ].map((item) => (
                <div key={`${groupIndex}-${item}`} className="flex items-center gap-8 lg:gap-12">
                  <span className="text-[clamp(3rem,8vw,6.9rem)] font-semibold leading-none tracking-[-0.08em] text-[#f5efff]">
                    {item}
                  </span>
                  <span className="text-[clamp(1.8rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.08em] text-[#99a4d6]">
                    {"//"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <SectionShell className="relative">
        <p className="section-kicker mb-6 text-[0.76rem] font-semibold uppercase tracking-[0.38em] text-[#99a4d6]">
          About Me
        </p>

        <div className="relative min-h-[38rem] lg:min-h-[46rem]">
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden lg:block">
            <div
              className="text-[8.5rem] font-black uppercase leading-[0.82] tracking-[-0.09em]"
              style={ghostTextStyle}
            >
              ABOUT
            </div>
            <div
              className="ml-[14%] text-[8.5rem] font-black uppercase leading-[0.82] tracking-[-0.09em]"
              style={ghostTextStyle}
            >
              COLTON
            </div>
            <div
              className="text-[8.5rem] font-black uppercase leading-[0.82] tracking-[-0.09em]"
              style={ghostTextStyle}
            >
              MORRILL
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
            <div className="section-media relative z-[2] pt-4 lg:pt-20">
              <div className="pointer-events-none absolute left-[8%] top-[14%] h-28 w-28 rounded-full bg-cyan-400/18 blur-3xl lg:h-40 lg:w-40" />
              <div className="pointer-events-none absolute bottom-[18%] left-[22%] h-36 w-36 rounded-full bg-indigo-500/16 blur-3xl lg:h-48 lg:w-48" />
              <div className="relative mx-auto max-w-[24rem] lg:mx-0 lg:max-w-[31rem]">
                <Image
                  src="/colton-cuttout.png"
                  width={900}
                  height={1200}
                  alt="Cutout portrait of Colton Morrill"
                  className="relative z-[3] h-auto w-full object-contain drop-shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
                  sizes="(min-width: 1024px) 40vw, 88vw"
                />
              </div>
            </div>

            <div className="relative z-[3] lg:pt-24">
              <div className="max-w-2xl">
                <h2 className="section-title chrome-text max-w-xl text-[clamp(2.3rem,5vw,4.3rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
                  Product-minded frontend with stronger taste.
                </h2>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {stackIcons.map((icon, index) => (
                  <div
                    key={`${icon.iconName}-${index}`}
                    className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.04] text-[#eef1fb]"
                  >
                    <FontAwesomeIcon icon={icon} className="w-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div className="space-y-4">
                <p className="section-copy text-[1rem] leading-7 text-[#ece7f8]">
                  Based in <span className="about-accent">Salt Lake City, Utah</span>, I build product experiences that need
                  <span className="about-accent"> strong implementation</span>,
                  <span className="about-accent"> strong visual instincts</span>, and someone who can
                  <span className="about-accent"> make good product calls</span>.
                </p>
                <p className="section-copy text-[1rem] leading-7 text-[#b8bfd3]">
                  I currently work as a <span className="about-accent">Front End Software Engineer</span> owning
                  <span className="about-accent"> React and Next.js product experiences</span>,
                  <span className="about-accent"> real-time workflows with Convex</span>, and
                  <span className="about-accent"> AI-driven features with LangGraph</span>.
                </p>
                <p className="section-copy text-[1rem] leading-7 text-[#b8bfd3]">
                  My focus is <span className="about-accent">high-performance UI</span>,
                  <span className="about-accent"> stronger hierarchy</span>,
                  <span className="about-accent"> scalable systems</span>, and interfaces that still
                  <span className="about-accent"> hold up under real constraints</span>.
                </p>
              </div>

              <div className="space-y-6 lg:pl-8">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#99a4d6]">Education</p>
                  <p className="mt-2.5 text-[0.98rem] leading-7 text-[#eef1fb]">
                    Brigham Young University - Idaho
                  </p>
                  <p className="mt-1 text-[0.98rem] leading-7 text-[#b8bfd3]">
                    <span className="about-accent">Web Design and Development, design emphasis</span>
                  </p>
                </div>

                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#99a4d6]">Outside Work</p>
                  <p className="mt-2.5 text-[0.98rem] leading-7 text-[#b8bfd3]">
                    Married, one cat, synth player, digital art, games, and my{" "}
                    <a
                      className="text-cyan-300 transition hover:text-cyan-200"
                      href="https://www.lepidoptra.band"
                      target="_blank"
                      rel="noreferrer"
                    >
                      band <ExternalLink className="inline" size={12} />
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pointer-events-none h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.22)_18%,rgba(129,140,248,0.28)_50%,rgba(255,255,255,0.22)_82%,rgba(255,255,255,0)_100%)]" />
        </div>
      </SectionShell>
    </section>
  );
}
