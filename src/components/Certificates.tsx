"use client";

import React, { useState, useEffect, useMemo } from "react";
import LogoLoop, { LogoItem } from "@/components/ui/LogoLoop";
import DEFAULT_PORTFOLIO from "@/data/portfolio-defaults.json";
import MobileCarousel from "@/components/ui/MobileCarousel";

interface Certificate {
  name: string;
  issuer: string;
  image: string;
  link: string;
  visible: boolean;
}

interface Achievement {
  name: string;
  issuer: string;
  image: string;
  link: string;
  visible: boolean;
}

export default function Certificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.certificates) {
          setCerts(parsed.certificates);
        } else {
          setCerts(DEFAULT_PORTFOLIO.certificates);
        }
        if (parsed.achievements) {
          setAchievements(parsed.achievements);
        } else {
          setAchievements(DEFAULT_PORTFOLIO.achievements || []);
        }
      } else {
        setCerts(DEFAULT_PORTFOLIO.certificates);
        setAchievements(DEFAULT_PORTFOLIO.achievements || []);
      }
    } catch (e) {
      console.error("Error loading certificates:", e);
      setCerts(DEFAULT_PORTFOLIO.certificates);
      setAchievements(DEFAULT_PORTFOLIO.achievements || []);
    }
  }, []);

  const visibleCerts = certs.filter((c) => c.visible);
  const visibleAchievements = achievements.filter((a) => a.visible);

  // Desktop LogoItems format mapping for LogoLoop marquee
  const certLogoItems = useMemo<LogoItem[]>(() => {
    return visibleCerts.map((cert) => ({
      node: (
        <div
          className="group relative overflow-hidden rounded-[24px] border border-neutral-200/50 dark:border-zinc-800/60 bg-neutral-100 dark:bg-zinc-950 shadow-sm hover:shadow-lg hover:border-neutral-350 dark:hover:border-zinc-700 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)] transition-all duration-300 select-none cursor-pointer"
          style={{ width: "280px", height: "210px" }}
        >
          {/* Background cover image - clean, bright and full color by default */}
          {cert.image ? (
            <img
              src={cert.image}
              alt={`${cert.name} certificate`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : null}

          {/* Gloss sweep reflection animation on hover */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent z-15 pointer-events-none" />

          {/* Bottom Gradient Legibility Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end z-10" />

          {/* Content Overlay */}
          <div className="relative z-20 h-full flex flex-col justify-end p-4 pointer-events-auto">
            <div className="flex items-end justify-between gap-2.5">
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-mono tracking-widest text-neutral-300 uppercase mb-0.5 block font-semibold">
                  {cert.issuer}
                </span>
                <h3 className="text-xs font-bold leading-snug text-white font-sans tracking-tight truncate" title={cert.name}>
                  {cert.name}
                </h3>
              </div>
              
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-lg backdrop-blur-md transition-all duration-300 font-mono text-[8px] uppercase tracking-wider font-extrabold shadow-sm active:scale-95 shrink-0 cursor-pointer"
                >
                  <span>Verify</span>
                  <svg className="w-3 h-3 stroke-current fill-none shrink-0" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ),
      title: cert.name
    }));
  }, [visibleCerts]);

  const achievementLogoItems = useMemo<LogoItem[]>(() => {
    return visibleAchievements.map((ach) => ({
      node: (
        <div
          className="group relative overflow-hidden rounded-[24px] border border-neutral-200/50 dark:border-zinc-800/60 bg-neutral-100 dark:bg-zinc-955 shadow-sm hover:shadow-lg hover:border-neutral-350 dark:hover:border-zinc-700 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)] transition-all duration-300 select-none cursor-pointer"
          style={{ width: "280px", height: "210px" }}
        >
          {/* Background cover image - clean, bright and full color by default */}
          {ach.image ? (
            <img
              src={ach.image}
              alt={`${ach.name} achievement`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : null}

          {/* Gloss sweep reflection animation on hover */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent z-15 pointer-events-none" />

          {/* Bottom Gradient Legibility Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end z-10" />

          {/* Content Overlay */}
          <div className="relative z-20 h-full flex flex-col justify-end p-4 pointer-events-auto">
            <div className="flex items-end justify-between gap-2.5">
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-mono tracking-widest text-neutral-300 uppercase mb-0.5 block font-semibold">
                  {ach.issuer}
                </span>
                <h3 className="text-xs font-bold leading-snug text-white font-sans tracking-tight truncate" title={ach.name}>
                  {ach.name}
                </h3>
              </div>
              
              {ach.link && (
                <a
                  href={ach.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-lg backdrop-blur-md transition-all duration-300 font-mono text-[8px] uppercase tracking-wider font-extrabold shadow-sm active:scale-95 shrink-0 cursor-pointer"
                >
                  <span>Verify</span>
                  <svg className="w-3 h-3 stroke-current fill-none shrink-0" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ),
      title: ach.name
    }));
  }, [visibleAchievements]);

  // Mobile Carousel items mapping (stretches to full screen width smoothly)
  const certSlides = useMemo(() => {
    return visibleCerts.map((cert) => (
      <div
        key={cert.name}
        className="group relative overflow-hidden rounded-[24px] border border-neutral-200/50 dark:border-zinc-800/60 bg-neutral-100 dark:bg-zinc-950 shadow-sm w-full aspect-[4/3]"
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={`${cert.name} certificate`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : null}

        {/* Gloss sweep reflection animation on hover */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent z-15 pointer-events-none" />

        {/* Bottom Gradient Legibility Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end z-10" />

        {/* Content Overlay */}
        <div className="relative z-20 h-full flex flex-col justify-end p-6 pointer-events-auto text-left">
          <div className="flex items-end justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-mono tracking-widest text-neutral-300 uppercase mb-0.5 block font-semibold">
                {cert.issuer}
              </span>
              <h3 className="text-xs font-bold leading-snug text-white font-sans tracking-tight truncate" title={cert.name}>
                {cert.name}
              </h3>
            </div>
            
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-lg backdrop-blur-md transition-all duration-300 font-mono text-[8px] uppercase tracking-wider font-extrabold shadow-sm active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Verify</span>
                <svg className="w-3 h-3 stroke-current fill-none shrink-0" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    ));
  }, [visibleCerts]);

  const achievementSlides = useMemo(() => {
    return visibleAchievements.map((ach) => (
      <div
        key={ach.name}
        className="group relative overflow-hidden rounded-[24px] border border-neutral-200/50 dark:border-zinc-800/60 bg-neutral-100 dark:bg-zinc-955 shadow-sm w-full aspect-[4/3]"
      >
        {ach.image ? (
          <img
            src={ach.image}
            alt={`${ach.name} achievement`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : null}

        {/* Gloss sweep reflection animation on hover */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent z-15 pointer-events-none" />

        {/* Bottom Gradient Legibility Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end z-10" />

        {/* Content Overlay */}
        <div className="relative z-20 h-full flex flex-col justify-end p-6 pointer-events-auto text-left">
          <div className="flex items-end justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-mono tracking-widest text-neutral-300 uppercase mb-0.5 block font-semibold">
                {ach.issuer}
              </span>
              <h3 className="text-xs font-bold leading-snug text-white font-sans tracking-tight truncate" title={ach.name}>
                {ach.name}
              </h3>
            </div>
            
            {ach.link && (
              <a
                href={ach.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-lg backdrop-blur-md transition-all duration-300 font-mono text-[8px] uppercase tracking-wider font-extrabold shadow-sm active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Verify</span>
                <svg className="w-3 h-3 stroke-current fill-none shrink-0" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    ));
  }, [visibleAchievements]);

  if (visibleCerts.length === 0 && visibleAchievements.length === 0) return null;

  return (
    <section
      id="certifications"
      className="relative bg-transparent text-neutral-900 dark:text-white py-24 overflow-hidden"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-200/20 dark:bg-neutral-900/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* Title container (standard width) */}
      <div className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 mb-16">
        <span className="text-xs font-mono tracking-widest text-zinc-550 dark:text-zinc-400 uppercase mb-3 block flex items-center gap-2 font-bold">
          <svg
            className="w-3.5 h-3.5 stroke-neutral-950 dark:stroke-white fill-none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4l3 3"></path>
          </svg>
          <span>// CREDENTIALS & ACHIEVEMENTS</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          Verified Certifications & Honors
        </h2>
        <p className="mt-4 text-neutral-500 dark:text-neutral-450 font-sans max-w-2xl leading-relaxed">
          A comprehensive track record of software engineering completions, competitive coding victories, and technical placements.
        </p>
      </div>

      {/* Loop content (expanded width container for larger side coverage) */}
      <div className="max-w-[1600px] xl:max-w-[1820px] mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Row 1: Certifications */}
        {visibleCerts.length > 0 && (
          <div className="w-full overflow-hidden relative py-1">
            <div className="mb-6">
              <h3 className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 pl-0.5">
                Verified Technical Credentials
              </h3>
            </div>

            {/* Desktop view marquee scrolling loop */}
            <div className="hidden lg:block">
              <LogoLoop
                logos={certLogoItems}
                speed={35}
                direction="left"
                logoHeight={210}
                gap={24}
                pauseOnHover={true}
                scaleOnHover={false}
                fadeOut={true}
                ariaLabel="Certifications"
              />
            </div>

            {/* Mobile/Tablet view slider layout */}
            <div className="block lg:hidden">
              <MobileCarousel items={certSlides} />
            </div>
          </div>
        )}

        {/* Row 2: Honors & Achievements */}
        {visibleAchievements.length > 0 && (
          <div className="w-full overflow-hidden relative py-1">
            <div className="mb-6">
              <h3 className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 pl-0.5">
                Competition Placements & Accolades
              </h3>
            </div>

            {/* Desktop view marquee scrolling loop */}
            <div className="hidden lg:block">
              <LogoLoop
                logos={achievementLogoItems}
                speed={30}
                direction="right"
                logoHeight={210}
                gap={24}
                pauseOnHover={true}
                scaleOnHover={false}
                fadeOut={true}
                ariaLabel="Achievements"
              />
            </div>

            {/* Mobile/Tablet view slider layout */}
            <div className="block lg:hidden">
              <MobileCarousel items={achievementSlides} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
