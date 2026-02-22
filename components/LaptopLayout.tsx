"use client";

import React, { useState, useCallback, useRef } from "react";
import type { SiteData } from "@/data/types";
import type { ExpandedSection } from "@/app/ClientPage";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  PublicationsSection,
  AboutSection,
  ContactSection,
  getClipFrom,
} from "./sections";
import { useResizablePanels, useEntryAnimation } from "./hooks";
import ExpandedOverlay from "./sections/ui/ExpandedOverlay";

type ResizableLayoutProps = {
  siteData: SiteData;
  expandedSection: ExpandedSection;
  setExpandedSection: (section: ExpandedSection) => void;
};

export default function ResizableLayout({
  siteData,
  expandedSection,
  setExpandedSection,
}: ResizableLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  // Refs for panel containers (used to capture bounding rect for expansion)
  const workPanelRef = useRef<HTMLDivElement>(null);
  const publicationsPanelRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);

  const handleWorkExpand = useCallback(() => {
    if (expandedSection === "work") {
      setExpandedSection(null);
    } else {
      const rect = workPanelRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("work");
    }
  }, [expandedSection, setExpandedSection]);

  const handlePublicationsExpand = useCallback(() => {
    if (expandedSection === "publications") {
      setExpandedSection(null);
    } else {
      const rect = publicationsPanelRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("publications");
    }
  }, [expandedSection, setExpandedSection]);

  const handleAboutExpand = useCallback(() => {
    if (expandedSection === "about") {
      setExpandedSection(null);
    } else {
      const rect = aboutPanelRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("about");
    }
  }, [expandedSection, setExpandedSection]);

  const clipFrom = getClipFrom(sourceRect);

  // Use custom hooks for animation logic
  const { sizes, isDragging, handleMouseDown } =
    useResizablePanels(containerRef);

  // Animation refs for lines
  const mainHLineRef = useRef<HTMLDivElement>(null);
  const topVLineRef = useRef<HTMLDivElement>(null);
  const bottomVLineRef = useRef<HTMLDivElement>(null);
  const bottomVCenterLineRef = useRef<HTMLDivElement>(null);
  const bottomRightHLineRef = useRef<HTMLDivElement>(null);

  // Animation refs for content
  const heroContentRef = useRef<HTMLDivElement>(null);
  const skillsContentRef = useRef<HTMLDivElement>(null);
  const workContentRef = useRef<HTMLDivElement>(null);
  const publicationsContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);

  // Entry animation
  useEntryAnimation({
    lines: {
      mainHLine: mainHLineRef,
      topVLine: topVLineRef,
      bottomVLine: bottomVLineRef,
      bottomVCenterLine: bottomVCenterLineRef,
      bottomRightHLine: bottomRightHLineRef,
    },
    content: {
      hero: heroContentRef,
      skills: skillsContentRef,
      work: workContentRef,
      publications: publicationsContentRef,
      about: aboutContentRef,
      contact: contactContentRef,
    },
  });

  const bottomHeight = 100 - sizes.topHeight;
  // Publications panel width = space between left divider and center divider
  const publicationsWidth = sizes.bottomMiddleWidth - sizes.bottomLeftWidth;
  // Right column width = remaining space
  const rightColumnWidth = 100 - sizes.bottomMiddleWidth;

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-48px)] w-full overflow-hidden"
    >
      {/* ===== TOP SECTION (Hero | Research Interests) ===== */}
      <div
        className="absolute left-0 right-0 top-0 flex"
        style={{ height: `${sizes.topHeight}%` }}
      >
        {/* Hero Section */}
        <div
          className="relative h-full overflow-auto"
          style={{ width: `${sizes.topLeftWidth}%` }}
        >
          <div ref={heroContentRef} className="h-full p-4">
            <HeroSection data={siteData.hero} />
          </div>
        </div>

        {/* Vertical Divider (Top Section) */}
        <div
          className="group relative z-10 flex h-full w-0 cursor-col-resize items-center justify-center"
          onMouseDown={handleMouseDown("vertical-top")}
        >
          <div
            ref={topVLineRef}
            className={`absolute h-full w-px origin-top bg-black ${
              isDragging === "vertical-top"
                ? "w-1 bg-gray-400"
                : "group-hover:w-1 group-hover:bg-gray-400"
            }`}
          />
        </div>

        {/* Research Interests (Skills) Section */}
        <div
          className="relative h-full overflow-auto"
          style={{ width: `${100 - sizes.topLeftWidth}%` }}
        >
          <div ref={skillsContentRef} className="h-full p-4">
            <SkillsSection data={siteData.skills} />
          </div>
        </div>
      </div>

      {/* Horizontal Divider (Main - between Top and Bottom) */}
      <div
        className="group absolute left-0 right-0 z-10 flex h-0 cursor-row-resize items-center justify-center"
        style={{ top: `${sizes.topHeight}%` }}
        onMouseDown={handleMouseDown("horizontal-main")}
      >
        <div
          ref={mainHLineRef}
          className={`absolute h-px w-full origin-left bg-black ${
            isDragging === "horizontal-main"
              ? "h-1 bg-gray-400"
              : "group-hover:h-1 group-hover:bg-gray-400"
          }`}
        />
      </div>

      {/* ===== BOTTOM SECTION (Projects | Publications | About + Contact) ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ height: `${bottomHeight}%` }}
      >
        {/* Projects & Demos Section (Left) */}
        <div
          ref={workPanelRef}
          className="relative h-full overflow-auto"
          style={{ width: `${sizes.bottomLeftWidth}%` }}
        >
          <div ref={workContentRef} className="h-full p-4">
            <WorkSection
              data={siteData.projectCategories}
              onExpand={handleWorkExpand}
            />
          </div>
        </div>

        {/* Vertical Divider (Projects | Publications) */}
        <div
          className="group relative z-10 flex h-full w-0 cursor-col-resize items-center justify-center"
          onMouseDown={handleMouseDown("vertical-bottom")}
        >
          <div
            ref={bottomVLineRef}
            className={`absolute h-full w-px origin-top bg-black ${
              isDragging === "vertical-bottom"
                ? "w-1 bg-gray-400"
                : "group-hover:w-1 group-hover:bg-gray-400"
            }`}
          />
        </div>

        {/* Publications Section (Center) */}
        <div
          ref={publicationsPanelRef}
          className="relative h-full overflow-auto"
          style={{ width: `${publicationsWidth}%` }}
        >
          <div ref={publicationsContentRef} className="h-full p-4">
            <PublicationsSection
              data={siteData.publications}
              onExpand={handlePublicationsExpand}
            />
          </div>
        </div>

        {/* Vertical Divider (Publications | About+Contact) */}
        <div
          className="group relative z-10 flex h-full w-0 cursor-col-resize items-center justify-center"
          onMouseDown={handleMouseDown("vertical-bottom-center")}
        >
          <div
            ref={bottomVCenterLineRef}
            className={`absolute h-full w-px origin-top bg-black ${
              isDragging === "vertical-bottom-center"
                ? "w-1 bg-gray-400"
                : "group-hover:w-1 group-hover:bg-gray-400"
            }`}
          />
        </div>

        {/* Right Section (About + Contact) */}
        <div
          className="relative h-full"
          style={{ width: `${rightColumnWidth}%` }}
        >
          {/* About Section */}
          <div
            ref={aboutPanelRef}
            className="absolute left-0 right-0 top-0 overflow-auto"
            style={{ height: `${sizes.bottomRightTopHeight}%` }}
          >
            <div ref={aboutContentRef} className="h-full p-4">
              <AboutSection
                data={siteData.about}
                onExpand={handleAboutExpand}
              />
            </div>
          </div>

          {/* Horizontal Divider (About/Contact) */}
          <div
            className="group absolute left-0 right-0 z-10 flex h-0 cursor-row-resize items-center justify-center"
            style={{ top: `${sizes.bottomRightTopHeight}%` }}
            onMouseDown={handleMouseDown("horizontal-bottom-right")}
          >
            <div
              ref={bottomRightHLineRef}
              className={`absolute h-px w-full origin-left bg-black ${
                isDragging === "horizontal-bottom-right"
                  ? "h-1 bg-gray-400"
                  : "group-hover:h-1 group-hover:bg-gray-400"
              }`}
            />
          </div>

          {/* Contact Section */}
          <div
            className="absolute bottom-0 left-0 right-0 overflow-auto"
            style={{ height: `${100 - sizes.bottomRightTopHeight}%` }}
          >
            <div ref={contactContentRef} className="h-full p-4">
              <ContactSection data={siteData.contact} />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded overlays */}
      <ExpandedOverlay
        isOpen={expandedSection === "work"}
        clipFrom={clipFrom}
        padding="p-8"
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
