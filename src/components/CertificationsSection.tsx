import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    name: "Certified SolidWorks Professional",
    issuer: "Dassault Systèmes",
    year: "2023",
    id: "CSWP-2023-4521",
  },
  {
    name: "AutoCAD Professional Certificate",
    issuer: "Autodesk",
    year: "2022",
    id: "ACP-CAD-7892",
  },
  {
    name: "CATIA V5 Mechanical Design",
    issuer: "Dassault Systèmes",
    year: "2023",
    id: "CATIA-MD-3456",
  },
  {
    name: "Fusion 360 CAD/CAM Specialist",
    issuer: "Autodesk",
    year: "2024",
    id: "F360-CAM-1234",
  },
];

const CertificationCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex items-start gap-6 p-6 bg-card border border-border card-lift accent-border-hover"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-14 h-14 bg-secondary border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-400">
        <Award size={24} className="text-accent" />
      </div>

      {/* Content */}
      <div className="flex-grow space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {cert.name}
          </h3>
          <span className="text-accent font-heading font-bold text-lg flex-shrink-0">
            {cert.year}
          </span>
        </div>
        <p className="text-muted-foreground">{cert.issuer}</p>
        <p className="text-xs text-muted-foreground/70 font-mono">ID: {cert.id}</p>
      </div>

      {/* View Link */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent transition-colors cursor-pointer">
          <ExternalLink size={16} className="text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-32 relative">
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
          <span className="section-number">04 — CREDENTIALS</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
            Certifications
          </h2>
          <p className="text-muted-foreground text-lg">
            Industry-recognized certifications validating expertise
            in leading CAD and engineering software platforms.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
