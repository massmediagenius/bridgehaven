import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Shield, ThumbsUp, CreditCard } from 'lucide-react'
import { SignupForm } from '@/components/forms/signup-form'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join HavenBridge to vote on community priorities and support children in foster care.',
}

const benefits = [
  {
    icon: ThumbsUp,
    title: 'Vote on Priorities',
    description: 'Help determine which campaigns and homes receive visibility.',
  },
  {
    icon: Heart,
    title: 'Track Your Impact',
    description: 'See exactly how your donations and votes make a difference.',
  },
  {
    icon: Shield,
    title: 'Save Causes',
    description: 'Follow homes, programs, and children you care about most.',
  },
  {
    icon: CreditCard,
    title: 'Streamlined Giving',
    description: 'Securely save payment methods for faster future donations.',
  },
]

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const { redirect } = await searchParams

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Benefits (hidden on mobile, shown on lg+) */}
          <div className="hidden lg:block lg:py-12">
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/logo.png"
                alt="HavenBridge"
                width={320}
                height={96}
                className="h-20 w-auto"
              />
            </Link>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Join our community of supporters
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create an account to vote on community priorities, track your impact, and streamline your support for children in foster care.
            </p>

            <div className="mt-10 space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="size-4" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="size-4" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:py-12">
            <div className="rounded-2xl bg-background p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-2">Get started</h2>
              <p className="text-muted-foreground mb-8">
                Already have an account?{' '}
                <Link
                  href={redirect ? `/auth/login?redirect=${encodeURIComponent(redirect)}` : '/auth/login'}
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>

              {redirect && (
                <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
                  <ThumbsUp className="size-4 shrink-0" />
                  <span>Sign up to cast your vote and support this cause.</span>
                </div>
              )}

              <SignupForm redirectTo={redirect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
