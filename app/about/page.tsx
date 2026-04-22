import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OurValuesAccordion } from '@/components/sections/our-values-accordion'

export const metadata: Metadata = {
  title: 'About Us | HavenBridge',
  description: 'Learn about HavenBridge\'s mission to support vulnerable children and youth in foster care.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              About HavenBridge
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Building bridges between compassionate communities and vulnerable children who deserve a better tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                HavenBridge connects communities with vulnerable children and youth in foster care and alternative homes. We believe every child deserves a safe place to grow and the support of compassionate people who believe in their potential.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                By giving community members a voice in placement decisions and enabling direct support through donations, we create a network of care that transforms lives.
              </p>
              <Button asChild className="mt-8">
                <Link href="/how-it-works">
                  How It Works
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-10 flex items-center justify-center min-h-[200px]">
              <p className="text-primary font-semibold text-center text-lg leading-relaxed">
                &ldquo;Our community-driven approach ensures every voice matters when it comes to supporting children.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="trust-safety" className="py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Everything we do is guided by these principles.
            </p>
          </div>
          <OurValuesAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-20 overflow-hidden bg-primary">
        {/* Background image */}
        <Image
          src="/our-community.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Brand-tinted + dark overlays for text contrast */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-slate-900/75"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            Join Our Community
          </h2>
          <p className="mt-4 text-white/90 max-w-xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            Be part of something meaningful. Support children and homes that need your voice and compassion.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-white/90">
            <Link href="/children-we-support">
              Get Involved
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
