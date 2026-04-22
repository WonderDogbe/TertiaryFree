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
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out">
      <div className="relative flex h-36 w-36 flex-col items-center justify-center sm:h-44 sm:w-44 animate-pulse">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pwalogo.jpg"
          alt="TertiaryFree"
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <p className="text-2xl font-extrabold tracking-tight text-slate-800">
          TertiaryFree
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
