import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useProjects } from "@/hooks/useSanityData";
import { urlFor, type Project } from "@/lib/sanity";

const placeholderImages = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
];

const ProjectCard = ({ project, index, onClick }: { 
  project: Project; 
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const imageUrl = project.image?.asset?._ref
    ? urlFor(project.image).width(800).height(600).url()
    : placeholderImages[index % placeholderImages.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-secondary border border-border mb-6 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <ArrowUpRight className="text-accent-foreground" size={20} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <span className="text-xs text-accent tracking-widest uppercase">
          {project.category}
        </span>
        <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose, index }: { 
  project: Project; 
  onClose: () => void;
  index: number;
}) => {
  const imageUrl = project.image?.asset?._ref
    ? urlFor(project.image).width(1200).url()
    : placeholderImages[index % placeholderImages.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border max-w-3xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-8 border-b border-border">
          <div>
            <span className="text-xs text-accent tracking-widest uppercase">
              {project.category}
            </span>
            <h2 className="font-heading font-bold text-3xl mt-2">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Preview */}
          <div className="aspect-video overflow-hidden border border-border">
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg">{project.description}</p>

          {/* Problem & Solution */}
          {(project.problem || project.solution) && (
            <div className="grid md:grid-cols-2 gap-8">
              {project.problem && (
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent">
                    Problem
                  </h4>
                  <p className="text-muted-foreground">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent">
                    Solution
                  </h4>
                  <p className="text-muted-foreground">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Tools */}
          {project.tools && project.tools.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent">
                Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-secondary border border-border text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Only show featured projects on home page
  const featuredProjects = projects?.filter(p => p.featured).slice(0, 4) || [];

  return (
    <section id="portfolio" className="py-32 relative">
      {/* Divider */}
      <div className="divider-line mb-32" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <span className="section-number">03 — PORTFOLIO</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
            Featured Designs
          </h2>
          <p className="text-muted-foreground text-lg">
            A curated collection of engineering projects showcasing precision,
            innovation, and technical excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onClick={() => {
                setSelectedProject(project);
                setSelectedIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          index={selectedIndex}
        />
      )}
    </section>
  );
};

export default PortfolioSection;
