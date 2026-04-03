"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, Expand, Sparkles } from "lucide-react";

import type { ProjectArchiveEntry, ProjectCaseStudy } from "@/data/portfolio";

import SectionShell from "@/components/home/SectionShell";

type ProjectPalette = {
  bloom: string;
  spotlight: string;
  ambient: string;
  shadow: string;
  base: string;
  mesh: string;
  lines: string;
};

function getProjectPalette(title: string): ProjectPalette {
  switch (title) {
    case "Fund Launch AI":
      return {
        bloom:
          "radial-gradient(circle at 16% 20%, rgba(129,140,248,0.2), transparent 24%), radial-gradient(circle at 78% 22%, rgba(192,132,252,0.2), transparent 22%), radial-gradient(circle at 58% 82%, rgba(191,219,254,0.14), transparent 26%)",
        spotlight: "rgba(191, 219, 254, 0.26)",
        ambient: "rgba(168, 85, 247, 0.32)",
        shadow: "0 24px 80px rgba(36, 24, 83, 0.24)",
        base: "linear-gradient(135deg, #090c1a 0%, #131938 40%, #0b0d18 100%)",
        mesh: "radial-gradient(circle at 18% 20%, rgba(129,140,248,0.2), transparent 24%), radial-gradient(circle at 80% 18%, rgba(192,132,252,0.16), transparent 24%), radial-gradient(circle at 56% 84%, rgba(147,197,253,0.12), transparent 28%)",
        lines:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1.2'%3E%3Cpath d='M0 438c138-64 253-62 372-6 116 54 227 67 428-28'/%3E%3Cpath d='M18 520c124-56 236-55 345-12 120 47 242 60 437-18'/%3E%3C/g%3E%3C/svg%3E\")",
      };
    case "Press Sports":
      return {
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(103,232,249,0.22), transparent 24%), radial-gradient(circle at 74% 28%, rgba(56,189,248,0.24), transparent 20%), radial-gradient(circle at 52% 84%, rgba(186,230,253,0.16), transparent 22%)",
        spotlight: "rgba(125, 211, 252, 0.32)",
        ambient: "rgba(56, 189, 248, 0.42)",
        shadow: "0 24px 80px rgba(8, 47, 73, 0.22)",
        base: "linear-gradient(135deg, #07141d 0%, #0d2230 42%, #07161d 100%)",
        mesh: "radial-gradient(circle at 18% 24%, rgba(74,222,255,0.22), transparent 26%), radial-gradient(circle at 78% 18%, rgba(59,130,246,0.16), transparent 24%), radial-gradient(circle at 62% 82%, rgba(103,232,249,0.14), transparent 28%)",
        lines:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.11)' stroke-width='1.2'%3E%3Cpath d='M-40 448C104 354 220 328 360 350c145 23 229 87 382 71 59-6 106-20 164-52'/%3E%3Cpath d='M-20 500C140 404 260 388 392 406c142 19 222 77 354 70 58-3 110-15 176-45'/%3E%3C/g%3E%3C/svg%3E\")",
      };
    case "AptoGenix":
      return {
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(167,243,208,0.2), transparent 24%), radial-gradient(circle at 76% 28%, rgba(45,212,191,0.22), transparent 21%), radial-gradient(circle at 48% 84%, rgba(209,250,229,0.14), transparent 24%)",
        spotlight: "rgba(167, 243, 208, 0.3)",
        ambient: "rgba(45, 212, 191, 0.4)",
        shadow: "0 24px 80px rgba(17, 94, 89, 0.22)",
        base: "linear-gradient(135deg, #081816 0%, #10312d 40%, #081514 100%)",
        mesh: "radial-gradient(circle at 16% 20%, rgba(94,234,212,0.2), transparent 24%), radial-gradient(circle at 78% 20%, rgba(134,239,172,0.16), transparent 24%), radial-gradient(circle at 62% 80%, rgba(45,212,191,0.14), transparent 28%)",
        lines:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.2'%3E%3Cpath d='M0 430c130-54 246-62 360-18 118 46 218 59 440-28'/%3E%3Cpath d='M0 490c122-51 231-60 340-22 123 43 232 61 460-14'/%3E%3C/g%3E%3C/svg%3E\")",
      };
    case "SiCoustics":
      return {
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(191,219,254,0.2), transparent 24%), radial-gradient(circle at 76% 26%, rgba(96,165,250,0.22), transparent 21%), radial-gradient(circle at 52% 84%, rgba(219,234,254,0.14), transparent 24%)",
        spotlight: "rgba(191, 219, 254, 0.28)",
        ambient: "rgba(96, 165, 250, 0.34)",
        shadow: "0 24px 80px rgba(30, 64, 175, 0.2)",
        base: "linear-gradient(135deg, #081221 0%, #122744 42%, #08131f 100%)",
        mesh: "radial-gradient(circle at 16% 20%, rgba(125,211,252,0.18), transparent 24%), radial-gradient(circle at 80% 18%, rgba(96,165,250,0.15), transparent 24%), radial-gradient(circle at 56% 82%, rgba(219,234,254,0.12), transparent 28%)",
        lines:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.2'%3E%3Cpath d='M0 438c136-70 254-80 370-36 117 44 219 57 430 11'/%3E%3Cpath d='M12 516c126-60 240-68 349-31 121 41 232 53 439 16'/%3E%3C/g%3E%3C/svg%3E\")",
      };
    case "My Wellness Curriculum":
      return {
        bloom:
          "radial-gradient(circle at 20% 18%, rgba(190,242,100,0.2), transparent 24%), radial-gradient(circle at 78% 26%, rgba(74,222,128,0.22), transparent 21%), radial-gradient(circle at 46% 84%, rgba(217,249,157,0.14), transparent 22%)",
        spotlight: "rgba(190, 242, 100, 0.3)",
        ambient: "rgba(132, 204, 22, 0.38)",
        shadow: "0 24px 80px rgba(63, 98, 18, 0.2)",
        base: "linear-gradient(135deg, #091614 0%, #142a26 45%, #0a1514 100%)",
        mesh: "radial-gradient(circle at 18% 22%, rgba(110,231,183,0.18), transparent 24%), radial-gradient(circle at 78% 18%, rgba(190,242,100,0.15), transparent 24%), radial-gradient(circle at 58% 82%, rgba(167,243,208,0.12), transparent 28%)",
        lines:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.09)' stroke-width='1.2'%3E%3Cpath d='M-24 438c149-102 285-117 405-56 108 56 196 85 419 37'/%3E%3Cpath d='M12 516c132-84 254-96 364-46 111 50 225 74 424 35'/%3E%3C/g%3E%3C/svg%3E\")",
      };
    case "Vibility LMS":
      return {
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(199,210,254,0.2), transparent 24%), radial-gradient(circle at 78% 26%, rgba(139,92,246,0.24), transparent 21%), radial-gradient(circle at 52% 84%, rgba(224,231,255,0.14), transparent 22%)",
        spotlight: "rgba(199, 210, 254, 0.3)",
        ambient: "rgba(139, 92, 246, 0.4)",
        shadow: "0 24px 80px rgba(67, 56, 202, 0.2)",
        base: "linear-gradient(135deg, #0d1122 0%, #191d45 44%, #0b0d1b 100%)",
        mesh: "radial-gradient(circle at 16% 20%, rgba(129,140,248,0.2), transparent 24%), radial-gradient(circle at 78% 20%, rgba(167,139,250,0.18), transparent 24%), radial-gradient(circle at 60% 82%, rgba(96,165,250,0.12), transparent 28%)",
        lines:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.2'%3E%3Cpath d='M0 444c154-88 280-98 406-55 122 42 213 76 394 18'/%3E%3Cpath d='M20 518c138-73 262-79 375-42 118 39 228 62 405 20'/%3E%3C/g%3E%3C/svg%3E\")",
      };
    default:
      return {
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(203,213,225,0.16), transparent 24%), radial-gradient(circle at 78% 26%, rgba(100,116,139,0.14), transparent 21%), radial-gradient(circle at 52% 84%, rgba(226,232,240,0.12), transparent 22%)",
        spotlight: "rgba(226, 232, 240, 0.2)",
        ambient: "rgba(148, 163, 184, 0.26)",
        shadow: "0 24px 80px rgba(15, 23, 42, 0.16)",
        base: "linear-gradient(135deg, #0f1720 0%, #18232f 45%, #0b1218 100%)",
        mesh: "radial-gradient(circle at 20% 24%, rgba(148,163,184,0.15), transparent 24%), radial-gradient(circle at 78% 20%, rgba(226,232,240,0.1), transparent 24%), radial-gradient(circle at 56% 84%, rgba(148,163,184,0.1), transparent 28%)",
        lines:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1.2'%3E%3Cpath d='M0 450c148-88 278-94 396-50 118 44 220 63 404 21'/%3E%3Cpath d='M10 518c140-74 266-79 378-41 118 40 228 59 412 20'/%3E%3C/g%3E%3C/svg%3E\")",
      };
  }
}

