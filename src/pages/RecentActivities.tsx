import { motion } from "framer-motion";
import { Calendar, Tag, ExternalLink } from "lucide-react";
import { useActivities, useSiteSettings, usePageContent } from "@/hooks/useSanityData";
import { urlFor, SanityImage } from "@/lib/sanity";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import EmptyState from "@/components/EmptyState";
import ActivityImageSlider from "@/components/ActivityImageSlider";

const categoryColors: Record<string, string> = {
  Project: "bg-blue-500/20 text-blue-400",
  Certification: "bg-green-500/20 text-green-400",
  Publication: "bg-purple-500/20 text-purple-400",
  Event: "bg-orange-500/20 text-orange-400",
  Achievement: "bg-accent/20 text-accent",
};

const RecentActivities = () => {
  const { data: activities, isLoading } = useActivities();
  const { data: settings } = useSiteSettings();
  const { data: pageContent } = usePageContent("activities");

  return (
    <>
      <PageSEO
        seo={pageContent?.seo}
        fallbackTitle={pageContent?.title || "Recent Activities"}
        fallbackDescription={pageContent?.description || "Latest projects and activities"}
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
            <span className="section-number">{pageContent?.subtitle || "RECENT ACTIVITIES"}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
              {pageContent?.title ? (
                <>
                  {pageContent.title.split(" ")[0]}{" "}
                  <span className="text-gradient">{pageContent.title.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <>
                  What I've Been <span className="text-gradient">Up To</span>
                </>
              )}
            </h1>
            {pageContent?.description && (
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {pageContent.description}
              </p>
            )}
          </motion.div>

          {/* Activities Timeline */}
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activities && activities.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

                {activities.map((activity, index) => (
                  <motion.div
                    key={activity._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative pl-8 md:pl-0 pb-12 ${
                      index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-1/2"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-0 md:left-1/2 top-2 w-3 h-3 bg-accent rounded-full ${
                        index % 2 === 0 ? "md:-translate-x-1/2" : "md:-translate-x-1/2"
                      }`}
                    />

                    <div
                      className={`bg-card border border-border p-6 card-lift ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      {/* Category Badge */}
                      <div className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full mb-4 ${categoryColors[activity.category] || categoryColors.Achievement}`}>
                        <Tag size={12} />
                        {activity.category}
                      </div>

                      {/* Image Slider - supports multiple images or single image */}
                      {(() => {
                        const allImages: SanityImage[] = [];
                        if (activity.images && activity.images.length > 0) {
                          allImages.push(...activity.images.filter(img => img?.asset));
                        } else if (activity.image?.asset) {
                          allImages.push(activity.image);
                        }
                        return allImages.length > 0 ? (
                          <ActivityImageSlider images={allImages} title={activity.title} />
                        ) : null;
                      })()}

                      <h3 className="text-xl font-heading font-semibold mb-2">{activity.title}</h3>
                      <p className="text-muted-foreground mb-4">{activity.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(activity.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {activity.link && (
                          <a
                            href={activity.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-accent hover:underline"
                          >
                            <ExternalLink size={14} />
                            Learn More
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              title="No Activities Added"
              message="Add activities in Sanity CMS to display them here."
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RecentActivities;
