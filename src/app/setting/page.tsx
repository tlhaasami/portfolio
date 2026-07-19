/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars, react/jsx-no-comment-textnodes, react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Sliders,
  RefreshCw,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  Sparkles,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  User,
  Info,
  Briefcase,
  Settings,
  Palette,
  Eye,
  EyeOff,
  Mail,
  Award,
  FolderGit
} from "lucide-react";

const Ballpit = dynamic(() => import("@/components/Ballpit"), {
  ssr: false,
});
import { prefixAsset } from "@/utils/prefixAsset";
import portfolioDataStatic from "@/data/portfolioData.json";

const PALETTES = [
  { name: "Monochrome Black & White", colors: ["#ffffff", "#71717a", "#000000"] },
  { name: "Sleek RGB Blue-Green-Red", colors: ["#3B82F6", "#38d514", "#c10c0c"] },
  { name: "Neon Cyberpunk", colors: ["#3B82F6", "#ec4899", "#8b5cf6"] },
  { name: "Toxic Mint", colors: ["#10b981", "#064e3b", "#a7f3d0"] },
  { name: "Sunset Horizon", colors: ["#f97316", "#ef4444", "#ec4899"] },
];

type TabType = "general" | "about" | "experience" | "contact" | "physics" | "certificates" | "projects";

