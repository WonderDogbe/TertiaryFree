"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 fill-slate-500 text-slate-500" />
      )}
    </button>
  );
}
