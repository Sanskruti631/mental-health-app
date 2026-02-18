"use client";
import "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            {t("heroTitle")}
          </h1>

          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
            {t("heroDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild>
              <Link href="/chat" className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>{t("startChat")}</span>
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/appointments">{t("bookCounseling")}</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center border-border/50 bg-card/50 backdrop-blur">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("aiSupport")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("aiSupportDesc")}
              </p>
            </Card>

            <Card className="p-6 text-center border-border/50 bg-card/50 backdrop-blur">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("confidential")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("confidentialDesc")}
              </p>
            </Card>

            <Card className="p-6 text-center border-border/50 bg-card/50 backdrop-blur">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t("alwaysAvailable")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("alwaysAvailableDesc")}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
