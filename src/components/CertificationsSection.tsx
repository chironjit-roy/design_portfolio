import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { useCertifications } from "@/hooks/useSanityData";
import { Certification } from "@/lib/sanity";

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
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
            {cert.title}
          </h3>
          <span className="text-accent font-heading font-bold text-lg flex-shrink-0">
            {cert.year}
          </span>
        </div>
        <p className="text-muted-foreground">{cert.issuer}</p>
        {cert.credentialId && (
          <p className="text-xs text-muted-foreground/70 font-mono">ID: {cert.credentialId}</p>
        )}
      </div>

      {/* View Link */}
      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent transition-colors cursor-pointer">
            <ExternalLink size={16} className="text-muted-foreground" />
          </div>
        </a>
      )}
    </motion.div>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: certifications } = useCertifications();

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
          {certifications?.map((cert, index) => (
            <CertificationCard key={cert._id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