function getBackgroundStyle(palette: ProjectPalette): CSSProperties {
  return {
    backgroundImage: `${palette.mesh}, ${palette.base}`,
  };
}

function getGalleryAnimation(code: string, index: number) {
  if (code === "fundlaunch") {
    if (index === 0) return "group-hover:-translate-y-1/4 delay-0";
    if (index === 1) return "group-hover:-translate-x-1/4 delay-75";
    if (index === 2) return "group-hover:-translate-y-1/3 delay-150";
    if (index === 3) return "group-hover:-translate-x-1/3 delay-200";
    return "group-hover:-translate-y-1/5 delay-300";
  }

  if (code === "mwc") {
    if (index === 0) return "group-hover:-translate-y-1/3 delay-0";
    if (index === 1) return "group-hover:-translate-y-1/3 delay-50";
    if (index === 2) return "group-hover:-translate-y-1/3 delay-100";
    if (index === 3) return "group-hover:-translate-y-1/3 delay-300";
    return "group-hover:-translate-y-1/3 delay-500";
  }

  if (code === "sic") {
    if (index === 0) return "group-hover:-translate-y-1/4 delay-0";
    if (index === 1) return "group-hover:-translate-y-2/3 delay-75";
    if (index === 2) return "group-hover:-translate-x-1/4 delay-150";
    return "group-hover:-translate-x-1/3 delay-200";
  }

  if (code === "apto") {
    if (index === 1) return "group-hover:-translate-y-3/4";
    return "group-hover:-translate-y-1/4";
  }

  if (code === "vibility") {
    if (index === 0) return "group-hover:-translate-y-2/3";
    if (index === 1) return "group-hover:-translate-y-1/3";
    if (index === 2) return "group-hover:-translate-y-3/4";
    return "group-hover:-translate-y-1/4";
  }

  if (index === 0) return "group-hover:-translate-y-2/3";
  if (index === 1) return "group-hover:-translate-y-1/3";
  if (index === 2) return "group-hover:-translate-x-1/3";
  return "group-hover:-translate-x-2/3";
}

