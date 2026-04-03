import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import RainbowText from "./RainbowText";

type ProjectImage = {
  image: string;
  code: string;
};

type ProjectCardProps = {
  UrlPath: string;
  className: string;
  ImagePath?: ProjectImage[];
  ProjectTitle: string;
  ProjectSoftware: string;
  ImageAlt?: string;
  anim?: string;
  Spacer?: string;
};

type CardPalette = {
  border: string;
  bloom: string;
  spotlight: string;
  ambient: string;
  shadow: string;
};

function getCardPalette(projectTitle: string): CardPalette {
  switch (projectTitle) {
    case "Press Sports":
      return {
        border:
          "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 18%, rgba(103,232,249,0.72) 48%, rgba(125,211,252,0.2) 72%, rgba(255,255,255,0.28) 100%)",
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(103,232,249,0.16), transparent 24%), radial-gradient(circle at 74% 28%, rgba(56,189,248,0.2), transparent 20%), radial-gradient(circle at 52% 84%, rgba(186,230,253,0.12), transparent 22%)",
        spotlight: "rgba(125, 211, 252, 0.26)",
        ambient: "rgba(56, 189, 248, 0.36)",
        shadow: "0 24px 80px rgba(8, 47, 73, 0.2)",
      };
    case "SiCoustics":
      return {
        border:
          "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.12) 18%, rgba(96,165,250,0.66) 48%, rgba(59,130,246,0.18) 72%, rgba(255,255,255,0.26) 100%)",
        bloom:
          "radial-gradient(circle at 22% 16%, rgba(147,197,253,0.15), transparent 24%), radial-gradient(circle at 80% 26%, rgba(59,130,246,0.18), transparent 21%), radial-gradient(circle at 56% 82%, rgba(191,219,254,0.12), transparent 22%)",
        spotlight: "rgba(147, 197, 253, 0.24)",
        ambient: "rgba(96, 165, 250, 0.34)",
        shadow: "0 24px 80px rgba(30, 64, 175, 0.18)",
      };
    case "AptoGenix":
      return {
        border:
          "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 18%, rgba(110,231,183,0.68) 48%, rgba(45,212,191,0.2) 74%, rgba(255,255,255,0.26) 100%)",
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(167,243,208,0.16), transparent 24%), radial-gradient(circle at 76% 28%, rgba(45,212,191,0.18), transparent 21%), radial-gradient(circle at 48% 84%, rgba(209,250,229,0.1), transparent 24%)",
        spotlight: "rgba(167, 243, 208, 0.24)",
        ambient: "rgba(45, 212, 191, 0.32)",
        shadow: "0 24px 80px rgba(17, 94, 89, 0.18)",
      };
    case "My Wellness Curriculum":
      return {
        border:
          "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 18%, rgba(163,230,53,0.68) 48%, rgba(74,222,128,0.18) 74%, rgba(255,255,255,0.26) 100%)",
        bloom:
          "radial-gradient(circle at 20% 18%, rgba(190,242,100,0.16), transparent 24%), radial-gradient(circle at 78% 26%, rgba(74,222,128,0.18), transparent 21%), radial-gradient(circle at 46% 84%, rgba(217,249,157,0.12), transparent 22%)",
        spotlight: "rgba(190, 242, 100, 0.24)",
        ambient: "rgba(132, 204, 22, 0.32)",
        shadow: "0 24px 80px rgba(63, 98, 18, 0.18)",
      };
    case "Vibility LMS":
      return {
        border:
          "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 18%, rgba(165,180,252,0.66) 48%, rgba(139,92,246,0.22) 74%, rgba(255,255,255,0.26) 100%)",
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(199,210,254,0.16), transparent 24%), radial-gradient(circle at 78% 26%, rgba(139,92,246,0.2), transparent 21%), radial-gradient(circle at 52% 84%, rgba(224,231,255,0.12), transparent 22%)",
        spotlight: "rgba(199, 210, 254, 0.24)",
        ambient: "rgba(139, 92, 246, 0.34)",
        shadow: "0 24px 80px rgba(67, 56, 202, 0.18)",
      };
    case "CleanRCans":
      return {
        border:
          "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 18%, rgba(125,211,252,0.7) 48%, rgba(34,211,238,0.22) 74%, rgba(255,255,255,0.28) 100%)",
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(186,230,253,0.16), transparent 24%), radial-gradient(circle at 78% 26%, rgba(34,211,238,0.18), transparent 21%), radial-gradient(circle at 52% 84%, rgba(224,242,254,0.12), transparent 22%)",
        spotlight: "rgba(186, 230, 253, 0.24)",
        ambient: "rgba(34, 211, 238, 0.32)",
        shadow: "0 24px 80px rgba(8, 145, 178, 0.16)",
      };
    default:
      return {
        border:
          "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 18%, rgba(148,163,184,0.42) 48%, rgba(71,85,105,0.16) 74%, rgba(255,255,255,0.28) 100%)",
        bloom:
          "radial-gradient(circle at 18% 18%, rgba(203,213,225,0.12), transparent 24%), radial-gradient(circle at 78% 26%, rgba(100,116,139,0.12), transparent 21%), radial-gradient(circle at 52% 84%, rgba(226,232,240,0.1), transparent 22%)",
        spotlight: "rgba(226, 232, 240, 0.18)",
        ambient: "rgba(148, 163, 184, 0.24)",
        shadow: "0 24px 80px rgba(15, 23, 42, 0.16)",
      };
  }
}

