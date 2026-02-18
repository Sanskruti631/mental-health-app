"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n"; // import i18n config
import LanguageSelector from "../components/LanguageSelector";

const Page: React.FC = () => {
  const [languageSelected, setLanguageSelected] = useState(false);
  const { t } = useTranslation();

  if (!languageSelected) {
    return <LanguageSelector onSelect={() => setLanguageSelected(true)} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{t("heroTitle")}</h1>
      <p>{t("heroDescription")}</p>
      <button>{t("startChat")}</button>
      <button>{t("bookCounseling")}</button>

      <div>
        <h3>{t("aiSupport")}</h3>
        <p>{t("aiSupportDesc")}</p>
      </div>
      <div>
        <h3>{t("confidential")}</h3>
        <p>{t("confidentialDesc")}</p>
      </div>
      <div>
        <h3>{t("alwaysAvailable")}</h3>
        <p>{t("alwaysAvailableDesc")}</p>
      </div>
    </div>
  );
};

export default Page;
