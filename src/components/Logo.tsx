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
        className="flex items-center justify-center rounded-lg bg-[#0a0f5c] group-hover:bg-[#1a2080] transition-colors shadow-sm"
        style={{
          width: icon + 12,
          height: icon + 12,
        }}
      >
        <GraduationCap size={icon} className="text-white" strokeWidth={2.5} />
      </div>
      <span className={`font-extrabold ${text} text-[#0a0f5c] tracking-tight group-hover:text-[#1a2080] transition-colors`}>
        TertiaryFree
      </span>
    </Link>
  );
}
