"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LineSidebar from "@/components/ui/LineSidebar";
import BorderGlow from "@/components/ui/BorderGlow";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  logo: string;
  description: string;
  linkedin?: string;
  website?: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences = [] }: ExperienceProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (experiences.length === 0) return null;

  // Windowed navigation: show only 8 experiences at a time
  const visibleExperiences = experiences.slice(startIndex, startIndex + 8);
  const items = visibleExperiences.map((exp) => exp.company);

  // Active experience based on absolute index
  const activeExp = experiences[activeIndex < experiences.length ? activeIndex : 0];

  const handleItemClick = (indexInVisibleList: number) => {
    // Map visible list index back to absolute index
    setActiveIndex(startIndex + indexInVisibleList);
  };

  // Up Arrow (above list): slides window UP (towards index 0)
  const handleScrollUpWindow = () => {
    if (startIndex > 0) {
      const nextStart = startIndex - 1;
      setStartIndex(nextStart);
      // Auto-adjust activeIndex if it exceeds the new window boundaries
      if (activeIndex >= nextStart + 8) {
        setActiveIndex(nextStart + 7);
      }
    }
  };

  // Down Arrow (below list): slides window DOWN (towards older experiences)
  const handleScrollDownWindow = () => {
    if (startIndex < experiences.length - 8) {
      const nextStart = startIndex + 1;
      setStartIndex(nextStart);
      // Auto-adjust activeIndex if it falls behind the new window
      if (activeIndex < nextStart) {
        setActiveIndex(nextStart);
      }
    }
  };

  // Split description by newlines to render as individual lines
  const descriptionLines = activeExp?.description
    ? activeExp.description.split("\n").filter((line) => line.trim().length > 0)
    : [];

  return (
    <section id="experience" className="relative bg-transparent text-neutral-900 dark:text-white py-24 overflow-hidden">
      {/* Background ambient accent */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neutral-200/25 dark:bg-neutral-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-widest text-zinc-550 uppercase mb-3 block flex items-center gap-2">
            <svg className="w-3.5 h-3.5 stroke-neutral-955 dark:stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>// WORK EXPERIENCE</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Where I've Worked
          </h2>
        </div>

        {/* Experience Split Grid - 10 Column tight packing */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 md:gap-4 items-center">
          
          {/* Mobile Horizontal Navigation (Visible only on mobile screen widths) */}
          <div className="col-span-1 md:hidden w-full flex flex-row overflow-x-auto scrollbar-none gap-2 pb-4 mb-4 fade-mask-horizontal">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                  activeIndex === index
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold shadow-sm"
                    : "bg-neutral-50 dark:bg-neutral-950 text-neutral-500 hover:text-neutral-800 dark:hover:text-zinc-200 border border-neutral-200/50 dark:border-neutral-900/50"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Left Column - Navigation Sidebar (Spans 2 columns, centered list, strictly windowed to 8 items, hidden on mobile) */}
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center py-2">
            
            {/* Up arrow navigation (above list): shifts window UP (towards index 0) */}
            {experiences.length > 8 && (
              <button
                onClick={handleScrollUpWindow}
                disabled={startIndex === 0}
                className="mb-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/80 p-2 rounded-full disabled:opacity-10 disabled:pointer-events-none transition-all duration-250 cursor-pointer flex items-center justify-center hover:-translate-y-0.5 hover:scale-110"
                title="Scroll Up"
              >
                <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            )}

            <LineSidebar
              items={items}
              defaultActive={activeIndex - startIndex} // Sync active index relative to the visible window
              indexOffset={startIndex} // Sync list count numbering with offset position
              onItemClick={handleItemClick}
              accentColor="var(--foreground)" // Neutral foreground
              textColor="var(--foreground)"
              markerColor="#71717a"
              fontSize={1.05}
              itemGap={18}
              smoothing={150}
            />

            {/* Down arrow navigation (below list): shifts window DOWN (towards older experiences) */}
            {experiences.length > 8 && (
              <button
                onClick={handleScrollDownWindow}
                disabled={startIndex === experiences.length - 8}
                className="mt-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-955 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/80 p-2 rounded-full disabled:opacity-10 disabled:pointer-events-none transition-all duration-250 cursor-pointer flex items-center justify-center hover:translate-y-0.5 hover:scale-110"
                title="Scroll Down"
              >
                <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            )}
          </div>

          {/* Right Column - Work Details Card (Spans 8 columns) */}
          <div className="md:col-span-8 w-full">
            <AnimatePresence mode="wait">
              {isMounted && activeExp && (
                <motion.div
                  key={activeExp.company + activeIndex} // Include index to trigger animation on click
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="40 80 80"
                    backgroundColor="var(--about-card-bg)"
                    borderRadius={24}
                    glowRadius={45}
                    glowIntensity={0.85}
                    coneSpread={25}
                    animated={false}
                    colors={['#ffffff', '#71717a', '#18181b']}
                    className="w-full min-h-[380px] backdrop-blur-md"
                  >
                    <div className="p-8 md:p-12 h-full flex flex-col justify-between">
                      <div>
                        {/* Header: Logo, Role, Company & Links */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-neutral-200/50 dark:border-neutral-900/50 pb-6">
                          <div className="flex items-center gap-4.5">
                            {/* Company Logo Box - No background/borders */}
                            <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              {activeExp.logo ? (
                                <img
                                  src={activeExp.logo}
                                  alt={`${activeExp.company} logo`}
                                  className="w-full h-full object-contain rounded-xl"
                                />
                              ) : (
                                <div className="w-full h-full bg-neutral-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center font-bold text-lg text-neutral-400 dark:text-neutral-500 font-mono">
                                  {activeExp.company.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900 dark:text-white leading-snug">
                                {activeExp.role}
                              </h3>
                              <div className="flex items-center gap-2.5 mt-1">
                                <span className="text-neutral-900 dark:text-white font-extrabold text-sm">
                                  {activeExp.company}
                                </span>
                                <span className="text-neutral-350 dark:text-neutral-600 text-xs">•</span>
                                <span className="text-neutral-500 dark:text-neutral-450 text-xs font-mono">
                                  {activeExp.duration}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Colored Interactive Links - Big icons, no border/bg */}
                          <div className="flex items-center gap-4 self-start sm:self-center">
                            {activeExp.linkedin && (
                              <a
                                href={activeExp.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn Profile"
                                className="transition-transform duration-250 text-[#0a66c2] hover:scale-115 flex items-center justify-center"
                              >
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                              </a>
                            )}
                            {activeExp.website && (
                              <a
                                href={activeExp.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Company Website"
                                className="transition-transform duration-250 text-neutral-900 dark:text-white hover:scale-115 flex items-center justify-center"
                              >
                                <svg className="w-8 h-8 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="2" y1="12" x2="22" y2="12"></line>
                                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Description Lines */}
                        <div className="space-y-4 text-neutral-650 dark:text-neutral-350 text-sm md:text-base leading-relaxed font-sans">
                          {descriptionLines.map((line, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950/70 dark:bg-white/70 shrink-0 mt-2.5" />
                              <span>{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
