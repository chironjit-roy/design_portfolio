import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Layers, PenTool, Box, Settings, Ruler, LucideIcon } from "lucide-react";
import { useSkills } from "@/hooks/useSanityData";
import { Skill } from "@/lib/sanity";

const iconMap: Record<string, LucideIcon> = {
  "2D Design": PenTool,
  "3D Modeling": Box,
  "Surface Design": Layers,
  "CAM/CAD": Settings,
  "Mechanical": Cpu,
  "Drafting": Ruler,
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const IconComponent = iconMap[skill.category] || Cpu;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group p-6 bg-card border border-border card-lift accent-border-hover"
    >
      {/* Icon and Category */}
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-secondary border border-border">
          <IconComponent size={24} className="text-accent" />
        </div>
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          {skill.category}
        </span>
      </div>

      {/* Skill Name */}
      <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
        {skill.name}
      </h3>

      {/* Confidence Meter */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Proficiency</span>
          <span className="text-foreground font-medium">{skill.proficiency}%</span>
        </div>
        <div className="h-1 bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.proficiency}%` } : {}}
            transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            className="h-full bg-accent"
          />
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: skills } = useSkills();

  return (
    <section id="skills" className="py-32 relative">
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
          <span className="section-number">02 — EXPERTISE</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
            Technical Skills
          </h2>
          <p className="text-muted-foreground text-lg">
            Precision engineering capabilities developed through years of professional experience
            in CAD design and mechanical engineering.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills?.map((skill, index) => (
            <SkillCard key={skill._id} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