export default function AdminSettings() {
  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>("general");

  // Ballpit Physics Configuration State
  const [count, setCount] = useState(24);
  const [countMobile, setCountMobile] = useState(8);
  const [gravity, setGravity] = useState(0.1);
  const [friction, setFriction] = useState(0.99);
  const [wallBounce, setWallBounce] = useState(0.8);
  const [followCursor, setFollowCursor] = useState(true);
  const [colors, setColors] = useState<string[]>(["#ffffff", "#71717a", "#000000"]);
  const [newColor, setNewColor] = useState("#ffffff");

  // Dynamic Portfolio Content Configuration State
  const [portfolioData, setPortfolioData] = useState<any>({
    name: portfolioDataStatic.name,
    titles: portfolioDataStatic.titles,
    aboutHeading: portfolioDataStatic.aboutHeading,
    aboutParagraph: portfolioDataStatic.aboutParagraph,
    aboutImage: portfolioDataStatic.aboutImage,
    experiences: portfolioDataStatic.experiences,
    certificates: portfolioDataStatic.certificates,
    featuredProjects: portfolioDataStatic.featuredProjects,
    secondaryProjects: portfolioDataStatic.secondaryProjects,
    achievements: portfolioDataStatic.achievements || [],
    techSettings: portfolioDataStatic.techSettings
  });

  const [newTitle, setNewTitle] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Load configuration from local storage on mount
  useEffect(() => {
    async function loadPhysicsDefaults() {
      let defaultsPhysics = {
        count: portfolioDataStatic.ballpitDefault.count,
        countMobile: (portfolioDataStatic.ballpitDefault as any).countMobile || 8,
        gravity: portfolioDataStatic.ballpitDefault.gravity,
        friction: portfolioDataStatic.ballpitDefault.friction,
        wallBounce: portfolioDataStatic.ballpitDefault.wallBounce,
        followCursor: portfolioDataStatic.ballpitDefault.followCursor,
        colors: portfolioDataStatic.ballpitDefault.colors
      };

      const defaultsPortfolio = portfolioDataStatic;

      try {
        const ballpitRes = await fetch(prefixAsset("/data/profileData/ballpit.json"));
        if (ballpitRes.ok) {
          const ballpitData = await ballpitRes.json();
          defaultsPhysics = {
            ...defaultsPhysics,
            ...ballpitData
          };
        }
      } catch (e) {
        console.warn("Could not load ballpit.json defaults in settings page:", e);
      }

      try {
        const storedPhysics = localStorage.getItem("ballpit-settings");
        if (storedPhysics) {
          const parsed = JSON.parse(storedPhysics);
          setCount(parsed.count !== undefined ? parsed.count : defaultsPhysics.count);
          setCountMobile(parsed.countMobile !== undefined ? parsed.countMobile : defaultsPhysics.countMobile);
          setGravity(parsed.gravity !== undefined ? parsed.gravity : defaultsPhysics.gravity);
          setFriction(parsed.friction !== undefined ? parsed.friction : defaultsPhysics.friction);
          setWallBounce(parsed.wallBounce !== undefined ? parsed.wallBounce : defaultsPhysics.wallBounce);
          setFollowCursor(parsed.followCursor !== undefined ? parsed.followCursor : defaultsPhysics.followCursor);
          setColors(parsed.colors !== undefined ? parsed.colors : defaultsPhysics.colors);
        } else {
          setCount(defaultsPhysics.count);
          setCountMobile(defaultsPhysics.countMobile);
          setGravity(defaultsPhysics.gravity);
          setFriction(defaultsPhysics.friction);
          setWallBounce(defaultsPhysics.wallBounce);
          setFollowCursor(defaultsPhysics.followCursor);
          setColors(defaultsPhysics.colors);
        }

        const storedPortfolio = localStorage.getItem("portfolio-settings");
        if (storedPortfolio) {
          const parsed = JSON.parse(storedPortfolio);
          setPortfolioData({
            ...defaultsPortfolio,
            ...parsed
          });
        } else {
          setPortfolioData(defaultsPortfolio);
        }
      } catch (e) {
        console.error("Error loading config inside settings page:", e);
      }
    }

    loadPhysicsDefaults();
  }, []);

  // Featured Projects Management
  const handleAddFeaturedProject = () => {
    const defaultProj = {
      name: "New Featured Project",
      tagline: "High-performance dashboard system",
      description: "Brief summary description.",
      image: "",
      liveLink: "https://example.com",
      techStack: ["React", "TypeScript"],
      details: "Detailed case study outcomes."
    };
    setPortfolioData((prev: any) => ({
      ...prev,
      featuredProjects: [...(prev.featuredProjects || []), defaultProj]
    }));
    showToast("Added new featured project!");
  };

  const handleRemoveFeaturedProject = (indexToRemove: number) => {
    if (window.confirm(`Are you sure you want to remove featured project "${portfolioData.featuredProjects[indexToRemove].name}"?`)) {
      setPortfolioData((prev: any) => ({
        ...prev,
        featuredProjects: (prev.featuredProjects || []).filter((_: any, idx: number) => idx !== indexToRemove)
      }));
      showToast("Featured project removed.", "info");
    }
  };

  const handleUpdateFeaturedProject = (index: number, field: string, value: any) => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.featuredProjects || [])];
      copy[index] = {
        ...copy[index],
        [field]: value
      };
      return {
        ...prev,
        featuredProjects: copy
      };
    });
  };

  const handleMoveFeaturedProject = (index: number, direction: "up" | "down") => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.featuredProjects || [])];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;

      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;

      return {
        ...prev,
        featuredProjects: copy
      };
    });
  };

  // Secondary Projects Management
  const handleAddSecondaryProject = () => {
    const defaultProj = {
      name: "New Project",
      description: "Short project summary details.",
      category: "professional" as const,
      image: "",
      repoLink: "https://github.com",
      techStack: ["TypeScript"]
    };
    setPortfolioData((prev: any) => ({
      ...prev,
      secondaryProjects: [defaultProj, ...(prev.secondaryProjects || [])]
    }));
    showToast("Added new secondary project!");
  };

  const handleRemoveSecondaryProject = (indexToRemove: number) => {
    if (window.confirm(`Are you sure you want to remove secondary project "${portfolioData.secondaryProjects[indexToRemove].name}"?`)) {
      setPortfolioData((prev: any) => ({
        ...prev,
        secondaryProjects: (prev.secondaryProjects || []).filter((_: any, idx: number) => idx !== indexToRemove)
      }));
      showToast("Secondary project removed.", "info");
    }
  };

  const handleUpdateSecondaryProject = (index: number, field: string, value: any) => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.secondaryProjects || [])];
      copy[index] = {
        ...copy[index],
        [field]: value
      };
      return {
        ...prev,
        secondaryProjects: copy
      };
    });
  };

  const handleMoveSecondaryProject = (index: number, direction: "up" | "down") => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.secondaryProjects || [])];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;

      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;

      return {
        ...prev,
        secondaryProjects: copy
      };
    });
  };

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    try {
      // Save physics settings
      const physicsConfig = { count, countMobile, gravity, friction, wallBounce, followCursor, colors };
      localStorage.setItem("ballpit-settings", JSON.stringify(physicsConfig));

      // Save portfolio content settings
      localStorage.setItem("portfolio-settings", JSON.stringify(portfolioData));

      showToast("Config saved successfully!");
    } catch (e) {
      console.error(e);
      showToast("Failed to save config.", "info");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all configurations to their original defaults?")) {
      try {
        localStorage.removeItem("ballpit-settings");
        localStorage.removeItem("portfolio-settings");
        showToast("Reset all values to defaults. Reloading...", "info");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        console.error("Error resetting configurations:", err);
      }
    }
  };

  // Titles Management
  const handleAddTitle = () => {
    if (newTitle.trim().length > 0) {
      if (!portfolioData.titles.includes(newTitle.trim())) {
        setPortfolioData((prev: any) => ({
          ...prev,
          titles: [...prev.titles, newTitle.trim()]
        }));
        setNewTitle("");
        showToast("Added hero title text.");
      } else {
        showToast("Hero title already exists.", "info");
      }
    }
  };

  const handleRemoveTitle = (indexToRemove: number) => {
    if (portfolioData.titles.length <= 1) {
      showToast("Requires at least one rotating title.", "info");
      return;
    }
    setPortfolioData((prev: any) => ({
      ...prev,
      titles: prev.titles.filter((_: any, idx: number) => idx !== indexToRemove)
    }));
  };

  // Experience Entries Management
  const handleAddExperience = () => {
    const defaultExp = {
      company: "New Company",
      role: "Position Role",
      duration: "Jan 2026 - Present",
      logo: "https://img.icons8.com/color/144/briefcase.png",
      description: "Line 1: Key contribution or achievement.\nLine 2: Technology stacks and platforms handled.\nLine 3: Workflow automations or performance gains.\nLine 4: Leadership details or client integrations.",
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    };

    setPortfolioData((prev: any) => ({
      ...prev,
      // Add at index 0 (so new items appear at number 1 on screen)
      experiences: [defaultExp, ...prev.experiences]
    }));
    showToast("Added new experience at number 1!");
  };

  const handleRemoveExperience = (indexToRemove: number) => {
    if (window.confirm(`Are you sure you want to remove the work experience with ${portfolioData.experiences[indexToRemove].company}?`)) {
      setPortfolioData((prev: any) => ({
        ...prev,
        experiences: prev.experiences.filter((_: any, idx: number) => idx !== indexToRemove)
      }));
      showToast("Experience record removed.");
    }
  };

  const handleUpdateExperience = (index: number, field: string, value: string) => {
    setPortfolioData((prev: any) => {
      const copy = [...prev.experiences];
      copy[index] = {
        ...copy[index],
        [field]: value
      };
      return {
        ...prev,
        experiences: copy
      };
    });
  };

  const handleMoveExperience = (index: number, direction: "up" | "down") => {
    setPortfolioData((prev: any) => {
      const copy = [...prev.experiences];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= copy.length) return prev;

      // Swap elements
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;

      return {
        ...prev,
        experiences: copy
      };
    });
  };

  // Certificates Management
  const handleAddCertificate = () => {
    const defaultCert = {
      name: "New Certification",
      issuer: "Provider Issuer",
      image: "/data/certificates/GoogleAiEssentials.png",
      link: "https://www.coursera.org",
      visible: true
    };
    setPortfolioData((prev: any) => ({
      ...prev,
      certificates: [defaultCert, ...(prev.certificates || [])]
    }));
    showToast("Added new certificate at index #1!");
  };

  const handleRemoveCertificate = (indexToRemove: number) => {
    if (window.confirm(`Are you sure you want to remove the certificate "${portfolioData.certificates[indexToRemove].name}"?`)) {
      setPortfolioData((prev: any) => ({
        ...prev,
        certificates: (prev.certificates || []).filter((_: any, idx: number) => idx !== indexToRemove)
      }));
      showToast("Certificate removed.", "info");
    }
  };

  const handleUpdateCertificate = (index: number, field: string, value: any) => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.certificates || [])];
      copy[index] = {
        ...copy[index],
        [field]: value
      };
      return {
        ...prev,
        certificates: copy
      };
    });
  };

  const handleMoveCertificate = (index: number, direction: "up" | "down") => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.certificates || [])];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;

      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;

      return {
        ...prev,
        certificates: copy
      };
    });
  };

  // Achievements Management
  const handleAddAchievement = () => {
    const defaultAch = {
      name: "New Achievement",
      issuer: "Competition Issuer",
      image: "/data/competitions/Nascon.png",
      link: "",
      visible: true
    };
    setPortfolioData((prev: any) => ({
      ...prev,
      achievements: [defaultAch, ...(prev.achievements || [])]
    }));
    showToast("Added new achievement at index #1!");
  };

  const handleRemoveAchievement = (indexToRemove: number) => {
    if (window.confirm(`Are you sure you want to remove the achievement "${portfolioData.achievements[indexToRemove].name}"?`)) {
      setPortfolioData((prev: any) => ({
        ...prev,
        achievements: (prev.achievements || []).filter((_: any, idx: number) => idx !== indexToRemove)
      }));
      showToast("Achievement removed.", "info");
    }
  };

  const handleUpdateAchievement = (index: number, field: string, value: any) => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.achievements || [])];
      copy[index] = {
        ...copy[index],
        [field]: value
      };
      return {
        ...prev,
        achievements: copy
      };
    });
  };

  const handleMoveAchievement = (index: number, direction: "up" | "down") => {
    setPortfolioData((prev: any) => {
      const copy = [...(prev.achievements || [])];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;

      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;

      return {
        ...prev,
        achievements: copy
      };
    });
  };

  // Ballpit Colors Management
  const handleAddColor = () => {
    const formattedColor = newColor.toLowerCase();
    if (!colors.includes(formattedColor)) {
      setColors([...colors, formattedColor]);
      showToast(`Added color: ${formattedColor}`);
    } else {
      showToast("Color already in palette.", "info");
    }
  };

  const handleRemoveColor = (indexToRemove: number) => {
    if (colors.length <= 2) {
      showToast("Requires at least 2 colors to form gradient.", "info");
      return;
    }
    setColors(colors.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSelectPalette = (paletteColors: string[]) => {
    setColors(paletteColors);
    showToast("Palette loaded successfully!");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-12 relative overflow-hidden flex flex-col justify-between">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[120px] -z-20 pointer-events-none" />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-md shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className={`w-2 h-2 rounded-full ${toast.type === "success" ? "bg-emerald-500" : "bg-zinc-500"}`} />
          <span className="text-xs font-mono tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-16 md:mt-0">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back To Site
          </Link>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white flex items-center gap-3">
            <Sliders className="w-8 h-8 text-white" />
            <span>PORTFOLIO ADMIN PANEL</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-350 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-white/5"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">

        {/* Navigation Sidebar (3 columns) */}
        <div className="lg:col-span-3 lg:sticky lg:top-8 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 font-mono text-xs z-30">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${activeTab === "general"
              ? "bg-white border-zinc-700 text-black font-bold"
              : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <User className="w-4 h-4" />
            <span>Hero & Identity</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${activeTab === "about"
              ? "bg-white border-zinc-700 text-black font-bold"
              : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <Info className="w-4 h-4" />
            <span>About Content</span>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${activeTab === "experience"
              ? "bg-white border-zinc-700 text-black font-bold"
              : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Experiences ({portfolioData.experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${activeTab === "contact"
              ? "bg-white border-zinc-700 text-black font-bold"
              : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact & Socials</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${activeTab === "certificates"
              ? "bg-white border-zinc-700 text-black font-bold"
              : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <Award className="w-4 h-4" />
            <span>Certifications ({(portfolioData.certificates || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${activeTab === "projects"
              ? "bg-white border-zinc-700 text-black font-bold"
              : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <FolderGit className="w-4 h-4" />
            <span>Projects ({(portfolioData.featuredProjects || []).length + (portfolioData.secondaryProjects || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab("physics")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${activeTab === "physics"
              ? "bg-white border-zinc-700 text-black font-bold"
              : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <Settings className="w-4 h-4" />
            <span>Hero Physics</span>
          </button>
        </div>

        {/* Dynamic Panel Forms Content (9 columns) */}
        <div className="lg:col-span-9 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl min-h-[500px]">

          {/* TAB 1: HERO & IDENTITY */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" /> // HERO & PERSONAL IDENTITY
              </h2>

              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">HERO TITLE NAME</label>
                <input
                  type="text"
                  value={portfolioData.name}
                  onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
                  placeholder="e.g. TALHA SAMI"
                  className="w-full bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl focus:border-white/50 outline-none text-sm transition-all"
                />
              </div>

              {/* Titles List */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">ROTATING ROLE TITLES</label>
                  <p className="text-[10px] text-zinc-550 font-mono">These items cycle sequentially inside the Hero rotating text component.</p>
                </div>

                <div className="space-y-2.5">
                  {portfolioData.titles.map((title: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between gap-3 bg-zinc-950/60 border border-zinc-850 px-4 py-2.5 rounded-xl text-sm">
                      <span className="font-mono text-zinc-300">{title}</span>
                      <button
                        onClick={() => handleRemoveTitle(idx)}
                        className="text-zinc-500 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Remove title"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Add new title (e.g. Frontend Specialist)"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTitle()}
                    className="flex-1 bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl focus:border-white/50 outline-none text-sm transition-all"
                  />
                  <button
                    onClick={handleAddTitle}
                    className="px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <Plus className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT CONTENT */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" /> // ABOUT SECTION CONTENT
              </h2>

              {/* Profile Image URL */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">PROFILE IMAGE SOURCE PATH / URL</label>
                <input
                  type="text"
                  value={portfolioData.aboutImage}
                  onChange={(e) => setPortfolioData({ ...portfolioData, aboutImage: e.target.value })}
                  placeholder="e.g. /profile.png"
                  className="w-full bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl focus:border-white/50 outline-none text-sm transition-all font-mono"
                />
              </div>

              {/* About Heading */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">SECTION HEADER / TAGLINE</label>
                <textarea
                  value={portfolioData.aboutHeading}
                  onChange={(e) => setPortfolioData({ ...portfolioData, aboutHeading: e.target.value })}
                  rows={2}
                  className="w-full bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl focus:border-white/50 outline-none text-sm transition-all resize-none"
                />
              </div>

              {/* About Paragraph */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">BODY PARAGRAPH STORY</label>
                <textarea
                  value={portfolioData.aboutParagraph}
                  onChange={(e) => setPortfolioData({ ...portfolioData, aboutParagraph: e.target.value })}
                  rows={8}
                  className="w-full bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl focus:border-white/50 outline-none text-sm transition-all resize-y leading-relaxed font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 3: WORK EXPERIENCES */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4 mb-4">
                <div>
                  <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" /> // EXPERIENCE RECORDS LIST
                  </h2>
                  <p className="text-[10px] text-zinc-550 font-mono mt-1">Experiences array ordering (Up/Down) matches layout priority. Index 1 represents item #1 on navigation.</p>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </button>
              </div>

              {portfolioData.experiences.length === 0 ? (
                <div className="text-center py-10 bg-zinc-950/20 border border-dashed border-zinc-850 rounded-2xl font-mono text-zinc-500 text-xs">
                  No work experiences defined. Click "Add Experience" to create your first entry.
                </div>
              ) : (
                <div className="space-y-8">
                  {portfolioData.experiences.map((exp: any, index: number) => (
                    <div
                      key={index}
                      className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-6 relative space-y-4 hover:border-zinc-700 transition-colors shadow-sm"
                    >
                      {/* Top Header toolbar: Reorder & Delete */}
                      <div className="flex justify-between items-center bg-zinc-950 border-b border-zinc-900 -mx-6 -mt-6 px-6 py-2.5 rounded-t-2xl">
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-400">
                          <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[9px] font-bold">
                            {index + 1}
                          </span>
                          <span>EXPERIENCE RECORD ENTRY</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleMoveExperience(index, "up")}
                            disabled={index === 0}
                            className="p-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveExperience(index, "down")}
                            disabled={index === portfolioData.experiences.length - 1}
                            className="p-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-px h-4 bg-zinc-800/80 mx-1" />
                          <button
                            onClick={() => handleRemoveExperience(index)}
                            className="p-1 rounded bg-zinc-900 border border-zinc-800 hover:border-rose-900 text-zinc-555 hover:text-rose-500 cursor-pointer"
                            title="Delete Experience"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Editing fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Company Name */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400">COMPANY NAME</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>

                        {/* Position Role */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400">ROLE / POSITION TITLE</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleUpdateExperience(index, "role", e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>

                        {/* Duration */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400">DURATION TIMEFRAME</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => handleUpdateExperience(index, "duration", e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>

                        {/* Logo Image URL */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400">COMPANY LOGO URL (COLORED ICON)</label>
                          <input
                            type="text"
                            value={exp.logo}
                            onChange={(e) => handleUpdateExperience(index, "logo", e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>

                        {/* LinkedIn Link */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400">LINKEDIN URL</label>
                          <input
                            type="text"
                            value={exp.linkedin || ""}
                            onChange={(e) => handleUpdateExperience(index, "linkedin", e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>

                        {/* Company Website Link */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400">WEBSITE URL</label>
                          <input
                            type="text"
                            value={exp.website || ""}
                            onChange={(e) => handleUpdateExperience(index, "website", e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>
                      </div>

                      {/* 4 Line Description Area */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-zinc-400">WORK DESCRIPTION / ACHIEVEMENTS (4 LINES IDEAL)</span>
                          <span className="text-zinc-650">SEPARATE EACH LINE WITH A NEWLINE</span>
                        </div>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleUpdateExperience(index, "description", e.target.value)}
                          rows={4}
                          className="w-full bg-zinc-950 border border-zinc-850 px-3.5 py-2.5 rounded-xl focus:border-white/50 outline-none text-xs transition-all resize-y leading-relaxed font-sans"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: CONTACT & SOCIALS */}
          {activeTab === "contact" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-white" /> // CONTACT & SOCIAL NETWORKS
                </h2>
                <p className="text-[10px] font-mono text-zinc-500">
                  Configure titles, headers, email/phone contact information, and toggle visibility of tech social links.
                </p>
              </div>

              {/* General Contact Info fields */}
              <div className="space-y-4 bg-zinc-950/45 p-6 rounded-2xl border border-zinc-800/80">
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Contact General Info</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">Subheading</label>
                    <input
                      type="text"
                      value={portfolioData.contactSubheading || ""}
                      onChange={(e) => setPortfolioData({ ...portfolioData, contactSubheading: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">Heading</label>
                    <input
                      type="text"
                      value={portfolioData.contactHeading || ""}
                      onChange={(e) => setPortfolioData({ ...portfolioData, contactHeading: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase">Paragraph Description</label>
                  <textarea
                    value={portfolioData.contactParagraph || ""}
                    onChange={(e) => setPortfolioData({ ...portfolioData, contactParagraph: e.target.value })}
                    rows={2}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all leading-relaxed font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={portfolioData.contactEmail || ""}
                      onChange={(e) => setPortfolioData({ ...portfolioData, contactEmail: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">Phone Number</label>
                    <input
                      type="text"
                      value={portfolioData.contactPhone || ""}
                      onChange={(e) => setPortfolioData({ ...portfolioData, contactPhone: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Social Networks Manager */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Configure Social Links</h3>

                <div className="space-y-3">
                  {(portfolioData.socials || []).map((social: any, index: number) => (
                    <div
                      key={social.name}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-850 bg-zinc-950/40 hover:bg-zinc-950/80 transition-colors duration-200"
                    >
                      {/* Name & Icon Preview */}
                      <div className="flex items-center gap-3 md:w-44 shrink-0">
                        {social.logo && (
                          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                            {social.logo ? (
                              <img src={social.logo} alt={social.name} className="w-4.5 h-4.5 object-contain" />
                            ) : (
                              <span className="text-[10px] font-mono font-bold text-zinc-500">
                                {social.name.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                        )}
                        <span className="font-mono text-xs font-bold text-white">{social.name}</span>
                      </div>

                      {/* URL Edit Input */}
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={social.url}
                          placeholder={`Enter ${social.name} profile URL`}
                          onChange={(e) => {
                            const updated = [...portfolioData.socials];
                            updated[index] = { ...updated[index], url: e.target.value };
                            setPortfolioData({ ...portfolioData, socials: updated });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg focus:border-white/40 outline-none text-xs transition-all font-mono text-zinc-300"
                        />
                      </div>

                      {/* Visibility Toggle */}
                      <div className="flex items-center gap-2 md:w-28 justify-end shrink-0">
                        <span className="text-[10px] font-mono text-zinc-500">VISIBLE</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...portfolioData.socials];
                            updated[index] = { ...updated[index], visible: !social.visible };
                            setPortfolioData({ ...portfolioData, socials: updated });
                          }}
                          className={`w-10 h-5 rounded-full p-0.5 transition-all duration-300 ${social.visible ? "bg-white" : "bg-zinc-800"}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-zinc-950 transition-all duration-300 ${social.visible ? "translate-x-5" : "translate-x-0"}`} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PHYSICS BALLPIT CONFIG */}
          {activeTab === "physics" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-white" /> // PHYSICS CONFIGURATION
                </h2>
                <p className="text-[10px] font-mono text-zinc-500">Configure WebGL background elements floating in the Hero section.</p>
              </div>

              <div className="space-y-6">
                {/* Balls Count Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400">DESKTOP BALLS COUNT</span>
                    <span className="text-white font-bold">{count}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Mobile Balls Count Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400">MOBILE & TABLET BALLS COUNT</span>
                    <span className="text-white font-bold">{countMobile}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    value={countMobile}
                    onChange={(e) => setCountMobile(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Gravity Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400">GRAVITY STRENGTH</span>
                    <span className="text-white font-bold">{gravity}</span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="4"
                    step="0.1"
                    value={gravity}
                    onChange={(e) => setGravity(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Friction Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400">AIR RESISTANCE / FRICTION</span>
                    <span className="text-white font-bold">{friction}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.0"
                    step="0.001"
                    value={friction}
                    onChange={(e) => setFriction(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Wall Bounciness Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400">WALL BOUNCINESS (ELASTICITY)</span>
                    <span className="text-white font-bold">{wallBounce}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.05"
                    value={wallBounce}
                    onChange={(e) => setWallBounce(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Follow Cursor Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/40">
                  <div>
                    <h3 className="text-xs font-mono text-zinc-350">FOLLOW CURSOR MODE</h3>
                    <p className="text-[10px] text-zinc-555 font-mono mt-1">If enabled, the mouse cursor itself is rendered as a sphere</p>
                  </div>
                  <button
                    onClick={() => setFollowCursor(!followCursor)}
                    className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${followCursor ? "bg-white" : "bg-zinc-800"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-zinc-950 transition-all duration-300 ${followCursor ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>

              <div className="h-px bg-zinc-800/50 my-6" />

              {/* Color Settings */}
              <div className="space-y-6">
                <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-white" /> // COLOR CONFIGURATION
                </h2>

                {/* Predefined Palettes */}
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block mb-3">PALETTE PRESETS</span>
                  <div className="flex flex-wrap gap-2.5">
                    {PALETTES.map((pal, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPalette(pal.colors)}
                        className="px-3.5 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 text-[10px] font-mono hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <div className="flex gap-1">
                          {pal.colors.slice(0, 3).map((col, cIdx) => (
                            <div key={cIdx} className="w-2.5 h-2.5 rounded-full border border-zinc-900" style={{ backgroundColor: col }} />
                          ))}
                        </div>
                        {pal.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Palette Builder */}
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block mb-3">ACTIVE COLORS (MINIMUM 2)</span>
                  <div className="flex flex-wrap items-center gap-3 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-800/80">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-mono"
                      >
                        <div className="w-3.5 h-3.5 rounded-full border border-zinc-950" style={{ backgroundColor: color }} />
                        <span className="text-zinc-350">{color}</span>
                        <button
                          onClick={() => handleRemoveColor(index)}
                          className="text-zinc-500 hover:text-rose-500 transition-colors ml-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Add Custom Color Input */}
                    <div className="flex items-center gap-2.5 pl-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer flex items-center justify-center bg-zinc-800">
                        <input
                          type="color"
                          value={newColor}
                          onChange={(e) => setNewColor(e.target.value)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: newColor }} />
                      </div>
                      <button
                        onClick={handleAddColor}
                        className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* WebGL Physics Preview Container */}
              <div className="mt-8">
                <h3 className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 mb-4">
                  <Eye className="w-4 h-4 text-white" /> WebGL Preview Box
                </h3>
                <div className="w-[260px] h-[260px] rounded-3xl border border-zinc-800 bg-zinc-950 relative overflow-hidden shadow-inner mx-auto">
                  <Ballpit
                    count={count}
                    countMobile={countMobile}
                    gravity={gravity}
                    friction={friction}
                    wallBounce={wallBounce}
                    followCursor={followCursor}
                    colors={colors}
                  />
                  <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
                    <span className="text-[8px] font-mono tracking-widest text-zinc-655 bg-zinc-950/70 border border-zinc-850 px-2 rounded-full uppercase">WebGL Physics Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATIONS & ACHIEVEMENTS */}
          {activeTab === "certificates" && (
            <div className="space-y-8">
              {/* Section 1: Certifications */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
                  <div>
                    <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-white" /> // CERTIFICATION RECORDS LIST
                    </h2>
                    <p className="text-[10px] text-zinc-550 font-mono mt-1">Manage verified credentials, cover images, and verification links.</p>
                  </div>
                  <button
                    onClick={handleAddCertificate}
                    className="px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-955 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Certificate
                  </button>
                </div>

                {(!portfolioData.certificates || portfolioData.certificates.length === 0) ? (
                  <div className="text-center py-10 bg-zinc-950/20 border border-dashed border-zinc-850 rounded-2xl font-mono text-zinc-500 text-xs">
                    No certifications defined. Click "Add Certificate" to create your first entry.
                  </div>
                ) : (
                  <div className="space-y-8">
                    {portfolioData.certificates.map((cert: any, index: number) => (
                      <div
                        key={index}
                        className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-6 relative space-y-4 hover:border-zinc-700 transition-colors shadow-sm"
                      >
                        {/* Top Header toolbar: Reorder & Delete */}
                        <div className="flex justify-between items-center bg-zinc-950 border-b border-zinc-900 -mx-6 -mt-6 px-6 py-2.5 rounded-t-2xl">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-400">
                            <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[9px] font-bold">
                              {index + 1}
                            </span>
                            <span>CERTIFICATE RECORD</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMoveCertificate(index, "up")}
                              className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === portfolioData.certificates.length - 1}
                              onClick={() => handleMoveCertificate(index, "down")}
                              className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <div className="w-px h-3 bg-zinc-800 mx-1" />
                            <button
                              type="button"
                              onClick={() => handleRemoveCertificate(index)}
                              className="p-1 hover:bg-red-950/30 text-zinc-400 hover:text-red-400 rounded cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Inputs Row 1: Name and Issuer */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Certification Name</label>
                            <input
                              type="text"
                              value={cert.name || ""}
                              onChange={(e) => handleUpdateCertificate(index, "name", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Issuer Provider</label>
                            <input
                              type="text"
                              value={cert.issuer || ""}
                              onChange={(e) => handleUpdateCertificate(index, "issuer", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>
                        </div>

                        {/* Inputs Row 2: Image Path and Link */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Cover Image Path / URL</label>
                            <input
                              type="text"
                              value={cert.image || ""}
                              onChange={(e) => handleUpdateCertificate(index, "image", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Verification Link URL</label>
                            <input
                              type="text"
                              value={cert.link || ""}
                              onChange={(e) => handleUpdateCertificate(index, "link", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>
                        </div>

                        {/* Visibility Checkbox toggle */}
                        <div className="flex items-center gap-2 pt-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Status Visibility</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateCertificate(index, "visible", !cert.visible)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer ${cert.visible
                              ? "bg-zinc-900 border-zinc-700 text-white"
                              : "bg-zinc-950/20 border-zinc-900 text-zinc-500"
                              }`}
                          >
                            {cert.visible ? <Eye className="w-3.5 h-3.5 text-white" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-500" />}
                            <span>{cert.visible ? "VISIBLE IN LIST" : "HIDDEN"}</span>
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 2: Achievements */}
              <div className="space-y-6 pt-6 border-t border-zinc-800/80">
                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
                  <div>
                    <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-white" /> // COMPETITIONS & ACHIEVEMENTS LIST
                    </h2>
                    <p className="text-[10px] text-zinc-550 font-mono mt-1">Manage competitions won, placement details, and honors certificate assets.</p>
                  </div>
                  <button
                    onClick={handleAddAchievement}
                    className="px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-955 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Achievement
                  </button>
                </div>

                {(!portfolioData.achievements || portfolioData.achievements.length === 0) ? (
                  <div className="text-center py-10 bg-zinc-950/20 border border-dashed border-zinc-850 rounded-2xl font-mono text-zinc-500 text-xs">
                    No honors or achievements defined. Click "Add Achievement" to create your first entry.
                  </div>
                ) : (
                  <div className="space-y-8">
                    {portfolioData.achievements.map((ach: any, index: number) => (
                      <div
                        key={index}
                        className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-6 relative space-y-4 hover:border-zinc-700 transition-colors shadow-sm"
                      >
                        {/* Top Header toolbar: Reorder & Delete */}
                        <div className="flex justify-between items-center bg-zinc-950 border-b border-zinc-900 -mx-6 -mt-6 px-6 py-2.5 rounded-t-2xl">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-400">
                            <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[9px] font-bold">
                              {index + 1}
                            </span>
                            <span>ACHIEVEMENT RECORD</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMoveAchievement(index, "up")}
                              className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === portfolioData.achievements.length - 1}
                              onClick={() => handleMoveAchievement(index, "down")}
                              className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <div className="w-px h-3 bg-zinc-800 mx-1" />
                            <button
                              type="button"
                              onClick={() => handleRemoveAchievement(index)}
                              className="p-1 hover:bg-red-950/30 text-zinc-400 hover:text-red-400 rounded cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Inputs Row 1: Name and Issuer */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Achievement Title</label>
                            <input
                              type="text"
                              value={ach.name || ""}
                              onChange={(e) => handleUpdateAchievement(index, "name", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Competition Issuer</label>
                            <input
                              type="text"
                              value={ach.issuer || ""}
                              onChange={(e) => handleUpdateAchievement(index, "issuer", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>
                        </div>

                        {/* Inputs Row 2: Image Path and Link */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Cover Image Path / URL</label>
                            <input
                              type="text"
                              value={ach.image || ""}
                              onChange={(e) => handleUpdateAchievement(index, "image", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Verification Link URL</label>
                            <input
                              type="text"
                              value={ach.link || ""}
                              onChange={(e) => handleUpdateAchievement(index, "link", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>
                        </div>

                        {/* Visibility Checkbox toggle */}
                        <div className="flex items-center gap-2 pt-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Status Visibility</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateAchievement(index, "visible", !ach.visible)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer ${ach.visible
                              ? "bg-zinc-900 border-zinc-700 text-white"
                              : "bg-zinc-950/20 border-zinc-900 text-zinc-500"
                              }`}
                          >
                            {ach.visible ? <Eye className="w-3.5 h-3.5 text-white" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-500" />}
                            <span>{ach.visible ? "VISIBLE IN LIST" : "HIDDEN"}</span>
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: PROJECTS CONFIG */}
          {activeTab === "projects" && (
            <div className="space-y-8 animate-fade-in">

              {/* Section 1: Featured Projects */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
                  <div>
                    <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
                      <FolderGit className="w-4.5 h-4.5 text-white" /> // FEATURED SHOWCASES CONFIG
                    </h2>
                    <p className="text-[10px] text-zinc-555 font-mono mt-1">Configure details, tags, and images for the featured showcases on the main grid.</p>
                  </div>
                  <button
                    onClick={handleAddFeaturedProject}
                    className="px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-955 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Featured Project
                  </button>
                </div>

                <div className="space-y-8">
                  {(portfolioData.featuredProjects || []).map((project: any, index: number) => (
                    <div
                      key={index}
                      className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-6 relative space-y-4 hover:border-zinc-700 transition-colors shadow-sm"
                    >
                      {/* Toolbar: Reorder & Delete */}
                      <div className="flex justify-between items-center bg-zinc-950 border-b border-zinc-900 -mx-6 -mt-6 px-6 py-2.5 rounded-t-2xl">
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-400">
                          <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[9px] font-bold">
                            {index + 1}
                          </span>
                          <span>FEATURED SHOWCASE ITEM</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveFeaturedProject(index, "up")}
                            className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === portfolioData.featuredProjects.length - 1}
                            onClick={() => handleMoveFeaturedProject(index, "down")}
                            className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-px h-3 bg-zinc-800 mx-1" />
                          <button
                            type="button"
                            onClick={() => handleRemoveFeaturedProject(index)}
                            className="p-1 hover:bg-rose-950/30 text-zinc-450 hover:text-rose-400 rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Inputs Row 1: Name and Tagline */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase">Project Name</label>
                          <input
                            type="text"
                            value={project.name || ""}
                            onChange={(e) => handleUpdateFeaturedProject(index, "name", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase">Tagline</label>
                          <input
                            type="text"
                            value={project.tagline || ""}
                            onChange={(e) => handleUpdateFeaturedProject(index, "tagline", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>
                      </div>

                      {/* Inputs Row 2: Image and Live Link */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase">Image Path / URL</label>
                          <input
                            type="text"
                            value={project.image || ""}
                            onChange={(e) => handleUpdateFeaturedProject(index, "image", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase">Live Demo Link</label>
                          <input
                            type="text"
                            value={project.liveLink || ""}
                            onChange={(e) => handleUpdateFeaturedProject(index, "liveLink", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                          />
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={project.techStack ? project.techStack.join(", ") : ""}
                          onChange={(e) => handleUpdateFeaturedProject(index, "techStack", e.target.value.split(",").map(s => s.trim()))}
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono text-zinc-355"
                        />
                      </div>

                      {/* Description Textarea */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase">Short Summary Description</label>
                        <textarea
                          value={project.description || ""}
                          onChange={(e) => handleUpdateFeaturedProject(index, "description", e.target.value)}
                          rows={2}
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-sans text-zinc-300 animate-none resize-y"
                        />
                      </div>

                      {/* Details specs textarea */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase">Case Study Detailed Specs (shown in modal popup)</label>
                        <textarea
                          value={project.details || ""}
                          onChange={(e) => handleUpdateFeaturedProject(index, "details", e.target.value)}
                          rows={4}
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-sans text-zinc-300 animate-none resize-y"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Secondary Repositories */}
              <div className="space-y-6 pt-6 border-t border-zinc-800/80">
                <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
                  <div>
                    <h2 className="text-sm font-mono tracking-widest text-zinc-555 flex items-center gap-2">
                      <FolderGit className="w-4.5 h-4.5 text-white" /> // SECONDARY REPOSITORIES
                    </h2>
                    <p className="text-[10px] text-zinc-555 font-mono mt-1">Manage repositories list, GitHub URLs, descriptions, and pictures.</p>
                  </div>
                  <button
                    onClick={handleAddSecondaryProject}
                    className="px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                {(!portfolioData.secondaryProjects || portfolioData.secondaryProjects.length === 0) ? (
                  <div className="text-center py-10 bg-zinc-950/20 border border-dashed border-zinc-850 rounded-2xl font-mono text-zinc-500 text-xs">
                    No secondary projects defined. Click "Add Project" to get started.
                  </div>
                ) : (
                  <div className="space-y-8">
                    {portfolioData.secondaryProjects.map((proj: any, index: number) => (
                      <div
                        key={index}
                        className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-6 relative space-y-4 hover:border-zinc-700 transition-colors shadow-sm"
                      >
                        {/* Toolbar: Reorder & Delete */}
                        <div className="flex justify-between items-center bg-zinc-950 border-b border-zinc-900 -mx-6 -mt-6 px-6 py-2.5 rounded-t-2xl">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-400">
                            <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[9px] font-bold">
                              {index + 1}
                            </span>
                            <span>SECONDARY REPOSITORY ITEM</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMoveSecondaryProject(index, "up")}
                              className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === portfolioData.secondaryProjects.length - 1}
                              onClick={() => handleMoveSecondaryProject(index, "down")}
                              className="p-1 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <div className="w-px h-3 bg-zinc-800 mx-1" />
                            <button
                              type="button"
                              onClick={() => handleRemoveSecondaryProject(index)}
                              className="p-1 hover:bg-red-950/30 text-zinc-400 hover:text-red-400 rounded cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Inputs: Name, Repo URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">Project Name</label>
                            <input
                              type="text"
                              value={proj.name || ""}
                              onChange={(e) => handleUpdateSecondaryProject(index, "name", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-zinc-400 uppercase">GitHub Repo URL</label>
                            <input
                              type="text"
                              value={proj.repoLink || ""}
                              onChange={(e) => handleUpdateSecondaryProject(index, "repoLink", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono"
                            />
                          </div>
                        </div>

                        {/* Cover Image Path */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase">Cover Image Path / URL</label>
                          <input
                            type="text"
                            value={proj.image || ""}
                            onChange={(e) => handleUpdateSecondaryProject(index, "image", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono text-zinc-350"
                          />
                        </div>

                        {/* Tech stack */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            value={proj.techStack ? proj.techStack.join(", ") : ""}
                            onChange={(e) => handleUpdateSecondaryProject(index, "techStack", e.target.value.split(",").map(s => s.trim()))}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-mono text-zinc-350"
                          />
                        </div>

                        {/* Description Textarea */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase">Short Description</label>
                          <textarea
                            value={proj.description || ""}
                            onChange={(e) => handleUpdateSecondaryProject(index, "description", e.target.value)}
                            rows={2}
                            className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl focus:border-white/50 outline-none text-xs transition-all font-sans text-zinc-350 animate-none resize-y"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Footer warning */}
      <div className="max-w-6xl mx-auto w-full mt-4 flex items-start gap-3 p-4 rounded-2xl border border-zinc-850 bg-zinc-950/30">
        <AlertCircle className="w-5 h-5 text-white/70 shrink-0 mt-0.5" />
        <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">
          Ensure you click <strong className="text-zinc-300">Save Changes</strong> on the top-right toolbar to persist all sections config values (Hero name/rotating texts, About page details, and Work experiences ordering/content) to local storage.
        </p>
      </div>

      {/* Footer copyright */}
      <div className="max-w-6xl mx-auto w-full border-t border-zinc-900 pt-6 text-center text-[10px] font-mono text-zinc-650 mt-6">
        © 2026 Talha Sami. All Rights Reserved. Config Panel powered by React Bits.
      </div>
    </main>
  );
}
