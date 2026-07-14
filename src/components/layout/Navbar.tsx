"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

// 1. 3D Roll Link Component
interface RollLinkProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  heightClassName?: string;
}

function RollLink({ label, href, isActive, onClick, className, textClassName, heightClassName }: RollLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Style classes based on active vs hovered state
  let borderClass = "border-transparent";
  let textClass = "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white";

  if (isActive) {
    borderClass = "border-transparent";
    textClass = "text-white dark:text-black";
  } else if (isHovered) {
    borderClass = "border-black/30 dark:border-white/50"; // Outline border on hover
    textClass = "text-black dark:text-white";
  }

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-full px-4 py-1.5 transition-all duration-200 select-none cursor-pointer flex items-center justify-center z-10 border",
        borderClass,
        textClass,
        className
      )}
    >
      {/* Sliding background pill for active state only (black in light mode, white in dark mode) */}
      {isActive && (
        <motion.div
          layoutId="navPillActive"
          className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10 shadow-sm"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* 3D Roll Text Container */}
      <div className={cn("overflow-hidden relative flex flex-col pointer-events-none z-10 uppercase tracking-wider", heightClassName || "h-[22px]")}>
        <motion.div
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] }}
          className="h-full flex flex-col"
        >
          {/* First visible layer */}
          <span className={cn("font-semibold text-xs md:text-sm h-full flex items-center shrink-0 leading-none", textClassName)}>
            {label}
          </span>
          {/* Second roll-up layer */}
          <span className={cn("font-semibold text-xs md:text-sm h-full flex items-center shrink-0 leading-none", textClassName)}>
            {label}
          </span>
        </motion.div>
      </div>
    </a>
  );
}

// 2. Main Navbar Component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Hook to track active scroll section and scrolled status
  const { activeSection } = useScroll(["home", "about", "expertise", "work", "certificates", "contact"]);

  // Prevent scroll when mobile overlay menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Helper to check if a menu item should be highlighted as active
  const isItemActive = (item: typeof portfolioData.navItems[0]) => {
    if (item.href === "#") {
      return activeSection === "home" || activeSection === "";
    }
    const sectionId = item.href.replace("#", "");
    return activeSection === sectionId;
  };

  return (
    <>
      {/* Floating Capsule Header - Adapts dynamically to light and dark themes */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-neutral-900/95 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md rounded-full p-2 pr-4 md:pr-8 flex items-center gap-6 md:gap-8 shadow-2xl transition-all duration-300 justify-between md:justify-start">
        
        {/* Left Logo (with Rotation on Hover - black background in light theme, white in dark theme) */}
        <motion.a
          href="#"
          whileHover="hover"
          className="bg-black dark:bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer flex-shrink-0 select-none shadow-md"
        >
          <motion.span
            variants={{
              hover: { rotate: 360 }
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-white dark:text-black font-mono font-bold text-lg select-none leading-none"
          >
            &gt;_
          </motion.span>
        </motion.a>

        {/* Center Navigation Links (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-2">
          {portfolioData.navItems.map((item) => (
            <RollLink
              key={item.label}
              label={item.label}
              href={item.href}
              isActive={isItemActive(item)}
            />
          ))}
        </nav>

        {/* Hamburger Menu Trigger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black dark:text-white p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-neutral-800 focus:outline-none z-50 transition-colors mr-1"
          aria-label="Toggle Navigation Menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </header>

      {/* Fullscreen Responsive Overlay Menu (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
          >
            {/* Stacked Navigation Links with Roll Effect */}
            {portfolioData.navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.4, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <RollLink
                  label={item.label}
                  href={item.href}
                  isActive={isItemActive(item)}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 text-xl"
                  textClassName="text-xl md:text-2xl h-[28px]"
                  heightClassName="h-[28px]"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
