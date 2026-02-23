import type { SiteData } from "@/data/types";
import {
  heroData,
  skillsData,
  aboutData,
  contactData,
  projectCategories,
  publicationsData,
} from "@/data/content";

export async function getSiteData(): Promise<SiteData> {
  return {
    hero: heroData,
    skills: skillsData,
    about: aboutData,
    contact: contactData,
    projectCategories,
    publications: publicationsData,
  };
}
