export interface BallpitSettings {
  count: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  followCursor: boolean;
  colors: string[];
}

export interface PortfolioSettings {
  title: string;
  heroTitle: string;
  heroDescription: string;
  theme: "light" | "dark" | "system";
  ballpit: BallpitSettings;
}

export const DEFAULT_SETTINGS: PortfolioSettings = {
  title: "Minimalist Developer Portfolio",
  heroTitle: "Building Digital Masterpieces",
  heroDescription: "Expert Frontend Developer specializing in creating high-performance, visually stunning, and interaction-driven web applications.",
  theme: "system",
  ballpit: {
    count: 90,
    gravity: 0.8,
    friction: 0.986,
    wallBounce: 1.0,
    followCursor: false,
    colors: ["#3B82F6", "#c10c0c", "#38d514"],
  },
};

const STORAGE_KEY = "portfolio-custom-settings-v1";

export function getSettings(): PortfolioSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (!val) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(val);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      ballpit: {
        ...DEFAULT_SETTINGS.ballpit,
        ...(parsed.ballpit || {}),
      },
    };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: PortfolioSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    
    // Apply theme
    applyTheme(settings.theme);

    // Broadcast change event
    window.dispatchEvent(new Event("portfolio-settings-changed"));
  } catch (e) {
    console.error("Failed to save settings", e);
  }
}

export function applyTheme(theme: "light" | "dark" | "system") {
  if (typeof window === "undefined") return;
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
