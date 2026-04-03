"use client";

import type { ComponentType } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CalendarX2,
  CircleCheck,
  Clock3,
  Menu,
  Megaphone,
  MessageSquare,
  QrCode,
  TriangleAlert,
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

type IconType = ComponentType<{ className?: string }>;

const NAV_LINKS = [
  { href: "#problem-solution", label: "Problem & Solution" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#app-preview", label: "App Preview" },
  { href: "#benefits", label: "Benefits" },
];

const PROBLEM_SOLUTION_ITEMS: Array<{
  problem: string;
  solution: string;
  problemIcon: IconType;
  solutionIcon: IconType;
}> = [
  {
    problem: "Students miss lectures due to poor communication",
    solution: "Real-time updates",
    problemIcon: TriangleAlert,
    solutionIcon: CircleCheck,
  },
  {
    problem: "Timetables are confusing",
    solution: "Personalized timetable",
    problemIcon: Clock3,
    solutionIcon: CalendarCheck2,
  },
  {
    problem: "Last-minute cancellations waste time",
    solution: "Smart notifications",
    problemIcon: CalendarX2,
    solutionIcon: BellRing,
  },
];

const FEATURE_ITEMS: Array<{
  title: string;
  description: string;
  icon: IconType;
}> = [
  {
    title: "Personalized Timetable",
    description: "Auto-generated weekly schedules that match your courses.",
    icon: CalendarCheck2,
  },
  {
    title: "Smart Notifications",
    description: "Receive reminders before classes and assignment deadlines.",
    icon: BellRing,
  },
  {
    title: "Lecture Updates",
    description:
      "Instant alerts when lectures are moved, delayed, or canceled.",
    icon: CalendarX2,
  },
  {
    title: "QR Attendance",
    description: "Fast and secure attendance with one-tap QR scanning.",
    icon: QrCode,
  },
  {
    title: "Class Chat",
    description: "Stay connected with class chats and lecturer updates.",
    icon: MessageSquare,
  },
];

const HOW_IT_WORKS_STEPS: Array<{
  title: string;
  description: string;
  icon: IconType;
}> = [
  {
    title: "Sign up and select courses",
    description: "Create your account and pick your registered classes.",
    icon: Megaphone,
  },
  {
    title: "Get personalized timetable",
    description: "Your weekly schedule is generated and synced instantly.",
    icon: CalendarCheck2,
  },
  {
    title: "Receive reminders and updates",
    description: "Get proactive reminders, changes, and important notices.",
    icon: BellRing,
  },
];

const BENEFITS: Array<{
  title: string;
  description: string;
  icon: IconType;
}> = [
  {
    title: "Save time",
    description: "Stop checking multiple portals and messages every day.",
    icon: Clock3,
  },
  {
    title: "Stay organized",
    description: "Keep classes, deadlines, and updates in one place.",
    icon: CalendarCheck2,
  },
  {
    title: "Never miss lectures",
    description: "Timely reminders and updates keep you consistently informed.",
    icon: BellRing,
  },
  {
    title: "Better communication",
    description: "Students and lecturers stay aligned with fewer surprises.",
    icon: MessageSquare,
  },
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

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0a0f5c] dark:text-[#5eead4]">
        {eyebrow}
      </p>
      <h2
        className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
        style={{ color: "var(--hero-text-color, #130138)" }}
      >
        {title}
      </h2>
      <p className="mt-4 text-base text-slate-700 dark:text-slate-300 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#2dd4a8] selection:text-[#0a0f5c]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md">
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between py-4">
            <Logo size="md" />

            <div className="hidden lg:flex items-center gap-x-7">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-[#0a0f5c]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[60] flex flex-col gap-1.5 p-2 transition-opacity hover:opacity-80 lg:hidden"
                aria-label="Toggle menu"
              >
                <div
                  className={`h-0.5 w-7 rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2 !bg-[#0a0f5c] dark:!bg-white" : "!bg-[#0a0f5c] dark:!bg-[#2dd4a8]"}`}
                />
                <div
                  className={`h-0.5 w-5 rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "!bg-[#0a0f5c] dark:!bg-[#2dd4a8]"}`}
                />
                <div
                  className={`h-0.5 w-7 rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[5px] !bg-[#0a0f5c] dark:!bg-white" : "!bg-[#0a0f5c] dark:!bg-[#2dd4a8]"}`}
                />
              </button>

              {/* Mobile Menu Overlay & Drawer */}
              <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${isMenuOpen ? "visible" : "invisible"}`}
              >
                {/* Backdrop with Blur */}
                <div
                  className={`absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Drawer */}
                <div
                  className={`absolute right-0 top-0 h-full w-full bg-white dark:bg-[#020617] transition-transform duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                  <div className="flex h-full flex-col p-8 pt-32">
                    <nav
                      className="flex flex-col gap-y-[3px]"
                      aria-label="Mobile"
                    >
                      {NAV_LINKS.map((item) => (
                        <Link
                          key={`mobile-${item.href}`}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-lg font-bold tracking-tight transition-colors hover:opacity-70 py-1"
                          style={{ color: "var(--hero-text-color, #130138)" }}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="my-4 border-t border-slate-100 dark:border-slate-800" />
                      <div className="flex flex-col gap-3">
                        <Link
                          href="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-3 text-center text-base font-semibold text-slate-900 dark:text-white transition-all hover:border-[#0a0f5c] dark:hover:border-[#2dd4a8]"
                        >
                          Sign in
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsMenuOpen(false)}
                          className="btn-brand w-full py-3 text-center text-base dark:bg-[#2dd4a8] dark:text-[#0a0f5c]"
                        >
                          Get Started
                        </Link>
                      </div>
                    </nav>

                    <div className="mt-auto pt-10 text-center">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#0a0f5c]/40 dark:text-white/20">
                        TertiaryFree
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm font-semibold text-slate-700 transition-colors hover:text-[#0a0f5c]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main
        className={`pt-24 sm:pt-28 transition-opacity duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-x-0 top-[-160px] -z-10 h-[520px] bg-[radial-gradient(circle_at_top_left,#2dd4a844,transparent_50%),radial-gradient(circle_at_top_right,#0a0f5c22,transparent_45%)] dark:bg-[radial-gradient(circle_at_top_left,#2dd4a822,transparent_50%),radial-gradient(circle_at_top_right,#ffffff11,transparent_45%)]"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24">
            <div className="text-center">
              <p className="inline-flex items-center rounded-full border border-[#0a0f5c]/15 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-1 text-sm font-medium text-[#0a0f5c] dark:text-[#2dd4a8]">
                Built for students and lecturers
              </p>
              <h1
                className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl"
                style={{ color: "var(--hero-text-color, #130138)" }}
              >
                Never Miss a Lecture Again
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
                Personalized timetables, real-time updates, and smart
                notifications for students and lecturers.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/login"
                  className="btn-brand px-7 py-3 text-sm font-semibold shadow-lg shadow-[#0a0f5c]/20 dark:shadow-black/50"
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-7 py-3 text-sm font-semibold text-slate-800 dark:text-white transition-all hover:-translate-y-0.5 hover:border-[#0a0f5c] dark:hover:border-[#2dd4a8] hover:text-[#0a0f5c] dark:hover:text-[#2dd4a8]"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>

            <div className="mt-16 sm:mt-24">
              <div className="relative mx-auto max-w-none border-none bg-transparent p-0 shadow-none">
                <div className="relative aspect-[21/11] overflow-hidden rounded-[2rem] bg-slate-100 shadow-2xl dark:bg-slate-900 sm:rounded-[4rem]">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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
          </div>
        </section>

        <section
          id="problem-solution"
          className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            eyebrow="Problem & Solution"
            title="Clear academic communication, solved"
            description="We address the biggest lecture-management pain points with focused product solutions."
          />

          <div className="mt-12 space-y-4">
            {PROBLEM_SOLUTION_ITEMS.map((item) => {
              const ProblemIcon = item.problemIcon;
              const SolutionIcon = item.solutionIcon;

              return (
                <article
                  key={item.problem}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5 md:grid-cols-[1fr_auto_1fr] md:items-center"
                >
                  <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 dark:border-rose-900/40 dark:bg-rose-950/30">
                    <ProblemIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600 dark:text-rose-300" />
                    <p className="text-sm font-medium text-rose-800 dark:text-rose-200">
                      {item.problem}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                    <SolutionIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700 dark:text-emerald-300" />
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                      {item.solution}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            eyebrow="Features"
            title="Everything you need in one platform"
            description="Five practical features designed to help you stay prepared, present, and informed."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="transition-transform duration-200 hover:-translate-y-1"
                >
                  <FeatureCard
                    icon={
                      <Icon className="h-5 w-5 text-slate-800 dark:text-[#2dd4a8]" />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            eyebrow="How It Works"
            title="Get value in three simple steps"
            description="From onboarding to daily reminders, setup is fast and easy to follow."
          />

          <div className="relative mt-12">
            <div className="absolute left-10 right-10 top-8 hidden h-px bg-slate-200 dark:bg-slate-700 md:block" />
            <div className="grid gap-6 md:grid-cols-3">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a0f5c]/10 dark:bg-[#2dd4a8]/10">
                      <Icon className="h-5 w-5 text-[#0a0f5c] dark:text-[#2dd4a8]" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-[#0a0f5c] dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="app-preview"
          className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            eyebrow="App Preview"
            title="A quick look at the interface"
            description="Preview weekly schedules, smart alerts, and lecturer-student chat in one place."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Weekly timetable view
              </h3>
              <div className="mt-4 space-y-2">
                {[
                  "Mon 09:00 - Calculus",
                  "Tue 12:00 - Software Lab",
                  "Wed 10:00 - Statistics",
                  "Thu 14:00 - Networking",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-[#0a0f5c] dark:text-slate-300 dark:bg-slate-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Notification example
              </h3>
              <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 p-4">
                <div className="flex items-start gap-3">
                  <BellRing className="mt-1 h-5 w-5 text-[#0a0f5c] dark:text-[#2dd4a8]" />
                  <div>
                    <p className="text-sm font-semibold text-[#0a0f5c] dark:text-white">
                      Lecture moved to 3:00 PM
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      CS301 Software Engineering has changed room to Hall B2.
                    </p>
                    <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-500">
                      2 min ago
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Chat interface preview
              </h3>
              <div className="mt-5 space-y-3">
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                  Reminder: bring your lab reports to tomorrow&apos;s class.
                </div>
                <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#0a0f5c] px-3 py-2 text-sm text-white">
                  Got it, thank you!
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                  I also posted today&apos;s slides in Announcements.
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          id="benefits"
          className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionHeading
            eyebrow="Benefits"
            title="Built to make academic life easier"
            description="The platform helps students and lecturers focus on learning, not logistics."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2dd4a8]/15 dark:bg-[#2dd4a8]/10">
                    <Icon className="h-5 w-5 text-[#0a0f5c] dark:text-[#2dd4a8]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a0f5c] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pb-24 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a0f5c] to-[#142286] px-6 py-10 text-center shadow-xl sm:px-10 sm:py-14">
            <h2 className="mx-auto max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              Start managing your academic life smarter today
            </h2>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2dd4a8] px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#3dedc0] dark:bg-[#2dd4a8] dark:text-white dark:hover:bg-[#3dedc0]"
            >
              Create Free Account
            </Link>
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
