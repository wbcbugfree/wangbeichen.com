type ProjectCardProps = {
  title: string;
  techStack: string[];
  href?: string;
};

export function ProjectCard({
  title,
  techStack,
  href,
}: ProjectCardProps) {
  const CardWrapper = href ? "a" : "div";
  const cardProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper
      {...cardProps}
      className="group block rounded-2xl border border-black/10 bg-card p-4 transition-shadow hover:shadow-lg dark:border-white/10"
    >
      <div className="flex min-h-24 flex-col justify-between gap-4">
        <h4 className="heading-card text-black transition-colors group-hover:underline dark:text-white">
          {title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-black/10 px-2 py-0.5 text-meta dark:border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}
