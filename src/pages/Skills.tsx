import { motion } from "framer-motion";
import { useSkills, useSiteSettings, usePageContent } from "@/hooks/useSanityData";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import EmptyState from "@/components/EmptyState";

const SkillCard = ({
  name,
  category,
  proficiency,
  index,
}: {
  name: string;
  category: string;
  proficiency: number;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border p-6 card-lift group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg group-hover:text-accent transition-colors">
            {name}
          </h3>
          <span className="text-sm text-muted-foreground">{category}</span>
        </div>
        <span className="text-2xl font-heading font-bold text-accent">{proficiency}%</span>
      </div>

      {/* Proficiency Meter */}
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-full bg-accent"
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { data: skills, isLoading } = useSkills();
  const { data: settings } = useSiteSettings();
  const { data: pageContent } = usePageContent("skills");

  // Group skills by category
  const groupedSkills = skills?.reduce(
    (acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  return (
    <>
      <PageSEO
        seo={pageContent?.seo}
        fallbackTitle={pageContent?.title || "Skills"}
        fallbackDescription={pageContent?.description || "Technical skills and expertise"}
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
            <span className="section-number">{pageContent?.subtitle || "TECHNICAL EXPERTISE"}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
              {pageContent?.title ? (
                <>
                  {pageContent.title.split(" ")[0]}{" "}
                  <span className="text-gradient">{pageContent.title.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <>
                  Skills & <span className="text-gradient">Proficiencies</span>
                </>
              )}
            </h1>
            {pageContent?.description && (
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {pageContent.description}
              </p>
            )}
          </motion.div>

          {/* Skills by Category */}
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : skills && skills.length > 0 ? (
            <div className="space-y-12">
              {groupedSkills &&
                Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-2xl font-heading font-semibold">{category}</h2>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills?.map((skill, index) => (
                        <SkillCard
                          key={skill._id}
                          name={skill.name}
                          category={skill.category}
                          proficiency={skill.proficiency}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <EmptyState
              title="No Skills Added"
              message="Add skills in Sanity CMS to display them here."
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Skills;
