import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Users, Heart, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'How It Works | HavenBridge',
  description: 'Learn how HavenBridge connects community support with vulnerable children and youth.',
}

const steps = [
  {
    number: '01',
    icon: Users,
    title: 'Discover Children & Programs',
    description: 'Browse privacy-safe profiles of children in foster care and licensed homes, learning about their support needs.',
  },
  {
    number: '02',
    icon: Heart,
    title: 'Make Your Voice Heard',
    description: 'Vote for children and homes you want to support. Votes help prioritize which campaigns and programs get community attention.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Support Through Donations',
    description: 'Contribute financially to active campaigns that fund education, therapy, essentials, and enrichment programs.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Track Your Impact',
    description: 'View your voting history and donation records in your dashboard. See the tangible difference your contributions make.',
  },
]

const faqs = [
  {
    question: 'Is my personal data private?',
    answer: 'Yes. We protect all personal information with strict privacy measures. Child profiles show only first names, age ranges, and regions — never identifying details.',
  },
  {
    question: 'How are placements decided?',
    answer: 'Licensed child welfare professionals make all placement decisions. Community votes inform visibility only and never determine placements.',
  },
  {
    question: 'Are donations tax-deductible?',
    answer: 'Yes. HavenBridge is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent allowed by law.',
  },
  {
    question: 'Do I need an account to donate?',
    answer: 'You can donate without an account. Creating an account lets you vote, track donations, and save causes you care about.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              How HavenBridge Works
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We connect your compassion with real children and homes that need support, making your voice count every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Four Simple Steps</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-5 p-6 rounded-2xl bg-background border border-border shadow-sm">
                <div className="shrink-0 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="size-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60 tracking-widest uppercase">Step {step.number}</span>
                  <h3 className="text-lg font-semibold mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/children-we-support">
                Get Started
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-10 bg-primary/5 border-y border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Shield className="size-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Community votes affect visibility only — never placement decisions.</span>{' '}
              All placement decisions are made exclusively by licensed child welfare professionals based on each child&apos;s best interests.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Common Questions</h2>
          </div>
          <div className="rounded-2xl bg-background border border-border overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
