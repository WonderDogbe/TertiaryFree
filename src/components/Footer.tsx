import Link from "next/link";
import { Code, Mail, Phone, MapPin, Globe, Send, Users } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex">
              <Logo size="sm" />
            </div>
            <p className="text-sm leading-6 text-slate-400 mb-6">
              Elevate your education with a unified command center for your
              academic journey.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="Code"
              >
                <Code className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Users className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                aria-label="Email"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Mobile App
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Updates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@tertiaryfree.com"
                  className="flex items-start gap-2 text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors group"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>support@tertiaryfree.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-start gap-2 text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors group"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    123 Education Street
                    <br />
                    San Francisco, CA 94105
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800" />

        {/* Footer Bottom */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">
            <p>&copy; {currentYear} TertiaryFree. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-8">
            <Link
              href="#"
              className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-400 hover:text-[#2dd4a8] transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
