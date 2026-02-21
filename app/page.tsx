"use client";

import { useState } from "react";
import "@/lib/i18n"; // ✅ IMPORTANT (adjust path if needed)

import LanguageSelector from "@/components/LanguageSelector";
import { AuthGuard } from "@/components/auth-guard";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  const [languageSelected, setLanguageSelected] = useState(false);

  // 🔹 STEP 1 — show dropdown first
  if (!languageSelected) {
    return (
      <LanguageSelector onSelect={() => setLanguageSelected(true)} />
    );
  }

  // 🔹 STEP 2 — show actual app
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
