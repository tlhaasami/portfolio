"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Mail, ArrowUpRight } from "lucide-react";
import Ballpit from "@/components/Ballpit";
import { getSettings, DEFAULT_SETTINGS, PortfolioSettings } from "@/lib/settings";

export default function Home() {
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);

  // Load settings on client side and listen for changes
  useEffect(() => {
    const loaded = getSettings();
    setSettings(loaded);
    if (loaded && loaded.title) {
      document.title = loaded.title;
    }

    const handleSettingsChange = () => {
      const updated = getSettings();
      setSettings(updated);
      if (updated && updated.title) {
        document.title = updated.title;
      }
    };

    window.addEventListener("portfolio-settings-changed", handleSettingsChange);
    return () => {
      window.removeEventListener("portfolio-settings-changed", handleSettingsChange);
    };
  }, []);

  const activeSettings = settings || DEFAULT_SETTINGS;

  return (
    <div className="flex flex-col w-full bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative z-0 flex items-center justify-center min-h-screen px-6 text-center overflow-hidden">
        
        {/* Ballpit Background Canvas */}
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
          <Ballpit
            count={activeSettings.ballpit.count}
            gravity={activeSettings.ballpit.gravity}
            friction={activeSettings.ballpit.friction}
            wallBounce={activeSettings.ballpit.wallBounce}
            followCursor={activeSettings.ballpit.followCursor}
            colors={activeSettings.ballpit.colors}
            className="w-full h-full"
          />
        </div>

        {/* Anti-flash / grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,120,120,0.04)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(24,24,27,0.7)_0%,transparent_100%)] -z-20 pointer-events-none" />
        
        {/* Animated Background Decorative Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-200/40 dark:bg-zinc-900/50 rounded-full blur-3xl -z-20 animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-250/20 dark:bg-zinc-850/30 rounded-full blur-3xl -z-20 animate-pulse pointer-events-none [animation-delay:2s]" />

        {/* Text Content - pointer-events-none to let mouse movements pass to Ballpit canvas underneath */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-4xl mx-auto flex flex-col items-center pointer-events-none"
        >
          <span className="px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold inline-block mb-6 backdrop-blur-sm pointer-events-auto">
            Available for new opportunities
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight select-none">
            {activeSettings.heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-zinc-700 to-zinc-500 dark:from-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
              {activeSettings.heroTitle.split(" ").slice(-1)[0]}
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-10 max-w-2xl select-none">
            {activeSettings.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
            <a
              href="#work"
              className="px-8 py-4 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center shadow-md select-none"
            >
              View Work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background text-foreground font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors w-full sm:w-auto text-center shadow-sm select-none"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div>
              <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono block mb-2">// 01. ABOUT ME</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The developer behind the code</h2>
            </div>
            <div className="md:col-span-2 space-y-6 text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-normal">
              <p>
                I am a senior frontend engineer dedicated to crafting seamless web interfaces. With extensive experience in modern frontend development, I excel in the React ecosystem, specifically Next.js, combined with Tailwind CSS for scalable styling systems and Framer Motion for motion graphics.
              </p>
              <p>
                My philosophy is that a website should not only function flawlessly but should also provide a delightful sensory experience. I focus on micro-interactions, layout physics, typographic hierarchy, and optimized loading sequences to achieve premium products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-background">
        <div className="max-w-5xl mx-auto">
          <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono block mb-2">// 02. EXPERTISE</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">Core Capabilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm">
              <Cpu className="w-8 h-8 text-foreground mb-6" />
              <h3 className="text-xl font-bold mb-3">Next.js & React</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">Deep expertise in React Server Components, Server Actions, App Router routing, and performance optimization.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm">
              <Code className="w-8 h-8 text-foreground mb-6" />
              <h3 className="text-xl font-bold mb-3">Tailwind CSS</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">Creating scalable, maintainable Tailwind configurations, design tokens, and modular layouts without styling conflicts.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-sm">
              <Terminal className="w-8 h-8 text-foreground mb-6" />
              <h3 className="text-xl font-bold mb-3">Framer Motion</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">Implementing rich, smooth gestures, keyframes, scroll-bound animations, and state transitions that elevate UX.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="max-w-5xl mx-auto">
          <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono block mb-2">// 03. SELECTED WORK</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">Projects & Case Studies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group block cursor-pointer">
              <div className="aspect-video w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-6 overflow-hidden border border-zinc-200 dark:border-zinc-800 relative flex items-center justify-center">
                <Code className="w-12 h-12 text-zinc-400 dark:text-zinc-700 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">E-Commerce Platform</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">Next.js 15, Tailwind v4, Stripe integration.</p>
            </div>
            <div className="group block cursor-pointer">
              <div className="aspect-video w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-6 overflow-hidden border border-zinc-200 dark:border-zinc-800 relative flex items-center justify-center">
                <Terminal className="w-12 h-12 text-zinc-400 dark:text-zinc-700 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">Developer Dashboard</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">Realtime data charts, Framer motion animations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-32 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-background">
        <div className="max-w-5xl mx-auto">
          <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono block mb-2">// 04. CERTIFICATIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">Verified Credentials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono block mb-2">AWS CERTIFIED</span>
              <h3 className="text-lg font-bold mb-2">Solutions Architect</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Issued by Amazon Web Services. Validation of cloud architecture design.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono block mb-2">GOOGLE</span>
              <h3 className="text-lg font-bold mb-2">Professional Cloud Developer</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Validation of deploying, building and scaling Google Cloud programs.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono block mb-2">NEXT.JS</span>
              <h3 className="text-lg font-bold mb-2">Vercel React Specialist</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Advanced rendering, routing, caching and edge deployments certification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto text-center w-full">
          <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono block mb-2">// 05. GET IN TOUCH</span>
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8">Let's build something epic.</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Have a project in mind, want to hire me, or just want to chat about front-end engineering? Reach out.
          </p>
          <a
            href="mailto:hello@example.com"
            className="px-8 py-5 rounded-full bg-foreground text-background font-semibold text-base hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors inline-flex items-center gap-3 shadow-md"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </a>
        </div>
      </section>
    </div>
  );
}
