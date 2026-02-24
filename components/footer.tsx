import Link from "next/link"
import { Heart, Mail, Phone } from "lucide-react"

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "AI Support Chat", href: "/chat" },
      { name: "Book Appointment", href: "/appointments" },
     { name: "Counselor Login", href: "/counselor-login" }

      
    ],
    support: [
      { name: "Crisis Helpline", href: "/crisis" },
      { name: "Emergency Resources", href: "/emergency" },
      { name: "Contact Counselor", href: "/contact" },
      { name: "FAQ", href: "/faq" },
    ],
    about: [
      { name: "Our Mission", href: "/about" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
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
              <span className="text-lg font-semibold">SoulSupport</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Empowering students with comprehensive mental health support through technology, community, and
              professional care.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Crisis Helpline : 18008914413</span>
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
            <h3 className="font-semibold mb-4">Support</h3>
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
            <h3 className="font-semibold mb-4">About</h3>
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
          <p>© 2026 SoulSupport Digital Mental Health Platform. Built with care for student wellbeing.</p>
          <p className="mt-2 text-sm">
            If you're in crisis, please contact emergency services or call our 24/7 helpline.
          </p>
        </div>
      </div>
    </footer>
  )
}
