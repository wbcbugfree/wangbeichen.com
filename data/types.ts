// Shared types used by both content.ts (local data) and Sanity (CMS data).

export type HeroData = {
  greeting: string;
  titles: string[];
};

export type SkillsData = {
  skills: string;
  highlights: string[];
};

export type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  description?: string;
};

export type ExperienceEntry = {
  role: string;
  organization: string;
  period: string;
  description?: string;
};

export type AboutData = {
  image: string;
  imageAlt: string;
  text: string;
  cvUrl?: string;
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
};

export type ContactEntry = {
  type: string;
  value: string;
  href: string;
};

export type Project = {
  title: string;
  image: string;
  techStack: string[];
  href?: string;
  description?: string;
  demoUrl?: string;
  paperUrl?: string;
  githubUrl?: string;
};

export type ProjectCategory = {
  category: string;
  projects: Project[];
};

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "conference" | "journal" | "preprint" | "thesis";
  paperUrl?: string;
  codeUrl?: string;
  slidesUrl?: string;
  videoUrl?: string;
  abstract?: string;
  highlight?: boolean;
  image?: string;
};

export type SiteData = {
  hero: HeroData;
  skills: SkillsData;
  about: AboutData;
  contact: ContactEntry[];
  projectCategories: ProjectCategory[];
  publications: Publication[];
};
