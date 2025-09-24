import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView.desktop);

  // Responsive items per view calculation
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setCurrentItemsPerView(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setCurrentItemsPerView(itemsPerView.tablet);
      } else {
        setCurrentItemsPerView(itemsPerView.desktop);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [itemsPerView]);

  const totalSlides = Math.ceil(items.length / currentItemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (autoPlay && !isHovered && totalSlides > 1) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, isHovered, nextSlide, interval, totalSlides]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="w-full flex-shrink-0"
            >
              <div className={`grid gap-6 px-4 ${
                currentItemsPerView === 1 ? 'grid-cols-1' :
                currentItemsPerView === 2 ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {items
                  .slice(
                    slideIndex * currentItemsPerView,
                    (slideIndex + 1) * currentItemsPerView
                  )
                  .map((item, itemIndex) => (
                    <div
                      key={slideIndex * currentItemsPerView + itemIndex}
                      className="w-full"
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Indicator */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="bg-black/20 rounded-full px-3 py-1">
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} / {totalSlides}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};