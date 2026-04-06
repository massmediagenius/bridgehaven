import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  support: [
    { label: 'Children We Support', href: '/children-we-support' },
    { label: 'Homes & Programs', href: '/homes-programs' },
    { label: 'Donate', href: '/campaigns' },
    { label: 'How It Works', href: '/how-it-works' },
  ],
  about: [
    { label: 'Our Mission', href: '/about' },
    { label: 'Trust & Safety', href: '/about#trust-safety' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  account: [
    { label: 'Sign In', href: '/auth/login' },
    { label: 'Create Account', href: '/auth/signup' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10">
          {/* Brand row — compact on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-8 border-b border-border">
            <div className="max-w-xs">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="HavenBridge"
                  width={280}
                  height={84}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Bridging children in foster care to safe, healthy homes and developmental resources.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <a href="mailto:support@havenbridge.org" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail className="size-3.5" />
                support@havenbridge.org
              </a>
              <a href="tel:1-800-HAVEN-BR" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Phone className="size-3.5" />
                1-800-HAVEN-BR
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                Nationwide
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-3 sm:gap-4 lg:gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">About</h3>
              <ul className="space-y-2">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Account</h3>
              <ul className="space-y-2">
                {footerLinks.account.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HavenBridge. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Nonprofit Disclaimer */}
        <div className="pb-6">
          <p className="text-xs text-muted-foreground text-center">
            HavenBridge is a registered 501(c)(3) nonprofit organization. Donations are tax-deductible to the extent allowed by law. All placement decisions are made by licensed child welfare professionals.
          </p>
        </div>
      </div>
    </footer>
  )
}
