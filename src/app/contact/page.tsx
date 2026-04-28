"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft,
  GraduationCap,
  Globe,
  Clock
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/contact", label: "Contact Us" },
];

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  // Theme Sync
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemTheme)) {
      setIsDarkMode(true);
    }
    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) return;
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, isThemeReady]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const contactOptions = [
    {
      icon: Mail,
      label: "Email Us",
      value: "hello@tertiaryfree.com",
      description: "Our support team usually responds within 2 hours.",
      color: "bg-blue-500"
    },
    {
      icon: Phone,
      label: "Call Support",
      value: "+233 50 000 0000",
      description: "Mon-Fri from 8am to 6pm GMT.",
      color: "bg-emerald-500"
    },
    {
      icon: MapPin,
      label: "Visit Campus",
      value: "Accra, Ghana",
      description: "Innovation Hub, Tech Street.",
      color: "bg-violet-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] transition-colors duration-300">
      <LandingHeader 
        navLinks={NAV_LINKS}
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onToggleMobileMenu={() => setIsMenuOpen(!isMenuOpen)}
        onCloseMobileMenu={() => setIsMenuOpen(false)}
      />

      <main className="relative pt-32 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-blue-400/10 blur-[100px] animate-pulse dark:bg-blue-600/5"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-purple-400/10 blur-[100px] animate-pulse delay-700 dark:bg-purple-600/5"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 animate-slide-up">
            <div className="text-left">
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                Let's build the <br />
                <span className="text-[var(--color-primary)]">Future</span> together.
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl font-medium leading-relaxed">
                Have questions about TertiaryFree? Our team is here to help you revolutionize your academic experience through technology.
              </p>
            </div>
            <div className="hidden lg:block relative group">
              <div className="absolute inset-0 bg-blue-600/10 rounded-[3rem] rotate-3 scale-105 blur-xl group-hover:rotate-6 transition-transform duration-700"></div>
              <div className="relative h-[400px] rounded-[3rem] overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl shadow-blue-600/20">
                <Image 
                  src="/library-hero.png" 
                  alt="Educational Support" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-white font-black text-xl tracking-tight">Dedicated Support 24/7</p>
                  <p className="text-blue-200 text-sm font-bold">Always ready to help you grow</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-5 space-y-8 animate-slide-up delay-100">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative glass-panel rounded-[2.5rem] p-8 border border-white/20 dark:bg-[#1A1A2E]/80">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <GraduationCap className="text-blue-600 w-7 h-7" />
                    Support for Scholars
                  </h3>
                  
                  <div className="space-y-8">
                    {contactOptions.map((opt, i) => (
                      <div key={i} className="flex gap-5 group/item">
                        <div className={`w-12 h-12 ${opt.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover/item:scale-110 group-hover/item:rotate-3`}>
                          <opt.icon size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{opt.label}</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">{opt.value}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{opt.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 overflow-hidden relative">
                            <Image src={`/img.jpg`} alt="Team Member" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Join <span className="text-blue-600">1,200+</span> students getting daily support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="glass-panel rounded-3xl p-6 flex items-center gap-4 border-emerald-500/20 bg-emerald-500/5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Global Support Servers: <span className="uppercase font-black">Operational</span>
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 animate-slide-up delay-200">
              <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 border border-white/20 relative overflow-hidden dark:bg-[#121212]/50 shadow-2xl">
                {isSubmitted ? (
                  <div className="text-center py-20 animate-fade-in">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs mx-auto">
                      Thank you for reaching out. A TertiaryFree representative will contact you shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Send a Message</h2>
                      <p className="text-gray-500 dark:text-gray-400">Fill out the form and our team will get back to you.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1">Full Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="John Doe"
                            className="w-full h-14 bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 rounded-2xl px-6 outline-none transition-all font-semibold text-gray-900 dark:text-white"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1">Email Address</label>
                          <input 
                            required
                            type="email" 
                            placeholder="john@example.com"
                            className="w-full h-14 bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 rounded-2xl px-6 outline-none transition-all font-semibold text-gray-900 dark:text-white"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1">Subject</label>
                        <select 
                          className="w-full h-14 bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 rounded-2xl px-6 outline-none transition-all font-semibold text-gray-900 dark:text-white appearance-none"
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                        >
                          <option>General Inquiry</option>
                          <option>Technical Support</option>
                          <option>Institutional Partnership</option>
                          <option>Billing & Payments</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1">Your Message</label>
                        <textarea 
                          required
                          rows={5}
                          placeholder="How can we help you?"
                          className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-white/10 rounded-[2rem] p-6 outline-none transition-all font-semibold text-gray-900 dark:text-white resize-none"
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-16 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
                      >
                        {isSubmitting ? "Processing..." : "Send Message"}
                        {!isSubmitting && <Send size={20} />}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .dark .glass-panel {
          background: rgba(18, 18, 18, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
