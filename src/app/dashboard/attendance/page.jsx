"use client";

import { useState } from "react";
import { QRScanner } from "@/components/student-dashboard/QRScanner";

export default function AttendancePage() {
  const [lastCheckIn, setLastCheckIn] = useState(null);

  return (
    <div className="space-y-6">
      <QRScanner onCheckIn={setLastCheckIn} />

      <section className="bg-white rounded-2xl p-6 shadow-sm transition-colors duration-300 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
            Last Attendance Record
          </h2>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
              lastCheckIn
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {lastCheckIn ? lastCheckIn.status : "Not checked in"}
          </span>
        </div>

        {lastCheckIn ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                Last scanned lecture
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
                {lastCheckIn.lecture}
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                Time of check-in
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
                {lastCheckIn.checkedInAt}
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="mt-2 text-sm font-semibold text-emerald-700 transition-colors duration-300 dark:text-emerald-300">
                {lastCheckIn.status}
              </p>
            </article>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            No lecture scanned yet. Start the scanner and scan a lecture QR code to check in.
          </p>
        )}
      </section>
    </div>
  );
}