function ProjectVisual({
  project,
  priority = false,
  compact = false,
}: {
  project: ProjectCaseStudy;
  priority?: boolean;
  compact?: boolean;
}) {
  const palette = getProjectPalette(project.title);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const transitionTimers = useRef<number[]>([]);
  const isFundLaunch = project.title === "Fund Launch AI";
  const activeImage = project.gallery[activeIndex] ?? project.gallery[0];

  useEffect(() => {
    return () => {
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const queueTimer = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      transitionTimers.current = transitionTimers.current.filter((entry) => entry !== timer);
      callback();
    }, delay);
    transitionTimers.current.push(timer);
  };

  const goToSlide = (index: number) => {
    const total = project.gallery.length;
    if (isFundLaunch && isFlipping) return;

    if (isFundLaunch) {
      const nextIndex = (index + total) % total;
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
      transitionTimers.current = [];
      setIsFlipping(true);
      setOutgoingIndex(activeIndex);
      setPendingIndex(nextIndex);
      queueTimer(() => {
        setActiveIndex(nextIndex);
      }, 380);
      queueTimer(() => {
        setIsFlipping(false);
        setPendingIndex(null);
        setOutgoingIndex(null);
      }, 620);
      return;
    }

    setActiveIndex((index + total) % total);
  };

  return (
    <div className="group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#07090f] p-3 shadow-[0_28px_120px_rgba(0,0,0,0.3)]">
      <div
        className="pointer-events-none absolute inset-x-8 top-8 h-[72%] rounded-[2.4rem] blur-3xl transition duration-500 group-hover:scale-[1.03]"
        style={{
          background: `radial-gradient(circle at 14% 18%, ${palette.ambient}, transparent 28%), radial-gradient(circle at 82% 24%, rgba(255,255,255,0.12), transparent 22%), radial-gradient(circle at 56% 88%, ${palette.spotlight}, transparent 30%)`,
          opacity: 0.95,
        }}
      />
      <div
        className={`relative overflow-hidden rounded-[1.6rem] ${compact ? "aspect-[1.08/1]" : "aspect-[1.45/1]"}`}
        style={{ boxShadow: palette.shadow }}
      >
        <div className="absolute inset-0" style={getBackgroundStyle(palette)} />
        <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: palette.lines }} />
        <div className="absolute inset-0 opacity-95" style={{ background: palette.bloom }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(4,6,14,0)_0%,rgba(4,6,14,0.55)_74%,rgba(4,6,14,0.9)_100%)]" />
        {isFundLaunch ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(129,140,248,0.34),transparent_28%)]" />
            <button
              type="button"
              aria-label="Flip to next Fund Launch screenshot"
              onClick={() => goToSlide(activeIndex + 1)}
              className="absolute inset-0 z-[2] cursor-pointer p-3 text-left sm:p-4"
            >
              <div className="relative h-full w-full">
                {[
                  { imageIndex: isFlipping ? pendingIndex ?? activeIndex : activeIndex, depth: 0 },
                  { imageIndex: ((isFlipping ? pendingIndex ?? activeIndex : activeIndex) + 1) % project.gallery.length, depth: 1 },
                  { imageIndex: ((isFlipping ? pendingIndex ?? activeIndex : activeIndex) + 2) % project.gallery.length, depth: 2 },
                ].map(({ imageIndex, depth }, offset) => {
                  const item = project.gallery[imageIndex];
                  const isTop = depth === 0;
                  const baseTransform = `translate3d(${depth * 16}px, ${depth * 12}px, 0) scale(${1 - depth * 0.03})`;

                  return (
                    <div
                      key={`${item.image}-${offset}-base`}
                      className="absolute inset-0 overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#060913] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_42px_rgba(0,0,0,0.28)] transition duration-500"
                      style={{
                        transform: baseTransform,
                        opacity: 1,
                        zIndex: 20 - depth,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={isTop ? project.imageAlt : ""}
                        aria-hidden={isTop ? undefined : "true"}
                        width={1200}
                        height={900}
                        priority={priority && isTop}
                        className="h-full w-full object-contain object-center transition duration-500"
                        sizes="(min-width: 1024px) 55vw, 100vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,19,0.01)_0%,rgba(6,9,19,0.0)_54%,rgba(6,9,19,0.14)_100%)]" />
                    </div>
                  );
                })}
                {isFlipping && outgoingIndex !== null ? (
                  <div
                    className="fundlaunch-card-flip-out absolute inset-0 overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#060913] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_42px_rgba(0,0,0,0.28)]"
                    style={{ zIndex: 40 }}
                  >
                    <Image
                      src={project.gallery[outgoingIndex].image}
                      alt={project.imageAlt}
                      width={1200}
                      height={900}
                      priority={priority}
                      className="fundlaunch-image-shift-out h-full w-full object-contain object-center"
                      sizes="(min-width: 1024px) 55vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,19,0.01)_0%,rgba(6,9,19,0.0)_54%,rgba(6,9,19,0.14)_100%)]" />
                  </div>
                ) : null}
              </div>
            </button>

            <div className="absolute left-4 top-4 z-[3] hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(9,12,24,0.62)] px-3 py-2 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-[#dbe4ff] shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <Sparkles size={12} className="text-[#9fb5ff]" />
              Click To Flip
            </div>

            <div className="absolute right-4 top-4 z-[3] flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(9,12,24,0.62)] px-2 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <span className="px-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[#dbe4ff]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Next Fund Launch screenshot"
                onClick={() => goToSlide(activeIndex + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-[#dbe4ff] transition hover:bg-white/[0.08] hover:text-white"
              >
                <ChevronRight size={15} />
              </button>
              <a
                href={activeImage.image}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Fund Launch screenshot"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-[#dbe4ff] transition hover:bg-white/[0.08] hover:text-white"
              >
                <Expand size={14} />
              </a>
            </div>
          </>
        ) : (
          <div className="absolute inset-0">
            {project.gallery.map((item, index) => (
              <div key={`${item.image}-${index}`} className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={index === 0 ? project.imageAlt : ""}
                  aria-hidden={index === 0 ? undefined : "true"}
                  width={1200}
                  height={900}
                  priority={priority && index === 0}
                  className={`absolute top-1/2 left-1/2 h-auto w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-[1.2rem] transition duration-500 scale-[1.26] xl:scale-[0.94] ${getGalleryAnimation(item.code, index)}`}
                  sizes={compact ? "(min-width: 1024px) 30vw, 100vw" : "(min-width: 1024px) 55vw, 100vw"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ArchiveTile({ project }: { project: ProjectArchiveEntry }) {
  const TileContent = (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015)_100%)] px-4 py-4 transition hover:border-white/18">
      <div className="flex items-start justify-between gap-3">
        {project.icon ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.04]">
            <Image
              src={project.icon}
              alt={project.iconAlt ?? project.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : <div />}
        {project.href ? (
          <ArrowUpRight
            size={16}
            className="mt-1 text-[#c9c1d8] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        ) : null}
      </div>
      <p className="mt-4 text-[0.68rem] uppercase tracking-[0.24em] text-[#9d94b0]">{project.category}</p>
      <h4 className="mt-2 max-w-[14ch] text-[1.15rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#efe9fb]">
        {project.title}
      </h4>
      <p className="mt-2.5 max-w-sm text-[0.88rem] leading-6 text-[#b3a9c4]">{project.note}</p>
    </div>
  );

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer">
        {TileContent}
      </a>
    );
  }

  return TileContent;
}

type ProjectsSectionProps = {
  caseStudies: ProjectCaseStudy[];
  archive: ProjectArchiveEntry[];
  stats: readonly string[];
};

export default function ProjectsSection({
  caseStudies,
  archive,
}: ProjectsSectionProps) {
  const [heroProject, ...secondaryProjects] = caseStudies;

  return (
    <section className="section-reveal relative overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.08),transparent_20%),radial-gradient(circle_at_76%_18%,rgba(99,102,241,0.10),transparent_22%)]" />
      <SectionShell className="relative">
        <p className="section-kicker mb-6 text-[0.76rem] font-semibold uppercase tracking-[0.38em] text-[#99a4d6]">
          Previous Work
        </p>
        <div className="mb-8 max-w-4xl">
          {/* <h2 className="section-title chrome-text text-[clamp(2.8rem,5.8vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
            My Previous Work
          </h2> */}
        </div>

        {heroProject ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div className="section-media relative">
              <ProjectVisual project={heroProject} priority />
              <div className="mt-5 flex items-center gap-4 text-[0.76rem] uppercase tracking-[0.28em] text-[#9d94b0]">
                <span>{heroProject.category}</span>
                <span>{heroProject.year}</span>
              </div>
            </div>

            <div className="flex flex-col justify-between lg:pt-6">
              <div>
                <h3 className="chrome-text text-[clamp(2.4rem,4.6vw,4.2rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
                  {heroProject.title}
                </h3>
                <p className="section-copy mt-5 max-w-xl text-[1.02rem] leading-7 text-[#ece7f8]">
                  {heroProject.summary}
                </p>
                <p className="section-copy mt-4 max-w-xl text-[0.98rem] leading-7 text-[#b8bfd3]">
                  {heroProject.role}
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <a
                  href={heroProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-base font-semibold text-[#f5efff] transition hover:text-cyan-200"
                >
                  View project
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {secondaryProjects.map((project) => (
            <article key={project.title}>
              <ProjectVisual project={project} compact />
              <div className="mt-5">
                <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#9d94b0]">{project.category}</p>
                <h3 className="mt-2.5 text-[1.7rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[#f2ecfb]">
                  {project.title}
                </h3>
                <p className="section-copy mt-3 max-w-sm text-[0.95rem] leading-7 text-[#b3a9c4]">
                  {project.summary}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none mt-14 h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.22)_18%,rgba(129,140,248,0.28)_50%,rgba(255,255,255,0.22)_82%,rgba(255,255,255,0)_100%)]" />

        <div className="mt-12">
          <p className="section-kicker mb-5 text-[0.76rem] font-semibold uppercase tracking-[0.38em] text-[#99a4d6]">
            Extra Work
          </p>
          <h3 className="section-title chrome-text max-w-2xl text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
            More shipped work and smaller experiments.
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {archive.map((project) => (
              <ArchiveTile key={project.title} project={project} />
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
