"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, RefreshCw, Layers, Sliders, Sun, Moon, Laptop, Palette, Info } from "lucide-react";
import { getSettings, saveSettings, DEFAULT_SETTINGS, PortfolioSettings } from "@/lib/settings";

export default function SettingPage() {
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);
  const [colorInput, setColorInput] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  // Load settings on mount
  useEffect(() => {
    const loadedSettings = getSettings();
    setSettings(loadedSettings);
    setColorInput(loadedSettings.ballpit.colors.join(", "));
  }, []);

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex items-center gap-3 font-semibold text-lg animate-pulse">
          <RefreshCw className="w-5 h-5 animate-spin" />
          Loading Settings...
        </div>
      </div>
    );
  }

  // Handle standard input updates
  const updateSetting = (key: keyof PortfolioSettings, value: any) => {
    setSettings((prev) => prev ? { ...prev, [key]: value } : null);
  };

  // Handle nested Ballpit config updates
  const updateBallpitSetting = (key: string, value: any) => {
    setSettings((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ballpit: {
          ...prev.ballpit,
          [key]: value,
        },
      };
    });
  };

  // Handle saving to localStorage
  const handleSave = () => {
    // Parse colors from comma-separated input
    const parsedColors = colorInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => /^#[0-9A-F]{6}$/i.test(c)); // Validate hex format

    if (parsedColors.length === 0) {
      alert("Please provide at least one valid hex color code (e.g. #3B82F6).");
      return;
    }

    const updatedSettings: PortfolioSettings = {
      ...settings,
      ballpit: {
        ...settings.ballpit,
        colors: parsedColors,
      },
    };

    saveSettings(updatedSettings);
    setSettings(updatedSettings);
    
    setSaveMessage("✓ Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Reset to default settings
  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore default settings?")) {
      setSettings(DEFAULT_SETTINGS);
      setColorInput(DEFAULT_SETTINGS.ballpit.colors.join(", "));
      saveSettings(DEFAULT_SETTINGS);
      setSaveMessage("✓ Settings reset to defaults!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Back to Portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
              <p className="text-zinc-500 text-sm mt-1">Configure your portfolio content and ballpit physics engine.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center gap-2 cursor-pointer shadow-sm select-none"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Defaults
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-255 transition-all flex items-center gap-2 cursor-pointer shadow-md select-none"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Live Event Alerts */}
        {saveMessage && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-sm font-semibold transition-all">
            {saveMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column Section: Quick settings links / summary */}
          <div className="md:col-span-1 space-y-6">
            {/* Theme card */}
            <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-4">
              <div className="flex items-center gap-2.5 font-bold">
                <Sun className="w-5 h-5 text-zinc-500" />
                <span>Display Theme</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">Choose whether your portfolio matches system settings, or sticks to a preferred styling mode.</p>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "light", icon: Sun, label: "Light" },
                  { name: "dark", icon: Moon, label: "Dark" },
                  { name: "system", icon: Laptop, label: "System" }
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => updateSetting("theme", t.name)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
                      settings.theme === t.name
                        ? "bg-foreground text-background border-foreground dark:border-white shadow-sm"
                        : "border-zinc-200 dark:border-zinc-800 bg-background text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick tips */}
            <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-sm text-zinc-500 dark:text-zinc-400">
                <Info className="w-4 h-4" />
                <span>Quick Tip</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Changes will be cached inside your browser storage. Navigating back to the portfolio home page immediately displays the updated content with Next.js state binding.
              </p>
            </div>
          </div>

          {/* Right Column Section: Settings form */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Form Section: Portfolio Info */}
            <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <Layers className="w-5 h-5 text-zinc-500" />
                <h2 className="text-lg font-bold">Portfolio Details</h2>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Document Title</label>
                  <input
                    id="title-input"
                    type="text"
                    value={settings.title}
                    onChange={(e) => updateSetting("title", e.target.value)}
                    className="px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm font-medium w-full"
                    placeholder="Enter document title"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="hero-title-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Hero Section Title</label>
                  <input
                    id="hero-title-input"
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) => updateSetting("heroTitle", e.target.value)}
                    className="px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm font-medium w-full"
                    placeholder="Enter hero title"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="hero-desc-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Hero Section Description</label>
                  <textarea
                    id="hero-desc-input"
                    value={settings.heroDescription}
                    onChange={(e) => updateSetting("heroDescription", e.target.value)}
                    rows={3}
                    className="px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm font-medium w-full resize-none"
                    placeholder="Enter hero description"
                  />
                </div>
              </div>
            </div>

            {/* Form Section: Ballpit Physics */}
            <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <Sliders className="w-5 h-5 text-zinc-500" />
                <h2 className="text-lg font-bold">Ballpit Canvas Physics</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="ball-count-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Ball Count ({settings.ballpit.count})</label>
                  <input
                    id="ball-count-input"
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={settings.ballpit.count}
                    onChange={(e) => updateBallpitSetting("count", parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-foreground"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="gravity-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Gravity ({settings.ballpit.gravity})</label>
                  <input
                    id="gravity-input"
                    type="range"
                    min="-1"
                    max="3"
                    step="0.1"
                    value={settings.ballpit.gravity}
                    onChange={(e) => updateBallpitSetting("gravity", parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-foreground"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="friction-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Friction ({settings.ballpit.friction})</label>
                  <input
                    id="friction-input"
                    type="range"
                    min="0.9"
                    max="1"
                    step="0.002"
                    value={settings.ballpit.friction}
                    onChange={(e) => updateBallpitSetting("friction", parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-foreground"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="bounce-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Wall Bounce ({settings.ballpit.wallBounce})</label>
                  <input
                    id="bounce-input"
                    type="range"
                    min="0.2"
                    max="1.5"
                    step="0.05"
                    value={settings.ballpit.wallBounce}
                    onChange={(e) => updateBallpitSetting("wallBounce", parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-foreground"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-background">
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="cursor-check" className="text-sm font-semibold cursor-pointer">Follow Mouse Cursor</label>
                    <span className="text-xs text-zinc-500">Makes spheres cluster/bounce toward mouse interactions.</span>
                  </div>
                  <input
                    id="cursor-check"
                    type="checkbox"
                    checked={settings.ballpit.followCursor}
                    onChange={(e) => updateBallpitSetting("followCursor", e.target.checked)}
                    className="w-5 h-5 rounded-lg border-zinc-300 dark:border-zinc-700 bg-background accent-foreground text-background focus:ring-0 cursor-pointer"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-zinc-500" />
                    <label htmlFor="colors-input" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Colors (Hex List, Comma Separated)</label>
                  </div>
                  <input
                    id="colors-input"
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm font-medium w-full font-mono"
                    placeholder="#3B82F6, #c10c0c, #38d514"
                  />
                  
                  {/* Hex Color Indicators Preview */}
                  <div className="flex gap-2 items-center flex-wrap pt-1">
                    <span className="text-xs text-zinc-500 font-mono mr-1">Preview:</span>
                    {colorInput.split(",").map((color, idx) => {
                      const cleaned = color.trim();
                      const isValid = /^#[0-9A-F]{6}$/i.test(cleaned);
                      return (
                        <span
                          key={idx}
                          className="w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-700 inline-block shadow-sm transition-all"
                          style={{
                            backgroundColor: isValid ? cleaned : "transparent",
                            opacity: isValid ? 1 : 0.3,
                            borderStyle: isValid ? "solid" : "dashed"
                          }}
                          title={isValid ? cleaned : "Invalid hex color"}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
