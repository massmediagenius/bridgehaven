import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

const footerLinks = {
  support: [
    { label: 'Children We Support', href: '/children-we-support' },
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
        <div className="py-6 sm:py-10">
          {/* Brand + contact row — side-by-side across all breakpoints */}
          <div className="flex flex-row items-start justify-between gap-4 sm:gap-6 pb-5 sm:pb-8 border-b border-border">
            <div className="max-w-xs">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="HavenBridge"
                  width={280}
                  height={84}
                  className="h-10 sm:h-16 w-auto"
                />
              </Link>
              <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-muted-foreground leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                Bridging children in foster care to safe, healthy homes and developmental resources.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[10px] sm:text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3 sm:size-3.5" />
                Nationwide
              </span>
            </div>
          </div>

          {/* Link columns — side-by-side on all breakpoints */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 pt-5 sm:pt-8">
            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">Support</h3>
              <ul className="space-y-1 sm:space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[11px] sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">About</h3>
              <ul className="space-y-1 sm:space-y-2">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[11px] sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">Account</h3>
              <ul className="space-y-1 sm:space-y-2">
                {footerLinks.account.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[11px] sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar — always horizontal */}
        <div className="py-4 sm:py-6 border-t border-border flex flex-row items-center justify-between gap-3 flex-wrap">
          <p className="text-[11px] sm:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HavenBridge. All rights reserved.
          </p>
          <div className="flex flex-row flex-wrap items-center gap-x-3 sm:gap-x-6 gap-y-1">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Nonprofit Disclaimer */}
        <div className="pb-4 sm:pb-6">
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center leading-snug">
            HavenBridge is a registered 501(c)(3) nonprofit organization. Donations are tax-deductible to the extent allowed by law. All placement decisions are made by licensed child welfare professionals.
          </p>
        </div>
      </div>
    </footer>
  )
}
