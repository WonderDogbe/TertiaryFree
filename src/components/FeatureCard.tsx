"use client";

import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  color = "var(--color-primary)",
}: FeatureCardProps) {
  return (
    <div
      className="feature-card rounded-2xl p-5"
      style={{
        background: color,
        minHeight: 120,
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl mb-3"
        style={{
          width: 44,
          height: 44,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      >
        {icon}
      </div>
      <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
      <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
        {description}
      </p>
    </div>
  );
}
