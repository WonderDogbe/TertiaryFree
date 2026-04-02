"use client";

import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left pane - Image (Previously Right) */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/college-students-different-ethnicities-cramming.jpg"
          alt="Students studying"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-16 left-16 right-16 text-white max-w-2xl animate-slide-up delay-200">
          <div className="mb-6 flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className="w-6 h-6 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-3xl font-bold leading-tight tracking-tight mb-6">
            "TertiaryFree has completely transformed how I manage my university
            life. Everything from grades to tuition is just a click away."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-[#0a0f5c] font-bold text-lg">
              S
            </div>
            <div>
              <p className="font-semibold text-lg">Sarah J.</p>
              <p className="text-[#2dd4a8] font-medium">
                Computer Science, Senior
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right pane - Form Content (Previously Left) */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[500px] xl:w-[600px] lg:px-12 xl:px-24 py-12 relative">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>
        <div className="mx-auto w-full max-w-md lg:w-full">
          <header className="mb-10 sm:mb-12">
            <Logo size="lg" />
          </header>

          <div className="animate-slide-up">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>

          <div className="mt-8 sm:mt-10 animate-slide-up delay-100 bg-white sm:shadow-lg sm:rounded-2xl sm:p-8 sm:border sm:border-slate-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
