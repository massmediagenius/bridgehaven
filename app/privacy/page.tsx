import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | HavenBridge',
  description: 'How HavenBridge collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: April 4, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div>
              <p className="text-muted-foreground leading-relaxed">
                HavenBridge is committed to protecting your privacy and the privacy of the children we serve. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We may collect the following types of information when you use HavenBridge:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Account information such as your name, email address, and password when you register.</li>
                <li>Donation and payment information processed securely through our payment providers.</li>
                <li>Voting activity and preferences within the platform.</li>
                <li>Usage data including pages visited, features used, and interaction patterns.</li>
                <li>Device and browser information collected automatically through cookies and similar technologies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">How We Use Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Provide, maintain, and improve the HavenBridge platform.</li>
                <li>Process donations and send tax receipts.</li>
                <li>Track and display voting results and community impact.</li>
                <li>Send you updates about campaigns and children you support.</li>
                <li>Ensure the security and integrity of our platform.</li>
                <li>Comply with legal obligations and prevent fraud.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We never sell or share your personal information with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Children&apos;s Privacy Protection</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Protecting the privacy of the children we serve is our highest priority. We take the following measures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Only first names or initials, age ranges, and general regions are displayed publicly.</li>
                <li>No identifying photographs, addresses, or placement details are ever shared.</li>
                <li>All child data is handled in compliance with applicable child welfare and data protection laws.</li>
                <li>Access to detailed child information is strictly limited to authorized child welfare professionals.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including encryption in transit and at rest, secure payment processing, regular security audits, and access controls. While no system is completely secure, we are committed to protecting your data to the best of our ability.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your account and personal data.</li>
                <li>Opt out of non-essential communications at any time.</li>
                <li>Export your data in a portable format.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, please{' '}
                <Link href="/contact" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  contact us
                </Link>{' '}
                or email us at support@havenbridge.org.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
