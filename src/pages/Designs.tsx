import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useProjects, useSiteSettings, usePageContent } from "@/hooks/useSanityData";
import { urlFor, type Project } from "@/lib/sanity";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import EmptyState from "@/components/EmptyState";

// Placeholder images for demo
const placeholderImages = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
];

const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  const imageUrl = project.image?.asset?._ref
    ? urlFor(project.image).width(800).height(600).url()
    : placeholderImages[index % placeholderImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden border border-border bg-card card-lift">
        <div className="aspect-[4/3] overflow-hidden bg-secondary flex items-center justify-center">
          <img
            src={imageUrl}
            alt={project.title}
            className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-xs text-accent font-medium tracking-wider uppercase">
            {project.category}
          </span>
          <h3 className="text-xl font-heading font-semibold mt-1">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({
  project,
  onClose,
  index,
}: {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-card border border-border"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm border border-border text-foreground hover:text-accent transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="aspect-video overflow-hidden bg-secondary flex items-center justify-center">
          <img
            src={imageUrl}
            alt={project.title}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <span className="text-sm text-accent font-medium tracking-wider uppercase">
            {project.category}
          </span>
          <h2 className="text-3xl font-heading font-bold mt-2 mb-4">{project.title}</h2>

          <p className="text-muted-foreground mb-6">{project.description}</p>

          {project.problem && (
            <div className="mb-6">
              <h3 className="text-lg font-heading font-semibold mb-2">Problem</h3>
              <p className="text-muted-foreground">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="mb-6">
              <h3 className="text-lg font-heading font-semibold mb-2">Solution</h3>
              <p className="text-muted-foreground">{project.solution}</p>
            </div>
          )}

          {project.tools && project.tools.length > 0 && (
            <div>
              <h3 className="text-lg font-heading font-semibold mb-3">Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium"
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

const Designs = () => {
  const { data: projects, isLoading } = useProjects();
  const { data: settings } = useSiteSettings();
  const { data: pageContent } = usePageContent("designs");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(projects?.map((p) => p.category) || [])];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects?.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageSEO
        seo={pageContent?.seo}
        fallbackTitle={pageContent?.title || "Designs"}
        fallbackDescription={pageContent?.description || "CAD designs and engineering portfolio"}
        siteName={settings?.name}
      />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="section-number">{pageContent?.subtitle || "DESIGN PORTFOLIO"}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
              {pageContent?.title ? (
                <>
                  {pageContent.title.split(" ")[0]}{" "}
                  <span className="text-gradient">{pageContent.title.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <>
                  Engineering <span className="text-gradient">Designs</span>
                </>
              )}
            </h1>
            {pageContent?.description && (
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {pageContent.description}
              </p>
            )}
          </motion.div>

          {/* Category Filter */}
          {projects && projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 text-sm font-heading font-medium tracking-wide uppercase transition-all duration-300 border ${
                    activeCategory === category
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects?.map((project, index) => (
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
          ) : (
            <EmptyState
              title="No Projects Added"
              message="Add projects in Sanity CMS to display them here."
            />
          )}
        </div>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            index={selectedIndex}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Designs;
