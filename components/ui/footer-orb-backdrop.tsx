"use client";

import { useMemo } from "react";

type FooterOrbBackdropProps = {
  stageClassName?: string;
};

type Particle = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

export default function FooterOrbBackdrop({
  stageClassName = "footer-backdrop-stage",
}: FooterOrbBackdropProps) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        left: `${6 + ((index * 11) % 88)}%`,
        top: `${8 + ((index * 17) % 76)}%`,
        size: 2 + (index % 3),
        duration: 6.5 + (index % 4) * 1.5,
        delay: (index % 6) * 0.55,
      })),
    []
  );

  return (
    <>
      <div
        className={`${stageClassName} pointer-events-none absolute -inset-x-[10%] -top-24 bottom-0 overflow-hidden opacity-0 [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.88)_14%,black_28%,black_86%,rgba(0,0,0,0.92)_94%,transparent_100%)]`}
        style={{ contain: "paint" }}
      >
        <div className="contact-grid-drift absolute inset-0 [mask-image:radial-gradient(62%_60%_at_50%_38%,white,transparent_86%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:82px_96px]" />
        </div>

        <div className="contact-grid-drift-slow absolute inset-0 opacity-[0.26] [mask-image:radial-gradient(50%_42%_at_50%_26%,white,transparent_88%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.82)_1px,transparent_1px)] bg-[size:26px_26px]" />
        </div>

        <div className="contact-glow-pulse absolute inset-x-[14%] top-[-4.5rem] h-[31rem] rounded-full border-[88px] border-[#5565ff]/[0.13] blur-[56px]" />
        <div className="contact-glow-pulse-slow absolute inset-x-[20%] top-[-5.5rem] h-[33rem] rounded-full border-[82px] border-cyan-400/[0.06] blur-[64px]" />
        <div className="contact-glow-pulse absolute left-[12%] top-[22%] h-40 w-40 rounded-full bg-cyan-400/[0.08] blur-[64px]" />
        <div className="contact-glow-pulse-slow absolute right-[12%] top-[16%] h-48 w-48 rounded-full bg-indigo-500/[0.11] blur-[72px]" />
        <div className="contact-glow-pulse absolute bottom-[6%] left-1/2 h-48 w-[52%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(91,104,255,0.14)_0%,rgba(34,211,238,0.08)_34%,transparent_72%)] blur-[60px]" />

        <div className="absolute inset-0">
          {particles.map((particle, index) => (
            <span
              key={`${particle.left}-${particle.top}-${index}`}
              className="contact-particle absolute rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.45)]"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
