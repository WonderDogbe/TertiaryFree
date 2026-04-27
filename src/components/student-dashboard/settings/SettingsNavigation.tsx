"use client";

import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck,
  ChevronRight,
  Palette
} from "lucide-react";

interface SettingsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "profile", label: "Profile Settings", icon: User },
  { id: "password", label: "Password", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "verification", label: "Verification", icon: ShieldCheck },
];

export function SettingsNavigation({ activeTab, onTabChange }: SettingsNavigationProps) {
  return (
    <nav className="flex flex-col gap-1">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-blue-600/90 text-white shadow-lg shadow-blue-500/20 backdrop-blur-md dark:bg-blue-700/80 dark:shadow-none"
                : "text-gray-600 hover:bg-white/50 dark:text-gray-400 dark:hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200"}`} />
              {tab.label}
            </div>
            {isActive && <ChevronRight className="h-4 w-4 text-white/70" />}
          </button>
        );
      })}
    </nav>
  );
}
