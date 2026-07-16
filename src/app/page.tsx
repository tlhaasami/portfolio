"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import RotatingText from "@/components/ui/RotatingText";
import VariableProximity from "@/components/ui/VariableProximity";

const About = dynamic(() => import("@/components/About"), {
  ssr: false,
  loading: () => <div className="max-w-7xl mx-auto px-6 py-24 min-h-[500px] bg-neutral-100/20 dark:bg-zinc-900/10 animate-pulse rounded-3xl" />
});

const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
  loading: () => <div className="max-w-7xl mx-auto px-6 py-24 min-h-[400px] bg-neutral-100/20 dark:bg-zinc-900/10 animate-pulse rounded-3xl" />
});

const TechStack = dynamic(() => import("@/components/TechStack"), {
  ssr: false,
  loading: () => <div className="max-w-7xl mx-auto px-6 py-24 min-h-[400px] bg-neutral-100/20 dark:bg-zinc-900/10 animate-pulse rounded-3xl" />
});

const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
  loading: () => <div className="max-w-7xl mx-auto px-6 py-24 min-h-[600px] bg-neutral-100/20 dark:bg-zinc-900/10 animate-pulse rounded-3xl" />
});

const Certificates = dynamic(() => import("@/components/Certificates"), {
  ssr: false,
  loading: () => <div className="max-w-7xl mx-auto px-6 py-24 min-h-[300px] bg-neutral-100/20 dark:bg-zinc-900/10 animate-pulse rounded-3xl" />
});

const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false,
  loading: () => <div className="max-w-7xl mx-auto px-6 py-24 min-h-[400px] bg-neutral-100/20 dark:bg-zinc-900/10 animate-pulse rounded-3xl" />
});

import { prefixAsset } from "@/utils/prefixAsset";
import portfolioDataStatic from "@/data/portfolioData.json";

const Ballpit = dynamic(() => import("@/components/Ballpit"), {
  ssr: false,
});

interface BallpitSettings {
  count: number;
  countMobile: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  followCursor: boolean;
  colors: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  logo: string;
  description: string;
  linkedin?: string;
  website?: string;
}

interface PortfolioData {
  name: string;
  titles: string[];
  aboutHeading: string;
  aboutParagraph: string;
  aboutImage: string;
  experiences: ExperienceItem[];
  featuredProjects: unknown[];
  secondaryProjects: unknown[];
  certificates: unknown[];
  ballpitDefault: BallpitSettings;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseBallpitSettings(raw: any): BallpitSettings {
  return {
    count: raw?.count !== undefined ? raw.count : 20,
    countMobile: raw?.countMobile || 8,
    gravity: raw?.gravity !== undefined ? raw.gravity : 0.5,
    friction: raw?.friction !== undefined ? raw.friction : 0.15,
    wallBounce: raw?.wallBounce !== undefined ? raw.wallBounce : 0.95,
    followCursor: raw?.followCursor !== undefined ? raw.followCursor : true,
    colors: raw?.colors || ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]
  };
}

const fullText = "Hello, Welcome to Talha Sami's Portfolio.";

