"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  QrCode as QrIcon, 
  Users, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter,
  ArrowRight,
  Clock,
  Play,
  Square,
  Maximize2,
  Minimize2,
  X,
  Timer
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/components/AuthProvider";

// Mock student attendance data
const MOCK_ATTENDANCE = [
  { id: "s1", name: "Ama Mensah", index: "UEB3214024", time: "10:05 AM", status: "Present" },
  { id: "s2", name: "Kofi Boateng", index: "UEB3214025", time: "10:12 AM", status: "Present" },
  { id: "s3", name: "Kwame Nkrumah", index: "UEB3214026", time: "10:15 AM", status: "Present" },
  { id: "s4", name: "Abena Serwaa", index: "UEB3214027", time: "--", status: "Absent" },
];

const DURATION_OPTIONS = [
  { label: "5 Mins", value: 300 },
  { label: "10 Mins", value: 600 },
  { label: "20 Mins", value: 1200 },
  { label: "30 Mins", value: 1800 },
  { label: "1 Hour", value: 3600 },
  { label: "Unlimited", value: 0 },
];

export default function LecturerAttendancePage() {
  const { user } = useAuth();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(300); // Default 5 mins
  const [showQR, setShowQR] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("ICT 315");

  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          const next = prev + 1;
          // Auto-end if duration reached
          if (sessionDuration > 0 && next >= sessionDuration) {
            setIsSessionActive(false);
            setShowQR(false);
            setIsFullscreen(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    } else {
      setSessionTime(0);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getRemainingTime = () => {
    if (sessionDuration === 0) return "Unlimited";
    const remaining = sessionDuration - sessionTime;
    return formatTime(remaining);
  };

  // Fixed QR value for the duration of the session
  const qrValue = useMemo(() => {
    if (!isSessionActive) return "";
    return JSON.stringify({
      courseId: selectedCourse,
      lecturerId: user?.id,
      sessionStart: Date.now(),
      duration: sessionDuration
    });
  }, [isSessionActive, selectedCourse, user]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Attendance Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track and manage student attendance in real-time</p>
      </header>

      {/* Control Panel */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
           <div className="flex flex-col h-full justify-between gap-8">
              <div className="flex items-start justify-between">
                 <div>
                    <h2 className="text-xl font-bold">Active Session Control</h2>
                    <p className="text-blue-100 text-sm mt-1">Configure and start a fixed attendance session</p>
                 </div>
                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <QrIcon size={24} />
                 </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">Current Course</span>
                    <span className="text-lg font-bold">{selectedCourse}</span>
                 </div>
                 <div className="h-8 w-px bg-white/20" />
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                      {sessionDuration > 0 ? "Time Remaining" : "Session Timer"}
                    </span>
                    <span className="text-lg font-mono font-bold">
                      {sessionDuration > 0 && isSessionActive ? getRemainingTime() : formatTime(sessionTime)}
                    </span>
                 </div>
                 <div className="h-8 w-px bg-white/20" />
                 
                 {!isSessionActive ? (
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">Set Duration</span>
                      <select 
                        value={sessionDuration}
                        onChange={(e) => setSessionDuration(Number(e.target.value))}
                        className="bg-transparent border-none font-bold text-lg outline-none cursor-pointer"
                      >
                        {DURATION_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                        ))}
                      </select>
                   </div>
                 ) : (
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">Total Scans</span>
                      <span className="text-lg font-bold">32 Students</span>
                   </div>
                 )}
              </div>

              <div className="flex gap-4">
                 {!isSessionActive ? (
                   <button 
                     onClick={() => { setIsSessionActive(true); setShowQR(true); }}
                     className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-blue-700 transition-all hover:bg-blue-50 active:scale-95"
                   >
                     <Play size={18} fill="currentColor" />
                     Start Session ({DURATION_OPTIONS.find(o => o.value === sessionDuration)?.label})
                   </button>
                 ) : (
                   <button 
                     onClick={() => { setIsSessionActive(false); setShowQR(false); }}
                     className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-red-600 active:scale-95"
                   >
                     <Square size={18} fill="currentColor" />
                     End Session
                   </button>
                 )}
                 <button 
                   onClick={() => setShowQR(!showQR)}
                   disabled={!isSessionActive}
                   className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-50"
                 >
                   {showQR ? "Hide QR" : "Show QR"}
                 </button>
              </div>
           </div>
        </div>

        {/* QR Display Card */}
        <div className="relative group rounded-[2.5rem] border border-white/60 bg-white/70 p-8 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 flex flex-col items-center justify-center text-center">
           {showQR ? (
             <div className="space-y-4">
                <div className="p-4 bg-white rounded-3xl shadow-lg inline-block relative">
                  <QRCodeSVG value={qrValue} size={180} />
                  <button 
                    onClick={() => setIsFullscreen(true)}
                    className="absolute -top-2 -right-2 p-2 rounded-full bg-blue-600 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
                    title="Fullscreen Projection"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-1">
                   <p className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                     <CheckCircle size={12} className="text-emerald-500" /> Static QR for Session
                   </p>
                   {sessionDuration > 0 && (
                     <p className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                        <Timer size={10} /> Auto-ends in {getRemainingTime()}
                     </p>
                   )}
                </div>
                <button 
                  onClick={() => setIsFullscreen(true)}
                  className="mt-2 inline-flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-blue-600 transition-colors"
                >
                  <Maximize2 size={12} /> Fullscreen Projector
                </button>
             </div>
           ) : (
             <div className="space-y-4">
                <div className="h-44 w-44 rounded-3xl bg-gray-100 dark:bg-white/5 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10">
                   <QrIcon size={48} className="text-gray-300 dark:text-gray-700" />
                </div>
                <p className="text-sm font-medium text-gray-400">Set duration and start session</p>
             </div>
           )}
        </div>
      </section>

      {/* Attendance List */}
      <section className="rounded-3xl border border-white/60 bg-white/70 overflow-hidden shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Live Attendance Records</h3>
          <div className="flex gap-2">
             <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search student..." 
                  className="pl-9 pr-4 py-2 rounded-xl border border-gray-100 bg-white text-sm outline-none focus:border-blue-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-200"
                />
             </div>
             <button className="p-2 rounded-xl border border-gray-100 bg-white text-gray-600 dark:bg-white/5 dark:border-white/10 dark:text-gray-300">
                <Filter size={18} />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Index Number</th>
                <th className="px-6 py-4">Check-in Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {MOCK_ATTENDANCE.map(row => (
                <tr key={row.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs dark:bg-blue-900/40 dark:text-blue-400">
                          {row.name[0]}
                       </div>
                       <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">{row.index}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{row.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                      row.status === "Present" 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {row.status === "Present" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                       <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fullscreen Projection Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-start bg-white dark:bg-[#0a0a0a] p-8 sm:p-20 overflow-y-auto">
           <button 
             onClick={() => setIsFullscreen(false)}
             className="fixed top-8 right-8 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all dark:bg-white/5 dark:hover:bg-white/10 dark:text-white z-[210]"
           >
             <Minimize2 size={32} />
           </button>

           <div className="text-center w-full max-w-5xl mx-auto flex flex-col items-center gap-12 mt-10">
              <header className="space-y-6">
                <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-[#0f172a] dark:text-white uppercase leading-none">ATTENDANCE</h2>
                <div className="flex items-center justify-center gap-4">
                  <span className="px-8 py-3 rounded-2xl bg-blue-600 text-white text-2xl font-black shadow-xl shadow-blue-500/20">{selectedCourse}</span>
                  <span className={`px-8 py-3 rounded-2xl font-mono text-2xl font-black border-2 ${sessionDuration > 0 ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-500/10" : "border-gray-200 text-gray-500 bg-gray-50 dark:bg-white/5"}`}>
                    {sessionDuration > 0 ? getRemainingTime() : formatTime(sessionTime)}
                  </span>
                </div>
              </header>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[5rem] blur-2xl opacity-20" />
                <div className="relative p-12 sm:p-16 bg-white rounded-[4.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border-2 border-blue-50 dark:border-white/10">
                   <QRCodeSVG value={qrValue} size={window.innerWidth < 640 ? 280 : 500} level="H" />
                </div>
              </div>

              <footer className="space-y-6 max-w-2xl">
                 <h3 className="text-3xl sm:text-4xl font-bold text-[#1e293b] dark:text-slate-300">Scan with your student app to mark present</h3>
                 <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                   Keep this screen visible until the session ends. Your attendance will be recorded instantly.
                 </p>
                 <div className="flex flex-wrap items-center justify-center gap-8 pt-10 opacity-70">
                    <div className="flex items-center gap-3">
                       <CheckCircle size={28} className="text-emerald-500" />
                       <span className="text-xl font-bold text-slate-700 dark:text-slate-200">Secure</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Clock size={28} className="text-amber-500" />
                       <span className="text-xl font-bold text-slate-700 dark:text-slate-200">Timed</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Users size={28} className="text-purple-500" />
                       <span className="text-xl font-bold text-slate-700 dark:text-slate-200">Verified</span>
                    </div>
                 </div>
              </footer>
           </div>
        </div>
      )}
    </div>
  );
}
