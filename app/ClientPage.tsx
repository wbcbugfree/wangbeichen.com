"use client";

import { useState } from "react";
import type { SiteData } from "@/data/types";
import MobileLayout from "../components/MobileLayout";
import LaptopLayout from "../components/LaptopLayout";

export type ExpandedSection = "work" | "about" | "publications" | null;

export default function ClientPage({ siteData }: { siteData: SiteData }) {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-[--background] text-black dark:text-white">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <MobileLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <LaptopLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      </div>
    </div>
  );
}
