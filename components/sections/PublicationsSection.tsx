import Image from "next/image";
import type { Publication } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { SectionHeading_Clickable } from "./ui/SectionHeading_Clickable";

const PLACEHOLDER = "/projects/placeholder.png";

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
  // ── Collapsed panel ─────────────────────────────────────────────────────────
  if (!isExpanded) {
    return (
      <div className="relative h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 shrink-0">
          <SectionHeading_Clickable onClick={onExpand}>
            Publications
          </SectionHeading_Clickable>
          <span className="rounded-full bg-black dark:bg-white dark:text-black px-2 py-0.5 text-xs text-white">
            {data.length}
          </span>
        </div>

        {/* 2-column card grid — same visual style as Projects & Demos */}
        <div className="mt-3 grid grid-cols-2 gap-2 overflow-hidden flex-1 min-h-0 content-start">
          {data.map((pub) => (
            <CollapsedPubCard key={pub.title} pub={pub} />
          ))}
        </div>
      </div>
    );
  }

  // ── Expanded overlay ────────────────────────────────────────────────────────
  const byYear = data.reduce<Record<number, Publication[]>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});
  const sortedYears = Object.keys(byYear).map(Number).sort((a, b) => b - a);

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
              {/* 2-column card grid — mirrors Projects & Demos expanded layout */}
              <div className="grid grid-cols-2 gap-6">
                {byYear[year].map((pub) => (
                  <ExpandedPubCard key={pub.title} pub={pub} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Collapsed card (ProjectCard style) ────────────────────────────────────────

function CollapsedPubCard({ pub }: { pub: Publication }) {
  const href = pub.paperUrl ?? pub.codeUrl ?? pub.slidesUrl;
  const CardWrapper = href ? "a" : "div";
  const cardProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper
      {...cardProps}
      className="relative group block overflow-hidden rounded-2xl bg-[#fdfdfd] dark:bg-[--card] transition-shadow hover:shadow-lg text-left w-full"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={pub.image ?? PLACEHOLDER}
          alt={pub.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>

      {/* Footer overlay — title + year/type */}
      <div className="absolute bottom-0 w-full flex items-end justify-between px-3 py-1.5 bg-white/85 dark:bg-black/70 backdrop-blur-sm">
        <h4 className="heading-card text-black line-clamp-1 flex-1 min-w-0 pr-2">
          {pub.title}
        </h4>
        <span className="text-meta shrink-0 text-[10px]">
          {pub.year}
          {pub.highlight && (
            <span
              className="ml-1 rounded px-1 py-px text-white text-[10px]"
              style={{ backgroundColor: "var(--site-accent)" }}
            >
              ★
            </span>
          )}
        </span>
      </div>
    </CardWrapper>
  );
}

// ── Expanded card (ProjectCard style + publication metadata below) ─────────────

function ExpandedPubCard({ pub }: { pub: Publication }) {
  const href = pub.paperUrl ?? pub.codeUrl;
  const CardWrapper = href ? "a" : "div";
  const cardProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <div className="flex flex-col gap-2">
      {/* Image card — identical to ProjectCard */}
      <CardWrapper
        {...cardProps}
        className="relative group block overflow-hidden rounded-2xl bg-[#fdfdfd] dark:bg-[--card] transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-2/1 w-full overflow-hidden">
          <Image
            src={pub.image ?? PLACEHOLDER}
            alt={pub.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
        {/* Footer overlay */}
        <div className="absolute bottom-0 w-full flex items-center justify-between px-4 py-1 bg-white/80 dark:bg-black/70">
          <h4 className="heading-card text-black line-clamp-1 flex-1 min-w-0 pr-2">
            {pub.title}
          </h4>
          <div className="flex items-center gap-2 shrink-0">
            <TypeBadge type={pub.type} />
          </div>
        </div>
      </CardWrapper>

      {/* Metadata below the card */}
      <div className="px-1">
        {pub.highlight && (
          <span
            className="mb-1 inline-block rounded px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: "var(--site-accent)" }}
          >
            Featured
          </span>
        )}
        <p className="text-sm leading-snug font-medium">{pub.title}</p>
        <p className="mt-1 text-xs text-gray-600">
          {pub.authors.map((author, i) => (
            <span key={`${author}-${i}`}>
              {author === "Beichen Wang" ? (
                <strong style={{ color: "var(--site-accent)" }}>{author}</strong>
              ) : (
                <span>{author}</span>
              )}
              {i < pub.authors.length - 1 && (
                <span className="text-gray-400">, </span>
              )}
            </span>
          ))}
        </p>
        <p className="mt-0.5 text-xs italic text-gray-500">{pub.venue}</p>

        {pub.abstract && (
          <p className="mt-1 text-xs text-gray-400 leading-relaxed line-clamp-2">
            {pub.abstract}
          </p>
        )}

        {/* Links */}
        <div className="mt-2 flex flex-wrap gap-2">
          {pub.paperUrl && (
            <a
              href={pub.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-black dark:border-white/30 px-3 py-1 text-xs font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              PDF Paper
            </a>
          )}
          {pub.codeUrl && (
            <a
              href={pub.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-black dark:border-white/30 px-3 py-1 text-xs font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Code
            </a>
          )}
          {pub.slidesUrl && (
            <a
              href={pub.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-black dark:border-white/30 px-3 py-1 text-xs font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Slides
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function typeLabel(type: Publication["type"]): string {
  return { conference: "Conference", journal: "Journal", preprint: "Preprint", thesis: "Thesis" }[type];
}

function TypeBadge({ type }: { type: Publication["type"] }) {
  return (
    <span className="rounded border border-gray-300 dark:border-white/20 px-2 py-0.5 text-[10px] text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-white/10">
      {typeLabel(type)}
    </span>
  );
}
