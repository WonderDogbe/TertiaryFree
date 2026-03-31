"use client";

import Link from "next/link";
import { ArrowRight, Wallet, Calendar, BarChart3, BookOpen } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-[#2dd4a8] selection:text-[#0a0f5c]">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex items-center justify-between py-6">
            <div className="flex lg:flex-1">
              <Logo size="md" />
            </div>
            <div className="flex flex-1 justify-end items-center gap-x-4 sm:gap-x-6">
              <Link href="/login" className="text-sm font-semibold leading-6 text-slate-700 hover:text-[#0a0f5c] transition">
                Sign in
              </Link>
              <Link href="/register" className="btn-brand text-sm px-4 py-2 sm:px-5">
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2dd4a8] to-[#0a0f5c] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
          </div>
          
          <div className="py-20 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center animate-slide-up">
                <div className="mb-8 flex justify-center">
                  <span className="relative rounded-full px-4 py-1.5 text-xs sm:text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20 shadow-sm bg-white/50 backdrop-blur-sm">
                    Announcing the new Semester 2024 update. <Link href="/register" className="font-semibold text-[#0a0f5c]"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></Link>
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Your Academic Journey, <span className="text-gradient">Unified.</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg lg:text-xl tracking-tight text-slate-600 max-w-2xl mx-auto">
                  Elevate your education with a premium command center. Seamlessly synchronize your academic schedule, track financial aid, and monitor your GPA in one authoritative interface.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                  <Link href="/register" className="btn-brand py-3.5 px-8 shadow-lg shadow-[#0a0f5c]/20 hover:shadow-xl hover:shadow-[#0a0f5c]/30 w-full sm:w-auto text-base">
                    Create free account
                  </Link>
                  <Link href="/login" className="text-sm sm:text-base font-semibold leading-6 text-slate-900 flex items-center gap-1 group w-full sm:w-auto justify-center">
                    Sign In to Dashboard <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
              
              <div className="mt-16 flow-root sm:mt-24 animate-slide-up delay-100 mx-auto max-w-5xl">
                <div className="relative -m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <div className="overflow-hidden rounded-lg sm:rounded-xl shadow-2xl ring-1 ring-slate-900/10 h-[250px] sm:h-[400px] lg:h-[500px] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                       src="/library-hero.png"
                       alt="App dashboard mock"
                       className="absolute h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#0a0f5c]/30 mix-blend-multiply" />
                    
                    {/* Floating glass cards over image to look dynamic */}
                    <div className="absolute top-4 sm:top-8 left-4 sm:left-8 glass-panel rounded-xl p-3 sm:p-4 w-36 sm:w-48 shadow-lg transform -rotate-2">
                       <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide uppercase">Next Class</p>
                       <p className="font-bold text-slate-900 sm:text-lg sm:mt-0.5">Advanced Physics</p>
                       <p className="text-xs text-[#16a34a] font-semibold mt-1">Starts in 15 mins</p>
                    </div>
                    
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 glass-panel-dark rounded-xl p-3 sm:p-4 w-40 sm:w-56 shadow-2xl transform rotate-1">
                       <p className="text-[10px] sm:text-xs text-[#2dd4a8] font-medium tracking-wide uppercase">Financial Aid</p>
                       <p className="font-bold text-white text-lg sm:text-2xl mt-0.5">$4,500</p>
                       <p className="text-[10px] sm:text-xs text-white/70 mt-1">Disbursed successfully</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl lg:text-center animate-slide-up delay-200">
            <h2 className="text-base font-semibold leading-7 text-[#0a0f5c] tracking-wide uppercase">Deploy faster</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl title-font">
              Everything you need to succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              No more bouncing between awful university portals. Get a clear overview of your academic standing directly from your phone or laptop.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:max-w-none lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-slate-900 w-full">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0a0f5c]/5 flex-shrink-0">
                    <Wallet className="h-5 w-5 text-[#0a0f5c]" />
                  </div>
                  Finance Tracking
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-slate-600">
                  <p className="flex-auto">Real-time tuition & grant monitoring. Never miss a payment deadline again with instant alerts.</p>
                  <p className="mt-4 sm:mt-6 text-sm font-semibold text-[#0a0f5c] flex items-center gap-1">Learn more <ArrowRight className="h-4 w-4"/></p>
                </dd>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-slate-900 w-full">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0a0f5c]/5 flex-shrink-0">
                    <Calendar className="h-5 w-5 text-[#0a0f5c]" />
                  </div>
                  Smart Timetable
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-slate-600">
                  <p className="flex-auto">AI-powered schedule optimization that routes you between classes perfectly with maps integration.</p>
                  <p className="mt-4 sm:mt-6 text-sm font-semibold text-[#0a0f5c] flex items-center gap-1">Learn more <ArrowRight className="h-4 w-4"/></p>
                </dd>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-slate-900 w-full">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0a0f5c]/5 flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-[#0a0f5c]" />
                  </div>
                  GPA Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-slate-600">
                  <p className="flex-auto">Performance trends & predictions to keep your academic goals on track, visually mapped out.</p>
                  <p className="mt-4 sm:mt-6 text-sm font-semibold text-[#0a0f5c] flex items-center gap-1">Learn more <ArrowRight className="h-4 w-4"/></p>
                </dd>
              </div>
              {/* Feature 4 */}
              <div className="flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-slate-900 w-full">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0a0f5c]/5 flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-[#0a0f5c]" />
                  </div>
                  Course Hub
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-slate-600">
                  <p className="flex-auto">All materials, assignments, and slides neatly organized in one centralized, searchable hub.</p>
                  <p className="mt-4 sm:mt-6 text-sm font-semibold text-[#0a0f5c] flex items-center gap-1">Learn more <ArrowRight className="h-4 w-4"/></p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
