import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client configuration
// Replace these with your actual Sanity project details
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
  return builder.image(source);
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
};

// Fetch functions with fallback data
export async function fetchHeroContent(): Promise<HeroContent | null> {
  try {
    return await sanityClient.fetch(queries.heroContent);
  } catch {
    return null;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    return await sanityClient.fetch(queries.skills);
  } catch {
    return [];
  }
}

export async function fetchActivities(): Promise<Activity[]> {
  try {
    return await sanityClient.fetch(queries.activities);
  } catch {
    return [];
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    return await sanityClient.fetch(queries.certifications);
  } catch {
    return [];
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    return await sanityClient.fetch(queries.experiences);
  } catch {
    return [];
  }
}

export async function fetchEducation(): Promise<Education[]> {
  try {
    return await sanityClient.fetch(queries.education);
  } catch {
    return [];
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    return await sanityClient.fetch(queries.projects);
  } catch {
    return [];
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch(queries.siteSettings);
  } catch {
    return null;
  }
}
