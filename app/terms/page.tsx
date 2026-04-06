import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | HavenBridge',
  description: 'Terms and conditions for using the HavenBridge platform.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Terms of Service
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
                Welcome to HavenBridge. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By creating an account or using any part of the HavenBridge platform, you acknowledge that you have read, understood, and agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Provide accurate and complete registration information.</li>
                <li>Maintain the security of your account credentials.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
                <li>Accept responsibility for all activity that occurs under your account.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Donations</h2>
              <p className="text-muted-foreground leading-relaxed">
                All donations made through HavenBridge are voluntary and non-refundable unless otherwise required by law. Donations are directed to the campaigns and programs you select. We provide receipts for all donations for your tax records. HavenBridge reserves the right to reallocate funds if a campaign reaches its goal or is discontinued.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Voting</h2>
              <p className="text-muted-foreground leading-relaxed">
                Community voting is provided to give members a voice in supporting children and programs. Votes inform visibility and community priorities only. Votes do not determine child placements or welfare decisions, which are made solely by licensed child welfare professionals.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Community Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When using HavenBridge, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Attempt to identify, contact, or locate any child featured on the platform.</li>
                <li>Share or redistribute any child information from the platform.</li>
                <li>Use the platform for any unlawful or harmful purpose.</li>
                <li>Harass, threaten, or intimidate other users or staff.</li>
                <li>Submit false or misleading information.</li>
                <li>Attempt to manipulate voting or donation systems.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Violation of these guidelines may result in immediate account suspension or termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on the HavenBridge platform, including text, graphics, logos, and software, is the property of HavenBridge or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                HavenBridge is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted by law, HavenBridge disclaims all warranties and shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you have donated through the platform in the preceding twelve months.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these Terms of Service, please{' '}
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
