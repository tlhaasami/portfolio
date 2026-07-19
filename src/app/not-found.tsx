"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white px-6 relative overflow-hidden font-sans">
      {/* Visual background ambient glow circles */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neutral-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center z-10 flex flex-col items-center">
        {/* Animated Error Code */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-9xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent select-none filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
        >
          404
        </motion.h1>

        {/* Animated Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-xl md:text-2xl font-bold tracking-tight mt-6 text-zinc-100 uppercase font-mono"
        >
          Page Lost in Space
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-xs md:text-sm text-zinc-500 leading-relaxed mt-4 max-w-xs font-mono"
        >
          The page you are looking for has evaporated into gravity-defying space or does not exist.
        </motion.p>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-white/5 font-sans cursor-pointer group"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
            <Compass className="w-4 h-4 text-zinc-600 group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-8 text-[9px] font-mono text-zinc-700 tracking-widest uppercase">
        System Error // Page Not Found
      </div>
    </main>
  );
}
