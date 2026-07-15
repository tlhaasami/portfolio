"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import RotatingText from "@/components/ui/RotatingText";
import VariableProximity from "@/components/ui/VariableProximity";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import { getPrefix } from "@/utils/prefixAsset";

const Ballpit = dynamic(() => import("@/components/Ballpit"), {
  ssr: false,
});

export default function Home() {
  const [settings, setSettings] = useState<any>({
    count: 24,
    countMobile: 8,
    gravity: 0.1,
    friction: 0.99,
    wallBounce: 0.8,
    followCursor: true,
    colors: ["#ffffff", "#71717a", "#000000"]
  });
  const [portfolioData, setPortfolioData] = useState<any>({
    name: "TALHA SAMI",
    titles: ["Full Stack Engineer", "Automation Expert", "Mobile Developer"],
    aboutHeading: "Bridging the gap between complex engineering and clear strategy.",
    aboutParagraph: "I am a software engineer specializing in building robust, scalable applications from the ground up, with a technical foundation spanning full-stack web architectures, cross-platform mobile development, and workflow automation. Writing clean, high-performance code is only half the equation; my true strength lies in communication strategy—translating intricate technical requirements into clear, actionable roadmaps that bridge the divide between development teams and stakeholders to deliver a seamless user experience aligned with the business vision.",
    aboutImage: "/data/images/profile.png"
  });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefix = getPrefix();

    const loadData = async () => {
      let defaultsPhysics = {
        count: 24,
        countMobile: 8,
        gravity: 0.1,
        friction: 0.99,
        wallBounce: 0.8,
        followCursor: true,
        colors: ["#ffffff", "#71717a", "#000000"]
      };

      let defaultsPortfolio = {
        name: "TALHA SAMI",
        titles: ["Full Stack Engineer", "Automation Expert", "Mobile Developer"],
        aboutHeading: "Bridging the gap between complex engineering and clear strategy.",
        aboutParagraph: "I am a software engineer specializing in building robust, scalable applications from the ground up, with a technical foundation spanning full-stack web architectures, cross-platform mobile development, and workflow automation. Writing clean, high-performance code is only half the equation; my true strength lies in communication strategy—translating intricate technical requirements into clear, actionable roadmaps that bridge the divide between development teams and stakeholders to deliver a seamless user experience aligned with the business vision.",
        aboutImage: "/data/images/profile.png"
      };

      try {
        const res = await fetch(`${prefix}/data/profileData/ballpit.json`);
        if (res.ok) {
          defaultsPhysics = await res.json();
        }
      } catch (err) {
        console.error("Error loading ballpit default configuration:", err);
      }

      try {
        const res = await fetch(`${prefix}/data/profileData/portfolio-defaults.json`);
        if (res.ok) {
          defaultsPortfolio = await res.json();
        }
      } catch (err) {
        console.error("Error loading portfolio defaults:", err);
      }

      try {
        const stored = localStorage.getItem("ballpit-settings");
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings({
            ...defaultsPhysics,
            ...parsed,
          });
        } else {
          setSettings(defaultsPhysics);
        }

        const storedPortfolio = localStorage.getItem("portfolio-settings");
        if (storedPortfolio) {
          const parsedPortfolio = JSON.parse(storedPortfolio);
          setPortfolioData({
            ...defaultsPortfolio,
            ...parsedPortfolio,
          });
        } else {
          setPortfolioData(defaultsPortfolio);
        }
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    };

    loadData();
  }, []);

  return (
    <main className="w-full bg-transparent">
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start pt-[20vh] md:pt-[25vh] text-center px-4"
      >
        {/* Ballpit Background - Restricted to the Hero Section */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <Ballpit
            count={settings.count}
            countMobile={settings.countMobile}
            gravity={settings.gravity}
            friction={settings.friction}
            wallBounce={settings.wallBounce}
            followCursor={settings.followCursor}
            colors={settings.colors}
            size="parent"
          />
        </div>

        {/* Hero Section Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-start pointer-events-none select-none w-full">
          {/* Name Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none mb-6 pointer-events-auto"
          >
            <VariableProximity
              label={portfolioData.name || "TALHA SAMI"}
              className="bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 850, 'opsz' 40"
              containerRef={heroRef}
              radius={200}
              falloff="linear"
            />
          </motion.h1>

          {/* Titles with RotatingText */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-12 max-w-3xl px-4 text-center pointer-events-auto"
          >
            <span className="whitespace-nowrap">I AM A</span>
            {portfolioData.titles && portfolioData.titles.length > 0 && (
              <RotatingText
                texts={portfolioData.titles}
                mainClassName="px-3 sm:px-4 py-1 sm:py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-zinc-950 font-bold rounded-xl inline-flex justify-center border border-neutral-850 dark:border-neutral-200 shadow-md whitespace-nowrap"
                staggerFrom={"last"}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
          >
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/25 border border-neutral-800 dark:border-neutral-200"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-black/40 backdrop-blur-md text-neutral-800 dark:text-neutral-200 font-bold text-sm hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:border-neutral-400 dark:hover:border-neutral-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>

      <About
        heading={portfolioData.aboutHeading}
        paragraph={portfolioData.aboutParagraph}
        image={portfolioData.aboutImage}
      />

      <Experience
        experiences={portfolioData.experiences}
      />

      <TechStack />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
}
