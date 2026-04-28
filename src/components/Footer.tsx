import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-slate-200 bg-[var(--color-secondary-bg)] dark:border-slate-700/70 sm:scroll-mt-32 lg:scroll-mt-40"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex">
              <Logo
                size="sm"
                className="origin-left scale-125 sm:scale-150 lg:scale-[2]"
              />
            </div>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
              TertiaryFree helps students and lecturers stay aligned with
              personalized timetables and real-time updates.
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-6"
            aria-label="Footer"
          >
            <Link
              href="/#about"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-primary)] dark:text-slate-200 dark:hover:text-blue-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-primary)] dark:text-slate-200 dark:hover:text-blue-300"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-primary)] dark:text-slate-200 dark:hover:text-blue-300"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700/70">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {currentYear} TertiaryFree. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
