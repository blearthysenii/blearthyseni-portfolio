"use client";

import { Moon, Sun } from "lucide-react";
import { useCustomTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useCustomTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}