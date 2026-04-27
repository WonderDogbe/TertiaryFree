"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Camera, 
  Trash2, 
  Globe, 
  Mail, 
  Phone, 
  User, 
  FileText, 
  MapPin,
  Save
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export function SettingsProfileForm() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatarUrl || null);

  const firstName = user?.name?.split(" ")[0] || "";
  const lastName = user?.name?.split(" ").slice(1).join(" ") || "";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header / Avatar Section */}
      <section className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
        <div className="group relative">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-xl transition-transform duration-300 group-hover:scale-105 dark:border-gray-800 dark:bg-gray-700">
            {avatar ? (
              <Image 
                src={avatar} 
                alt="Profile avatar" 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-200 dark:bg-blue-900/20 dark:text-blue-800">
                <User className="h-16 w-16" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
               <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg ring-4 ring-white transition-transform hover:scale-110 active:scale-95 dark:ring-gray-900">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            type="button"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 dark:shadow-none"
          >
            Upload New
          </button>
          <button 
            type="button"
            className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-200 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Delete avatar
          </button>
        </div>
      </section>

      {/* Form Fields */}
      <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Names */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            First Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
             <input 
               type="text" 
               defaultValue={firstName}
               placeholder="First name"
               className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
             />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input 
            type="text" 
            defaultValue={lastName}
            placeholder="Last name"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              defaultValue={user?.email || ""}
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-gray-700 dark:bg-gray-800">
               <span className="text-lg">🇬🇭</span>
               <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
            <input 
              type="tel" 
              placeholder="0806 123 7890"
              className="w-full flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Gender & ID */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex flex-1 cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Male</span>
               <input type="radio" name="gender" value="male" className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
            <label className="flex flex-1 cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Female</span>
               <input type="radio" name="gender" value="female" className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Student ID / Reg Number
          </label>
          <input 
            type="text" 
            placeholder="1559 000 7788 8DER"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Tax Info (Based on image) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Tax Identification Number
          </label>
          <input 
            type="text" 
            placeholder="examples@gmail.com"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Tax Identification Country
          </label>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-gray-700 dark:bg-gray-800">
               <span className="text-lg">🇬🇭</span>
               <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
            <input 
              type="text" 
              defaultValue="Ghana"
              className="w-full flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Residential Address
          </label>
          <textarea 
            rows={3}
            placeholder="1b street orogun ibadan"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Submit */}
        <div className="mt-4 md:col-span-2">
          <button 
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 dark:shadow-none"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
