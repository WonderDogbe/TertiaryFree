import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-slate-200 bg-[var(--color-secondary-bg)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex">
              <Logo size="sm" />
            </div>
            <p className="max-w-md text-sm text-slate-600">
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
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-primary)]"
            >
              About
            </Link>
            <a
              href="mailto:support@tertiaryfree.com"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-primary)]"
            >
              Contact Us
            </a>
            <Link
              href="#"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[var(--color-primary)]"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} TertiaryFree. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
