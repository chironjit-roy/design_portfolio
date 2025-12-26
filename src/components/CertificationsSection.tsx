import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ExternalLink, Copy, Check } from "lucide-react";
import { useCertifications } from "@/hooks/useSanityData";
import { Certification, urlForCropped, urlForFull } from "@/lib/sanity";
import ImageLightbox from "@/components/ImageLightbox";

const CertificationCard = ({ 
  cert, 
  index,
  onImageClick 
}: { 
  cert: Certification; 
  index: number;
  onImageClick: (url: string, alt: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);

  const thumbnailUrl = cert.image?.asset?._ref
    ? urlForCropped(cert.image).width(200).height(150).url()
    : null;

  const fullImageUrl = cert.image?.asset?._ref
    ? urlForFull(cert.image).url()
    : null;

  const copyCredentialId = () => {
    if (cert.credentialId) {
      navigator.clipboard.writeText(cert.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-card border border-border card-lift accent-border-hover overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Certificate Image */}
        {thumbnailUrl ? (
          <div 
            className="sm:w-40 sm:flex-shrink-0 aspect-[4/3] sm:aspect-auto bg-secondary cursor-pointer overflow-hidden"
            onClick={() => fullImageUrl && onImageClick(fullImageUrl, cert.title)}
          >
            <img
              src={thumbnailUrl}
              alt={cert.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="sm:w-40 sm:flex-shrink-0 aspect-[4/3] sm:aspect-auto bg-secondary flex items-center justify-center">
            <Award size={48} className="text-accent/30" />
          </div>
        )}

        {/* Content */}
        <div className="flex-grow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-heading font-semibold text-lg text-foreground leading-tight">
                {cert.title}
              </h3>
              <span className="text-accent font-heading font-bold text-lg flex-shrink-0">
                {cert.year}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{cert.issuer}</p>
          </div>

          {/* Credential ID and Actions */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/50">
            {cert.credentialId ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground/70">ID:</span>
                <code className="text-xs font-mono text-accent truncate">{cert.credentialId}</code>
                <button
                  onClick={copyCredentialId}
                  className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                  title="Copy credential ID"
                >
                  {copied ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} className="text-muted-foreground" />
                  )}
                </button>
              </div>
            ) : (
              <div />
            )}

            {/* View Link */}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors flex-shrink-0"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Verify</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: certifications } = useCertifications();
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string } | null>(null);

  return (
    <>
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
              <CertificationCard 
                key={cert._id} 
                cert={cert} 
                index={index}
                onImageClick={(url, alt) => setLightboxImage({ url, alt })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for Certificate Image */}
      <ImageLightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage?.url || ""}
        alt={lightboxImage?.alt || ""}
      />
    </>
  );
};

export default CertificationsSection;
