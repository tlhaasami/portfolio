"use client";

import React, { useState, useEffect, useRef } from "react";

interface MobileCarouselProps {
  items: React.ReactNode[];
  autoPlayInterval?: number;
}

export default function MobileCarousel({ items, autoPlayInterval = 4000 }: MobileCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (items.length > 1) {
      startTimer();
    }
    return () => stopTimer();
  }, [items.length, autoPlayInterval]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Restart timer on manual click to give user time to read
    startTimer();
  };

  if (items.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Cards Display Window */}
      <div className="relative w-full overflow-hidden min-h-[360px] xs:min-h-[380px] sm:min-h-[420px] md:min-h-[460px]">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <div
              key={idx}
              className={`absolute inset-x-0 top-0 transition-all duration-700 ease-in-out transform flex justify-center ${
                isActive
                  ? "opacity-100 translate-x-0 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 translate-x-12 scale-95 pointer-events-none z-0"
              }`}
            >
              <div className="w-full max-w-lg px-2">
                {item}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Pill Dot Indicators */}
      {items.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 z-10">
          {items.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-300 ease-out cursor-pointer focus:outline-none ${
                  isActive
                    ? "w-8 h-2 rounded-full bg-amber-600 dark:bg-amber-500 shadow-sm"
                    : "w-2.5 h-2.5 rounded-full bg-neutral-250 hover:bg-neutral-350 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
