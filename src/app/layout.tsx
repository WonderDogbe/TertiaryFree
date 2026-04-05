import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import "./globals.css";

export const metadata: Metadata = {
  title: "TertiaryFree — ",
  description:
    "Simplify university life. Centralize timetables, course materials, announcements, attendance, and payments into one premium platform.",
  keywords: [
    "university",
    "academic",
    "student platform",
    "timetable",
    "course materials",
    "attendance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  );
}
