import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client configuration
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source).fit("max").auto("format");
}

// Types for Sanity content
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// SEO fields that can be added to any page
export interface PageSEO {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: SanityImage;
  keywords?: string[];
}

export interface HeroContent {
  _id: string;
  title: string;
  subtitle: string;
  tagline: string;
  heroImage?: SanityImage;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary: {
    text: string;
    link: string;
  };
  seo?: PageSEO;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  description?: string;
  order: number;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: SanityImage;
  images?: SanityImage[];
  link?: string;
}

export interface Certification {
  _id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: SanityImage;
  order: number;
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  order: number;
}

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  description?: string;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: SanityImage;
  problem?: string;
  solution?: string;
  tools?: string[];
  featured: boolean;
  order: number;
}

export interface SiteSettings {
  _id: string;
  name: string;
  tagline: string;
  email: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Page-specific content types with SEO
export interface PageContent {
  _id: string;
  pageId: string;
  title: string;
  subtitle?: string;
  description?: string;
  seo?: PageSEO;
}

export interface NavigationItem {
  _id: string;
  label: string;
  path: string;
  order: number;
}

export interface QuickLink {
  _id: string;
  title: string;
  description: string;
  link: string;
  order: number;
}

// GROQ Queries
export const queries = {
  heroContent: `*[_type == "heroContent"][0]`,
  skills: `*[_type == "skill"] | order(order asc)`,
  activities: `*[_type == "activity"] | order(date desc)`,
  certifications: `*[_type == "certification"] | order(order asc)`,
  experiences: `*[_type == "experience"] | order(order asc)`,
  education: `*[_type == "education"] | order(order asc)`,
  projects: `*[_type == "project"] | order(order asc)`,
  featuredProjects: `*[_type == "project" && featured == true] | order(order asc)`,
  siteSettings: `*[_type == "siteSettings"][0]`,
  pageContent: (pageId: string) => `*[_type == "pageContent" && pageId == "${pageId}"][0]`,
  navigation: `*[_type == "navigationItem"] | order(order asc)`,
  quickLinks: `*[_type == "quickLink"] | order(order asc)`,
};

// Fetch functions - no fallback data, returns null/empty array when not available
export async function fetchHeroContent(): Promise<HeroContent | null> {
  try {
    return await sanityClient.fetch(queries.heroContent);
  } catch (error) {
    console.error("Failed to fetch hero content from Sanity:", error);
    return null;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    return await sanityClient.fetch(queries.skills);
  } catch (error) {
    console.error("Failed to fetch skills from Sanity:", error);
    return [];
  }
}

export async function fetchActivities(): Promise<Activity[]> {
  try {
    return await sanityClient.fetch(queries.activities);
  } catch (error) {
    console.error("Failed to fetch activities from Sanity:", error);
    return [];
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    return await sanityClient.fetch(queries.certifications);
  } catch (error) {
    console.error("Failed to fetch certifications from Sanity:", error);
    return [];
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    return await sanityClient.fetch(queries.experiences);
  } catch (error) {
    console.error("Failed to fetch experiences from Sanity:", error);
    return [];
  }
}

export async function fetchEducation(): Promise<Education[]> {
  try {
    return await sanityClient.fetch(queries.education);
  } catch (error) {
    console.error("Failed to fetch education from Sanity:", error);
    return [];
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    return await sanityClient.fetch(queries.projects);
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error);
    return [];
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch(queries.siteSettings);
  } catch (error) {
    console.error("Failed to fetch site settings from Sanity:", error);
    return null;
  }
}

export async function fetchPageContent(pageId: string): Promise<PageContent | null> {
  try {
    return await sanityClient.fetch(queries.pageContent(pageId));
  } catch (error) {
    console.error(`Failed to fetch page content for ${pageId} from Sanity:`, error);
    return null;
  }
}

export async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    return await sanityClient.fetch(queries.navigation);
  } catch (error) {
    console.error("Failed to fetch navigation from Sanity:", error);
    return [];
  }
}

export async function fetchQuickLinks(): Promise<QuickLink[]> {
  try {
    return await sanityClient.fetch(queries.quickLinks);
  } catch (error) {
    console.error("Failed to fetch quick links from Sanity:", error);
    return [];
  }
}
