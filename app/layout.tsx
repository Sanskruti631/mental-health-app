import "@/lib/i18n";
import type React from "react";
import type { Metadata } from "next";
import { UserMenu } from "@/components/user-menu" // 👈 ADD THIS
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
          {/* ✅ ADD USER MENU HERE */}
          <div className="flex justify-end p-4 border-b">
            <UserMenu />
          </div>
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
