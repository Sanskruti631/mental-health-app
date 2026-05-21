"use client";

import "@/lib/i18n";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Heart,
  MessageCircle,
  Calendar,
  Users,
  BarChart3,
  Stethoscope,
  BookOpen,
  Brain,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switche";
import { useTranslation } from "react-i18next";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const getNavItems = () => {
    if (!user) {
      return [
        { name: t("aiChatbot"), href: "/chat", icon: MessageCircle },
        { name: t("bookAppointment"), href: "/appointments", icon: Calendar },
      ];
    }

    switch (user.role) {
      case "student":
        return [
          { name: t("aiChatbot"), href: "/chat", icon: MessageCircle },
          { name: t("bookAppointment"), href: "/appointments", icon: Calendar },
        ];

      case "admin":
        return [
          { name: t("dashboard"), href: "/dashboard", icon: BarChart3 },
          {
            name: t("userManagement"),
            href: "/dashboard/admin/users",
            icon: Users,
          },
        ];

      case "therapist":
        return [
          {
            name: t("dashboard"),
            href: "/dashboard/counsellor",
            icon: Stethoscope,
          },
          {
            name: t("appointments"),
            href: "/therapist/appointments",
            icon: Calendar,
          },
          {
            name: t("messages"),
            href: "/therapist/messages",
            icon: MessageCircle,
          },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              SoulSupport
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">{t("login")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">{t("signUp")}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <div className="px-3 py-2">
                    <UserMenu />
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="/login">{t("login")}</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/register">{t("signUp")}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
