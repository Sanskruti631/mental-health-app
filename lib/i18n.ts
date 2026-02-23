"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          // Hero
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

          // Navigation
          navFeatures: "Features",
          navAbout: "About",
          navAiChatbot: "AI Chatbot",
          navBookAppointment: "Book Appointment",
          navResources: "Resources",
          navDashboard: "Dashboard",
          navUserManagement: "User Management",
          navAnalytics: "Analytics",
          navAppointments: "Appointments",
          navMessages: "Messages",
          navLogin: "Login",
          navSignUp: "Sign Up",

          // Features Section
          featuresHeading: "Everything You Need for Better Mental Health",
          featuresSubheading:
            "From AI-powered support to professional counseling, we provide comprehensive tools designed specifically for students.",
          featureChat: "AI-Powered Chat Support",
          featureChatDesc:
            "Get instant, confidential mental health guidance from our intelligent chatbot trained to help with stress, anxiety, and more.",
          featureAppointments: "Book Counseling Sessions",
          featureAppointmentsDesc:
            "Schedule appointments with verified therapists and counselors who specialize in student mental health.",
          featureResources: "Self-Help Resources",
          featureResourcesDesc:
            "Access curated articles, guided exercises, and evidence-based techniques for managing your mental wellbeing.",
          featureAssessments: "Mental Health Assessments",
          featureAssessmentsDesc:
            "Take clinically validated questionnaires like PHQ-9 and GAD-7 to better understand your mental health.",
          featureCommunity: "Peer Community",
          featureCommunityDesc:
            "Connect anonymously with fellow students in moderated support groups and shared-experience forums.",
          featureMood: "Mood & Progress Tracking",
          featureMoodDesc:
            "Monitor your emotional wellbeing over time with visual insights and personalized recommendations.",
          learnMore: "Learn More",
          crisisTitle: "Crisis Support Available 24/7",
          crisisDesc:
            "If you're experiencing a mental health emergency, immediate help is available.",
          crisisHelpline: "Crisis Helpline : 18008914413",
          emergencyResources: "Emergency Resources",

          // Stats Section
          statsHeading: "Making a Real Impact",
          statsSubheading:
            "Our evidence-based approach is helping students across institutions build resilience and maintain better mental health.",
          statsStressLabel: "of students report high stress levels",
          statsStressDesc:
            "Academic pressure and social challenges affect majority of students",
          statsAvailLabel: "availability of AI support",
          statsAvailDesc:
            "Round-the-clock access to mental health guidance and resources",

          // Footer
          footerDesc:
            "Empowering students with comprehensive mental health support through technology, community, and professional care.",
          footerPlatform: "Platform",
          footerAiChat: "AI Support Chat",
          footerBookAppointment: "Book Appointment",
          footerCounselorLogin: "Counselor Login",
          footerSupport: "Support",
          footerCrisisHelpline: "Crisis Helpline",
          footerEmergencyResources: "Emergency Resources",
          footerContactCounselor: "Contact Counselor",
          footerFaq: "FAQ",
          footerAbout: "About",
          footerOurMission: "Our Mission",
          footerPrivacy: "Privacy Policy",
          footerTerms: "Terms of Service",
          footerAccessibility: "Accessibility",
          footerCopyright:
            "2025 SoulSupport Digital Mental Health Platform. Built with care for student wellbeing.",
          footerCrisisNote:
            "If you're in crisis, please contact emergency services or call our 24/7 helpline.",
        },
      },
      hi: {
        translation: {
          // Hero
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

          // Navigation
          navFeatures: "सुविधाएं",
          navAbout: "हमारे बारे में",
          navAiChatbot: "AI चैटबॉट",
          navBookAppointment: "अपॉइंटमेंट बुक करें",
          navResources: "संसाधन",
          navDashboard: "डैशबोर्ड",
          navUserManagement: "उपयोगकर्ता प्रबंधन",
          navAnalytics: "विश्लेषण",
          navAppointments: "अपॉइंटमेंट",
          navMessages: "संदेश",
          navLogin: "लॉगिन",
          navSignUp: "साइन अप",

          // Features Section
          featuresHeading: "बेहतर मानसिक स्वास्थ्य के लिए सब कुछ",
          featuresSubheading:
            "एआई-संचालित सहायता से लेकर पेशेवर परामर्श तक, हम विशेष रूप से छात्रों के लिए डिज़ाइन किए गए व्यापक उपकरण प्रदान करते हैं।",
          featureChat: "एआई चैट सहायता",
          featureChatDesc:
            "तनाव, चिंता और अन्य समस्याओं में मदद के लिए प्रशिक्षित हमारे बुद्धिमान चैटबॉट से तुरंत, गोपनीय मानसिक स्वास्थ्य मार्गदर्शन प्राप्त करें।",
          featureAppointments: "काउंसलिंग सत्र बुक करें",
          featureAppointmentsDesc:
            "छात्र मानसिक स्वास्थ्य में विशेषज्ञ सत्यापित चिकित्सकों और परामर्शदाताओं के साथ अपॉइंटमेंट शेड्यूल करें।",
          featureResources: "स्व-सहायता संसाधन",
          featureResourcesDesc:
            "अपनी मानसिक भलाई के प्रबंधन के लिए क्यूरेटेड लेख, निर्देशित अभ्यास और साक्ष्य-आधारित तकनीकों तक पहुंचें।",
          featureAssessments: "मानसिक स्वास्थ्य मूल्यांकन",
          featureAssessmentsDesc:
            "अपने मानसिक स्वास्थ्य को बेहतर ढंग से समझने के लिए PHQ-9 और GAD-7 जैसे चिकित्सकीय रूप से मान्य प्रश्नावली लें।",
          featureCommunity: "सहकर्मी समुदाय",
          featureCommunityDesc:
            "मॉडरेटेड सहायता समूहों और साझा-अनुभव मंचों में साथी छात्रों से गुमनाम रूप से जुड़ें।",
          featureMood: "मूड और प्रगति ट्रैकिंग",
          featureMoodDesc:
            "दृश्य अंतर्दृष्टि और व्यक्तिगत सिफारिशों के साथ समय के साथ अपनी भावनात्मक भलाई की निगरानी करें।",
          learnMore: "और जानें",
          crisisTitle: "संकट सहायता 24/7 उपलब्ध",
          crisisDesc:
            "यदि आप मानसिक स्वास्थ्य आपातकाल का अनुभव कर रहे हैं, तो तत्काल सहायता उपलब्ध है।",
          crisisHelpline: "संकट हेल्पलाइन : 18008914413",
          emergencyResources: "आपातकालीन संसाधन",

          // Stats Section
          statsHeading: "वास्तविक प्रभाव बना रहे हैं",
          statsSubheading:
            "हमारा साक्ष्य-आधारित दृष्टिकोण संस्थानों में छात्रों को लचीलापन बनाने और बेहतर मानसिक स्वास्थ्य बनाए रखने में मदद कर रहा है।",
          statsStressLabel: "छात्र उच्च तनाव स्तर की रिपोर्ट करते हैं",
          statsStressDesc:
            "शैक्षणिक दबाव और सामाजिक चुनौतियां अधिकांश छात्रों को प्रभावित करती हैं",
          statsAvailLabel: "एआई सहायता की उपलब्धता",
          statsAvailDesc:
            "मानसिक स्वास्थ्य मार्गदर्शन और संसाधनों तक चौबीसों घंटे पहुंच",

          // Footer
          footerDesc:
            "प्रौद्योगिकी, समुदाय और पेशेवर देखभाल के माध्यम से छात्रों को व्यापक मानसिक स्वास्थ्य सहायता प्रदान करना।",
          footerPlatform: "प्लेटफ़ॉर्म",
          footerAiChat: "AI सहायता चैट",
          footerBookAppointment: "अपॉइंटमेंट बुक करें",
          footerCounselorLogin: "काउंसलर लॉगिन",
          footerSupport: "सहायता",
          footerCrisisHelpline: "संकट हेल्पलाइन",
          footerEmergencyResources: "आपातकालीन संसाधन",
          footerContactCounselor: "काउंसलर से संपर्क करें",
          footerFaq: "सामान्य प्रश्न",
          footerAbout: "हमारे बारे में",
          footerOurMission: "हमारा मिशन",
          footerPrivacy: "गोपनीयता नीति",
          footerTerms: "सेवा की शर्तें",
          footerAccessibility: "सुगम्यता",
          footerCopyright:
            "2025 SoulSupport डिजिटल मानसिक स्वास्थ्य प्लेटफ़ॉर्म। छात्र कल्याण के लिए बनाया गया।",
          footerCrisisNote:
            "यदि आप संकट में हैं, तो कृपया आपातकालीन सेवाओं से संपर्क करें या हमारी 24/7 हेल्पलाइन पर कॉल करें।",
        },
      },
      mr: {
        translation: {
          // Hero
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

          // Navigation
          navFeatures: "वैशिष्ट्ये",
          navAbout: "आमच्याबद्दल",
          navAiChatbot: "AI चॅटबॉट",
          navBookAppointment: "अपॉइंटमेंट बुक करा",
          navResources: "संसाधने",
          navDashboard: "डॅशबोर्ड",
          navUserManagement: "वापरकर्ता व्यवस्थापन",
          navAnalytics: "विश्लेषण",
          navAppointments: "अपॉइंटमेंट",
          navMessages: "संदेश",
          navLogin: "लॉगिन",
          navSignUp: "साइन अप",

          // Features Section
          featuresHeading: "चांगल्या मानसिक आरोग्यासाठी सर्वकाही",
          featuresSubheading:
            "एआय-संचालित सहाय्यापासून व्यावसायिक समुपदेशनापर्यंत, आम्ही विशेषतः विद्यार्थ्यांसाठी डिझाइन केलेली सर्वसमावेशक साधने प्रदान करतो.",
          featureChat: "एआय चॅट सहाय्य",
          featureChatDesc:
            "तणाव, चिंता आणि इतर समस्यांमध्ये मदत करण्यासाठी प्रशिक्षित आमच्या बुद्धिमान चॅटबॉटकडून तात्काळ, गोपनीय मानसिक आरोग्य मार्गदर्शन मिळवा.",
          featureAppointments: "समुपदेशन सत्रे बुक करा",
          featureAppointmentsDesc:
            "विद्यार्थी मानसिक आरोग्यात तज्ञ असलेल्या सत्यापित थेरपिस्ट आणि समुपदेशकांसोबत अपॉइंटमेंट शेड्यूल करा.",
          featureResources: "स्व-मदत संसाधने",
          featureResourcesDesc:
            "तुमच्या मानसिक आरोग्याच्या व्यवस्थापनासाठी क्युरेटेड लेख, मार्गदर्शित व्यायाम आणि पुराव्यावर आधारित तंत्रे वापरा.",
          featureAssessments: "मानसिक आरोग्य मूल्यांकन",
          featureAssessmentsDesc:
            "तुमचे मानसिक आरोग्य चांगल्या प्रकारे समजून घेण्यासाठी PHQ-9 आणि GAD-7 सारख्या वैद्यकीयदृष्ट्या प्रमाणित प्रश्नावली सोडवा.",
          featureCommunity: "सहकारी समुदाय",
          featureCommunityDesc:
            "मॉडरेटेड सहाय्य गटांमध्ये आणि सामायिक-अनुभव मंचांमध्ये सहकारी विद्यार्थ्यांशी अनामिकपणे जोडले जा.",
          featureMood: "मूड आणि प्रगती ट्रॅकिंग",
          featureMoodDesc:
            "दृश्य अंतर्दृष्टी आणि वैयक्तिक शिफारसींसह कालांतराने तुमच्या भावनिक आरोग्याचे निरीक्षण करा.",
          learnMore: "अधिक जाणून घ्या",
          crisisTitle: "संकट सहाय्य 24/7 उपलब्ध",
          crisisDesc:
            "तुम्हाला मानसिक आरोग्य आणीबाणीचा अनुभव येत असल्यास, तात्काळ मदत उपलब्ध आहे.",
          crisisHelpline: "संकट हेल्पलाइन : 18008914413",
          emergencyResources: "आपत्कालीन संसाधने",

          // Stats Section
          statsHeading: "खरा प्रभाव निर्माण करत आहोत",
          statsSubheading:
            "आमचा पुराव्यावर आधारित दृष्टिकोन संस्थांमधील विद्यार्थ्यांना लवचिकता निर्माण करण्यात आणि चांगले मानसिक आरोग्य राखण्यात मदत करत आहे.",
          statsStressLabel: "विद्यार्थी उच्च तणाव पातळीची नोंद करतात",
          statsStressDesc:
            "शैक्षणिक दबाव आणि सामाजिक आव्हाने बहुतांश विद्यार्थ्यांना प्रभावित करतात",
          statsAvailLabel: "एआय सहाय्याची उपलब्धता",
          statsAvailDesc:
            "मानसिक आरोग्य मार्गदर्शन आणि संसाधनांपर्यंत चोवीस तास प्रवेश",

          // Footer
          footerDesc:
            "तंत्रज्ञान, समुदाय आणि व्यावसायिक काळजीद्वारे विद्यार्थ्यांना सर्वसमावेशक मानसिक आरोग्य सहाय्य प्रदान करणे.",
          footerPlatform: "प्लॅटफॉर्म",
          footerAiChat: "AI सहाय्य चॅट",
          footerBookAppointment: "अपॉइंटमेंट बुक करा",
          footerCounselorLogin: "समुपदेशक लॉगिन",
          footerSupport: "सहाय्य",
          footerCrisisHelpline: "संकट हेल्पलाइन",
          footerEmergencyResources: "आपत्कालीन संसाधने",
          footerContactCounselor: "समुपदेशकाशी संपर्क करा",
          footerFaq: "सामान्य प्रश्न",
          footerAbout: "आमच्याबद्दल",
          footerOurMission: "आमचे ध्येय",
          footerPrivacy: "गोपनीयता धोरण",
          footerTerms: "सेवा अटी",
          footerAccessibility: "सुलभता",
          footerCopyright:
            "2025 SoulSupport डिजिटल मानसिक आरोग्य प्लॅटफॉर्म. विद्यार्थ्यांच्या कल्याणासाठी बनवलेले.",
          footerCrisisNote:
            "तुम्ही संकटात असाल तर, कृपया आपत्कालीन सेवांशी संपर्क साधा किंवा आमच्या 24/7 हेल्पलाइनवर कॉल करा.",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
