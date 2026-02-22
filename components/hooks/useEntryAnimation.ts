"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

type AnimationRefs = {
  lines: {
    mainHLine: RefObject<HTMLDivElement | null>;
    topVLine: RefObject<HTMLDivElement | null>;
    bottomVLine: RefObject<HTMLDivElement | null>;
    bottomVCenterLine: RefObject<HTMLDivElement | null>;
    bottomRightHLine: RefObject<HTMLDivElement | null>;
  };
  content: {
    hero: RefObject<HTMLDivElement | null>;
    skills: RefObject<HTMLDivElement | null>;
    work: RefObject<HTMLDivElement | null>;
    publications: RefObject<HTMLDivElement | null>;
    about: RefObject<HTMLDivElement | null>;
    contact: RefObject<HTMLDivElement | null>;
  };
};

export function useEntryAnimation(refs: AnimationRefs) {
  useEffect(() => {
    const { lines, content } = refs;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial states for lines
      gsap.set(lines.mainHLine.current, { scaleX: 0, scaleY: 1 });
      gsap.set(lines.bottomRightHLine.current, { scaleX: 0, scaleY: 1 });
      gsap.set(
        [
          lines.topVLine.current,
          lines.bottomVLine.current,
          lines.bottomVCenterLine.current,
        ],
        { scaleY: 0, scaleX: 1 },
      );

      // Set initial states for content
      gsap.set(
        [
          content.hero.current,
          content.skills.current,
          content.work.current,
          content.publications.current,
          content.about.current,
          content.contact.current,
        ],
        { opacity: 0, y: 20 },
      );

      // Animation sequence
      tl.to(lines.mainHLine.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          [
            lines.topVLine.current,
            lines.bottomVLine.current,
            lines.bottomVCenterLine.current,
          ],
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          lines.bottomRightHLine.current,
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          [
            content.hero.current,
            content.skills.current,
            content.work.current,
            content.publications.current,
            content.about.current,
            content.contact.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount - refs are stable
}
