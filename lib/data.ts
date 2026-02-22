import type { SiteData } from "@/data/types";
import {
  heroData,
  skillsData,
  aboutData,
  contactData,
  projectCategories,
  publicationsData,
} from "@/data/content";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  heroQuery,
  skillsQuery,
  aboutQuery,
  contactQuery,
  projectCategoriesQuery,
} from "@/sanity/lib/queries";

const USE_SANITY = process.env.NEXT_PUBLIC_USE_SANITY === "true";

/**
 * Fetches all site data from either Sanity or local content.ts,
 * controlled by the NEXT_PUBLIC_USE_SANITY environment variable.
 */
export async function getSiteData(): Promise<SiteData> {
  // Use local data if Sanity is disabled or not configured
  if (!USE_SANITY || !isSanityConfigured || !client) {
    return {
      hero: heroData,
      skills: skillsData,
      about: aboutData,
      contact: contactData,
      projectCategories,
      publications: publicationsData,
    };
  }

  const [hero, skills, about, contact, categories] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(skillsQuery),
    client.fetch(aboutQuery),
    client.fetch(contactQuery),
    client.fetch(projectCategoriesQuery),
  ]);

  return {
    hero: hero ?? heroData,
    skills: skills ?? skillsData,
    about: about ?? aboutData,
    contact: contact?.entries ?? contactData,
    projectCategories: categories?.length ? categories : projectCategories,
    publications: publicationsData,
  };
}
