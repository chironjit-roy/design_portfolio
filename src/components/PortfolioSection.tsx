import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Industrial Gearbox Assembly",
    category: "Mechanical Design",
    description: "Complete 3D model and assembly of a high-torque industrial gearbox with precision tolerance specifications.",
    problem: "Client needed a custom gearbox solution for heavy machinery applications.",
    solution: "Designed a modular gearbox system with optimized gear ratios and thermal management.",
    tools: ["SolidWorks", "AutoCAD"],
  },
  {
    id: 2,
    title: "Automotive Suspension System",
    category: "Automotive Engineering",
    description: "Full suspension geometry design with stress analysis and motion simulation.",
    problem: "Performance vehicle required improved handling characteristics.",
    solution: "Developed double-wishbone suspension with adjustable geometry parameters.",
    tools: ["CATIA", "ANSYS"],
  },
  {
    id: 3,
    title: "Precision Tooling Fixture",
    category: "Manufacturing",
    description: "Custom fixture design for CNC machining operations with sub-millimeter accuracy.",
    problem: "Existing fixtures caused positioning errors in production.",
    solution: "Created modular fixture system with kinematic mounting principles.",
    tools: ["Fusion 360", "MasterCAM"],
  },
  {
    id: 4,
    title: "Hydraulic Cylinder Design",
    category: "Fluid Systems",
    description: "Heavy-duty hydraulic cylinder for construction equipment applications.",
    problem: "Standard cylinders failed under extreme operating conditions.",
    solution: "Engineered reinforced cylinder with advanced seal technology.",
    tools: ["Inventor", "AutoCAD"],
  },
];

const ProjectCard = ({ project, index, onClick }: { 
  project: typeof projects[0]; 
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Image Placeholder */}
      <div className="aspect-[4/3] bg-secondary border border-border mb-6 overflow-hidden relative">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-muted-foreground/30">
              0{project.id}
            </div>
            <div className="text-xs text-muted-foreground tracking-widest mt-2 uppercase">
              {project.category}
            </div>
          </div>
        </div>
        
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

const ProjectModal = ({ project, onClose }: { 
  project: typeof projects[0]; 
  onClose: () => void;
}) => {
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
          <div className="aspect-video bg-secondary border border-border grid-pattern opacity-40" />

          {/* Description */}
          <p className="text-muted-foreground text-lg">{project.description}</p>

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent">
                Problem
              </h4>
              <p className="text-muted-foreground">{project.problem}</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent">
                Solution
              </h4>
              <p className="text-muted-foreground">{project.solution}</p>
            </div>
          </div>

          {/* Tools */}
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
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default PortfolioSection;
