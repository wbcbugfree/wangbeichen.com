import type { AboutData } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { SectionHeading_Clickable } from "./ui/SectionHeading_Clickable";

type AboutSectionProps = {
  data: AboutData;
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function AboutSection({
  data,
  onExpand,
  isExpanded = false,
}: AboutSectionProps) {
  if (isExpanded) {
    return (
      <div className="relative h-full overflow-y-auto">
        <CloseButton onClick={onExpand} />

        {/* Mobile: stacked layout / Desktop: side-by-side */}
        <div className="flex h-full flex-col md:flex-row md:gap-12 m-12">
          {/* Left: photo + bio */}
          <div className="flex flex-col md:w-2/5 md:shrink-0">
            <div className="flex items-center justify-center py-6 md:py-0 md:mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.image}
                alt={data.imageAlt}
                className="h-48 w-48 object-contain sm:h-56 sm:w-56 md:h-64 md:w-64"
              />
            </div>
            <SectionHeading_Clickable onClick={onExpand}>
              {`About Me`}
            </SectionHeading_Clickable>
            <p className="text-body leading-relaxed text-black mt-3">
              {data.text}
            </p>
          </div>

          {/* Right: Education + Experience timelines */}
          <div className="md:w-3/5 mt-6 md:mt-0 space-y-8">
            {data.education && data.education.length > 0 && (
              <div>
                <h4 className="heading-card mb-4 font-semibold uppercase tracking-widest text-xs">
                  Education
                </h4>
                <div className="space-y-4 border-l-2 border-black pl-5">
                  {data.education.map((entry, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-[1.45rem] top-[0.35rem] h-2.5 w-2.5 rounded-full bg-black" />
                      <p className="text-meta text-xs">{entry.period}</p>
                      <p className="font-semibold text-sm mt-0.5">{entry.degree}</p>
                      <p className="text-meta text-xs">{entry.institution}</p>
                      {entry.description && (
                        <p className="text-meta text-xs mt-1 leading-relaxed">{entry.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.experience && data.experience.length > 0 && (
              <div>
                <h4 className="heading-card mb-4 font-semibold uppercase tracking-widest text-xs">
                  Experience
                </h4>
                <div className="space-y-4 border-l-2 border-black pl-5">
                  {data.experience.map((entry, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-[1.45rem] top-[0.35rem] h-2.5 w-2.5 rounded-full bg-black" />
                      <p className="text-meta text-xs">{entry.period}</p>
                      <p className="font-semibold text-sm mt-0.5">{entry.role}</p>
                      <p className="text-meta text-xs">{entry.organization}</p>
                      {entry.description && (
                        <p className="text-meta text-xs mt-1 leading-relaxed">{entry.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <SectionHeading_Clickable onClick={onExpand}>
          {`About Me`}
        </SectionHeading_Clickable>
      </div>

      <div className="mt-3 flex items-start gap-3 sm:mt-4 sm:gap-4 xl:gap-6">
        <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32 md:h-40 md:w-40 xl:h-56 xl:w-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.imageAlt}
            className="h-full w-full object-contain"
          />
        </div>
        <p className="flex-1 text-body text-black">{data.text}</p>
      </div>
    </div>
  );
}
