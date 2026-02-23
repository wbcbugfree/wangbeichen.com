import Image from "next/image";

type ProjectCardProps = {
  title: string;
  image: string;
  techStack: string[];
  href?: string;
};

export function ProjectCard({
  title,
  image,
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
      className="relative group block overflow-hidden rounded-2xl bg-[#fdfdfd] dark:bg-[--card] transition-shadow hover:shadow-lg"
    >
      {/* Image Area */}
      <div className="relative aspect-2/1 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full flex items-center justify-between px-4 py-1 bg-white/80 dark:bg-black/70">
        {/* Title */}
        <h4 className="heading-card text-black dark:text-white">{title}</h4>

        {/* Tech Stack */}
        <div className="flex items-center gap-3">
          {techStack.map((tech) => (
            <span key={tech} className="text-meta">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}
