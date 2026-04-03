import type { CSSProperties } from "react";
import { ArrowDownCircle } from "lucide-react";

import SectionShell from "@/components/home/SectionShell";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

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
  return (
    <main
      id="hero"
      className="relative mb-0 flex min-h-[50rem] w-full items-center overflow-hidden bg-black sm:mt-24 lg:-mt-10 lg:min-h-screen"
    >
      <HeroGeometric className="hero-wave-layer opacity-95" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_top,rgba(91,104,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.08),transparent_20%),linear-gradient(180deg,rgba(3,7,18,0.12)_0%,rgba(3,7,18,0.38)_46%,rgba(0,0,0,0.92)_100%)]" />
      <div className="hero-fade-veil pointer-events-none absolute inset-0 z-[3] opacity-0 bg-[linear-gradient(180deg,rgba(3,7,18,0)_10%,rgba(3,7,18,0.18)_40%,rgba(0,0,0,0.76)_76%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[4] h-80 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.26)_26%,rgba(0,0,0,0.74)_62%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-10rem] z-[4] h-64 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_62%)] blur-3xl" />
      <SectionShell className="hero-content relative z-10 flex flex-col justify-center overflow-visible pt-32 pb-32 sm:pt-44 lg:pt-44 lg:pb-28">
        <p className="hero-eyebrow text-[0.6rem] font-medium uppercase tracking-[0.28em] text-slate-500 pb-4">
          Frontend Engineer
        </p>
        <h1 className="text hidden max-w-[min(100%,68rem)] overflow-visible pr-12 text-[clamp(4.1rem,6.8vw,6.35rem)] font-semibold leading-[0.91] tracking-[-0.06em] sm:block lg:pr-16">
          <span className="block">
            Frontend <span className="gradient-text font-black" style={gradientPurple}>Engineering</span>
          </span>
          <span className="block">
            with Product <span className="gradient-text font-black" style={gradientGreen}>Instinct</span>,
          </span>
          <span className="block">
            <span className="gradient-text font-black" style={gradientGold}>Built to Ship</span>
          </span>
        </h1>
        <div className="space-y-2 sm:hidden">
          <h1 className="mobile-text1 text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.05em]">
            Frontend <span className="gradient-text font-black" style={gradientPurple}>Engineering</span>
          </h1>
          <h1 className="mobile-text2 text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.05em]">
            with Product <span className="gradient-text font-black" style={gradientGreen}>Instinct</span>,
          </h1>
          <h1 className="mobile-text3 text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.05em]">
            <span className="gradient-text font-black" style={gradientGold}>Built to Ship</span>
          </h1>
        </div>
        <div className="hero-subcopy mt-12 max-w-3xl space-y-5 lg:mt-14">
          <p className="text-left text-[1.18rem] font-semibold leading-[1.48] text-slate-100 lg:text-[1.36rem]">
            I am Colton Morrill, a <span className="soft-accent">product-minded frontend engineer</span> with{" "}
            <span className="soft-accent">5+ years of experience</span> shipping high-quality interfaces,
            design systems, and user-facing product work inside real teams.
          </p>
          <p className="max-w-2xl text-left text-[1rem] font-medium leading-[1.72] text-slate-300 lg:text-[1.08rem]">
            I specialize in React, Next.js, TypeScript, and modern frontend architecture across
            product UI, AI workflows, and full-stack delivery where speed, clarity, and polish all matter.
          </p>
        </div>
      </SectionShell>
      <a
        href="#projects"
        className="group absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce lg:block"
      >
        <ArrowDownCircle className="group-hover:text-blue-500 group-hover:transition" />
      </a>
    </main>
  );
}
