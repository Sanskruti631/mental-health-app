import i18n from "i18next";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          heroTitle: "Your Mental Health Matters",
          heroDescription:
            "A comprehensive digital platform providing AI-guided support and professional counseling for students in higher education. Available 24/7, stigma-free, and culturally sensitive.",
          startChat: "Start AI Chat",
          bookCounseling: "Book Counseling",
          aiSupport: "AI-Guided Support",
          aiSupportDesc:
            "24/7 intelligent chatbot providing immediate coping strategies and crisis intervention",
          confidential: "Confidential & Safe",
          confidentialDesc:
            "Complete privacy protection with secure, anonymous support options",
          alwaysAvailable: "Always Available",
          alwaysAvailableDesc:
            "Round-the-clock access to mental health resources and emergency support",
        },
      },
      hi: {
        translation: {
          heroTitle: "आपका मानसिक स्वास्थ्य महत्वपूर्ण है",
          heroDescription:
            "उच्च शिक्षा के छात्रों के लिए एआई-मार्गदर्शित सहायता और पेशेवर परामर्श प्रदान करने वाला एक डिजिटल प्लेटफ़ॉर्म। 24/7 उपलब्ध, बिना किसी कलंक के और सांस्कृतिक रूप से संवेदनशील।",
          startChat: "AI चैट शुरू करें",
          bookCounseling: "काउंसलिंग बुक करें",
          aiSupport: "एआई सहायता",
          aiSupportDesc:
            "24/7 बुद्धिमान चैटबॉट जो तुरंत सहायता और संकट हस्तक्षेप प्रदान करता है",
          confidential: "गोपनीय और सुरक्षित",
          confidentialDesc:
            "सुरक्षित और गुमनाम सहायता विकल्पों के साथ पूर्ण गोपनीयता सुरक्षा",
          alwaysAvailable: "हमेशा उपलब्ध",
          alwaysAvailableDesc:
            "मानसिक स्वास्थ्य संसाधनों और आपातकालीन सहायता तक चौबीसों घंटे पहुंच",
        },
      },
      mr: {
        translation: {
          heroTitle: "तुमचे मानसिक आरोग्य महत्वाचे आहे",
          heroDescription:
            "उच्च शिक्षणाच्या विद्यार्थ्यांसाठी एआय मार्गदर्शित मदत आणि व्यावसायिक सल्ला प्रदान करणारे डिजिटल प्लॅटफॉर्म. 24/7 उपलब्ध, कलंकमुक्त आणि सांस्कृतिकदृष्ट्या संवेदनशील.",
          startChat: "AI चॅट सुरू करा",
          bookCounseling: "काउन्सेलिंग बुक करा",
          aiSupport: "एआय-मार्गदर्शित मदत",
          aiSupportDesc:
            "24/7 बुद्धिमान चॅटबॉट जो तातडीने उपाय आणि संकट हस्तक्षेप प्रदान करतो",
          confidential: "गोपनीय आणि सुरक्षित",
          confidentialDesc:
            "सुरक्षित, गुप्त सहाय्य पर्यायांसह पूर्ण गोपनीयता संरक्षण",
          alwaysAvailable: "नेहमी उपलब्ध",
          alwaysAvailableDesc:
            "मानसिक आरोग्य साधने आणि आपत्कालीन सहाय्य 24/7 उपलब्ध",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