export default function Home() {
  const [settings, setSettings] = useState<BallpitSettings>(parseBallpitSettings(portfolioDataStatic.ballpitDefault));
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(portfolioDataStatic as unknown as PortfolioData);
  const [loadingStep, setLoadingStep] = useState<'json' | 'balls' | 'about' | 'ready'>('json');
  const heroRef = useRef<HTMLElement>(null);

  const [typedText, setTypedText] = useState('');
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);

  // Typewriter typing animation
  useEffect(() => {
    if (typedText.length >= fullText.length) {
      const completionTimer = setTimeout(() => {
        setIsTypingCompleted(true);
      }, 300);
      return () => clearTimeout(completionTimer);
    }

    const typingTimer = setTimeout(() => {
      setTypedText(fullText.slice(0, typedText.length + 1));
    }, 45);

    return () => clearTimeout(typingTimer);
  }, [typedText]);

  // Safety unlock scroll fallback timer
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setLoadingStep('ready');
      setIsTypingCompleted(true);
    }, 8000);
    return () => clearTimeout(safetyTimer);
  }, []);

  // Lock/unlock body scroll based on loading state
  useEffect(() => {
    if (loadingStep !== 'ready' || !isTypingCompleted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loadingStep, isTypingCompleted]);

  // Load JSON configurations
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(prefixAsset("/data/portfolioData.json"));
        if (res.ok) {
          const fetchedData = await res.json();
          
          // Apply local storage overrides if available
          const storedPortfolio = localStorage.getItem("portfolio-settings");
          if (storedPortfolio) {
            try {
              const parsedPortfolio = JSON.parse(storedPortfolio);
              setPortfolioData({
                ...fetchedData,
                ...parsedPortfolio,
              });
            } catch {
              setPortfolioData(fetchedData);
            }
          } else {
            setPortfolioData(fetchedData);
          }

          const storedPhysics = localStorage.getItem("ballpit-settings");
          if (storedPhysics) {
            try {
              const parsedPhysics = JSON.parse(storedPhysics);
              setSettings(parseBallpitSettings({
                ...fetchedData.ballpitDefault,
                ...parsedPhysics,
              }));
            } catch {
              setSettings(parseBallpitSettings(fetchedData.ballpitDefault));
            }
          } else {
            setSettings(parseBallpitSettings(fetchedData.ballpitDefault));
          }
        } else {
          setPortfolioData(portfolioDataStatic as unknown as PortfolioData);
          setSettings(parseBallpitSettings(portfolioDataStatic.ballpitDefault));
        }
      } catch (err) {
        console.error("Error fetching dynamic portfolio JSON:", err);
        setPortfolioData(portfolioDataStatic as unknown as PortfolioData);
        setSettings(parseBallpitSettings(portfolioDataStatic.ballpitDefault));
      }

      // Transition to next loading phase after data setup
      setTimeout(() => {
        setLoadingStep('balls');
      }, 500);
    }

    loadConfig();
  }, []);

  // Preload optimized profile image sequentially
  useEffect(() => {
    if (loadingStep !== 'about') return;

    const profileImgPath = portfolioData.aboutImage;
    if (!profileImgPath) {
      setTimeout(() => setLoadingStep('ready'), 0);
      return;
    }

    const img = new Image();
    img.src = prefixAsset(profileImgPath);
    img.onload = () => {
      setTimeout(() => {
        setLoadingStep('ready');
      }, 500);
    };
    img.onerror = () => {
      console.error("Failed to preload about section image:", profileImgPath);
      setLoadingStep('ready');
    };
  }, [loadingStep, portfolioData.aboutImage]);

  let targetProgress = 0;
  if (loadingStep === 'json') targetProgress = 30;
  else if (loadingStep === 'balls') targetProgress = 70;
  else if (loadingStep === 'about') targetProgress = 95;
  else if (loadingStep === 'ready') targetProgress = 100;

  return (
    <main className="w-full bg-transparent">
      {/* Premium Minimalist Preloader Overlay */}
      <AnimatePresence>
        {(loadingStep !== "ready" || !isTypingCompleted) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white font-mono"
          >
            <div className="max-w-lg w-full px-8 flex flex-col items-center">
              {/* Floating terminal container */}
              <div className="w-full bg-zinc-900/30 border border-zinc-800/40 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col gap-6.5">
                {/* Header indicators */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-800" />
                    <span className="w-2 h-2 rounded-full bg-zinc-800" />
                    <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-550">
                    system_init.sh
                  </span>
                </div>

                {/* Animated Typewriter Message */}
                <div className="min-h-[50px] flex items-center justify-start py-2">
                  <h1 className="text-sm md:text-base font-extrabold tracking-normal text-zinc-200 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent leading-relaxed select-none font-mono">
                    {typedText}
                    <span className="inline-block w-1.5 h-4 ml-1 bg-zinc-300 animate-pulse align-middle" />
                  </h1>
                </div>

                {/* Custom Loaded Progress Animation */}
                <div className="space-y-3 mt-2">
                  <div className="flex items-center justify-between text-[9px] tracking-widest text-zinc-550 font-bold uppercase font-mono">
                    <span>
                      {loadingStep === "json" && "Fetching configurations..."}
                      {loadingStep === "balls" && "Initializing physics sandbox..."}
                      {loadingStep === "about" && "Caching media assets..."}
                    </span>
                    <span className="text-zinc-400">{targetProgress}%</span>
                  </div>

                  {/* Sleek linear glowing bar */}
                  <div className="w-full bg-zinc-900/80 rounded-full h-1 overflow-hidden border border-zinc-800/20 relative">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${targetProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    />
                  </div>
                </div>
              </div>

              {/* Accessibility Bypass Link */}
              <button
                onClick={() => setLoadingStep("ready")}
                className="mt-8 text-[9px] text-zinc-605 hover:text-zinc-400 transition-colors uppercase tracking-[0.25em] cursor-pointer hover:underline"
              >
                Skip Intro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start pt-[20vh] md:pt-[25vh] text-center px-4"
      >
        {/* Ballpit Background - Restricted to the Hero Section */}
        {(loadingStep === 'balls' || loadingStep === 'about' || loadingStep === 'ready') && (
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
              onLoaded={() => {
                setLoadingStep('about');
              }}
            />
          </div>
        )}

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
