"use client";

import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("app-language", lang);
  };

  return (
    <select
      onChange={changeLang}
      value={i18n.language}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="mr">मराठी</option>
      <option value="hi">हिंदी</option>
    </select>
  );
}
