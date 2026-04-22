"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  BellRing,
  CalendarCheck2,
  ChevronRight,
  Check,
  FileText,
  QrCode,
  Rocket,
  Users,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { LandingHeader } from "@/components/LandingHeader";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#onboarding", label: "Onboarding" },
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
    url: "/replace.jpeg",
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
  const [isStandaloneMode, setIsStandaloneMode] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isFeaturePaused, setIsFeaturePaused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [isMobileSystemTheme, setIsMobileSystemTheme] = useState(false);
  const [dashboardParallaxOffset, setDashboardParallaxOffset] = useState(0);
  const [dashboardTiltX, setDashboardTiltX] = useState(0);
  const [isMobileDashboardView, setIsMobileDashboardView] = useState(false);
  const featureSwipeStartX = useRef<number | null>(null);
  const dashboardFrameRef = useRef<HTMLDivElement | null>(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyThemePreference = () => {
      const savedTheme = window.localStorage.getItem("theme");
      const hasSavedTheme = savedTheme === "dark" || savedTheme === "light";
      const shouldFollowSystemTheme = !hasSavedTheme;
      setIsMobileSystemTheme(shouldFollowSystemTheme);

      if (shouldFollowSystemTheme) {
        setIsDarkMode(systemThemeQuery.matches);
        setIsThemeReady(true);
        return;
      }

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

      setIsDarkMode(false);
      setIsThemeReady(true);
    };

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const savedTheme = window.localStorage.getItem("theme");
      const hasSavedTheme = savedTheme === "dark" || savedTheme === "light";

      if (hasSavedTheme) {
        return;
      }

      setIsDarkMode(event.matches);
    };

    applyThemePreference();
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      systemThemeQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    if (!isThemeReady) {
      return;
    }

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }

    if (!isMobileSystemTheme) {
      window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, isThemeReady, isMobileSystemTheme]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateMobileState = () => {
      setIsMobileDashboardView(mediaQuery.matches);
    };

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  useEffect(() => {
    let isTicking = false;
    const maxOffset = isMobileDashboardView ? 28 : 72;
    const offsetMultiplier = isMobileDashboardView ? 0.07 : 0.12;

    const updateParallax = () => {
      const nextOffset = Math.min(maxOffset, window.scrollY * offsetMultiplier);
      setDashboardParallaxOffset(nextOffset);
      isTicking = false;
    };

    const handleScroll = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      window.requestAnimationFrame(updateParallax);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileDashboardView]);

  useEffect(() => {
    if (isMobileDashboardView) {
      setDashboardTiltX(0);
      return;
    }

    let isTicking = false;
    const maxTilt = 7;

    const updateTilt = () => {
      const dashboardFrame = dashboardFrameRef.current;

      if (!dashboardFrame) {
        isTicking = false;
        return;
      }

      const rect = dashboardFrame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const frameCenter = rect.top + rect.height / 2;
      const normalizedOffset = Math.max(
        -1,
        Math.min(1, (frameCenter - viewportCenter) / (window.innerHeight * 0.65)),
      );

      setDashboardTiltX(-normalizedOffset * maxTilt);
      isTicking = false;
    };

    const handleScroll = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      window.requestAnimationFrame(updateTilt);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobileDashboardView]);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && (window.navigator as any).standalone) ||
      document.referrer.includes("android-app://");
    setIsStandaloneMode(isStandalone);
  }, []);

  if (isStandaloneMode) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-gray-950 dark:text-gray-100 selection:bg-[var(--color-accent)] selection:text-white">
        
        {/* Full width image that fades at the bottom into the background */}
        <div className="relative w-full h-[55vh] min-h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/img.jpg" 
            alt="Welcome to TertiaryFree" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950"></div>
        </div>

        <div className="flex-1 flex flex-col justify-end px-6 pb-12 -mt-10 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl drop-shadow-sm">
              Tertiary<span className="text-[var(--color-primary)]">Free</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Your academic life, simplified. Timetables, attendance, and smart updates in one place.
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full flex items-center justify-center rounded-2xl bg-[var(--color-primary)] py-4 text-[1.05rem] font-semibold text-white shadow-lg transition-transform active:scale-[0.98] hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link
              href="/signup/institution?startOver=1"
              className="w-full flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-transparent py-4 text-[1.05rem] font-semibold text-slate-700 transition-colors active:scale-[0.98] dark:border-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-background)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white">
      <LandingHeader
        navLinks={NAV_LINKS}
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        onToggleDarkMode={toggleDarkMode}
        onToggleMobileMenu={toggleMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
      />

      <main className="pt-32 sm:pt-40">
        <section id="home" className="relative overflow-x-hidden">
          <div
            className="absolute inset-x-0 top-[-160px] -z-10 h-[540px] bg-[radial-gradient(circle_at_top_left,#60A5FA33,transparent_50%),radial-gradient(circle_at_top_right,#2563EB22,transparent_45%)]"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 sm:pt-16 lg:px-8 lg:pb-32">
            <div className="mx-auto max-w-md text-center sm:max-w-none">
              <h1
                className="text-[2.15rem] font-extrabold leading-[1.08] tracking-tight sm:mt-6 sm:text-5xl lg:text-7xl"
                style={{ color: "var(--hero-text-color, #111827)" }}
              >
                Empower Your Academic <br />
                Journey
              </h1>
              <p className="mx-auto mt-5 max-w-[22rem] text-base leading-8 text-slate-600 dark:text-slate-300 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
                Personalized timetables, real-time updates, and smart
                notifications for students and lecturers.
              </p>

              <div className="mt-8 flex justify-center sm:mt-9 sm:flex-row sm:items-center">
                <Link
                  href="/signup/institution?startOver=1"
                  className="inline-flex w-full max-w-[17.5rem] items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-primary)] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto sm:max-w-none sm:rounded-full sm:px-8 sm:py-3 sm:text-sm"
                >
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-16 sm:mt-24">
              <div className="relative mx-auto max-w-none border-none bg-transparent p-0 shadow-none">
                <div className="relative aspect-[21/11] overflow-hidden rounded-[2rem] bg-[var(--color-secondary-bg)] sm:rounded-[4rem]">
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

                      <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"
                        aria-hidden="true"
                      />

                      <div
                        className={`absolute inset-x-0 bottom-16 sm:bottom-20 px-6 text-center transition-all duration-1000 delay-300 ${
                          index === currentImageIndex
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <p className="mx-auto max-w-3xl text-xl font-medium tracking-tight text-white drop-shadow-lg sm:text-3xl md:text-4xl">
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

            <div
              id="features"
              className="relative z-10 mt-20 scroll-mt-24 pt-6 sm:mt-24 sm:scroll-mt-32 sm:pt-8 lg:mt-28 lg:scroll-mt-40"
            >
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                  Everything You Need To
                </h2>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-primary)] sm:text-3xl">
                  Manage Your Academic Life Seamlessly
                </p>
                <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 sm:text-lg">
                  TertiaryFree brings attendance, timetable flow, lecturer
                  tools, and class communication into one connected platform.
                </p>
              </div>

              <div
                className="relative mt-14 min-h-[620px] touch-pan-y overflow-visible pt-10 select-none sm:min-h-[610px] sm:pt-12"
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
                  const isVisible = absOffset <= 1;
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
                          ? "border-[var(--color-primary)] dark:border-blue-100/80"
                          : "border-blue-100/80"
                      } ${
                        isVisible
                          ? "pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-4"
                          : "pointer-events-none"
                      }`}
                    >
                      <div className="mb-5 flex justify-center">
                        <div
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-105 ${card.iconClassName}`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                      </div>

                      <h3 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#E5E7EB] sm:text-[1.9rem]">
                        {card.title}
                      </h3>

                      <p className="mt-3 flex-grow text-base leading-7 text-slate-600 dark:text-slate-300">
                        {card.description}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {card.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300"
                          >
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}

                <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 rounded-full border border-blue-100/80 bg-white/85 px-4 py-2 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/85 dark:shadow-black/30">
                  {FEATURE_CARDS.map((card, index) => (
                    <button
                      key={`feature-dot-${card.title}`}
                      onClick={() => goToFeature(index)}
                      aria-label={`Show ${card.title}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeFeatureIndex
                          ? "w-8 bg-[var(--color-primary)]"
                          : "w-2 bg-blue-200 hover:bg-blue-300 dark:bg-slate-500 dark:hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <section
              id="dashboard-preview"
              className="mt-24 scroll-mt-24 pt-6 sm:mt-28 sm:scroll-mt-32 sm:pt-10 lg:mt-32 lg:scroll-mt-40"
            >
              <div className="text-center">
                <p className="text-2xl font-semibold tracking-tight text-slate-700 dark:text-slate-300 sm:text-4xl">
                  Find, compare and navigate with ease
                </p>
                <h2 className="mt-2 text-5xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-6xl lg:text-7xl">
                  Student Dashboard
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  A single workspace where students can view timetables,
                  attendance, notifications, and class updates at a glance.
                </p>
              </div>

              <div
                className="mx-auto mt-10 max-w-6xl sm:mt-14"
                style={{ perspective: isMobileDashboardView ? "1300px" : "1800px" }}
              >
                <div
                  ref={dashboardFrameRef}
                  className="rounded-[2.2rem] border border-black bg-[var(--color-secondary-bg)] p-2 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.75)] sm:p-5 dark:border-black dark:shadow-[0_35px_90px_-45px_rgba(2,6,23,0.95)]"
                  style={{
                    transform: `rotateX(${dashboardTiltX}deg)`,
                    transformStyle: "preserve-3d",
                    transition: "transform 120ms linear",
                    willChange: "transform",
                  }}
                >
                  <div className="rounded-[1.8rem] border border-slate-200/80 bg-[var(--color-background)] p-2 sm:p-4 dark:border-slate-700/90">
                    <div className="mb-3 flex items-center gap-2 px-1 sm:mb-4 sm:px-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="ml-3 inline-flex flex-1 items-center rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-800 dark:text-slate-300 sm:text-[11px]">
                        tertiaryfree dashboard preview
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 dark:border-slate-700/90">
                      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/framepicture.png"
                          alt="TertiaryFree student dashboard preview"
                          className="w-full h-auto block"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div
              id="onboarding"
              className="mt-24 scroll-mt-24 pt-12 sm:mt-28 sm:scroll-mt-32 sm:pt-12 lg:mt-32 lg:scroll-mt-40 lg:pt-16"
            >
              <div className="text-center">
                <p className="inline-flex items-center rounded-full border border-blue-100/80 bg-blue-50 px-4 py-1 text-sm font-semibold text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                  SIMPLE PROCESS
                </p>
                <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
                  EASY
                </h2>
                <p className="text-4xl font-extrabold tracking-tight text-[var(--color-primary)] sm:text-5xl">
                  ONBOARDING
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                  Get started in minutes, not days
                </p>
              </div>

              <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
                <div key="step-1" className="relative h-full">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      1
                    </div>
                  </div>

                  <div className="flex h-full min-h-[22rem] flex-col rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <Rocket className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="flex min-h-[3.5rem] items-center justify-center text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      GET STARTED
                    </h3>
                    <p className="mt-3 flex-grow text-center text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Click the get started or create account to begin your
                      journey with TertiaryFree
                    </p>
                  </div>
                </div>

                <div key="step-2" className="relative h-full">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      2
                    </div>
                  </div>

                  <div className="flex h-full min-h-[22rem] flex-col rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <Users className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="flex min-h-[3.5rem] items-center justify-center text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      STUDENT OR LECTURE
                    </h3>
                    <p className="mt-3 flex-grow text-center text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Select whether you're a student or lecturer to get a
                      personalized experience
                    </p>
                  </div>
                </div>

                <div key="step-3" className="relative h-full">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      3
                    </div>
                  </div>

                  <div className="flex h-full min-h-[22rem] flex-col rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <FileText className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="flex min-h-[3.5rem] items-center justify-center text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      INPUT YOUR DETAILS
                    </h3>
                    <p className="mt-3 flex-grow text-center text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Fill in your details to set up your account and start
                      exploring the features of TertiaryFree
                    </p>
                  </div>
                </div>

                <div key="step-4" className="relative h-full">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                      4
                    </div>
                  </div>

                  <div className="flex h-full min-h-[22rem] flex-col rounded-2xl border border-blue-100/80 bg-[var(--color-secondary-bg)] p-8 pt-10">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                        <UserPlus className="h-10 w-10 text-[var(--color-primary)]" />
                      </div>
                    </div>
                    <h3 className="flex min-h-[3.5rem] items-center justify-center text-center text-lg font-bold tracking-tight text-slate-900 dark:text-[#E5E7EB]">
                      CREATE ACCOUNT
                    </h3>
                    <p className="mt-3 flex-grow text-center text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Click create account and start exploring your personalized
                      dashboard with real-time updates, timetables, and
                      attendance tracking
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div
              id="about"
              className="mt-20 scroll-mt-24 pt-10 sm:mt-28 sm:scroll-mt-32 sm:pt-12 lg:mt-32 lg:scroll-mt-40 lg:pt-16"
            >
              <div className="mb-8 text-center sm:mb-10">
                <p className="inline-flex items-center rounded-full border border-blue-100/80 bg-blue-50 px-4 py-1 text-sm font-semibold text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                  BUILT FOR STUDENT SUCCESS
                </p>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                  Everything you need, all in one student flow
                </h2>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                <article
                  className="group relative isolate overflow-hidden rounded-[1.9rem] border border-blue-100/80 p-7 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.9)] sm:p-10 lg:col-span-2 lg:min-h-[340px] dark:border-slate-700/80"
                  style={{
                    backgroundColor: "var(--color-secondary-bg)",
                    backgroundImage:
                      "linear-gradient(130deg, rgba(15, 23, 42, 0.62), rgba(30, 64, 175, 0.32)), linear-gradient(160deg, var(--color-primary), var(--color-secondary-bg))",
                  }}
                >
                  <div className="relative z-10 max-w-xl lg:pr-20">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100/90">
                      TRUSTED TERTIARYFREE NETWORK
                    </p>
                    <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                      Verified classes and lecturers only
                    </h3>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-blue-100/95 sm:text-lg sm:leading-8">
                      Every timetable slot, class channel, and attendance flow is
                      validated for quality so students and lecturers can focus
                      on learning, not confusion.
                    </p>
                  </div>

                  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[35%] overflow-hidden rounded-l-3xl border-l border-white/20 sm:block">
                    <Image
                      src="/graduate-students-wearing-cap-gown.jpg"
                      alt="Students celebrating graduation"
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 0px"
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-translate-y-1"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 transition-colors duration-500 group-hover:bg-slate-950/20" />
                  </div>
                </article>

                <article
                  className="group relative isolate overflow-hidden rounded-[1.9rem] border border-blue-100/80 p-7 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.9)] sm:p-10 lg:min-h-[340px] dark:border-slate-700/80"
                  style={{
                    backgroundColor: "var(--color-secondary-bg)",
                    backgroundImage:
                      "linear-gradient(140deg, rgba(37, 99, 235, 0.75), rgba(14, 116, 144, 0.46)), linear-gradient(160deg, var(--color-primary), var(--color-background))",
                  }}
                >
                  <div className="relative z-10 max-w-sm">
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[2.35rem]">
                      Campus-close scheduling
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-blue-100/95 sm:text-lg sm:leading-8">
                      Organize classes by campus, faculty, and time blocks so
                      your academic day stays efficient and easy to follow.
                    </p>
                  </div>
                </article>

                <article
                  className="group relative isolate overflow-hidden rounded-[1.9rem] border border-blue-100/80 p-7 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.9)] sm:p-10 lg:col-span-3 lg:min-h-[330px] dark:border-slate-700/80"
                  style={{
                    backgroundColor: "var(--color-secondary-bg)",
                    backgroundImage:
                      "linear-gradient(130deg, rgba(15, 23, 42, 0.6), rgba(37, 99, 235, 0.28)), linear-gradient(160deg, var(--color-primary), var(--color-secondary-bg))",
                  }}
                >
                  <div className="relative z-10 max-w-2xl lg:pr-20">
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                      Plan your semester in minutes, no hidden stress
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-blue-100/95 sm:text-lg sm:leading-8">
                      From QR attendance check-ins to timetable sync, progress
                      reports, and class notifications, TertiaryFree keeps your
                      academic journey clear from week one to finals.
                    </p>

                    <div className="mt-9">
                      <Link
                        href="/signup/institution?startOver=1"
                        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/15 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/25"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[36%] overflow-hidden rounded-l-3xl border-l border-white/20 md:block">
                    <Image
                      src="/img.jpg"
                      alt="Lecturer presenting in class"
                      fill
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 300px, 0px"
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-translate-y-1"
                    />
                    <div className="absolute inset-0 bg-slate-950/28 transition-colors duration-500 group-hover:bg-slate-950/18" />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div>
        <Footer />
      </div>
    </div>
  );
}