function getAnimationRule(code: string, index: number) {
  if (code === "mwc") {
    if (index === 0) return ["group-hover:-translate-y-1/3", "delay-0"];
    if (index === 1) return ["group-hover:-translate-y-1/3", "delay-50"];
    if (index === 2) return ["group-hover:-translate-y-1/3", "delay-100"];
    if (index === 3) return ["group-hover:-translate-y-1/3", "delay-300"];
    return ["group-hover:-translate-y-1/3", "delay-500"];
  }

  if (code === "apto") {
    if (index === 2) return ["group-hover:-translate-y-3/4", ""];
    return ["group-hover:-translate-y-1/4", ""];
  }

  if (code === "vibility") {
    if (index === 0) return ["group-hover:-translate-y-2/3", ""];
    if (index === 1) return ["group-hover:-translate-y-1/3", ""];
    if (index === 2) return ["group-hover:-translate-y-3/4", ""];
    return ["group-hover:-translate-y-1/4", ""];
  }

  if (code === "clean") {
    if (index === 1 || index === 2) return ["group-hover:-translate-y-2/3", ""];
    return ["group-hover:-translate-y-1/3", ""];
  }

  if (index === 0) return ["group-hover:-translate-y-2/3", ""];
  if (index === 1) return ["group-hover:-translate-y-1/3", ""];
  if (index === 2) return ["group-hover:-translate-x-1/3", ""];
  return ["group-hover:-translate-x-2/3", ""];
}

