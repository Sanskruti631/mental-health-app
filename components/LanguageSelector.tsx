"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";


interface LanguageSelectorProps {
  onSelect: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    onSelect(); // move to main app
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Choose your language / आपली भाषा / अपनी भाषा चुनें</h2>
      <select onChange={handleChange} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="mr">मराठी</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
