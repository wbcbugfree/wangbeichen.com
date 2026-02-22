import type { Publication } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { SectionHeading_Clickable } from "./ui/SectionHeading_Clickable";

type PublicationsSectionProps = {
  data: Publication[];
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function PublicationsSection({
  data,
  onExpand,
  isExpanded = false,
}: PublicationsSectionProps) {
  if (!isExpanded) {
    const featured = data.find((p) => p.highlight) ?? data[0];
    return (
      <div className="relative h-full">
        <div className="flex items-center gap-2">
          <SectionHeading_Clickable onClick={onExpand}>
            Publications
          </SectionHeading_Clickable>
          <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
            {data.length}
          </span>
        </div>
        {featured && (
          <p className="mt-3 text-meta line-clamp-3 leading-relaxed">
            {featured.title}
          </p>
        )}
      </div>
    );
  }

  // Group publications by year, descending
  const byYear = data.reduce<Record<number, Publication[]>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});

  const sortedYears = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="relative h-full overflow-y-auto">
      <CloseButton onClick={onExpand} />

      <div className="p-8 md:p-12">
        <SectionHeading_Clickable onClick={onExpand}>
          Publications
        </SectionHeading_Clickable>

        <div className="mt-8 space-y-10">
          {sortedYears.map((year) => (
            <div key={year}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {year}
              </p>
              <div className="space-y-6">
                {byYear[year].map((pub) => (
                  <PublicationEntry key={pub.title} pub={pub} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicationEntry({ pub }: { pub: Publication }) {
  return (
    <div className="border-l-2 border-black pl-4">
      {pub.highlight && (
        <span
          className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-medium text-white"
          style={{ backgroundColor: "var(--site-accent)" }}
        >
          Featured
        </span>
      )}
      <h4 className="heading-card font-semibold leading-snug">{pub.title}</h4>
      <p className="mt-1 text-sm">
        {pub.authors.map((author, i) => (
          <span key={`${author}-${i}`}>
            {author === "Beichen Wang" ? (
              <strong style={{ color: "var(--site-accent)" }}>{author}</strong>
            ) : (
              <span className="text-gray-700">{author}</span>
            )}
            {i < pub.authors.length - 1 && (
              <span className="text-gray-400">, </span>
            )}
          </span>
        ))}
      </p>
      <p className="mt-0.5 text-sm italic text-gray-500">{pub.venue}</p>

      {pub.abstract && pub.highlight && (
        <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3">
          {pub.abstract}
        </p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <TypeBadge type={pub.type} />
        {pub.paperUrl && (
          <IconLink href={pub.paperUrl} label="PDF" />
        )}
        {pub.codeUrl && (
          <IconLink href={pub.codeUrl} label="Code" />
        )}
        {pub.slidesUrl && (
          <IconLink href={pub.slidesUrl} label="Slides" />
        )}
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: Publication["type"] }) {
  const labels: Record<Publication["type"], string> = {
    conference: "Conference",
    journal: "Journal",
    preprint: "Preprint",
    thesis: "Thesis",
  };
  return (
    <span className="rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-500">
      {labels[type]}
    </span>
  );
}

function IconLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded border border-black px-2 py-0.5 text-xs font-medium transition-colors hover:bg-black hover:text-white"
    >
      {label === "PDF" && (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
      )}
      {label === "Code" && (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16,18 22,12 16,6" />
          <polyline points="8,6 2,12 8,18" />
        </svg>
      )}
      {label === "Slides" && (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
      {label}
    </a>
  );
}
