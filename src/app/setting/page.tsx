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
  Eye
} from "lucide-react";

const Ballpit = dynamic(() => import("@/components/Ballpit"), {
  ssr: false,
});

import DEFAULT_SETTINGS from "@/data/ballpit.json";
import DEFAULT_PORTFOLIO from "@/data/portfolio-defaults.json";

const PALETTES = [
  { name: "Monochrome Black & White", colors: ["#ffffff", "#71717a", "#000000"] },
  { name: "Sleek RGB Blue-Green-Red", colors: ["#3B82F6", "#38d514", "#c10c0c"] },
  { name: "Neon Cyberpunk", colors: ["#3B82F6", "#ec4899", "#8b5cf6"] },
  { name: "Toxic Mint", colors: ["#10b981", "#064e3b", "#a7f3d0"] },
  { name: "Sunset Horizon", colors: ["#f97316", "#ef4444", "#ec4899"] },
];

type TabType = "general" | "about" | "experience" | "physics";

export default function AdminSettings() {
  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>("general");

  // Ballpit Physics Configuration State
  const [count, setCount] = useState(DEFAULT_SETTINGS.count);
  const [gravity, setGravity] = useState(DEFAULT_SETTINGS.gravity);
  const [friction, setFriction] = useState(DEFAULT_SETTINGS.friction);
  const [wallBounce, setWallBounce] = useState(DEFAULT_SETTINGS.wallBounce);
  const [followCursor, setFollowCursor] = useState(DEFAULT_SETTINGS.followCursor);
  const [colors, setColors] = useState<string[]>(DEFAULT_SETTINGS.colors);
  const [newColor, setNewColor] = useState("#ffffff");

  // Dynamic Portfolio Content Configuration State
  const [portfolioData, setPortfolioData] = useState<any>({
    name: DEFAULT_PORTFOLIO.name,
    titles: [...DEFAULT_PORTFOLIO.titles],
    aboutHeading: DEFAULT_PORTFOLIO.aboutHeading,
    aboutParagraph: DEFAULT_PORTFOLIO.aboutParagraph,
    aboutImage: DEFAULT_PORTFOLIO.aboutImage,
    experiences: JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO.experiences))
  });

  const [newTitle, setNewTitle] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Load configuration from local storage on mount
  useEffect(() => {
    try {
      // 1. Load physics
      const storedPhysics = localStorage.getItem("ballpit-settings");
      if (storedPhysics) {
        const parsed = JSON.parse(storedPhysics);
        if (parsed.count !== undefined) setCount(parsed.count);
        if (parsed.gravity !== undefined) setGravity(parsed.gravity);
        if (parsed.friction !== undefined) setFriction(parsed.friction);
        if (parsed.wallBounce !== undefined) setWallBounce(parsed.wallBounce);
        if (parsed.followCursor !== undefined) setFollowCursor(parsed.followCursor);
        if (parsed.colors !== undefined) setColors(parsed.colors);
      }

      // 2. Load portfolio content
      const storedPortfolio = localStorage.getItem("portfolio-settings");
      if (storedPortfolio) {
        const parsed = JSON.parse(storedPortfolio);
        setPortfolioData((prev: any) => ({
          ...prev,
          ...parsed
        }));
      }
    } catch (e) {
      console.error("Error reading stored settings:", e);
    }
  }, []);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    try {
      // Save physics settings
      const physicsConfig = { count, gravity, friction, wallBounce, followCursor, colors };
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
      // Reset physics
      setCount(DEFAULT_SETTINGS.count);
      setGravity(DEFAULT_SETTINGS.gravity);
      setFriction(DEFAULT_SETTINGS.friction);
      setWallBounce(DEFAULT_SETTINGS.wallBounce);
      setFollowCursor(DEFAULT_SETTINGS.followCursor);
      setColors(DEFAULT_SETTINGS.colors);

      // Reset portfolio data
      setPortfolioData(JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO)));
      showToast("Reset all values to defaults.", "info");
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
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${
              activeTab === "general"
                ? "bg-white border-zinc-700 text-zinc-950 font-bold"
                : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Hero & Identity</span>
          </button>
          
          <button
            onClick={() => setActiveTab("about")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${
              activeTab === "about"
                ? "bg-white border-zinc-700 text-zinc-950 font-bold"
                : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About Content</span>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${
              activeTab === "experience"
                ? "bg-white border-zinc-700 text-zinc-950 font-bold"
                : "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Experiences ({portfolioData.experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("physics")}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer shrink-0 lg:shrink ${
              activeTab === "physics"
                ? "bg-white border-zinc-700 text-zinc-950 font-bold"
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
                    <span className="text-zinc-400">BALLS COUNT</span>
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
