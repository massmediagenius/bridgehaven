import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | HavenBridge',
  description: 'How HavenBridge uses cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Cookie Policy
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
                This Cookie Policy explains how HavenBridge uses cookies and similar technologies to recognize you when you visit our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give site owners useful information about how their site is being used.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                HavenBridge uses cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Keep you signed in to your account.</li>
                <li>Remember your preferences and settings.</li>
                <li>Understand how you use our platform so we can improve it.</li>
                <li>Ensure the security of your account and our platform.</li>
                <li>Process donations securely.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Types of Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the following categories of cookies:
              </p>
              <div className="space-y-4">
                <div className="rounded-xl bg-muted/30 border border-border p-5">
                  <h3 className="font-semibold mb-1">Essential Cookies</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Required for the platform to function. These enable core features like authentication, security, and accessibility. They cannot be disabled.
                  </p>
                </div>
                <div className="rounded-xl bg-muted/30 border border-border p-5">
                  <h3 className="font-semibold mb-1">Functional Cookies</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Remember your preferences such as language, region, and display settings to provide a personalized experience.
                  </p>
                </div>
                <div className="rounded-xl bg-muted/30 border border-border p-5">
                  <h3 className="font-semibold mb-1">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Help us understand how visitors interact with our platform by collecting anonymous usage data. This helps us improve features and performance.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>View what cookies are stored and delete them individually.</li>
                <li>Block third-party cookies.</li>
                <li>Block cookies from specific sites.</li>
                <li>Block all cookies from being set.</li>
                <li>Delete all cookies when you close your browser.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Please note that blocking essential cookies may prevent you from using certain features of the platform, including signing in and making donations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies, please{' '}
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
