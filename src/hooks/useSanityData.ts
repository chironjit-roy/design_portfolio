import { useQuery } from "@tanstack/react-query";
import {
  fetchHeroContent,
  fetchSkills,
  fetchActivities,
  fetchCertifications,
  fetchExperiences,
  fetchEducation,
  fetchProjects,
  fetchSiteSettings,
  fetchPageContent,
  fetchNavigation,
  fetchQuickLinks,
  type HeroContent,
  type Skill,
  type Activity,
  type Certification,
  type Experience,
  type Education,
  type Project,
  type SiteSettings,
  type PageContent,
  type NavigationItem,
  type QuickLink,
} from "@/lib/sanity";

// No fallback data - content must come from Sanity CMS

export function useHeroContent() {
  return useQuery<HeroContent | null>({
    queryKey: ["heroContent"],
    queryFn: fetchHeroContent,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSkills() {
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60 * 5,
  });
}

export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: fetchActivities,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCertifications() {
  return useQuery<Certification[]>({
    queryKey: ["certifications"],
    queryFn: fetchCertifications,
    staleTime: 1000 * 60 * 5,
  });
}

export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
    staleTime: 1000 * 60 * 5,
  });
}

export function useEducation() {
  return useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: fetchEducation,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSiteSettings() {
  return useQuery<SiteSettings | null>({
    queryKey: ["siteSettings"],
    queryFn: fetchSiteSettings,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePageContent(pageId: string) {
  return useQuery<PageContent | null>({
    queryKey: ["pageContent", pageId],
    queryFn: () => fetchPageContent(pageId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useNavigation() {
  return useQuery<NavigationItem[]>({
    queryKey: ["navigation"],
    queryFn: fetchNavigation,
    staleTime: 1000 * 60 * 5,
  });
}

export function useQuickLinks() {
  return useQuery<QuickLink[]>({
    queryKey: ["quickLinks"],
    queryFn: fetchQuickLinks,
    staleTime: 1000 * 60 * 5,
  });
}
