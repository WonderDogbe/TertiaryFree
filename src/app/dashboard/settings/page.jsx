"use client";

import { useState } from "react";
import { SettingsNavigation } from "@/components/student-dashboard/settings/SettingsNavigation";
import { SettingsProfileForm } from "@/components/student-dashboard/settings/SettingsProfileForm";
import { NotificationPreferencesCard } from "@/components/student-dashboard/settings/NotificationPreferencesCard";
import { AppearanceSettingsCard } from "@/components/student-dashboard/settings/AppearanceSettingsCard";
import { AccountSettingsCard } from "@/components/student-dashboard/settings/AccountSettingsCard";
import { MobileSettingsView } from "@/components/student-dashboard/settings/MobileSettingsView";
import { ChevronLeft } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileView, setMobileView] = useState("list"); // "list" or "detail"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileView("detail");
  };

  const handleBack = () => {
    setMobileView("list");
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── MOBILE VIEW (AIRBNB STYLE) ────────────────────────── */}
      <div className={`md:hidden ${mobileView === "detail" ? "hidden" : "block"}`}>
        <MobileSettingsView onTabChange={handleTabChange} />
      </div>

      {/* ── DETAIL VIEW (MOBILE) & DESKTOP LAYOUT ──────────────── */}
      <div className={`${mobileView === "detail" ? "block" : "hidden md:block"}`}>
        <header className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <button 
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 md:hidden dark:bg-gray-800"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Account settings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your profile, security, and application preferences.
            </p>
          </div>
        </header>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Sidebar Navigation (Desktop only) */}
          <aside className="hidden w-full shrink-0 lg:block lg:w-64 animate-in fade-in slide-in-from-left-4 duration-500">
            <SettingsNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />
          </aside>

          {/* Main Content Area */}
          <main className="min-w-0 flex-1 rounded-[2.5rem] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-[#121212] sm:p-10 animate-in fade-in slide-in-from-right-4 duration-500">
            {activeTab === "profile" && <SettingsProfileForm />}
            
            {activeTab === "password" && (
              <div className="max-w-md">
                 <AccountSettingsCard />
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="max-w-2xl">
                <NotificationPreferencesCard />
              </div>
            )}

            {activeTab === "theme" && (
              <div className="max-w-lg">
                 <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Theme & Appearance</h3>
                    <p className="text-sm text-gray-500">Customize how TertiaryFree looks on your device.</p>
                 </div>
                 <AppearanceSettingsCard />
              </div>
            )}
            
            {activeTab === "verification" && (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-blue-50 p-4 dark:bg-blue-900/20">
                   <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Verification</h2>
                <p className="mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                  Verify your student identity to access all premium features and certifications.
                </p>
                <button className="mt-6 rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
                  Start Verification
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
