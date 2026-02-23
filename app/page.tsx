"use client";

import { useState, useEffect } from "react";
import "@/lib/i18n";

import LanguageSelector from "@/components/LanguageSelector";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";

const LANG_SELECTED_KEY = "soulsupport_lang_selected";

export default function HomePage() {
  const [languageSelected, setLanguageSelected] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LANG_SELECTED_KEY);
    setLanguageSelected(saved === "true");
  }, []);

  const handleLanguageSelect = () => {
    localStorage.setItem(LANG_SELECTED_KEY, "true");
    setLanguageSelected(true);
  };

  // Avoid flash while checking localStorage
  if (languageSelected === null) {
    return null;
  }

  if (!languageSelected) {
    return <LanguageSelector onSelect={handleLanguageSelect} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
