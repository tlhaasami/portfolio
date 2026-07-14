"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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
    <main className="relative min-h-screen w-full bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Ballpit Background */}
      <div className="absolute inset-0 w-full h-full">
        <Ballpit
          count={settings.count}
          gravity={settings.gravity}
          friction={settings.friction}
          wallBounce={settings.wallBounce}
          followCursor={settings.followCursor}
          colors={settings.colors}
        />
      </div>
    </main>
  );
}
