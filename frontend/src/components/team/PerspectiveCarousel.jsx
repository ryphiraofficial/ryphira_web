import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamCard from "./TeamCard";
import { useAutoPlay } from "../../hooks/useAutoPlay";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const DEFAULT_TRANSITION = {
  type: "spring",
  bounce: 0.14,
  duration: 0.9,
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Helper for shortest circular offset in an infinite loop
const getCircularOffset = (currIndex, itemIndex, totalItems) => {
  if (totalItems <= 1) return 0;
  let offset = itemIndex - currIndex;
  const half = Math.floor(totalItems / 2);
  
  if (offset > half) {
    offset -= totalItems;
  } else if (offset < -half) {
    offset += totalItems;
  }
  return offset;
};

export function PerspectiveCarousel({
  items = [],
  loop = true,
  slideWidth = 300,
  rotationStep = 25,
  inactiveScale = 0.82,
  transition = DEFAULT_TRANSITION,
  autoPlay = true,
  autoPlayInterval = 3000,
}) {
  const maxIndex = Math.max(0, items.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeSlideWidth = Math.max(120, slideWidth);
  const safeInactiveScale = clamp(inactiveScale, 0.5, 1);

  const selectSlide = useCallback(
    (nextIndex) => {
      if (!items.length) return;
      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex);
      setCurrentIndex(resolvedIndex);
    },
    [items.length, loop, maxIndex]
  );

  const handleNext = useCallback(() => {
    selectSlide(currentIndex + 1);
  }, [currentIndex, selectSlide]);

  const handlePrev = useCallback(() => {
    selectSlide(currentIndex - 1);
  }, [currentIndex, selectSlide]);

  useAutoPlay({
    itemsCount: items.length,
    autoPlay,
    intervalMs: autoPlayInterval,
    onNext: handleNext,
  });

  if (!items.length) return null;

  return (
    <div
      role="region"
      aria-label="Perspective team member carousel"
      className="relative isolate w-full flex flex-col items-center select-none py-2"
    >
      {/* Full-width 3D Viewport */}
      <div className="relative w-full h-[400px] overflow-hidden" style={{ perspective: "1400px" }}>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center w-full h-full">
          {items.map((item, index) => {
            const offset = getCircularOffset(currentIndex, index, items.length);
            const isActive = offset === 0;
            const distance = Math.abs(offset);
            const isVisible = distance <= 2;

            return (
              <motion.div
                key={item.id || index}
                className="absolute flex flex-col items-center justify-center will-change-transform"
                style={{
                  width: safeSlideWidth,
                  perspective: "1400px",
                  transformStyle: "preserve-3d",
                  zIndex: items.length - distance,
                }}
                animate={{
                  x: offset * (safeSlideWidth * 0.85),
                  rotateY: -offset * rotationStep,
                  scale: isActive ? 1 : Math.max(0.72, safeInactiveScale - (distance - 1) * 0.08),
                  opacity: isVisible ? (isActive ? 1 : distance === 1 ? 0.8 : 0.45) : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                transition={transition}
              >
                <TeamCard
                  item={item}
                  isActive={isActive}
                  onClick={() => selectSlide(index)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls and Indicator Dots */}
      <div className="relative z-20 mt-8 mx-auto flex w-fit items-center justify-center gap-4 rounded-full border border-slate-200 bg-white/95 px-5 py-2.5 text-slate-800 shadow-md backdrop-blur-md">
        <button
          type="button"
          aria-label="Show previous slide"
          className="inline-flex size-9 items-center justify-center rounded-full transition-all hover:bg-slate-100 active:scale-95 cursor-pointer"
          onClick={handlePrev}
        >
          <ChevronLeft className="size-5 text-slate-700" />
        </button>

        <div className="flex items-center justify-center gap-1.5 max-w-[200px] overflow-hidden px-1">
          {items.map((item, index) => (
            <button
              key={item.id || index}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                currentIndex === index
                  ? "w-6 bg-[#22c55e]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              )}
              onClick={() => selectSlide(index)}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Show next slide"
          className="inline-flex size-9 items-center justify-center rounded-full transition-all hover:bg-slate-100 active:scale-95 cursor-pointer"
          onClick={handleNext}
        >
          <ChevronRight className="size-5 text-slate-700" />
        </button>
      </div>
    </div>
  );
}

export default PerspectiveCarousel;
