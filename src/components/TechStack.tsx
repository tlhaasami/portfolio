"use client";

import React, { useState, useEffect, useMemo } from "react";
import LogoLoop, { LogoItem } from "@/components/ui/LogoLoop";
import { prefixAsset, getPrefix } from "@/utils/prefixAsset";

interface TechItem {
  name: string;
  category: string;
  color: string;
  logo: string;
}

export default function TechStack() {
  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({});
  const [techList, setTechList] = useState<TechItem[]>([]);
  const [settings, setSettings] = useState({
    cardSize: 96,
    logoSize: 48,
    speed: 25,
    gap: 16,
    pauseOnHover: true,
    scaleOnHover: true
  });

  useEffect(() => {
    const prefix = getPrefix();

    // 1. Fetch technologies list
    fetch(`${prefix}/data/profileData/technologies.json`)
      .then((res) => res.json())
      .then((data) => setTechList(data))
      .catch((err) => console.error("Error loading technologies:", err));

    // 2. Fetch/Load custom settings
    try {
      const stored = localStorage.getItem("portfolio-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.techSettings) {
          setSettings((prev) => ({
            ...prev,
            ...parsed.techSettings
          }));
        }
      } else {
        fetch(`${prefix}/data/profileData/portfolio-defaults.json`)
          .then((res) => res.json())
          .then((defaults) => {
            if (defaults.techSettings) {
              setSettings((prev) => ({
                ...prev,
                ...defaults.techSettings
              }));
            }
          })
          .catch((err) => console.error("Error loading defaults:", err));
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    }
  }, []);

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
              className="flex items-center justify-center bg-neutral-50 dark:bg-zinc-950 border border-neutral-200/60 dark:border-zinc-900 rounded-[24px] shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-400 dark:hover:border-zinc-700 select-none group"
              style={{ width: `${settings.cardSize}px`, height: `${settings.cardSize}px` }}
            >
              {isBroken ? (
                // Alternate elegant code/terminal fallback icon colored matching the brand color
                <div 
                  className="w-full h-full flex items-center justify-center rounded-[24px] transition-all duration-300"
                  style={{ 
                    color: t.color || '#9ca3af', 
                    backgroundColor: `${t.color || '#9ca3af'}15` 
                  }}
                >
                  <svg className="w-6 h-6 stroke-current fill-none animate-pulse" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={prefixAsset(t.logo)}
                  alt={`${t.name} logo`}
                  onError={() => {
                    setBrokenLogos((prev) => ({
                      ...prev,
                      [t.name]: true
                    }));
                  }}
                  className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-350"
                  style={{ width: `${settings.logoSize}px`, height: `${settings.logoSize}px` }}
                  draggable={false}
                  loading="lazy"
                />
              )}
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
  }, [settings.cardSize, settings.logoSize, settings.gap, settings.pauseOnHover, settings.scaleOnHover, brokenLogos]);

  return (
    <section
      id="tech-stack"
      className="relative bg-transparent text-neutral-900 dark:text-white py-24 overflow-hidden"
    >
      {/* Background ambient radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-200/20 dark:bg-neutral-900/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* Title block container (standard width) */}
      <div className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 mb-16">
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
          <span>// MY TECH STACK</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          Ecosystem & Tools
        </h2>
        <p className="mt-4 text-neutral-500 dark:text-neutral-450 font-sans max-w-2xl leading-relaxed">
          A structured breakdown of languages, databases, cloud DevOps configurations, workflow automations, 
          and developer environments.
        </p>
      </div>

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
