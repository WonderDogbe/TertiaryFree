"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  subtitle: string;
}

const AUTH_IMAGES = [
  {
    url: "/college-students-different-ethnicities-cramming.jpg",
    quote:
      "TertiaryFree has completely transformed how I manage my university life. Everything from grades to tuition is just a click away.",
    author: "Sarah J.",
    role: "Computer Science, Senior",
    initial: "S",
  },
  {
    url: "/woman-with-books-pointing.jpg",
    quote:
      "I never miss a lecture anymore. The real-time notifications are a total game changer for my busy schedule!",
    author: "Michael K.",
    role: "Mechanical Engineering, Junior",
    initial: "M",
  },
  {
    url: "/study-group-african-people.jpg",
    quote:
      "The collaboration tools and class chats make group projects so much easier. I feel more connected than ever.",
    author: "David O.",
    role: "Business Admin, Sophomore",
    initial: "D",
  },
  {
    url: "/confident-entrepreneur-strategize-business-whiskey-luxury-social-club.jpg",
    quote:
      "TertiaryFree has streamlined how I communicate with all my sections. The attendance and schedule updates are incredibly efficient.",
    author: "Prof. Kwame A.",
    role: "Senior Lecturer, Engineering",
    initial: "K",
  },
];

export function AuthLayout({ children, subtitle }: AuthLayoutProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % AUTH_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left pane - Image carousel */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-200 overflow-hidden">
        {AUTH_IMAGES.map((img, index) => (
          <div
            key={img.url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={img.url}
              alt="Students studying"
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-16 left-16 right-16 text-white max-w-2xl">
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
              <blockquote className="text-3xl font-bold leading-tight tracking-tight mb-6 transition-all duration-700">
                &quot;{img.quote}&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-[#0a0f5c] font-bold text-lg">
                  {img.initial}
                </div>
                <div>
                  <p className="font-semibold text-lg">{img.author}</p>
                  <p className="text-[#2dd4a8] font-medium">{img.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-16 flex gap-2 z-20">
          {AUTH_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === currentImageIndex
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right pane - Form Content (Previously Left) */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[500px] xl:w-[600px] lg:px-12 xl:px-24 py-12 relative">
        <div className="absolute top-8 left-8 sm:left-12 xl:left-24">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#0a0f5c] group dark:text-slate-300 dark:hover:text-[#5eead4]"
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

          <div className="mt-8 sm:mt-10 animate-slide-up delay-100 bg-white sm:shadow-lg sm:rounded-2xl sm:p-8 sm:border sm:border-slate-100 dark:bg-slate-900 dark:border-slate-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
