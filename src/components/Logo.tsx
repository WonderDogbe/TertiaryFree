"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeMap = {
    sm: { icon: 20, text: "text-base" },
    md: { icon: 24, text: "text-lg" },
    lg: { icon: 32, text: "text-2xl" },
  };

  const { icon, text } = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 no-underline group ${className}`}
      id="brand-logo"
    >
      <div
        className="flex items-center justify-center rounded-lg shadow-sm transition-colors"
        style={{
          width: icon + 12,
          height: icon + 12,
          backgroundColor: 'var(--logo-bg, #0a0f5c)'
        }}
      >
        <GraduationCap size={icon} style={{ color: 'var(--logo-icon, #ffffff)' }} strokeWidth={2.5} />
      </div>
      <span
        className={`font-extrabold ${text} tracking-tight transition-colors sm:block text-xs sm:text-lg`}
        style={{ color: 'var(--logo-text, #0a0f5c)' }}
      >
        TertiaryFree
      </span>
    </Link>
  );
}
