"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Inlined cn utility
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Inlined Nav types & data
interface NavItem {
  label: string;
  href: string;
}

interface PortfolioData {
  navItems: NavItem[];
}

const portfolioData: PortfolioData = {
  navItems: [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "TECH STACK", href: "#tech-stack" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CERTIFICATIONS", href: "#certifications" },
    { label: "CONTACT US", href: "#contact" },
  ],
};

// Inlined scroll hook
function useScroll(sectionIds: string[] = ["about", "experience", "tech-stack", "projects", "certifications", "contact"]) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check if we are near the top of the page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Check if we are near the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const scrollPosition = window.scrollY + 250; // offset trigger

      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return { isScrolled, activeSection };
}

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
      <div className={cn("overflow-hidden relative flex flex-col pointer-events-none z-10 uppercase tracking-wider font-mono", heightClassName || "h-[22px]")}>
        <motion.div
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] }}
          className="h-full flex flex-col"
        >
          {/* First visible layer */}
          <span className={cn("font-bold text-xs md:text-sm h-full flex items-center shrink-0 leading-none whitespace-nowrap", textClassName)}>
            {label}
          </span>
          {/* Second roll-up layer */}
          <span className={cn("font-bold text-xs md:text-sm h-full flex items-center shrink-0 leading-none whitespace-nowrap", textClassName)}>
            {label}
          </span>
        </motion.div>
      </div>
    </a>
  );
}

// 2. Main Navbar Component
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Do not render navbar on configuration/settings page
  if (pathname?.startsWith("/tlhaasamii/setting")) {
    return null;
  }
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Sync initial theme
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(saved as "light" | "dark");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Hook to track active scroll section and scrolled status
  const { activeSection } = useScroll(["home", "about", "experience", "tech-stack", "projects", "certifications", "contact"]);

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
    if (item.href === "#home") {
      return activeSection === "home" || activeSection === "";
    }
    const sectionId = item.href.replace("#", "");
    return activeSection === sectionId;
  };

  return (
    <>
      {/* Floating Capsule Header - Adapts dynamically to light and dark themes */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-black/70 border border-black/15 dark:border-white/40 backdrop-blur-md rounded-full p-2 pr-4 md:pr-8 flex items-center gap-6 md:gap-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-all duration-300 justify-between md:justify-start">
        
        {/* Left Logo (with Rotation on Hover - black background in light theme, white in dark theme) */}
        <motion.a
          href="#home"
          whileHover="hover"
          className="bg-black dark:bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer flex-shrink-0 select-none shadow-md"
        >
          <motion.span
            variants={{
              hover: { rotate: 360 }
            }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
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

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-neutral-800 transition-colors mr-1 cursor-pointer flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

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

      {/* Fullscreen Responsive Overlay Menu (Mobile) - Enhanced Hamburger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {/* Stacked Navigation Links with Staggered Roll Effect */}
            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              {portfolioData.navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 + 0.15, duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center"
                >
                  <RollLink
                    label={item.label}
                    href={item.href}
                    isActive={isItemActive(item)}
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-4 text-xl border-zinc-800/80 hover:bg-zinc-900/50 w-full text-center"
                    textClassName="text-lg md:text-xl h-[30px]"
                    heightClassName="h-[30px]"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
