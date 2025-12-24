import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor, SanityImage } from "@/lib/sanity";
import { cn } from "@/lib/utils";

interface ActivityImageSliderProps {
  images: SanityImage[];
  title: string;
}

const ActivityImageSlider = ({ images, title }: ActivityImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative mb-4 overflow-hidden border border-border group/slider">
      {/* Main Image */}
      <div className="aspect-video bg-secondary flex items-center justify-center">
        <img
          src={urlFor(images[currentIndex]).width(600).url()}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300"
        />
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-background"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-background"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-accent w-4"
                    : "bg-foreground/40 hover:bg-foreground/60"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 text-xs rounded border border-border">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityImageSlider;
