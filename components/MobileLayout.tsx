"use client";

import { useState, useRef } from "react";
import type { SiteData } from "@/data/types";
import type { ExpandedSection } from "@/app/ClientPage";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  PublicationsSection,
  AboutSection,
  ContactSection,
  SectionHeading_Clickable,
  getClipFrom,
} from "./sections";
import ExpandedOverlay from "./sections/ui/ExpandedOverlay";

type MobileLayoutProps = {
  siteData: SiteData;
  expandedSection: ExpandedSection;
  setExpandedSection: (section: ExpandedSection) => void;
};

export default function MobileLayout({
  siteData,
  expandedSection,
  setExpandedSection,
}: MobileLayoutProps) {
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const workRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWorkExpand = () => {
    if (expandedSection === "work") {
      setExpandedSection(null);
    } else {
      const rect = workRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("work");
    }
  };

  const handlePublicationsExpand = () => {
    if (expandedSection === "publications") {
      setExpandedSection(null);
    } else {
      const rect = publicationsRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("publications");
    }
  };

  const handleAboutExpand = () => {
    if (expandedSection === "about") {
      setExpandedSection(null);
    } else {
      const rect = aboutRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("about");
    }
  };

  const clipFrom = getClipFrom(sourceRect);

  return (
    <div ref={containerRef} className="relative h-[calc(100dvh-48px)] overflow-hidden">
      {/* Mobile column layout */}
      <div
        className="grid h-full"
        style={{
          gridTemplateRows:
            "minmax(0, 2.5fr) minmax(0, 2.5fr) minmax(0, 0.7fr) minmax(0, 0.7fr) minmax(0, 0.7fr) minmax(0, 1.5fr)",
        }}
      >
        {/* Hero Section */}
        <div className="overflow-hidden border-b border-black px-6 py-6">
          <HeroSection data={siteData.hero} />
        </div>

        {/* Research Interests (Skills) Section */}
        <div className="overflow-hidden border-b border-black px-6 py-6">
          <SkillsSection data={siteData.skills} />
        </div>

        {/* Projects & Demos Section */}
        <div
          ref={workRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-black bg-white px-6 transition-colors duration-200 hover:bg-gray-50"
        >
          <SectionHeading_Clickable onClick={handleWorkExpand}>
            Projects &amp; Demos
          </SectionHeading_Clickable>
          <div onClick={handleWorkExpand} className="text-xl">
            +
          </div>
        </div>

        {/* Publications Section */}
        <div
          ref={publicationsRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-black bg-white px-6 transition-colors duration-200 hover:bg-gray-50"
        >
          <SectionHeading_Clickable onClick={handlePublicationsExpand}>
            Publications
          </SectionHeading_Clickable>
          <div onClick={handlePublicationsExpand} className="text-xl">
            +
          </div>
        </div>

        {/* About Section */}
        <div
          ref={aboutRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-black bg-white px-6 transition-colors duration-200 hover:bg-gray-50"
        >
          <SectionHeading_Clickable onClick={handleAboutExpand}>
            About Me
          </SectionHeading_Clickable>
          <div onClick={handleAboutExpand} className="text-xl">
            +
          </div>
        </div>

        {/* Contact Section */}
        <div className="overflow-hidden bg-white px-6 py-6">
          <ContactSection data={siteData.contact} />
        </div>
      </div>

      {/* Expanded overlays */}
      <ExpandedOverlay
        isOpen={expandedSection === "work"}
        clipFrom={clipFrom}
        uniqueKey="work-expanded"
      >
        <WorkSection
          data={siteData.projectCategories}
          onExpand={handleWorkExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>

      <ExpandedOverlay
        isOpen={expandedSection === "publications"}
        clipFrom={clipFrom}
        padding="p-0"
        uniqueKey="publications-expanded"
      >
        <PublicationsSection
          data={siteData.publications}
          onExpand={handlePublicationsExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>

      <ExpandedOverlay
        isOpen={expandedSection === "about"}
        clipFrom={clipFrom}
        padding="p-0"
        uniqueKey="about-expanded"
      >
        <AboutSection
          data={siteData.about}
          onExpand={handleAboutExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>
    </div>
  );
}
