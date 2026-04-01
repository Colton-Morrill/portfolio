import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface IsoLevelWarpProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  speed?: number;
  density?: number;
}

const IsoLevelWarp = ({
  className,
  color = "14, 165, 233",
  speed = 1,
  density = 40,
  ...props
}: IsoLevelWarpProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let dpr = 1;
    let animationFrameId = 0;
    let gridGap = density;
    let rows = 0;
    let cols = 0;
    let isInView = true;
    let strokeGradient: CanvasGradient | string = `rgba(${color}, 0.35)`;
    let xPositions: number[] = [];
    let yPositions: number[] = [];
    let xPhaseOffsets: number[] = [];
    let yPhaseOffsets: number[] = [];
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let time = 0;
    const maxDist = 260;
    const maxDistSq = maxDist * maxDist;
    const baseAmplitude = 12;
    const interactionLift = 54;

    const mix = (a: number, b: number, t: number) => a + (b - a) * t;

    const shouldAnimate = () =>
      !prefersReducedMotion.matches && isInView && !document.hidden;

    const buildGrid = () => {
      gridGap =
        width >= 1600
          ? Math.max(density, Math.round(density * 1.25))
          : width <= 768
            ? Math.max(density, Math.round(density * 1.15))
            : density;
      rows = Math.ceil(height / gridGap) + 4;
      cols = Math.ceil(width / gridGap) + 4;
      xPositions = Array.from(
        { length: cols + 1 },
        (_, index) => index * gridGap - gridGap * 2
      );
      yPositions = Array.from(
        { length: rows + 1 },
        (_, index) => index * gridGap - gridGap * 2
      );
      xPhaseOffsets = Array.from({ length: cols + 1 }, (_, index) => index * 0.18);
      yPhaseOffsets = Array.from({ length: rows + 1 }, (_, index) => index * 0.18);
    };

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();

      strokeGradient = ctx.createLinearGradient(0, 0, width, height);
      strokeGradient.addColorStop(0, `rgba(${color}, 0.06)`);
      strokeGradient.addColorStop(0.5, `rgba(${color}, 0.58)`);
      strokeGradient.addColorStop(1, `rgba(${color}, 0.08)`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x = mix(mouse.x, mouse.targetX, 0.1);
      mouse.y = mix(mouse.y, mouse.targetY, 0.1);
      time += 0.008 * speed;

      ctx.beginPath();
      ctx.strokeStyle = strokeGradient;
      ctx.lineWidth = 0.9;

      for (let y = 0; y <= rows; y += 1) {
        let isFirst = true;
        const baseY = yPositions[y];
        const yWave = Math.cos(yPhaseOffsets[y] + time * 0.92);

        for (let x = 0; x <= cols; x += 1) {
          const baseX = xPositions[x];
          const wave = Math.sin(xPhaseOffsets[x] + time) * yWave * baseAmplitude;
          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const distSq = dx * dx + dy * dy;
          let interactionY = 0;

          if (distSq < maxDistSq) {
            const force = 1 - distSq / maxDistSq;
            interactionY = -(force * force) * interactionLift;
          }

          const finalX = baseX;
          const finalY = baseY + wave + interactionY;

          if (isFirst) {
            ctx.moveTo(finalX, finalY);
            isFirst = false;
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }
      }

      ctx.stroke();
    };

    const draw = () => {
      animationFrameId = 0;
      render();

      if (shouldAnimate()) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const requestDraw = () => {
      if (!animationFrameId && shouldAnimate()) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const stopDraw = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (shouldAnimate()) {
        requestDraw();
      } else {
        stopDraw();
        render();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = Boolean(entry?.isIntersecting);
        handleVisibilityChange();
      },
      { threshold: 0.05 }
    );

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render();
      requestDraw();
    });

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    prefersReducedMotion.addEventListener("change", handleVisibilityChange);
    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    intersectionObserver.observe(container);
    resizeObserver.observe(container);

    resize();
    render();
    requestDraw();

    return () => {
      stopDraw();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      prefersReducedMotion.removeEventListener("change", handleVisibilityChange);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [color, speed, density]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden bg-black", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80" />
    </div>
  );
};

export default IsoLevelWarp;
