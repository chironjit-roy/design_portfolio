import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { useExperiences, useEducation, useSiteSettings, usePageContent } from "@/hooks/useSanityData";
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

      <div className="bg-card border border-border p-6 card-lift">
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="section-number">{pageContent?.subtitle || "CURRICULUM VITAE"}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
              {pageContent?.title ? (
                <>
                  {pageContent.title.split(" ")[0]}{" "}
                  <span className="text-gradient">{pageContent.title.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <>
                  Professional <span className="text-gradient">Journey</span>
                </>
              )}
            </h1>
            {pageContent?.description && (
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {pageContent.description}
              </p>
            )}

            {/* Download Button */}
            {settings?.resumeUrl && (
              <motion.a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-8 py-4 mt-8 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:bg-accent/90"
              >
                <Download size={18} />
                Download CV
              </motion.a>
            )}
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : hasContent ? (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Experience Column */}
              {experiences && experiences.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <Briefcase className="text-accent" size={24} />
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
                    <GraduationCap className="text-accent" size={24} />
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
