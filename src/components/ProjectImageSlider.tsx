import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage, urlForCropped, urlForFull } from "@/lib/sanity";
import ImageLightbox from "@/components/ImageLightbox";

interface ProjectImageSliderProps {
  images: SanityImage[];
  mainImage?: SanityImage;
  title: string;
  aspectRatio?: "video" | "square" | "4/3";
}

const ProjectImageSlider = ({ 
  images, 
  mainImage, 
  title,
  aspectRatio = "4/3" 
}: ProjectImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Combine main image with additional images
  const allImages = mainImage ? [mainImage, ...(images || [])] : images || [];
  
  if (allImages.length === 0) {
    return (
      <div className={`aspect-${aspectRatio} bg-secondary flex items-center justify-center`}>
        <span className="text-muted-foreground text-sm">No images</span>
      </div>
    );
  }

  const currentImage = allImages[currentIndex];
  const thumbnailUrl = currentImage?.asset?._ref
    ? urlForCropped(currentImage).width(800).height(600).url()
    : null;
  const fullImageUrl = currentImage?.asset?._ref
    ? urlForFull(currentImage).url()
    : null;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const aspectClass = aspectRatio === "video" 
    ? "aspect-video" 
    : aspectRatio === "square" 
    ? "aspect-square" 
    : "aspect-[4/3]";

  return (
    <>
      <div className={`relative ${aspectClass} overflow-hidden bg-secondary group`}>
        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={thumbnailUrl || ""}
            alt={`${title} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        {/* Navigation Arrows - Only show if more than 1 image */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex 
                      ? "bg-accent w-4" 
                      : "bg-foreground/50 hover:bg-foreground/80"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border text-xs font-mono">
              {currentIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={fullImageUrl || ""}
        alt={`${title} - Image ${currentIndex + 1}`}
      />
    </>
  );
};

export default ProjectImageSlider;