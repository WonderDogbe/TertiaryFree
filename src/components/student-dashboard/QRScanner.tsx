"use client";

import type { AttendanceCheckInRecord, QrScannerStatus } from "./useQrScanner";
import { useQrScanner } from "./useQrScanner";

interface QRScannerProps {
  onCheckIn: (record: AttendanceCheckInRecord) => void;
}

const STATUS_STYLES: Record<QrScannerStatus, string> = {
  idle: "border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100",
  scanning:
    "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  success:
    "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  error:
    "border-rose-200 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  "permission-denied":
    "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
};

export function QRScanner({ onCheckIn }: QRScannerProps) {
  const {
    scannerElementId,
    isScannerRunning,
    status,
    statusMessage,
    startScan,
    stopScan,
    resetState,
  } = useQrScanner({ onCheckIn });

  const handleStartScan = () => {
    void startScan();
  };

  const handleStopScan = async () => {
    await stopScan();
    resetState();
  };

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm transition-colors duration-300 dark:bg-gray-800">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
              Scan to Check In
            </h2>
            <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
              Point your camera at the lecture QR code to record attendance.
            </p>
          </div>

          <p
            className={`inline-flex w-fit rounded-full border px-3 py-1 text-sm font-semibold ${
              STATUS_STYLES[status]
            }`}
            role="status"
          >
            {statusMessage}
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-lg bg-gray-950 aspect-video">
          <div id={scannerElementId} className="h-full w-full" />

          {!isScannerRunning && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-gray-200">
              {status === "permission-denied"
                ? "Camera access required"
                : "Tap Start Scan to open camera preview"}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleStartScan}
            disabled={isScannerRunning}
            className={`inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-base font-semibold transition-colors sm:w-auto sm:min-w-[170px] ${
              isScannerRunning
                ? "cursor-not-allowed bg-blue-300 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isScannerRunning ? "Scanning..." : status === "success" ? "Scan Again" : "Start Scan"}
          </button>

          <button
            type="button"
            onClick={handleStopScan}
            disabled={!isScannerRunning}
            className={`inline-flex w-full items-center justify-center rounded-xl border px-5 py-3.5 text-base font-semibold transition-colors sm:w-auto sm:min-w-[140px] ${
              isScannerRunning
                ? "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                : "cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500"
            }`}
          >
            Stop Scan
          </button>
        </div>
      </div>
    </section>
  );
}
