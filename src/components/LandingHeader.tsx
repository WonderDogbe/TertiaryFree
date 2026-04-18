"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

type NavLinkItem = {
  href: string;
  label: string;
};

type LandingHeaderProps = {
  navLinks: NavLinkItem[];
  isDarkMode: boolean;
  isMenuOpen: boolean;
  onToggleDarkMode: () => void;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
};

export function LandingHeader({
  navLinks,
  isDarkMode,
  isMenuOpen,
  onToggleDarkMode,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: LandingHeaderProps) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-100/80 bg-white/95 backdrop-blur-md dark:border-blue-900/40 dark:bg-slate-900/95">
        <nav
          className="relative mx-auto w-full px-6 sm:px-10 lg:px-16"
          aria-label="Global"
        >
          <div className="flex h-16 items-center justify-between lg:h-20">
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                aria-label="TertiaryFree home"
                className="group flex items-center"
              >
                <Image
                  src="/logo.png"
                  alt="TertiaryFree Logo"
                  width={180}
                  height={49}
                  priority
                  className="block h-9 w-auto object-contain transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-105 md:hidden"
                />
                <Image
                  src="/logo.png"
                  alt="TertiaryFree Logo"
                  width={272}
                  height={74}
                  priority
                  className="hidden h-10 w-auto object-contain transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-105 md:block lg:h-12"
                />
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:gap-3 lg:gap-4">
              <button
                onClick={onToggleDarkMode}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 text-[var(--color-text)] transition-colors hover:bg-[var(--color-secondary-bg)] dark:border-blue-900/40"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Moon className="h-3.5 w-3.5" />
                ) : (
                  <Sun className="h-3.5 w-3.5" />
                )}
              </button>

              <div className="flex items-center gap-3 lg:gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)] dark:text-slate-100 dark:hover:text-blue-300"
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

            <div className="md:hidden">
              <button
                onClick={onToggleMobileMenu}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-900 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-900"
                aria-label="Toggle Menu"
                aria-controls="mobile-navigation"
                aria-expanded={isMenuOpen}
              >
                <span className="relative flex h-4 w-7 flex-col items-center justify-center gap-1.5">
                  <span
                    className={`h-[2px] w-7 rounded-full bg-gray-900 transition-all duration-300 ease-in-out dark:bg-white ${
                      isMenuOpen ? "translate-y-[4px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`h-[2px] w-7 rounded-full bg-gray-900 transition-all duration-300 ease-in-out dark:bg-white ${
                      isMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        id="mobile-navigation"
        aria-label="Mobile menu"
        className={`fixed inset-x-0 top-16 z-40 w-full border-t border-blue-100/80 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-blue-900/40 dark:bg-slate-900 md:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-[10px] pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 p-5" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.label}`}
              href={link.href}
              onClick={onCloseMobileMenu}
              className="text-sm font-semibold tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)] dark:text-slate-100 dark:hover:text-blue-300"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/signup/institution?startOver=1"
              onClick={onCloseMobileMenu}
              className="btn-brand w-full py-3 text-center text-base"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              onClick={onCloseMobileMenu}
              className="inline-flex w-full items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-8 py-3 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Sign in
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}