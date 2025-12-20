import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    title: "Senior CAD Engineer",
    company: "Precision Engineering Co.",
    period: "2021 — Present",
    description: "Lead designer for complex mechanical assemblies and product development projects.",
    highlights: ["Led team of 5 engineers", "40+ completed projects", "15% efficiency improvement"],
  },
  {
    title: "Mechanical Design Engineer",
    company: "Industrial Solutions Ltd.",
    period: "2018 — 2021",
    description: "Specialized in automotive component design and manufacturing optimization.",
    highlights: ["Design validation", "FEA analysis", "Prototype development"],
  },
  {
    title: "Junior CAD Technician",
    company: "TechDraft Engineering",
    period: "2016 — 2018",
    description: "Technical drawing and documentation for construction and infrastructure projects.",
    highlights: ["2D drafting", "BOM creation", "Drawing standards"],
  },
];

const education = [
  {
    degree: "Master of Engineering",
    field: "Mechanical Engineering",
    institution: "Technical University",
    year: "2016",
  },
  {
    degree: "Bachelor of Science",
    field: "Mechanical Engineering",
    institution: "State University",
    year: "2014",
  },
];

const TimelineItem = ({ item, index, type }: { 
  item: typeof experience[0] | typeof education[0]; 
  index: number;
  type: "experience" | "education";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isExperience = type === "experience";
  const expItem = item as typeof experience[0];
  const eduItem = item as typeof education[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-1 w-2 h-2 -translate-x-1/2 bg-accent" />

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h4 className="font-heading font-semibold text-lg text-foreground">
              {isExperience ? expItem.title : eduItem.degree}
            </h4>
            <p className="text-accent text-sm">
              {isExperience ? expItem.company : `${eduItem.field} — ${eduItem.institution}`}
            </p>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {isExperience ? expItem.period : eduItem.year}
          </span>
        </div>

        {isExperience && (
          <>
            <p className="text-muted-foreground">{expItem.description}</p>
            <div className="flex flex-wrap gap-2">
              {expItem.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1 bg-secondary border border-border text-xs text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-32 relative">
      {/* Divider */}
      <div className="divider-line mb-32" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <span className="section-number">05 — CAREER</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
              Professional Resume
            </h2>
            <p className="text-muted-foreground text-lg">
              A decade of engineering excellence with progressive responsibility
              and continuous professional development.
            </p>
          </div>

          {/* Download Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:bg-accent/90 self-start md:self-auto"
          >
            <Download size={18} />
            Download CV
          </motion.button>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={20} className="text-accent" />
              <h3 className="font-heading font-semibold text-xl tracking-wide uppercase">
                Experience
              </h3>
            </div>
            <div>
              {experience.map((item, index) => (
                <TimelineItem
                  key={item.title}
                  item={item}
                  index={index}
                  type="experience"
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={20} className="text-accent" />
              <h3 className="font-heading font-semibold text-xl tracking-wide uppercase">
                Education
              </h3>
            </div>
            <div>
              {education.map((item, index) => (
                <TimelineItem
                  key={item.degree}
                  item={item}
                  index={index}
                  type="education"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
