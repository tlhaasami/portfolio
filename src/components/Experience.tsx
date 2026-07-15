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
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (experiences.length === 0) return null;

  // Render top 6 unless expanded
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 6);

  // Make sure the active index is within bounds of visible items
  const activeExp = experiences[activeIndex < experiences.length ? activeIndex : 0];
  const items = visibleExperiences.map((exp) => exp.company);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleToggleShowAll = () => {
    // If collapsing and active index is out of visible bounds, reset to 0
    if (showAll && activeIndex >= 6) {
      setActiveIndex(0);
    }
    setShowAll(!showAll);
  };

  // Split description by newlines to render as individual lines
  const descriptionLines = activeExp?.description
    ? activeExp.description.split("\n").filter((line) => line.trim().length > 0)
    : [];

  return (
    <section id="experience" className="relative bg-white dark:bg-black text-neutral-900 dark:text-white py-24 overflow-hidden border-t border-neutral-200 dark:border-neutral-900">
      {/* Background ambient accent */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neutral-200/25 dark:bg-neutral-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-widest text-zinc-550 uppercase mb-3 block flex items-center gap-2">
            <svg className="w-3.5 h-3.5 stroke-neutral-950 dark:stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>// WORK EXPERIENCE</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Where I've Worked
          </h2>
        </div>

        {/* Experience Split Grid - Narrower gap */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
          
          {/* Left Column - Navigation Sidebar (Spans 4 columns, no background/border) */}
          <div className="md:col-span-4 flex flex-col">
            <LineSidebar
              items={items}
              defaultActive={activeIndex}
              onItemClick={handleItemClick}
              accentColor="var(--foreground)" // Neutral foreground
              textColor="var(--foreground)"
              markerColor="#71717a"
              fontSize={1.05}
              itemGap={18}
              smoothing={150}
            />
            {experiences.length > 6 && (
              <button
                onClick={handleToggleShowAll}
                className="mt-6 px-4 py-2.5 text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-900 dark:text-white border border-neutral-200 dark:border-zinc-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-zinc-900 transition-all w-full flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {showAll ? "Show Less" : `Show More (${experiences.length - 6} more)`}
              </button>
            )}
          </div>

          {/* Right Column - Work Details Card (Spans 8 columns) */}
          <div className="md:col-span-8 w-full">
            <AnimatePresence mode="wait">
              {isMounted && activeExp && (
                <motion.div
                  key={activeExp.company}
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
                              <img
                                src={activeExp.logo}
                                alt={`${activeExp.company} logo`}
                                className="w-full h-full object-contain rounded-xl"
                              />
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
                                <svg className="w-8 h-8 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
