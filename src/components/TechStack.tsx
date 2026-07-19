"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import LogoLoop, { LogoItem } from "@/components/ui/LogoLoop";
import { prefixAsset } from "@/utils/prefixAsset";
import SafeImage from "@/components/ui/SafeImage";
import portfolioDataStatic from "@/data/portfolioData.json";

interface TechItem {
  name: string;
  category: string;
  color: string;
  logo: string;
}

// Group tech items by category
const categories = ["Frontend & UI", "Backend & Frameworks", "Databases & Caching", "DevOps & Cloud", "Tools & Others"];

const categoryMapping: { [key: string]: string } = {
  "Frontend": "Frontend & UI",
  "Mobile": "Frontend & UI",
  "Backend": "Backend & Frameworks",
  "Databases": "Databases & Caching",
  "DevOps": "DevOps & Cloud",
  "Automation": "Tools & Others",
  "AI": "Tools & Others",
  "Tools": "Tools & Others"
};

const brokenLogos: Record<string, boolean> = {};
const techList: TechItem[] = portfolioDataStatic.technologies as TechItem[];

export default function TechStack() {
  const [settings, setSettings] = useState({
    cardSize: portfolioDataStatic.techSettings.cardSize || 96,
    logoSize: portfolioDataStatic.techSettings.logoSize || 48,
    speed: portfolioDataStatic.techSettings.speed || 25,
    gap: portfolioDataStatic.techSettings.gap || 16,
    pauseOnHover: portfolioDataStatic.techSettings.pauseOnHover !== undefined ? portfolioDataStatic.techSettings.pauseOnHover : true,
    scaleOnHover: portfolioDataStatic.techSettings.scaleOnHover !== undefined ? portfolioDataStatic.techSettings.scaleOnHover : true
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.techSettings) {
          setTimeout(() => {
            setSettings((prev) => ({
              ...prev,
              ...parsed.techSettings
            }));
          }, 0);
        }
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    }
  }, []);

  const categoryGroups = useMemo(() => {
    return categories.map((cat) => {
      const techsInCat = techList.filter((t) => {
        const mappedCat = categoryMapping[t.category] || t.category;
        return mappedCat === cat;
      });
      
      const logos: LogoItem[] = techsInCat.map((t) => {
        const isBroken = brokenLogos[t.name] || !t.logo || t.logo === "null" || t.logo === "";
        
        return {
          node: (
            <div
              className="relative flex items-center justify-center bg-neutral-50 dark:bg-zinc-950 border border-neutral-200/60 dark:border-zinc-900 rounded-[24px] shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-400 dark:hover:border-zinc-700 select-none group overflow-hidden"
              style={{
                width: `var(--tech-card-size, ${settings.cardSize}px)`,
                height: `var(--tech-card-size, ${settings.cardSize}px)`,
                borderRadius: 'var(--tech-card-radius, 24px)'
              }}
            >
              {isBroken ? (
                // Alternate elegant code/terminal fallback icon colored matching the brand color
                <div 
                  className="w-full h-full flex items-center justify-center transition-all duration-300"
                  style={{ 
                    color: t.color || '#9ca3af', 
                    backgroundColor: `${t.color || '#9ca3af'}15`,
                    borderRadius: 'inherit'
                  }}
                >
                  <svg className="w-6 h-6 stroke-current fill-none animate-pulse transition-transform duration-300 group-hover:-translate-y-2.5" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
              ) : (
                <SafeImage
                  src={prefixAsset(t.logo)}
                  alt={`${t.name} logo`}
                  fallback={
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ 
                        color: t.color || '#9ca3af', 
                        backgroundColor: `${t.color || '#9ca3af'}15`,
                        borderRadius: 'inherit'
                      }}
                    >
                      <svg className="w-6 h-6 stroke-current fill-none animate-pulse transition-transform duration-300 group-hover:-translate-y-2.5" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </div>
                  }
                  className="object-contain opacity-90 group-hover:opacity-100 group-hover:-translate-y-2.5 group-hover:scale-95 transition-all duration-300 flex items-center justify-center"
                  style={{
                    width: `var(--tech-logo-size, ${settings.logoSize}px)`,
                    height: `var(--tech-logo-size, ${settings.logoSize}px)`
                  }}
                  draggable={false}
                />
              )}

              <span className="absolute bottom-2.5 left-0 right-0 text-center text-[10px] md:text-[11px] font-semibold tracking-wide opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none px-2 truncate text-neutral-800 dark:text-neutral-200">
                {t.name}
              </span>
            </div>
          ),
          title: t.name
        };
      });

      return {
        name: cat,
        logos
      };
    });
  }, [settings.cardSize, settings.logoSize]);

  return (
    <section
      id="tech-stack"
      className="relative bg-transparent text-neutral-900 dark:text-white py-24 overflow-hidden"
    >
      {/* Background ambient radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-200/20 dark:bg-neutral-900/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* Title block container (standard width) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 mb-16"
      >
        <span className="text-xs font-mono tracking-widest text-zinc-550 dark:text-zinc-400 uppercase mb-3 block flex items-center gap-2 font-bold">
          <svg
            className="w-3.5 h-3.5 fill-none stroke-neutral-950 dark:stroke-white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          <span>{"// MY TECH STACK"}</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          Ecosystem & Tools
        </h2>
        <p className="mt-4 text-neutral-500 dark:text-neutral-450 font-sans max-w-2xl leading-relaxed">
          A structured breakdown of languages, databases, cloud DevOps configurations, workflow automations, 
          and developer environments.
        </p>
      </motion.div>

      {/* Categorized Rows list (expanded width container for larger side coverage!) */}
      <div className="max-w-[1600px] xl:max-w-[1820px] mx-auto relative z-10 space-y-8 py-4">
        {categoryGroups.map((group, idx) => {
          if (group.logos.length === 0) return null;
          return (
            <div 
              key={group.name} 
              className="py-2 space-y-3"
            >
              {/* Heading above the loop (aligned with expanded bounds) */}
              <div className="flex items-center px-6 md:px-12 pl-7 md:pl-13">
                <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-wider font-extrabold text-neutral-400 dark:text-neutral-550">
                  {group.name}
                </h3>
              </div>

              {/* Full-width Logo Loop row */}
              <div className="w-full overflow-hidden relative py-1">
                <LogoLoop
                  logos={group.logos}
                  speed={settings.speed}
                  direction={idx % 2 === 0 ? "left" : "right"} // Alternate scroll directions
                  logoHeight={settings.cardSize}
                  gap={settings.gap}
                  pauseOnHover={settings.pauseOnHover}
                  scaleOnHover={settings.scaleOnHover}
                  fadeOut={true}
                  ariaLabel={group.name}
                />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
