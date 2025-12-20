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
  type HeroContent,
  type Skill,
  type Activity,
  type Certification,
  type Experience,
  type Education,
  type Project,
  type SiteSettings,
} from "@/lib/sanity";

// Fallback data when Sanity is not connected
const fallbackHeroContent: HeroContent = {
  _id: "hero",
  title: "CAD Engineer",
  subtitle: "Engineering precision through CAD mastery.",
  tagline: "01 — INTRODUCTION",
  ctaPrimary: { text: "View Work", link: "/designs" },
  ctaSecondary: { text: "Contact", link: "/contact" },
};

const fallbackSkills: Skill[] = [
  { _id: "1", name: "SolidWorks", category: "CAD Software", proficiency: 95, order: 1 },
  { _id: "2", name: "AutoCAD", category: "CAD Software", proficiency: 90, order: 2 },
  { _id: "3", name: "CATIA", category: "CAD Software", proficiency: 85, order: 3 },
  { _id: "4", name: "Fusion 360", category: "CAD Software", proficiency: 88, order: 4 },
  { _id: "5", name: "Mechanical Design", category: "Engineering", proficiency: 92, order: 5 },
  { _id: "6", name: "FEA Analysis", category: "Engineering", proficiency: 80, order: 6 },
  { _id: "7", name: "3D Modeling", category: "Design", proficiency: 94, order: 7 },
  { _id: "8", name: "Technical Drawing", category: "Design", proficiency: 90, order: 8 },
];

const fallbackActivities: Activity[] = [
  {
    _id: "1",
    title: "Completed Advanced SolidWorks Certification",
    description: "Achieved CSWP certification with distinction, demonstrating proficiency in complex assembly modeling and simulation.",
    date: "2024-12-01",
    category: "Certification",
  },
  {
    _id: "2",
    title: "Led Automotive Component Redesign Project",
    description: "Successfully led a team of 3 engineers to redesign a critical suspension component, reducing weight by 15%.",
    date: "2024-11-15",
    category: "Project",
  },
  {
    _id: "3",
    title: "Published Technical Paper on CAD Optimization",
    description: "Published research on parametric modeling optimization techniques in the Journal of Engineering Design.",
    date: "2024-10-20",
    category: "Publication",
  },
  {
    _id: "4",
    title: "Attended Industry 4.0 Conference",
    description: "Participated in the annual Industry 4.0 conference, focusing on digital twin technology and smart manufacturing.",
    date: "2024-09-10",
    category: "Event",
  },
];

const fallbackCertifications: Certification[] = [
  { _id: "1", title: "Certified SolidWorks Professional (CSWP)", issuer: "Dassault Systèmes", year: "2024", order: 1 },
  { _id: "2", title: "AutoCAD Certified Professional", issuer: "Autodesk", year: "2023", order: 2 },
  { _id: "3", title: "CATIA V5 Mechanical Design Expert", issuer: "Dassault Systèmes", year: "2023", order: 3 },
  { _id: "4", title: "Six Sigma Green Belt", issuer: "ASQ", year: "2022", order: 4 },
  { _id: "5", title: "GD&T Professional Certificate", issuer: "ASME", year: "2022", order: 5 },
  { _id: "6", title: "Project Management Professional (PMP)", issuer: "PMI", year: "2021", order: 6 },
];

const fallbackExperiences: Experience[] = [
  {
    _id: "1",
    title: "Senior CAD Engineer",
    company: "Tech Manufacturing Corp",
    location: "Detroit, MI",
    startDate: "2022-01",
    current: true,
    description: [
      "Lead design team for automotive component development",
      "Implemented parametric design strategies reducing design time by 30%",
      "Managed CAD data and PLM system integration",
    ],
    order: 1,
  },
  {
    _id: "2",
    title: "CAD Designer",
    company: "Precision Engineering Ltd",
    location: "Chicago, IL",
    startDate: "2019-06",
    endDate: "2021-12",
    current: false,
    description: [
      "Developed 3D models for aerospace components",
      "Collaborated with manufacturing team on DFM optimization",
      "Created detailed technical drawings and BOMs",
    ],
    order: 2,
  },
];

const fallbackEducation: Education[] = [
  {
    _id: "1",
    degree: "Master of Science in Mechanical Engineering",
    institution: "University of Michigan",
    location: "Ann Arbor, MI",
    startYear: "2017",
    endYear: "2019",
    description: "Specialized in CAD/CAM systems and manufacturing automation",
    order: 1,
  },
  {
    _id: "2",
    degree: "Bachelor of Science in Mechanical Engineering",
    institution: "Purdue University",
    location: "West Lafayette, IN",
    startYear: "2013",
    endYear: "2017",
    order: 2,
  },
];

const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Precision Gearbox Assembly",
    category: "Mechanical",
    description: "High-precision industrial gearbox design with custom tooth profiles for minimal backlash and maximum efficiency.",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    problem: "Client needed a compact gearbox with 99% efficiency",
    solution: "Developed custom helical gear profiles with optimized bearing placement",
    tools: ["SolidWorks", "ANSYS", "GD&T"],
    featured: true,
    order: 1,
  },
  {
    _id: "2",
    title: "Automotive Suspension System",
    category: "Automotive",
    description: "Complete front suspension redesign for improved handling and reduced unsprung mass.",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    problem: "Existing suspension was too heavy and had poor kinematics",
    solution: "Redesigned using topology optimization and advanced materials",
    tools: ["CATIA", "ANSYS", "Adams"],
    featured: true,
    order: 2,
  },
  {
    _id: "3",
    title: "Industrial Robot End Effector",
    category: "Manufacturing",
    description: "Custom end effector for automated assembly line with precision gripping mechanism.",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    tools: ["SolidWorks", "MATLAB"],
    featured: true,
    order: 3,
  },
  {
    _id: "4",
    title: "Aerospace Bracket Optimization",
    category: "Aerospace",
    description: "Topology-optimized aircraft mounting bracket achieving 40% weight reduction.",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    tools: ["CATIA", "HyperMesh", "OptiStruct"],
    featured: false,
    order: 4,
  },
];

const fallbackSettings: SiteSettings = {
  _id: "settings",
  name: "John Engineer",
  tagline: "CAD Engineer | Precision Design",
  email: "john@engineer.com",
  phone: "+1 (555) 123-4567",
  location: "Detroit, MI",
  socialLinks: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
};

export function useHeroContent() {
  return useQuery({
    queryKey: ["heroContent"],
    queryFn: fetchHeroContent,
    staleTime: 1000 * 60 * 5,
    select: (data) => data || fallbackHeroContent,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60 * 5,
    select: (data) => (data && data.length > 0 ? data : fallbackSkills),
  });
}

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
    staleTime: 1000 * 60 * 5,
    select: (data) => (data && data.length > 0 ? data : fallbackActivities),
  });
}

export function useCertifications() {
  return useQuery({
    queryKey: ["certifications"],
    queryFn: fetchCertifications,
    staleTime: 1000 * 60 * 5,
    select: (data) => (data && data.length > 0 ? data : fallbackCertifications),
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
    staleTime: 1000 * 60 * 5,
    select: (data) => (data && data.length > 0 ? data : fallbackExperiences),
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: fetchEducation,
    staleTime: 1000 * 60 * 5,
    select: (data) => (data && data.length > 0 ? data : fallbackEducation),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
    select: (data) => (data && data.length > 0 ? data : fallbackProjects),
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: fetchSiteSettings,
    staleTime: 1000 * 60 * 5,
    select: (data) => data || fallbackSettings,
  });
}
