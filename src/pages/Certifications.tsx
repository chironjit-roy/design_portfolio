import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { useCertifications, useSiteSettings } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import Footer from "@/components/Footer";

const CertificationCard = ({
  title,
  issuer,
  year,
  credentialUrl,
  image,
  index,
}: {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border p-6 card-lift group relative overflow-hidden"
    >
      {/* Badge Icon */}
      <div className="absolute top-4 right-4 text-accent/20 group-hover:text-accent/40 transition-colors">
        <Award size={48} />
      </div>

      {/* Certificate Image if available */}
      {image?.asset && (
        <div className="mb-4 overflow-hidden border border-border">
          <img
            src={urlFor(image).width(400).height(300).url()}
            alt={title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-lg font-heading font-semibold mb-2 pr-12 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4">{issuer}</p>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            {year}
          </span>

          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              <ExternalLink size={14} />
              Verify
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const { data: certifications, isLoading } = useCertifications();
  const { data: settings } = useSiteSettings();

  return (
    <>
      <Helmet>
        <title>Certifications | {settings?.name || "CAD Engineer"}</title>
        <meta name="description" content="View my professional certifications in CAD software, engineering, and industry standards." />
      </Helmet>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="section-number">CERTIFICATION CENTER</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
              Professional <span className="text-gradient">Credentials</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Industry-recognized certifications that validate my expertise in CAD software, engineering practices, and professional standards.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { label: "Total Certifications", value: certifications?.length || 0 },
              { label: "CAD Certifications", value: certifications?.filter((c) => c.title.toLowerCase().includes("cad") || c.title.toLowerCase().includes("solidworks") || c.title.toLowerCase().includes("autocad") || c.title.toLowerCase().includes("catia")).length || 0 },
              { label: "Years of Learning", value: "5+" },
              { label: "Active Credentials", value: certifications?.length || 0 },
            ].map((stat, index) => (
              <div key={stat.label} className="bg-card border border-border p-6 text-center">
                <div className="text-3xl font-heading font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Certifications Grid */}
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications?.map((cert, index) => (
                <CertificationCard
                  key={cert._id}
                  title={cert.title}
                  issuer={cert.issuer}
                  year={cert.year}
                  credentialUrl={cert.credentialUrl}
                  image={cert.image}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Certifications;
