
import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
  title: "SoulSupport - Digital Mental Health Support for Students",
  description:
    "Comprehensive mental health and psychological support system for higher education students",
};
import "@/lib/i18n";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
