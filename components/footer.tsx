"use client";
import "@/lib/i18n";
import Link from "next/link"
import { Heart, Mail, Phone } from "lucide-react"
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  
  const footerLinks = {
    platform: [
      { name: t("aiChatbot"), href: "/chat" },
      { name: t("bookAppointment"), href: "/appointments" },
      { name: "Counselor Login", href: "/counselor-login" },
      { name: "Admin Login", href: "/admin-login" },
    ],
    support: [
      { name: t("crisisHelpline"), href: "/crisis" },
      { name: t("emergencyResources"), href: "/emergency" },
      { name: "Contact Counselor", href: "/contact" },
      { name: "FAQ", href: "/faq" },
    ],
    about: [
      { name: "Our Mission", href: "/about" },
      { name: t("privacyPolicy"), href: "/privacy" },
      { name: t("termsOfService"), href: "/terms" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-md p-1.5">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">{t("soulSupport")}</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              {t("soulSupportTagline")}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{t("crisisHelpline")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>supportsoulsup2025@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("about")}</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-4 text-center text-muted-foreground">
          <p>{t("copyright")}</p>
          <p className="mt-2 text-sm">
            {t("crisisSupportDescription")}
          </p>
        </div>
      </div>
    </footer>
  )
}
