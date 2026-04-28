"use client";

import { useState } from "react";
import { 
  Send, 
  Megaphone, 
  Search, 
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  Trash2,
  MoreVertical,
  Users,
  ArrowRight
} from "lucide-react";

// Mock announcements data
const MOCK_ANNOUNCEMENTS = [
  { id: "a1", title: "Midsem Examination Date", course: "ICT 315", content: "The mid-semester exam for ICT 315 has been scheduled for May 15th. Please be on time.", date: "Today, 10:30 AM", sentTo: "142 Students", status: "Sent" },
  { id: "a2", title: "Assignment Deadline Extension", course: "ICT 102", content: "The deadline for Assignment 2 has been extended to Friday. No more extensions after this.", date: "Yesterday, 2:15 PM", sentTo: "138 Students", status: "Sent" },
  { id: "a3", title: "Class Cancellation", course: "GNS 101", content: "There will be no class tomorrow due to the faculty meeting. Reschedule date will be announced.", date: "2 days ago", sentTo: "850 Students", status: "Draft" },
];

export default function LecturerAnnouncementsPage() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Announcements</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Broadcast important updates to your students</p>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
        >
          <Plus size={18} />
          New Announcement
        </button>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         {/* Sidebar/Filters */}
         <div className="space-y-6">
            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
               <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-4">Search & Filter</h3>
               <div className="space-y-4">
                  <div className="relative">
                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input 
                        type="text" 
                        placeholder="Search announcements..." 
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-100 bg-white text-sm outline-none focus:border-indigo-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-200"
                     />
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-bold text-gray-400 uppercase ml-1">Filter by Course</p>
                     {["All Courses", "ICT 315", "GNS 101", "ICT 102"].map(course => (
                        <button key={course} className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                           course === "All Courses" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
                        }`}>
                           {course}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="rounded-3xl bg-indigo-600 p-6 text-white shadow-xl">
               <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                     <Megaphone size={20} />
                  </div>
                  <h3 className="font-bold">Pro Tip</h3>
               </div>
               <p className="text-sm text-indigo-100 leading-relaxed">
                  Targeted announcements have 4x higher student engagement. Select specific courses instead of broadcasting to all.
               </p>
            </div>
         </div>

         {/* Announcements List */}
         <div className="lg:col-span-2 space-y-4">
            {MOCK_ANNOUNCEMENTS.map(ann => (
               <div key={ann.id} className="group relative rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:border-indigo-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-900/50">
                  <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-[10px] font-bold dark:bg-indigo-900/40 dark:text-indigo-200">
                           {ann.course}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1.5">
                           <Clock size={12} /> {ann.date}
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                           ann.status === "Sent" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                        }`}>
                           {ann.status === "Sent" && <CheckCircle2 size={12} />}
                           {ann.status}
                        </span>
                        <button className="p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all text-gray-400 hover:text-red-500">
                           <Trash2 size={18} />
                        </button>
                     </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{ann.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                     {ann.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                     <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <Users size={14} />
                        <span>Sent to {ann.sentTo}</span>
                     </div>
                     <button className="text-sm font-bold text-indigo-600 hover:underline dark:text-indigo-400 flex items-center gap-1">
                        View Analytics
                        <ArrowRight size={14} />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* New Announcement Modal Placeholder */}
      {isNewModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl dark:bg-gray-900 border border-white/20">
               <h2 className="text-2xl font-bold mb-2 dark:text-white">Create Announcement</h2>
               <p className="text-sm text-gray-500 mb-6">Broadcast a new update to your students</p>
               
               <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsNewModalOpen(false); }}>
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-gray-500 uppercase ml-1">Announcement Title</label>
                     <input type="text" placeholder="e.g. Midsem Update" className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-200" />
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-gray-500 uppercase ml-1">Course</label>
                     <select className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-200">
                        <option>ICT 315 - Distributed Systems</option>
                        <option>GNS 101 - Use of English</option>
                     </select>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-gray-500 uppercase ml-1">Message Content</label>
                     <textarea rows={4} placeholder="Type your message here..." className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-200"></textarea>
                  </div>

                  <div className="flex gap-3 mt-8">
                     <button type="button" onClick={() => setIsNewModalOpen(false)} className="flex-1 py-3.5 rounded-2xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5">Cancel</button>
                     <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 dark:shadow-none flex items-center justify-center gap-2">
                        <Send size={18} />
                        Send Broadcast
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}
