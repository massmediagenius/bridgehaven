import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Users, HeartHandshake, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us | HavenBridge',
  description: 'Learn about HavenBridge\'s mission to support vulnerable children and youth in foster care.',
}

const values = [
  {
    icon: Shield,
    title: 'Child Safety First',
    description: 'Every decision prioritizes the safety, privacy, and well-being of the children we serve. No exceptions.',
  },
  {
    icon: Users,
    title: 'Community Power',
    description: 'We believe in the collective wisdom and compassion of communities supporting vulnerable children.',
  },
  {
    icon: BarChart3,
    title: 'Transparency & Accountability',
    description: 'We operate with full transparency and are accountable to the children, families, and communities we serve.',
  },
  {
    icon: HeartHandshake,
    title: 'Trauma-Informed Care',
    description: 'All partner homes and programs are trained in trauma-informed approaches for sensitive, appropriate care.',
  },
]

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Everything we do is guided by these principles.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-background p-6 border border-border shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <value.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Impact</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { value: '1,200+', label: 'Children Supported' },
              { value: '340+', label: 'Partner Homes' },
              { value: '$2.4M', label: 'Funds Raised' },
              { value: '18,000+', label: 'Community Votes' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-muted/30 border border-border">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground text-balance">Join Our Community</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
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
