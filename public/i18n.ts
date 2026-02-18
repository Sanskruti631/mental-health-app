import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          login: "Login",
          selectLanguage: "Select Language"
        }
      },
      hi: {
        translation: {
          welcome: "स्वागत है",
          login: "लॉगिन",
          selectLanguage: "भाषा चुनें"
        }
      }
    }
  });

export default i18n;
