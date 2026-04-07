"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  BellRing,
  CalendarCheck2,
  Check,
  CloudUpload,
  Menu,
  Moon,
  QrCode,
  Settings,
  Sun,
  Users,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact Us" },
];

const HERO_IMAGES = [
  {
    url: "/library-hero.png",
    label: "Always stay on track with a personal academic assistant",
  },
  {
    url: "/medium-shot-students-classroom.jpg",
    label: "Experience real-time updates and effortless class coordination",
  },
  {
    url: "/study-group-african-people.jpg",
    label: "Connect with classmates and join smarter learning groups",
  },
];

type FeatureCardItem = {
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  iconClassName: string;
  featured?: boolean;
};

const FEATURE_AUTO_ADVANCE_MS = 3200;
const FEATURE_SWIPE_THRESHOLD = 56;

function getCircularOffset(index: number, activeIndex: number, total: number) {
  const rawOffset = index - activeIndex;
  return (
    ((rawOffset + total + Math.floor(total / 2)) % total) -
    Math.floor(total / 2)
  );
}

function wrapIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

const FEATURE_CARDS: FeatureCardItem[] = [
  {
    title: "QR Attendance Check-In",
    description:
      "Allow students to check in quickly with secure class QR sessions that are easy to manage.",
    points: [
      "One-tap class check-in",
      "Fraud-resistant session codes",
      "Attendance history by course",
    ],
    icon: QrCode,
    iconClassName: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    title: "Mobile Lecturer Attendance",
    description:
      "Lecturers can mark and confirm attendance from any device in class or on practical sessions.",
    points: [
      "Works on mobile and desktop",
      "Offline capture support",
      "Quick bulk confirmation",
    ],
    icon: CalendarCheck2,
    iconClassName: "bg-gradient-to-br from-emerald-500 to-teal-600",
    featured: true,
  },
  {
    title: "Student And Lecturer Workspace",
    description:
      "Give both students and lecturers tailored dashboards while keeping everyone aligned in one system.",
    points: [
      "Role-based access",
      "Shared class visibility",
      "Clear communication channels",
    ],
    icon: Users,
    iconClassName: "bg-gradient-to-br from-sky-500 to-cyan-500",
  },
  {
    title: "Personalized Timetable",
    description:
      "Build weekly class schedules automatically so students always know where to be and when.",
    points: [
      "Auto-synced class slots",
      "Course-specific view",
      "Easy timetable updates",
    ],
    icon: CalendarCheck2,
    iconClassName: "bg-gradient-to-br from-indigo-500 to-blue-600",
  },
  {
    title: "Attendance Insights And Reports",
    description:
      "Generate meaningful reports to monitor class participation trends and identify at-risk students early.",
    points: [
      "Visual attendance analytics",
      "Downloadable reports",
      "Department-level summaries",
    ],
    icon: BarChart3,
    iconClassName: "bg-gradient-to-br from-orange-400 to-amber-500",
  },
  {
    title: "Real-Time Class Notifications",
    description:
      "Send instant updates about timetable changes, room swaps, and lecture reminders to everyone.",
    points: ["Lecture reminders", "Change alerts", "Announcement delivery"],
    icon: BellRing,
    iconClassName: "bg-gradient-to-br from-cyan-500 to-blue-500",
  },
];

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isFeaturePaused, setIsFeaturePaused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const featureSwipeStartX = useRef<number | null>(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      setIsThemeReady(true);
      return;
    }

    if (savedTheme === "light") {
      setIsDarkMode(false);
      setIsThemeReady(true);
      return;
    }

    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) {
      return;
    }

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (isDarkMode) {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
      return;
    }

    root.classList.add("light");
    window.localStorage.setItem("theme", "light");
  }, [isDarkMode, isThemeReady]);

  const goToFeature = (index: number) => {
    setActiveFeatureIndex(wrapIndex(index, FEATURE_CARDS.length));
  };

  const goToNextFeature = () => {
    setActiveFeatureIndex((prev) => wrapIndex(prev + 1, FEATURE_CARDS.length));
  };

  const goToPreviousFeature = () => {
    setActiveFeatureIndex((prev) => wrapIndex(prev - 1, FEATURE_CARDS.length));
  };

  const handleFeatureSwipeStart = (clientX: number) => {
    featureSwipeStartX.current = clientX;
  };

  const handleFeatureSwipeEnd = (clientX: number) => {
    if (featureSwipeStartX.current === null) {
      return;
    }

    const deltaX = clientX - featureSwipeStartX.current;
    featureSwipeStartX.current = null;

    if (Math.abs(deltaX) < FEATURE_SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX < 0) {
      goToNextFeature();
      return;
    }

    goToPreviousFeature();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isFeaturePaused) {
      return;
    }

    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) =>
        wrapIndex(prev + 1, FEATURE_CARDS.length),
      );
    }, FEATURE_AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isFeaturePaused]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-100/80 dark:border-blue-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <nav
          className="relative mx-auto w-full px-6 sm:px-10 lg:px-16"
          aria-label="Global"
        >
          <div className="flex items-center justify-between py-4 lg:py-5">
            <div className="flex items-center">
              <div className="lg:hidden">
                <Link href="/" aria-label="TertiaryFree home">
                  <Image
                    src="/logo - Copy.png"
                    alt="TertiaryFree Logo"
                    width={60}
                    height={50}
                    priority
                    className="h-auto w-auto"
                  />
                </Link>
              </div>

              <div className="hidden lg:block">
                <Logo
                  size="sm"
                  className="origin-left scale-125 sm:scale-150 lg:scale-[2]"
                />
              </div>
            </div>

            {/* Building Mode - Centered */}
            <div className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <p className="inline-flex items-center rounded-full border border-red-300 bg-red-600 px-4 py-1 text-sm font-medium text-white">
                Building Mode
              </p>
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-6">
              <button
                onClick={toggleDarkMode}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 dark:border-blue-900/40 text-[var(--color-text)] transition-colors hover:bg-[var(--color-secondary-bg)]"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              <div className="flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Sign in
              </Link>
            </div>

            <div className="flex items-center lg:hidden">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[60] inline-flex text-[var(--color-primary)] transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Mobile Menu Overlay & Drawer */}
              <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${isMenuOpen ? "visible" : "invisible"}`}
              >
                {/* Backdrop with Blur */}
                <div
                  className={`absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Drawer */}
                <div
                  className={`absolute right-0 top-0 h-full w-1/2 bg-white transition-transform duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                  <div className="flex h-full flex-col p-8 pt-32">
                    <nav className="flex flex-col gap-y-2" aria-label="Mobile">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={`mobile-${link.label}`}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-lg font-bold tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
                        >
                          {link.label}
                        </Link>
                      ))}

                      <div className="flex flex-col gap-3">
                        <Link
                          href="/get-started"
                          onClick={() => setIsMenuOpen(false)}
                          className="btn-brand mt-4 w-full py-3 text-center text-base"
                        >
                          Get Started
                        </Link>
                        <Link
                          href="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-8 py-3 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-blue-100 w-full text-center"
                        >
                          Sign in
                        </Link>
                      </div>
                    </nav>

                    <div className="mt-auto pt-10 text-center">
                      <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/30">
                        TertiaryFree
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main
        className={`pt-32 sm:pt-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <section id="home" className="relative overflow-hidden">
          <div
            className="absolute inset-x-0 top-[-160px] -z-10 h-[540px] bg-[radial-gradient(circle_at_top_left,#60A5FA33,transparent_50%),radial-gradient(circle_at_top_right,#2563EB22,transparent_45%)]"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
            <div className="text-center">
              <p className="inline-flex items-center rounded-full border border-blue-200 bg-[var(--color-secondary-bg)] px-4 py-1 text-sm font-medium text-[var(--color-primary)]">
                Built for students and lecturers
              </p>
              <h1
                className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl"
                style={{ color: "var(--hero-text-color, #111827)" }}
              >
                Never Miss a Lecture Again
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Personalized timetables, real-time updates, and smart
                notifications for students and lecturers.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/get-started"
                  className="btn-brand px-8 py-3 text-sm font-semibold shadow-lg shadow-blue-200"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div id="how-it-works" className="mt-16 sm:mt-24">
              <div className="relative mx-auto max-w-none border-none bg-transparent p-0 shadow-none">
                <div className="relative aspect-[21/11] overflow-hidden rounded-[2rem] bg-[var(--color-secondary-bg)] shadow-2xl shadow-blue-100 dark:shadow-none sm:rounded-[4rem]">
                  {HERO_IMAGES.map((item, index) => (
                    <div
                      key={item.url}
                      className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                        index === currentImageIndex
                          ? "translate-x-0 z-10"
                          : index < currentImageIndex
                            ? "-translate-x-full z-0"
                            : "translate-x-full z-0"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={`app screenshot ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                      <div
                        className={`absolute inset-x-0 bottom-16 sm:bottom-20 px-6 text-center transition-all duration-1000 delay-300 ${
                          index === currentImageIndex
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <p className="mx-auto max-w-3xl text-xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Dots */}
                  <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-20">
                    {HERO_IMAGES.map((_, i) => (
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
              </div>
            </div>

            <div id="features" className="mt-16 sm:mt-20 lg:mt-24">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                  Everything You Need For
                </h2>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-primary)] sm:text-3xl">
                  Smarter Campus Attendance
                </p>
                <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 sm:text-lg">
                  TertiaryFree brings attendance, timetable flow, lecturer
                  tools, and class communication into one connected platform.
                </p>
              </div>

              <div
                className="relative mt-14 h-[620px] touch-pan-y overflow-hidden select-none sm:h-[600px]"
                onMouseEnter={() => setIsFeaturePaused(true)}
                onMouseLeave={() => setIsFeaturePaused(false)}
                onFocusCapture={() => setIsFeaturePaused(true)}
                onBlurCapture={() => setIsFeaturePaused(false)}
                onTouchStart={(event) => {
                  const touch = event.touches[0];

                  if (!touch) {
                    return;
                  }

                  setIsFeaturePaused(true);
                  handleFeatureSwipeStart(touch.clientX);
                }}
                onTouchEnd={(event) => {
                  const touch = event.changedTouches[0];

                  if (touch) {
                    handleFeatureSwipeEnd(touch.clientX);
                  }

                  setIsFeaturePaused(false);
                }}
                onTouchCancel={() => {
                  featureSwipeStartX.current = null;
                  setIsFeaturePaused(false);
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse" && event.button !== 0) {
                    return;
                  }

                  setIsFeaturePaused(true);
                  handleFeatureSwipeStart(event.clientX);
                }}
                onPointerUp={(event) => {
                  handleFeatureSwipeEnd(event.clientX);
                  setIsFeaturePaused(false);
                }}
                onPointerCancel={() => {
                  featureSwipeStartX.current = null;
                  setIsFeaturePaused(false);
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-white to-transparent dark:from-[#0B0F19] dark:to-transparent sm:w-24"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-white to-transparent dark:from-[#0B0F19] dark:to-transparent sm:w-24"
                  aria-hidden="true"
                />

                {FEATURE_CARDS.map((card, index) => {
                  const Icon = card.icon;
                  const offset = getCircularOffset(
                    index,
                    activeFeatureIndex,
                    FEATURE_CARDS.length,
                  );
                  const absOffset = Math.abs(offset);
                  const isVisible = absOffset <= 2;
                  const scale =
                    absOffset === 0 ? 1.1 : absOffset === 1 ? 0.86 : 0.74;
                  const opacity =
                    absOffset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.45;
                  const zIndex = FEATURE_CARDS.length - absOffset;
                  const shift = `calc(${offset} * min(18.25rem, 35vw))`;

                  return (
                    <article
                      key={card.title}
                      role="button"
                      tabIndex={0}
                      aria-label={`Show ${card.title}`}
                      aria-pressed={index === activeFeatureIndex}
                      onClick={() => goToFeature(index)}
                      onFocus={() => goToFeature(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          goToFeature(index);
                          return;
                        }

                        if (event.key === "ArrowRight") {
                          event.preventDefault();
                          goToNextFeature();
                          return;
                        }

                        if (event.key === "ArrowLeft") {
                          event.preventDefault();
                          goToPreviousFeature();
                        }
                      }}
                      style={{
                        transform: `translateX(-50%) translateX(${shift}) scale(${scale})`,
                        opacity: isVisible ? opacity : 0,
                        zIndex,
                        filter: absOffset > 1 ? "saturate(85%)" : "none",
                      }}
                      className={`group absolute left-1/2 top-0 flex flex-col w-[min(90vw,25.5rem)] min-h-[480px] overflow-hidden rounded-3xl border bg-[var(--color-secondary-bg)] p-7 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        card.featured
                          ? "border-[var(--color-primary)] shadow-xl shadow-blue-100/80 dark:shadow-none"
                          : "border-blue-100/80"
                      } ${
                        isVisible
                          ? "pointer-events-auto cursor-pointer shadow-2xl shadow-blue-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-4 dark:shadow-none"
                          : "pointer-events-none"
                      }`}
                    >
                      {card.featured && (
                        <span className="pointer-events-none absolute right-[-42px] top-5 rotate-45 bg-[var(--color-primary)] px-12 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                          Most Popular
                        </span>
                      )}

                      <div className="mb-5 flex justify-center">
                        <div
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-105 ${card.iconClassName}`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                      </div>

                      <h3 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#E5E7EB] sm:text-[1.9rem]">
                        {card.title}
                      </h3>

                      <p className="mt-3 flex-grow text-base leading-7 text-slate-600">
                        {card.description}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {card.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-sm font-medium text-slate-700"
                          >
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}

                <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 rounded-full border border-blue-100/80 bg-white/80 px-4 py-2 backdrop-blur">
                  {FEATURE_CARDS.map((card, index) => (
                    <button
                      key={`feature-dot-${card.title}`}
                      onClick={() => goToFeature(index)}
                      aria-label={`Show ${card.title}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeFeatureIndex
                          ? "w-8 bg-[var(--color-primary)]"
                          : "w-2 bg-blue-200 hover:bg-blue-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div id="how-it-works" className="mt-20 sm:mt-28 lg:mt-32">
              <div className="text-center">
                <p className="inline-flex items-center rounded-full border border-blue-100/80 bg-blue-50 px-4 py-1 text-sm font-semibold text-[var(--color-primary)]">
                  SIMPLE PROCESS
                </p>
                <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
                  How It
                </h2>
                <p className="text-4xl font-extrabold tracking-tight text-[var(--color-primary)] sm:text-5xl">
                  WORKS
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
                  Get started in minutes, not days
                </p>
              </div>

              <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div key="step-1" className="relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      1
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <UserPlus className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      Set Up Institution
                    </h3>
                    <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                      Quick registration with your school details and admin
                      account
                    </p>
                  </div>
                </div>

                <div key="step-2" className="relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      2
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <CloudUpload className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      Add Students & Lecturers
                    </h3>
                    <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                      Import via Excel spreadsheet or add users manually in bulk
                    </p>
                  </div>
                </div>

                <div key="step-3" className="relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      3
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <Settings className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      Configure Attendance
                    </h3>
                    <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                      Choose between QR codes, mobile device, or manual tracking
                      methods
                    </p>
                  </div>
                </div>

                <div key="step-4" className="relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      4
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <Check className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      Start Tracking
                    </h3>
                    <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                      Begin attendance sessions and monitor participation in
                      real-time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="about" className="mt-20 sm:mt-28 lg:mt-32">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--color-primary)] to-blue-600 px-6 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Transform Your Tertiary Experience
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
                    Streamline attendance tracking, empower your students and
                    lecturers, and build a smarter campus experience with
                    TertiaryFree.
                  </p>

                  <div className="mt-10 flex flex-col items-center justify-center">
                    <Link
                      href="/get-started"
                      className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-blue-50 hover:-translate-y-0.5 shadow-lg"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`transition-opacity duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Footer />
      </div>
    </div>
  );
}
