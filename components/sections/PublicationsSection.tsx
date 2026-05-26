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

function CollapsedPubCard({ pub }: { pub: Publication }) {
  const href = pub.paperUrl ?? pub.codeUrl ?? pub.videoUrl ?? pub.slidesUrl;
  const CardWrapper = href ? "a" : "div";
  const cardProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper
      {...cardProps}
      className="group block rounded-2xl border border-black/10 bg-card p-3 text-left transition-shadow hover:shadow-lg dark:border-white/10"
    >
      <div className="flex min-h-24 flex-col gap-2">
        <PublicationCover pub={pub} variant="thumbnail" />
        <div className="flex min-h-0 flex-1 flex-col justify-between gap-2">
          <h4 className="heading-card text-foreground line-clamp-2 flex-1 min-w-0 pr-2">
            {pub.title}
          </h4>
          <div className="flex items-center justify-between gap-2">
            <span className="text-meta shrink-0 text-[10px]">
              {pub.year}
            </span>
            {pub.highlight ? (
              <span
                className="rounded px-1 py-px text-white text-[10px]"
                style={{ backgroundColor: "var(--site-accent)" }}
              >
                ★
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}

function ExpandedPubCard({ pub }: { pub: Publication }) {
  return (
    <div
      className="group block rounded-2xl border border-black/10 bg-card p-5 transition-shadow hover:shadow-lg dark:border-white/10"
    >
      <div>
        <PublicationCover pub={pub} variant="full" />
        {pub.highlight && (
          <span
            className="mb-1 inline-block rounded px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: "var(--site-accent)" }}
          >
            Featured
          </span>
        )}
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-sm leading-snug font-medium group-hover:underline">
            {pub.title}
          </p>
          <TypeBadge type={pub.type} />
        </div>
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
          {(pub.pdfUrl ?? pub.paperUrl) && (
            <a
              href={pub.pdfUrl ?? pub.paperUrl}
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
              GitHub
            </a>
          )}
          {pub.videoUrl && (
            <a
              href={pub.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-black dark:border-white/30 px-3 py-1 text-xs font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Presentation
            </a>
          )}
          {pub.endpointUrl && (
            <a
              href={pub.endpointUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-black dark:border-white/30 px-3 py-1 text-xs font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              SPARQL Endpoint
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

function PublicationCover({
  pub,
  variant,
}: {
  pub: Publication;
  variant: "thumbnail" | "full";
}) {
  if (!pub.image && !pub.coverVideo) return null;

  const isThumbnail = variant === "thumbnail";
  const mediaClassName = isThumbnail
    ? "h-full w-full object-cover object-center"
    : "h-full w-full object-contain";

  return (
    <div
      className={
        isThumbnail
          ? "h-11 overflow-hidden rounded-lg border border-black/10 bg-white dark:border-white/10"
          : "mb-4 h-56 overflow-hidden rounded-xl border border-black/10 bg-white p-3 dark:border-white/10 lg:h-64"
      }
    >
      {pub.coverVideo ? (
        <video
          src={pub.coverVideo}
          aria-label={`${pub.title} cover video`}
          className={mediaClassName}
          autoPlay
          loop
          muted
          playsInline
          preload={isThumbnail ? "metadata" : "auto"}
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pub.image}
            alt={`${pub.title} cover`}
            className={mediaClassName}
          />
        </>
      )}
    </div>
  );
}

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
