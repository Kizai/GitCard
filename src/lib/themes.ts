import { CardTheme } from "@/types/github";

export const themes: Record<string, CardTheme> = {
  light: {
    id: "light",
    name: "Light",
    background: "#ffffff",
    text: "#000000",
    border: "#e5e7eb",
    accent: "#3b82f6",
  },
  dark: {
    id: "dark",
    name: "Dark",
    background: "#1f2937",
    text: "#ffffff",
    border: "#374151",
    accent: "#60a5fa",
  },
  github: {
    id: "github",
    name: "GitHub",
    background: "#0d1117",
    text: "#c9d1d9",
    border: "#30363d",
    accent: "#58a6ff",
  },
  rainbow: {
    id: "rainbow",
    name: "Rainbow",
    background: "linear-gradient(135deg, #ff6b6b, #ffd93d, #6c5ce7, #a8e6cf)",
    text: "#000000",
    border: "#e5e7eb",
    accent: "#6c5ce7",
  },
  nord: {
    id: "nord",
    name: "Nord",
    background: "#2e3440",
    text: "#eceff4",
    border: "#4c566a",
    accent: "#88c0d0",
  },
  solarized: {
    id: "solarized",
    name: "Solarized",
    background: "#002b36",
    text: "#839496",
    border: "#073642",
    accent: "#2aa198",
  },
}; 