"use client";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>

      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {t("login")}
      </button>
    </div>
  );
}
