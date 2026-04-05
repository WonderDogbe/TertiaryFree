"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  subtitle: string;
  userType?: "student" | "lecturer";
}

const ROLE_IMAGES = {
  student: "/smiley-friends-with-books-having-coffee-together-outside.jpg",
  lecturer:
    "/confident-entrepreneur-strategize-business-whiskey-luxury-social-club.jpg",
};

export function AuthLayout({
  children,
  subtitle,
  userType = "student",
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Left pane - Image */}
      <div className="relative hidden w-0 flex-1 overflow-hidden bg-[var(--color-secondary-bg)] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ROLE_IMAGES[userType]}
          alt={userType === "student" ? "Students" : "Lecturer"}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right pane - Form Content (Previously Left) */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[500px] xl:w-[600px] lg:px-12 xl:px-24 py-12 relative">
        <div className="absolute top-8 left-8 sm:left-12 xl:left-24">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md lg:w-full">
          <header className="mb-10 sm:mb-12 flex flex-col items-center">
            <Logo size="lg" />
          </header>

          <div className="animate-slide-up text-center">
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              {subtitle}
            </p>
          </div>

          <div className="mt-8 animate-slide-up delay-100 bg-[var(--color-secondary-bg)] sm:mt-10 sm:rounded-2xl sm:border sm:border-blue-100/70 sm:p-8 sm:shadow-lg dark:border-blue-900/40">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
