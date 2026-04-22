"use client";

import { useEffect, useState } from "react";

export function PwaSplashScreen() {
  const [isPwa, setIsPwa] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if running in standalone mode (PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && (window.navigator as any).standalone) ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      setIsPwa(true);
      // Let it display for exactly 4 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      // If not a PWA, hide splash immediately
      setShowSplash(false);
    }
  }, []);

  if (!isPwa || !showSplash) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--color-background)] bg-white transition-opacity duration-500 ease-in-out dark:bg-gray-950">
      <div className="relative flex h-32 w-32 flex-col items-center justify-center sm:h-40 sm:w-40 animate-pulse">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pwalogo.jpg"
          alt="TertiaryFree"
          className="h-full w-full object-contain drop-shadow-xl"
        />
      </div>
      <p className="mt-8 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 animate-pulse">
        TertiaryFree
      </p>
    </div>
  );
}
