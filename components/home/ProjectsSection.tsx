import type { ProjectArchiveEntry, ProjectCaseStudy } from '@/data/portfolio';
import SectionShell from '@/components/home/SectionShell';
import FeaturedProject from '@/components/home/FeaturedProject';
import RemainingProjects from '@/components/home/RemainingProjects';

type ProjectsSectionProps = {
  caseStudies: ProjectCaseStudy[];
  archive: ProjectArchiveEntry[];
  stats: readonly string[];
};

export default function ProjectsSection({caseStudies,archive}:ProjectsSectionProps) {
  const featuredProjects=caseStudies.filter(project=>project.featured).sort((a,b)=>a.featured!.order-b.featured!.order);
  const secondaryProjects=caseStudies.filter(project=>!project.featured);

  return (
    <section aria-labelledby="projects-heading" className="relative py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.08),transparent_20%),radial-gradient(circle_at_76%_18%,rgba(99,102,241,0.10),transparent_22%)]" />
      <SectionShell className="relative">
        <h2 id="projects-heading" className="chrome-text text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.05em]">
          My Previous Work
        </h2>
      </SectionShell>
      {featuredProjects.map((project,index)=><FeaturedProject key={project.title} project={project} index={index}/>)}
      <SectionShell className="relative">
        <RemainingProjects projects={secondaryProjects} archive={archive}/>
      </SectionShell>
    </section>
  );
}
