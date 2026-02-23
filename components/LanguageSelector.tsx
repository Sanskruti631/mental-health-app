"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import { Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LanguageSelectorProps {
  onSelect: () => void;
}

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = React.useState(i18n.language || "en");

  const handleSelect = (code: string) => {
    setSelected(code);
    i18n.changeLanguage(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center gap-6">
            {/* Logo */}
            <div className="bg-primary rounded-xl p-3">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Welcome to SoulSupport
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Choose your preferred language to continue
              </p>
              <p className="text-muted-foreground text-xs">
                {"आपली भाषा निवडा / अपनी भाषा चुनें"}
              </p>
            </div>

            {/* Language Options */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Globe className="h-4 w-4" />
              <span>Select language</span>
            </div>

            <div className="w-full flex flex-col gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ${
                    selected === lang.code
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  <span className="font-medium text-foreground">
                    {lang.native}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {lang.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={onSelect}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelector;
