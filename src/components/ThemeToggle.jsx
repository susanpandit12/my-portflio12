import React from "react";
import useTheme from "../hooks/useTheme.js";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm hover:bg-white/20 transition"
    >
      Theme: {theme}
    </button>
  );
}
