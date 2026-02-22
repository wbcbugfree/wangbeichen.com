import type { ProjectCategory } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { ProjectCard } from "./ui/ProjectCard";
import { SectionHeading_Clickable } from "./ui/SectionHeading_Clickable";

type WorkSectionProps = {
  data: ProjectCategory[];
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function WorkSection({
  data,
  onExpand,
  isExpanded = false,
}: WorkSectionProps) {
  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between">
        <SectionHeading_Clickable onClick={onExpand}>
          Projects &amp; Demos
        </SectionHeading_Clickable>
      </div>
      {isExpanded && <CloseButton onClick={onExpand} />}
      {data.map((group) => (
        <div key={group.category} className="mb-4">
          <p className="mt-2 text-meta">{group.category}</p>
          <div
            className={`mt-4 ${isExpanded ? "grid grid-cols-2 gap-6" : "space-y-4"}`}
          >
            {group.projects.map((project) => (
              <div key={project.title} className="flex flex-col gap-2">
                <ProjectCard
                  title={project.title}
                  image={project.image}
                  techStack={project.techStack}
                  href={project.href ?? project.demoUrl ?? project.githubUrl}
                />
                {isExpanded && (
                  <div className="px-1">
                    {project.description && (
                      <p className="text-meta text-xs leading-relaxed mb-2">
                        {project.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white"
                          style={{ backgroundColor: "var(--site-accent)" }}
                        >
                          ↗ Live Demo
                        </a>
                      )}
                      {project.paperUrl && (
                        <a
                          href={project.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-black px-3 py-1 text-xs font-medium hover:bg-black hover:text-white transition-colors"
                        >
                          PDF Paper
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-black px-3 py-1 text-xs font-medium hover:bg-black hover:text-white transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
