"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import MobileCarousel from "@/components/ui/MobileCarousel";
import { prefixAsset } from "@/utils/prefixAsset";
import SafeImage from "@/components/ui/SafeImage";
import portfolioDataStatic from "@/data/portfolioData.json";

interface FeaturedProject {
  name: string;
  tagline: string;
  description: string;
  image: string;
  liveLink: string;
  techStack: string[];
  details: string;
}

export default function Projects() {
  const [featured, setFeatured] = useState<FeaturedProject[]>(portfolioDataStatic.featuredProjects);
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  const githubLink = useMemo(() => {
    const data = portfolioDataStatic as Record<string, unknown>;
    const socials = data.socials as Array<{ name: string; url: string }> | undefined;
    const githubSocial = socials?.find(
      (s) => s.name.toLowerCase() === "github"
    );
    return githubSocial?.url || "https://github.com";
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimeout(() => {
          if (parsed.featuredProjects) setFeatured(parsed.featuredProjects);
        }, 0);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  }, []);

  // Close modal when pressing escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const featuredProjectsSlides = useMemo(() => {
    return featured.map((project) => (
      <div
        key={project.name}
        onClick={() => setSelectedProject(project)}
        className="group relative overflow-hidden rounded-[28px] border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/45 shadow-sm hover:shadow-xl hover:border-neutral-400 dark:hover:border-white/30 transition-all duration-350 select-none cursor-pointer flex flex-col justify-between"
      >
        {/* Image panel */}
        <div className="aspect-[16/9] w-full overflow-hidden relative bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-900">
          {project.image ? (
            <SafeImage
              src={prefixAsset(project.image)}
              alt={`${project.name} preview`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500"
            />
          ) : null}
          {/* Gloss reflection sweep */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent z-15 pointer-events-none" />
        </div>

        {/* Text Content panel */}
        <div className="p-6 space-y-4">
          <div className="space-y-1 text-left">
            <h4 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {project.name}
            </h4>
            <p className="text-xs font-mono tracking-wide text-zinc-500 dark:text-zinc-400">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed font-sans line-clamp-3 text-left">
            {project.description}
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 text-left">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800/80 rounded-md font-mono text-[9px] text-zinc-600 dark:text-zinc-300 font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ));
  }, [featured]);



  return (
    <section
      id="projects"
      className="relative bg-transparent text-neutral-900 dark:text-white py-24 overflow-hidden"
    >
      {/* Background ambient radial glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-neutral-200/20 dark:bg-neutral-900/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-neutral-200/20 dark:bg-neutral-900/10 rounded-full blur-[130px] -z-10 pointer-events-none" />

      {/* Title container (standard width) */}
      <div className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 mb-16">
        <span className="text-xs font-mono tracking-widest text-zinc-555 dark:text-zinc-400 uppercase mb-3 block flex items-center gap-2 font-bold">
          <svg
            className="w-3.5 h-3.5 fill-none stroke-neutral-950 dark:stroke-white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span>{"// PORTFOLIO PROJECTS"}</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          Featured Work & R&D
        </h2>
        <p className="mt-4 text-neutral-500 dark:text-neutral-450 font-sans max-w-2xl leading-relaxed">
          Explore production platform architectures, automation suites, developer integrations, and academic systems.
        </p>
      </div>

      {/* Outer grid container (matches the wide layout edges) */}
      <div className="max-w-[1600px] xl:max-w-[1820px] mx-auto px-6 md:px-12 relative z-10 space-y-20">

        {/* SECTION 1: PINNED / FEATURED PROJECTS */}
        <div>
          <div className="mb-8 pl-1">
            <h3 className="font-mono text-xs uppercase tracking-wider font-extrabold text-neutral-400 dark:text-neutral-550">
              Pinned Showcases (Click to view details)
            </h3>
          </div>

          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featured.map((project) => (
              <div
                key={project.name}
                onClick={() => setSelectedProject(project)}
                className="group relative overflow-hidden rounded-[28px] border border-neutral-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/45 shadow-sm hover:shadow-xl hover:border-neutral-400 dark:hover:border-white/30 transition-all duration-350 select-none cursor-pointer flex flex-col justify-between"
              >
                {/* Image panel */}
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-900">
                  {project.image ? (
                    <SafeImage
                      src={prefixAsset(project.image)}
                      alt={`${project.name} preview`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500"
                    />
                  ) : null}

                  {/* Gloss reflection sweep */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent z-15 pointer-events-none" />
                </div>

                {/* Text Content panel */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="space-y-1 text-left">
                    <h4 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      {project.name}
                    </h4>
                    <p className="text-xs font-mono tracking-wide text-zinc-500 dark:text-zinc-400">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed font-sans line-clamp-3 text-left">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 text-left">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800/80 rounded-md font-mono text-[9px] text-zinc-600 dark:text-zinc-300 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="block lg:hidden">
            <MobileCarousel items={featuredProjectsSlides} autoPlayInterval={5000} />
          </div>
        </div>

        {/* SECTION 2: GITHUB CTA CALLOUT */}
        <div className="mt-16 w-full flex justify-center">
          <div className="relative w-full max-w-4xl p-8 md:p-12 rounded-[28px] border border-neutral-200/50 dark:border-zinc-800/80 bg-gradient-to-br from-neutral-50 to-neutral-100/30 dark:from-zinc-950 dark:to-zinc-900/30 backdrop-blur-md text-center flex flex-col items-center justify-center gap-6 overflow-hidden shadow-sm">
            {/* Ambient subtle glow blob */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-neutral-200/10 dark:bg-zinc-800/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-neutral-200/10 dark:bg-zinc-800/10 blur-3xl pointer-events-none" />

            <div className="space-y-3 z-10 max-w-2xl">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug">
                Looking for more of my work?
              </h3>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans font-medium">
                Interested in exploring my complete codebase? I build and maintain a wide range of open-source projects, system architectures, and workflow utilities. Head over to my GitHub profile to explore my active repositories, public releases, and research labs.
              </p>
            </div>

            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="z-10 inline-flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-neutral-950 px-7 py-3.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-sm border border-neutral-800 dark:border-white/50 cursor-pointer group"
            >
              <svg className="w-4.5 h-4.5 fill-current transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
              </svg>
              <span>Explore My GitHub</span>
              <svg className="w-3.5 h-3.5 stroke-current fill-none transition-transform duration-300 group-hover:translate-x-1" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.a>
          </div>
        </div>

      </div>

      {/* FEATURED PROJECT DETAILS OVERLAY MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)} // Close when clicking backdrop
        >
          <div
            className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-900 rounded-[28px] overflow-hidden flex flex-col max-h-[85vh] relative shadow-2xl animate-scale-in overflow-x-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
          >
            {/* Modal Header/Title and Close Toolbar */}
            <div className="flex justify-between items-center bg-neutral-50 dark:bg-zinc-950 px-6 py-4 border-b border-neutral-200 dark:border-zinc-900">
              <span className="font-mono text-[10px] font-bold text-neutral-500 dark:text-zinc-400 uppercase tracking-widest">
                Project Case Study Details
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-900 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Close modal"
              >
                <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Scrollable details content - STRICTLY overflow-x-hidden, NO side scroll! */}
            <div className="overflow-y-auto overflow-x-hidden p-6 md:p-8 space-y-6 flex-1 text-left no-scrollbar">
              {/* Inject inline style wrapper to hide native scrollbar */}
              <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none !important;
                }
                .no-scrollbar {
                  -ms-overflow-style: none !important;
                  scrollbar-width: none !important;
                }
              `}</style>

              {/* Feature image */}
              {selectedProject.image ? (
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-900 relative">
                  <SafeImage
                    src={prefixAsset(selectedProject.image)}
                    alt={`${selectedProject.name} layout`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : null}

              {/* Title & Tagline */}
              <div className="space-y-1.5">
                <h3 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                  {selectedProject.name}
                </h3>
                <p className="text-xs font-mono font-bold text-zinc-550 dark:text-zinc-400 tracking-wide">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Description & Technical Breakdown */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Overview</h4>
                  <p className="text-xs text-neutral-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Engineering Specs & Outcomes</h4>
                  <p className="text-xs text-neutral-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {selectedProject.details}
                  </p>
                </div>
              </div>

              {/* Tech stack */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Architected With</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-md font-mono text-[9px] text-neutral-600 dark:text-zinc-200 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer toolbar */}
            <div className="flex justify-end items-center bg-neutral-50 dark:bg-zinc-950 px-6 py-4 border-t border-neutral-200 dark:border-zinc-900 gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 border border-neutral-300 dark:border-zinc-850 text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white rounded-xl transition-all font-mono text-[10px] font-bold cursor-pointer bg-transparent"
              >
                Close Details
              </button>
              {selectedProject.liveLink && (
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-mono text-[10px] font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <svg className="w-3.5 h-3.5 stroke-current fill-none shrink-0" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
