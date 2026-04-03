import type { ExperienceData } from "@/data/portfolio";

import ExperienceCard from "@/components/ExperienceCard";
import SectionShell from "@/components/home/SectionShell";

type ExperienceSectionProps = {
  items: ExperienceData[];
};

export default function ExperienceSection({
  items,
}: ExperienceSectionProps) {
  return (
    <section className="experience-section section-reveal relative overflow-hidden py-16 lg:py-22">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(96,165,250,0.08),transparent_22%),radial-gradient(circle_at_18%_36%,rgba(250,204,21,0.04),transparent_18%)]" />

      <SectionShell className="relative">
        <p className="section-kicker mb-6 text-[0.76rem] font-semibold uppercase tracking-[0.38em] text-[#99a4d6]">
          Experience
        </p>

        <div className="border-t border-white/[0.06] pt-8">
          <div>
            <h2 className="section-title chrome-text text-[clamp(2.5rem,5.2vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.075em]">
              Built across startups, agency work, and product teams.
            </h2>
            <p className="section-copy mt-5 max-w-2xl text-[1rem] leading-7 text-[#c7cfdf]">
              I&apos;ve worked across marketing sites, enterprise interfaces, ecommerce, learning
              products, and AI platforms, consistently raising frontend quality while shipping inside real deadlines and team constraints.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.06] pt-5">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#99a4d6]">Professional Time</p>
            <div className="flex items-start gap-4">
              <div className="flex items-start">
                <span
                  id="year-counter"
                  className="years-experience gradient-text text-[3rem] font-black leading-none"
                  style={{ ["--from" as string]: "#a855f7", ["--to" as string]: "#07b69e" }}
                >
                  0
                </span>
                <span className="gradient-text mt-0.5 text-[2rem] font-black leading-none" style={{ ["--from" as string]: "#a855f7", ["--to" as string]: "#07b69e" }}>
                  +
                </span>
              </div>
              <p className="max-w-sm pt-1 text-[0.95rem] leading-7 text-[#b8bfd3]">
                Years owning frontend work across product delivery, design systems, and interaction quality.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <ExperienceCard key={`${item.Company}-${item.JobPosition}`} {...item} />
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
