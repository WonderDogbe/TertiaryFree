"use client";

import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/50 bg-slate-100/50 p-6 transition-all hover:bg-slate-100/80 hover:shadow-md h-full">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-slate-900">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
