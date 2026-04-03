"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

type HeroGeometricProps = {
  children?: ReactNode;
  className?: string;
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: ElegantShapeProps) {
  return (
    <div
      className={cn("hero-shape-shell absolute", className)}
      style={{
        opacity: 0,
        transform: `translate3d(0, -120px, 0) rotate(${rotate - 10}deg)`,
        animation: `elegant-shape-in 2.1s cubic-bezier(0.23, 0.86, 0.39, 0.96) ${delay}s forwards`,
        ["--shape-rotate-start" as string]: `${rotate - 10}deg`,
        ["--shape-rotate-end" as string]: `${rotate}deg`,
      }}
    >
      <div style={{ width, height }} className="relative">
        <div
          className={cn(
            "hero-shape-surface absolute inset-0 rounded-full bg-gradient-to-r to-transparent",
            gradient,
            "border border-white/[0.1]",
            "shadow-[0_8px_24px_0_rgba(61,104,255,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_72%)]"
          )}
        />
      </div>
    </div>
  );
}

export function HeroGeometric({
  children,
  className,
}: HeroGeometricProps) {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 z-[1] overflow-hidden bg-[#030712]",
          className
        )}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(99,102,241,0.16),transparent_20%),radial-gradient(circle_at_78%_26%,rgba(34,211,238,0.09),transparent_18%),radial-gradient(circle_at_68%_76%,rgba(250,204,21,0.06),transparent_16%)] blur-[72px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(9,13,28,0),rgba(3,7,18,0.22)_52%,rgba(0,0,0,0.58)_100%)]" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.2}
            width={500}
            height={116}
            rotate={12}
            gradient="from-indigo-500/[0.14]"
            className="left-[-10%] top-[14%] md:left-[-4%] md:top-[18%]"
          />
          <ElegantShape
            delay={0.3}
            width={360}
            height={88}
            rotate={-16}
            gradient="from-cyan-500/[0.12]"
            className="right-[-4%] top-[66%] md:right-[3%] md:top-[72%]"
          />
          <ElegantShape
            delay={0.4}
            width={220}
            height={62}
            rotate={-9}
            gradient="from-violet-500/[0.1]"
            className="left-[4%] bottom-[12%] md:left-[11%] md:bottom-[14%]"
          />
          <ElegantShape
            delay={0.5}
            width={176}
            height={52}
            rotate={22}
            gradient="from-amber-400/[0.12]"
            className="right-[10%] top-[12%] hidden md:block"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.4)_0%,rgba(3,7,18,0.15)_30%,rgba(3,7,18,0.4)_68%,rgba(0,0,0,0.94)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-72 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.44)_32%,rgba(0,0,0,0.92)_72%,#000_100%)]" />
      </div>
      {children}
    </>
  );
}
