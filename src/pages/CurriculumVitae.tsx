import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, MapPin, Calendar, Award, Mail, Phone, Globe } from "lucide-react";
import { useExperiences, useEducation, useSiteSettings, usePageContent, useCertifications, useSkills } from "@/hooks/useSanityData";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import EmptyState from "@/components/EmptyState";

const TimelineItem = ({
  title,
  subtitle,
  location,
  startDate,
  endDate,
  current,
  description,
  index,
  type,
}: {
  title: string;
  subtitle: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string[];
  index: number;
  type: "experience" | "education";
}) => {
  const Icon = type === "experience" ? Briefcase : GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, x: type === "experience" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l border-border group"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 bg-background border-2 border-accent rounded-full group-hover:bg-accent transition-colors" />

      <div className="bg-card border border-border p-6 card-lift hover:border-accent/50 transition-colors">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-2 bg-accent/10 text-accent rounded">
            <Icon size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg">{title}</h3>
            <p className="text-accent">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} />
            {location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} />
            {startDate} — {current ? "Present" : endDate}
          </span>
        </div>

        {description && description.length > 0 && (
          <ul className="space-y-2">
            {description.map((point, i) => (
              <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

const CurriculumVitae = () => {
  const { data: experiences, isLoading: expLoading } = useExperiences();
  const { data: education, isLoading: eduLoading } = useEducation();
  const { data: certifications } = useCertifications();
  const { data: skills } = useSkills();
  const { data: settings } = useSiteSettings();
  const { data: pageContent } = usePageContent("cv");

  const isLoading = expLoading || eduLoading;
  const hasContent = (experiences && experiences.length > 0) || (education && education.length > 0);

  return (
    <>
      <PageSEO
        seo={pageContent?.seo}
        fallbackTitle={pageContent?.title || "Curriculum Vitae"}
        fallbackDescription={pageContent?.description || "Professional experience and education"}
        siteName={settings?.name}
      />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header with Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="bg-card border border-border p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left - Name and Title */}
                <div className="flex-1">
                  <span className="section-number">{pageContent?.subtitle || "CURRICULUM VITAE"}</span>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
                    {settings?.name || "Professional"}
                    <span className="text-gradient block mt-1">
                      {pageContent?.title?.split(" ").slice(1).join(" ") || "Journey"}
                    </span>
                  </h1>
                  {pageContent?.description && (
                    <p className="text-muted-foreground mt-4 max-w-xl">
                      {pageContent.description}
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 mt-6 text-sm">
                    {settings?.email && (
                      <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                        <Mail size={16} />
                        {settings.email}
                      </a>
                    )}
                    {settings?.phone && (
                      <a href={`tel:${settings.phone}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                        <Phone size={16} />
                        {settings.phone}
                      </a>
                    )}
                    {settings?.location && (
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <Globe size={16} />
                        {settings.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right - Download Button */}
                <div className="flex flex-col gap-4">
                  {settings?.resumeUrl && (
                    <motion.a
                      href={settings.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:bg-accent/90"
                    >
                      <Download size={18} />
                      Download CV
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
                <div className="text-center p-4 bg-secondary/50 border border-border">
                  <div className="text-3xl font-heading font-bold text-accent">
                    {experiences?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Positions</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 border border-border">
                  <div className="text-3xl font-heading font-bold text-accent">
                    {education?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Degrees</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 border border-border">
                  <div className="text-3xl font-heading font-bold text-accent">
                    {certifications?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Certifications</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 border border-border">
                  <div className="text-3xl font-heading font-bold text-accent">
                    {skills?.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Skills</div>
                </div>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : hasContent ? (
            <div className="space-y-16">
              {/* Experience and Education Grid */}
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Experience Column */}
                {experiences && experiences.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-2 bg-accent/10 rounded">
                        <Briefcase className="text-accent" size={24} />
                      </div>
                      <h2 className="text-2xl font-heading font-semibold">Experience</h2>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="space-y-0">
                      {experiences.map((exp, index) => (
                        <TimelineItem
                          key={exp._id}
                          title={exp.title}
                          subtitle={exp.company}
                          location={exp.location}
                          startDate={exp.startDate}
                          endDate={exp.endDate}
                          current={exp.current}
                          description={exp.description}
                          index={index}
                          type="experience"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Column */}
                {education && education.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-2 bg-accent/10 rounded">
                        <GraduationCap className="text-accent" size={24} />
                      </div>
                      <h2 className="text-2xl font-heading font-semibold">Education</h2>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="space-y-0">
                      {education.map((edu, index) => (
                        <TimelineItem
                          key={edu._id}
                          title={edu.degree}
                          subtitle={edu.institution}
                          location={edu.location}
                          startDate={edu.startYear}
                          endDate={edu.endYear}
                          description={edu.description ? [edu.description] : undefined}
                          index={index}
                          type="education"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Certifications Section */}
              {certifications && certifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-2 bg-accent/10 rounded">
                      <Award className="text-accent" size={24} />
                    </div>
                    <h2 className="text-2xl font-heading font-semibold">Certifications</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 bg-card border border-border hover:border-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-heading font-semibold text-sm">{cert.title}</h3>
                            <p className="text-muted-foreground text-xs mt-1">{cert.issuer}</p>
                          </div>
                          <span className="text-accent font-mono text-sm">{cert.year}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {skills && skills.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-2 bg-accent/10 rounded">
                      <Award className="text-accent" size={24} />
                    </div>
                    <h2 className="text-2xl font-heading font-semibold">Technical Skills</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03 }}
                        className="p-4 bg-card border border-border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-heading font-medium text-sm">{skill.name}</span>
                          <span className="text-accent text-xs font-mono">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1 bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.03 }}
                            className="h-full bg-accent"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              title="No CV Content Added"
              message="Add experience and education in Sanity CMS to display them here."
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CurriculumVitae;
