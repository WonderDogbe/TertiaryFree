"use client";

import { 
  UserCircle, 
  CreditCard, 
  Languages, 
  Bell, 
  Lock, 
  ChevronRight,
  Sparkles,
  User
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

interface SettingItemProps {
  icon: any;
  label: string;
  onClick: () => void;
}

function SettingItem({ icon: Icon, label, onClick }: SettingItemProps) {
  return (
    <button 
      onClick={onClick}
      className="flex w-full items-center justify-between border-b border-gray-100 py-4 transition-colors active:bg-gray-50 dark:border-gray-800 dark:active:bg-gray-900"
    >
      <div className="flex items-center gap-4">
        <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        <span className="text-base font-normal text-gray-900 dark:text-gray-100">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </button>
  );
}

export function MobileSettingsView({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const { user } = useAuth();
  
  const displayName = user?.name || "Student";
  const initials = displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex flex-col px-6 pb-24 md:hidden">
      <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>

      {/* User Header */}
      <Link href="/dashboard/profile" className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
             {user?.avatarUrl ? (
               <Image src={user.avatarUrl} alt={displayName} fill className="object-cover" />
             ) : (
               <div className="flex h-full w-full items-center justify-center text-xl font-bold text-gray-400">
                 {initials}
               </div>
             )}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium text-gray-900 dark:text-white">{displayName.split(" ")[0]}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Show profile</span>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </Link>

      {/* Promo Card (Airbnb style) */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-md transition-all dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">TertiaryFree Premium</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Unlock advanced attendance stats and AI course summaries.
            </p>
          </div>
          <div className="relative h-16 w-16 flex-shrink-0">
             <div className="flex h-full w-full items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Sparkles className="h-8 w-8" />
             </div>
          </div>
        </div>
      </section>

      {/* Account Settings List */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account settings</h2>
        
        <div className="mt-4 flex flex-col">
          <SettingItem 
            icon={UserCircle} 
            label="Personal information" 
            onClick={() => onTabChange("profile")} 
          />
          <SettingItem 
            icon={Lock} 
            label="Password & Security" 
            onClick={() => onTabChange("password")} 
          />
          <SettingItem 
            icon={Bell} 
            label="Notifications" 
            onClick={() => onTabChange("notifications")} 
          />
          <SettingItem 
            icon={Palette} 
            label="Theme & Appearance" 
            onClick={() => onTabChange("theme")} 
          />
          <SettingItem 
            icon={ShieldCheck} 
            label="Account Verification" 
            onClick={() => onTabChange("verification")} 
          />
        </div>
      </div>
    </div>
  );
}

import { Palette, ShieldCheck } from "lucide-react";
