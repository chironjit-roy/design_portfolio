import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import { useExperiences, useEducation, useSiteSettings } from "@/hooks/useSanityData";
import { Experience, Education } from "@/lib/sanity";

const ExperienceItem = ({ item, index }: { item: Experience; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const formatPeriod = (start: string, end?: string, current?: boolean) => {
    const startYear = new Date(start).getFullYear();
    if (current) return `${startYear} — Present`;
    if (end) return `${startYear} — ${new Date(end).getFullYear()}`;
    return `${startYear}`;
  };

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
              {item.title}
            </h4>
            <p className="text-accent text-sm">{item.company}</p>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {formatPeriod(item.startDate, item.endDate, item.current)}
          </span>
        </div>

        {item.description && item.description.length > 0 && (
          <>
            <p className="text-muted-foreground">{item.description[0]}</p>
            {item.description.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {item.description.slice(1).map((desc) => (
                  <span
                    key={desc}
                    className="px-3 py-1 bg-secondary border border-border text-xs text-muted-foreground"
                  >
                    {desc}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

const EducationItem = ({ item, index }: { item: Education; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
              {item.degree}
            </h4>
            <p className="text-accent text-sm">{item.institution}</p>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {item.endYear}
          </span>
        </div>
        {item.description && (
          <p className="text-muted-foreground">{item.description}</p>
        )}
      </div>
    </motion.div>
  );
};

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: experiences } = useExperiences();
  const { data: education } = useEducation();
  const { data: settings } = useSiteSettings();

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
          {settings?.resumeUrl && (
            <motion.a
              href={settings.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:bg-accent/90 self-start md:self-auto"
            >
              <Download size={18} />
              Download CV
            </motion.a>
          )}
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
              {experiences?.map((item, index) => (
                <ExperienceItem key={item._id} item={item} index={index} />
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
              {education?.map((item, index) => (
                <EducationItem key={item._id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
