import type { SmallProjectData } from "@/data/portfolio";

import ProjectCardSmall from "@/components/ProjectCardSmall";
import SectionShell from "@/components/home/SectionShell";

type MoreProjectsSectionProps = {
  projects: SmallProjectData[];
};

export default function MoreProjectsSection({
  projects,
}: MoreProjectsSectionProps) {
  return (
    <SectionShell className="section-gap-lg flex flex-col items-center">
      <h3 className="mb-16 text-center text-4xl font-bold">More Projects</h3>
      <div className="ml-0 flex flex-col flex-wrap items-start justify-start lg:ml-36 lg:flex-row lg:items-center lg:justify-center">
        {projects.map((project) => (
          <ProjectCardSmall key={project.ProjectName} {...project} />
        ))}
      </div>
    </SectionShell>
  );
}
