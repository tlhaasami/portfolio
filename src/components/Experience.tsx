"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, Globe, ChevronRight, Sparkles } from "lucide-react";
import { prefixAsset } from "@/utils/prefixAsset";
import SafeImage from "@/components/ui/SafeImage";

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

// Helper to extract relevant skills from the experience description
const extractSkills = (description: string): string[] => {
  const keywords = [
    "GoHighLevel", "GHL", "n8n", "Make", "Go", "Python", "React", "TypeScript", 
    "Machine Learning", "LLM", "API", "CRM", "Automation", "Workflow", "Next.js",
    "SQL", "Full Stack", "Frontend", "Backend", "AI", "Integration"
  ];
  
  const foundSkills = new Set<string>();
  const descLower = description.toLowerCase();
  
  keywords.forEach(keyword => {
    if (descLower.includes(keyword.toLowerCase())) {
      // Standardize display names
      if (keyword === "GHL") foundSkills.add("GoHighLevel");
      else if (keyword === "API") foundSkills.add("APIs");
      else foundSkills.add(keyword);
    }
  });
  
  return Array.from(foundSkills);
};

export default function Experience({ experiences = [] }: ExperienceProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (experiences.length === 0) return null;

  const activeExp = experiences[activeIndex < experiences.length ? activeIndex : 0];

  // Split description by newlines to render as individual lines
  const descriptionLines = activeExp?.description
    ? activeExp.description.split("\n").filter((line) => line.trim().length > 0)
    : [];

  const skills = activeExp ? extractSkills(activeExp.description) : [];

  return (
    <section id="experience" className="relative bg-transparent text-neutral-900 dark:text-white py-24 overflow-hidden">
      {/* Background ambient accent lights */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-neutral-200/10 dark:bg-zinc-900/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-neutral-200/10 dark:bg-zinc-900/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1250px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-3 flex items-center justify-center md:justify-start gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{"// WORK EXPERIENCE"}</span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white relative inline-block">
            Where I&apos;ve Worked
            <span className="absolute -bottom-2 left-0 w-20 h-1.5 bg-neutral-900 dark:bg-white rounded-full hidden md:block" />
          </h2>
        </div>

        {/* Experience Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Responsive Tabs Navigation */}
          <div className="lg:col-span-4 w-full flex flex-col gap-2 z-20">
            {/* Scrollable Horizontal Container for Mobile, Vertical List for Desktop */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2.5 scrollbar-none snap-x snap-mandatory">
              {experiences.map((exp, index) => {
                const isActive = activeIndex === index;
                const displayIndex = String(index + 1).padStart(2, "0");
                
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="relative flex items-center gap-4 text-left px-5 py-4 lg:py-5 rounded-2xl transition-all cursor-pointer shrink-0 snap-center min-w-[140px] md:min-w-[160px] lg:min-w-0 w-auto lg:w-full group select-none overflow-hidden"
                  >
                    {/* Active Sliding Background Capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-neutral-900/5 dark:bg-white/5 border border-neutral-900/10 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Active Left Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicatorLine"
                        className="absolute left-0 top-3 bottom-3 w-1 bg-neutral-900 dark:bg-white rounded-r-md hidden lg:block"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Numeric Indicator */}
                    <span className={`font-mono text-sm tracking-wider font-bold transition-colors shrink-0 ${
                      isActive 
                        ? "text-neutral-900 dark:text-white" 
                        : "text-neutral-450 dark:text-zinc-600 group-hover:text-neutral-700 dark:group-hover:text-zinc-400"
                    }`}>
                      {displayIndex}
                    </span>

                    {/* Company Name */}
                    <span className={`text-sm font-bold tracking-wide transition-colors truncate ${
                      isActive 
                        ? "text-neutral-900 dark:text-white" 
                        : "text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-800 dark:group-hover:text-zinc-200"
                    }`}>
                      {exp.company}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column - Work Details Card */}
          <div className="lg:col-span-8 w-full">
            <AnimatePresence mode="wait">
              {isMounted && activeExp && (
                <motion.div
                  key={activeExp.company + activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative w-full rounded-3xl p-8 md:p-12 backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-neutral-200/50 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
                >
                  {/* Decorative Corner Radial Glow */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-neutral-200/20 dark:bg-zinc-800/10 rounded-full blur-[80px] pointer-events-none" />

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-neutral-200/50 dark:border-white/5 mb-8">
                    <div className="flex items-center gap-4.5">
                      {/* Logo Frame — horizontal badge container with solid white bg to display both square & wide corporate logos with correct aspect ratio */}
                      <div className="w-32 h-16 shrink-0 flex items-center justify-center bg-white border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden p-2.5">
                        {activeExp.logo && activeExp.logo !== "null" && activeExp.logo !== "" ? (
                          <SafeImage
                            src={prefixAsset(activeExp.logo)}
                            alt={`${activeExp.company} logo`}
                            className="w-full h-full object-contain"
                            fallback={
                              <Briefcase className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
                            }
                          />
                        ) : (
                          <Briefcase className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
                        )}
                      </div>

                      {/* Role & Badges */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white leading-tight">
                          {activeExp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-neutral-900/5 dark:bg-white/5 text-neutral-900 dark:text-white border border-neutral-900/10 dark:border-white/10">
                            {activeExp.company}
                          </span>
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-100 dark:bg-zinc-900/50 text-neutral-500 dark:text-zinc-400 border border-neutral-200/40 dark:border-zinc-800/30 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {activeExp.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Social/Website Links */}
                    <div className="flex items-center gap-3 self-start sm:self-center">
                      {activeExp.linkedin && activeExp.linkedin.trim() !== "" && (
                        <a
                          href={activeExp.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn Profile"
                          className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/30 border border-neutral-200/50 dark:border-white/5 text-[#0a66c2] hover:bg-neutral-50 dark:hover:bg-zinc-900/80 transition-all hover:scale-105 shadow-sm"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {activeExp.website && activeExp.website.trim() !== "" && (
                        <a
                          href={activeExp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Company Website"
                          className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/30 border border-neutral-200/50 dark:border-white/5 text-neutral-800 dark:text-white hover:bg-neutral-50 dark:hover:bg-zinc-900/80 transition-all hover:scale-105 shadow-sm"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bullet description items */}
                  <div className="space-y-4 mb-8">
                    {descriptionLines.map((line, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                        className="flex items-start gap-3.5 text-neutral-650 dark:text-neutral-350 text-sm md:text-base leading-relaxed"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-1" />
                        <span>{line}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Dynamic Skills/Tech Tag list */}
                  {skills.length > 0 && (
                    <div className="pt-6 border-t border-neutral-200/50 dark:border-white/5">
                      <div className="flex items-center gap-1.5 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-450" />
                        <span className="text-[10px] font-mono tracking-widest text-neutral-450 dark:text-neutral-500 uppercase">Core Skills Applied</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-neutral-900/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border border-neutral-900/5 dark:border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
