"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Sliders, RefreshCw, Save, ArrowLeft, Plus, Trash2, Check, Sparkles, AlertCircle } from "lucide-react";

const Ballpit = dynamic(() => import("@/components/Ballpit"), {
  ssr: false,
});

import DEFAULT_SETTINGS from "@/data/ballpit.json";

const PALETTES = [
  { name: "Default (White / Black / Gold)", colors: ["#ffffff", "#000000", "#d59b14"] },
  { name: "Sleek RGB Blue-Green-Red", colors: ["#3B82F6", "#38d514", "#c10c0c"] },
  { name: "Neon Cyberpunk", colors: ["#3B82F6", "#ec4899", "#8b5cf6"] },
  { name: "Toxic Mint", colors: ["#10b981", "#064e3b", "#a7f3d0"] },
  { name: "Sunset Horizon", colors: ["#f97316", "#ef4444", "#ec4899"] },
];

export default function AdminSettings() {
  const [count, setCount] = useState(DEFAULT_SETTINGS.count);
  const [gravity, setGravity] = useState(DEFAULT_SETTINGS.gravity);
  const [friction, setFriction] = useState(DEFAULT_SETTINGS.friction);
  const [wallBounce, setWallBounce] = useState(DEFAULT_SETTINGS.wallBounce);
  const [followCursor, setFollowCursor] = useState(DEFAULT_SETTINGS.followCursor);
  const [colors, setColors] = useState<string[]>(DEFAULT_SETTINGS.colors);

  const [newColor, setNewColor] = useState("#3B82F6");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Load configuration from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ballpit-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.count !== undefined) setCount(parsed.count);
        if (parsed.gravity !== undefined) setGravity(parsed.gravity);
        if (parsed.friction !== undefined) setFriction(parsed.friction);
        if (parsed.wallBounce !== undefined) setWallBounce(parsed.wallBounce);
        if (parsed.followCursor !== undefined) setFollowCursor(parsed.followCursor);
        if (parsed.colors !== undefined) setColors(parsed.colors);
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
      const config = { count, gravity, friction, wallBounce, followCursor, colors };
      localStorage.setItem("ballpit-settings", JSON.stringify(config));
      showToast("Config saved successfully!");
    } catch (e) {
      console.error(e);
      showToast("Failed to save config.", "info");
    }
  };

  const handleReset = () => {
    setCount(DEFAULT_SETTINGS.count);
    setGravity(DEFAULT_SETTINGS.gravity);
    setFriction(DEFAULT_SETTINGS.friction);
    setWallBounce(DEFAULT_SETTINGS.wallBounce);
    setFollowCursor(DEFAULT_SETTINGS.followCursor);
    setColors(DEFAULT_SETTINGS.colors);
    showToast("Reset to defaults.", "info");
  };

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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] -z-20 pointer-events-none" />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-md shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className={`w-2 h-2 rounded-full ${toast.type === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
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
            <Sliders className="w-8 h-8 text-amber-500" />
            <span>PIT CONFIG PANEL</span>
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
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/10"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 min-[1050px]:grid-cols-12 gap-8 items-start mb-8">

        {/* Controls Column (Left) */}
        <div className="min-[1050px]:col-span-7 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-3xl p-6 md:p-8 space-y-8 shadow-xl">
          <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> // PHYSICS CONFIGURATION
          </h2>

          <div className="space-y-6">
            {/* Balls Count Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">BALLS COUNT</span>
                <span className="text-amber-500 font-bold">{count}</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Gravity Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">GRAVITY STRENGTH</span>
                <span className="text-amber-500 font-bold">{gravity}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="4"
                step="0.1"
                value={gravity}
                onChange={(e) => setGravity(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Friction Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">AIR RESISTANCE / FRICTION</span>
                <span className="text-amber-500 font-bold">{friction}</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.0"
                step="0.001"
                value={friction}
                onChange={(e) => setFriction(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Wall Bounciness Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">WALL BOUNCINESS (ELASTICITY)</span>
                <span className="text-amber-500 font-bold">{wallBounce}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={wallBounce}
                onChange={(e) => setWallBounce(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Follow Cursor Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/40">
              <div>
                <h3 className="text-xs font-mono text-zinc-350">FOLLOW CURSOR MODE</h3>
                <p className="text-[10px] text-zinc-550 font-mono mt-1">If enabled, the mouse cursor itself is rendered as a sphere</p>
              </div>
              <button
                onClick={() => setFollowCursor(!followCursor)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${followCursor ? "bg-amber-500" : "bg-zinc-800"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-zinc-950 transition-all duration-300 ${followCursor ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>

          <div className="h-px bg-zinc-800/50 my-6" />

          {/* Color Settings */}
          <div className="space-y-6">
            <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> // COLOR CONFIGURATION
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
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Column (Right) */}
        <div className="min-[1050px]:col-span-5 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full shadow-xl">
          <div>
            <h2 className="text-sm font-mono tracking-widest text-zinc-550 flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" /> // LIVE WEBGL PREVIEW
            </h2>
            <p className="text-[10px] font-mono text-zinc-500 mb-6">
              Simulation refreshes automatically upon modifying any values in the config panel.
            </p>
          </div>

          {/* Centered boxed view */}
          <div className="w-full flex justify-center items-center py-4">
            <div className="w-[320px] h-[320px] rounded-3xl border border-zinc-800 bg-zinc-950 relative overflow-hidden shadow-inner shadow-black">
              <Ballpit
                count={count}
                gravity={gravity}
                friction={friction}
                wallBounce={wallBounce}
                followCursor={followCursor}
                colors={colors}
              />

              {/* Overlay styling for preview box */}
              <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
                <span className="text-[8px] font-mono tracking-widest text-zinc-650 bg-zinc-950/70 border border-zinc-850 px-2.5 py-1 rounded-full uppercase">3D Physics Active</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl border border-zinc-800 bg-zinc-950/20">
            <AlertCircle className="w-5 h-5 text-amber-500/70 shrink-0 mt-0.5" />
            <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">
              Ensure you click <strong className="text-zinc-300">Save Changes</strong> on the top-right to store these adjustments. If you exit without saving, settings will fall back to their last stored config or the standard system parameters.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto w-full border-t border-zinc-900 pt-6 text-center text-[10px] font-mono text-zinc-650">
        © 2026 Talha Sami. All Rights Reserved. Config Panel powered by React Bits.
      </div>
    </main>
  );
}
