import type { ProjectCardData } from "@/data/portfolio";

import ProjectCard from "@/components/ProjectCard";
import SectionShell from "@/components/home/SectionShell";

type FeaturedProjectsSectionProps = {
  rows: ProjectCardData[][];
};

const rowClasses = [
  "first-row mb-14 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:gap-8",
  "second-row mb-14 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:gap-8",
  "third-row mb-24 flex flex-col gap-10 lg:mb-28 lg:flex-row lg:gap-8",
];

export default function FeaturedProjectsSection({
  rows,
}: FeaturedProjectsSectionProps) {
  return (
    <SectionShell className="relative -mt-24 pt-[4.5rem] before:pointer-events-none before:absolute before:inset-x-0 before:top-[-10rem] before:h-40 before:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.72)_72%,#000_100%)] lg:-mt-24 lg:pt-12">
      {rows.map((row, index) => (
        <div key={rowClasses[index]} className={rowClasses[index]}>
          {row.map((project) => (
            <ProjectCard key={project.ProjectTitle} {...project} />
          ))}
        </div>
      ))}
    </SectionShell>
  );
}
