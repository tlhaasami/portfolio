"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import RotatingText from "@/components/ui/RotatingText";
import About from "@/components/About";

const Ballpit = dynamic(() => import("@/components/Ballpit"), {
  ssr: false,
});

import DEFAULT_SETTINGS from "@/data/ballpit.json";

export default function Home() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ballpit-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsed,
        });
      }
    } catch (e) {
      console.error("Error loading ballpit settings:", e);
    }
  }, []);

  return (
    <main className="w-full bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start pt-[20vh] md:pt-[25vh] text-center px-4"
      >
        {/* Ballpit Background - Restricted to the Hero Section */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <Ballpit
            count={settings.count}
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
            <span className="bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
              TALHA SAMI
            </span>
          </motion.h1>

          {/* Titles with RotatingText */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-12 max-w-3xl px-4 text-center pointer-events-auto"
          >
            <span className="whitespace-nowrap">I AM A</span>
            <RotatingText
              texts={['Full Stack Engineer', 'Automation Expert', 'Mobile Developer']}
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

      <About />
    </main>
  );
}