export default function ProjectCard({
  UrlPath,
  className: _className,
  ImagePath,
  ProjectTitle,
  ProjectSoftware,
  ImageAlt,
  anim = "",
  Spacer: _Spacer = "",
}: ProjectCardProps) {
  const palette = getCardPalette(ProjectTitle);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const media = mediaRef.current;
    const glow = glowRef.current;

    if (!card || !media || !glow) return;

    gsap.set(card, { transformPerspective: 1200 });
    gsap.set(glow, { opacity: 0.32 });

    const rotateXTo = gsap.quickTo(card, "rotateX", {
      duration: 0.35,
      ease: "power3.out",
    });
    const rotateYTo = gsap.quickTo(card, "rotateY", {
      duration: 0.35,
      ease: "power3.out",
    });
    const glowOpacityTo = gsap.quickTo(glow, "opacity", {
      duration: 0.28,
      ease: "power2.out",
    });
    const mediaXTo = gsap.quickTo(media, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const mediaYTo = gsap.quickTo(media, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const onPointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      const offsetX = (x / rect.width - 0.5) * 2;
      const offsetY = (y / rect.height - 0.5) * 2;

      card.style.setProperty("--mx", `${xPercent}%`);
      card.style.setProperty("--my", `${yPercent}%`);

      rotateXTo(offsetY * -4.5);
      rotateYTo(offsetX * 5.5);
      mediaXTo(offsetX * 12);
      mediaYTo(offsetY * 10);
      glowOpacityTo(0.9);
    };

    const onPointerEnter = () => {
      glowOpacityTo(0.86);
    };

    const onPointerLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      mediaXTo(0);
      mediaYTo(0);
      glowOpacityTo(0.32);
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    };

    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointerleave", onPointerLeave);

    return () => {
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerenter", onPointerEnter);
      card.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className={`group relative w-full ${anim} lg:w-[calc(50%-1rem)]`}>
      <a
        href={UrlPath}
        target="_blank"
        rel="noreferrer"
        className="block h-full w-full overflow-hidden rounded-[2rem]"
      >
        <div
          className="pointer-events-none absolute inset-x-8 top-8 h-[72%] rounded-[2.4rem] blur-3xl transition duration-500 group-hover:scale-[1.03]"
          style={{
            background: `radial-gradient(circle at 14% 18%, ${palette.ambient}, transparent 28%), radial-gradient(circle at 82% 24%, rgba(255,255,255,0.12), transparent 22%), radial-gradient(circle at 56% 88%, ${palette.spotlight}, transparent 30%)`,
            opacity: 0.9,
          }}
        />
        <div
          ref={cardRef}
          className="glass-surface relative h-[20.5rem] w-full rounded-[1.8rem] p-[1.5px] will-change-transform lg:h-[23rem]"
          style={{ backgroundImage: palette.border, boxShadow: palette.shadow }}
        >
          <div
            style={
              {
                "--mx": "50%",
                "--my": "50%",
              } as CSSProperties
            }
            className="relative h-full w-full overflow-hidden rounded-[calc(1.8rem-1.5px)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: palette.bloom }} />
            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_22%,rgba(255,255,255,0.18)_54%,rgba(255,255,255,0)_100%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.8rem-2.5px)] border border-white/10" />
            <div
              className="pointer-events-none absolute -left-6 top-14 h-32 w-32 rounded-full blur-3xl"
              style={{ background: palette.spotlight, opacity: 0.72 }}
            />
            <div
              className="pointer-events-none absolute right-4 top-6 h-28 w-28 rounded-full blur-[56px]"
              style={{ background: "rgba(255,255,255,0.14)", opacity: 0.85 }}
            />
            <div
              className="pointer-events-none absolute -bottom-12 right-10 h-40 w-40 rounded-full blur-[72px]"
              style={{ background: palette.spotlight, opacity: 0.45 }}
            />
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{
                background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.24), transparent 12%), radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${palette.spotlight}, transparent 30%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_18%,rgba(0,0,0,0.1)_100%)]" />
            <div ref={mediaRef} className="glass-media absolute inset-3 rounded-[1.45rem] will-change-transform">
              {ImagePath?.map((image, index) => {
                const [animateRule, delay] = getAnimationRule(image.code, index);

                return (
                  <Image
                    key={`${image.image}-${index}`}
                    className={`absolute top-1/2 left-1/2 z-[2] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-[1.2rem] transition duration-500 scale-[1.26] xl:scale-[0.94] ${animateRule} ${delay}`}
                    src={image.image}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={ImageAlt ?? image.image}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </a>
      <div className="pt-3">
        <p className="items-center text-right text-[1.38rem] font-semibold tracking-[-0.04em] text-[#ece6f5] group-hover:hidden">
          {ProjectTitle}
        </p>
        <RainbowText
          className="hidden !text-right text-[1.38rem] !font-semibold group-hover:block"
          text={ProjectTitle}
        />
        <p className="mt-0.5 text-right text-[0.9rem] !font-semibold tracking-[-0.01em] text-slate-500 group-hover:hidden">
          {ProjectSoftware}
        </p>
        <RainbowText
          className="hidden !text-right text-[0.9rem] !font-semibold text-slate-500 group-hover:block"
          text={ProjectSoftware}
        />
      </div>
    </div>
  );
}
