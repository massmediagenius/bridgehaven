import type { Metadata } from 'next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'FAQ | HavenBridge',
  description: 'Frequently asked questions about HavenBridge.',
}

const faqs = [
  {
    question: 'What is HavenBridge?',
    answer: 'HavenBridge is a platform that connects compassionate community members with vulnerable children in foster care and alternative homes. We enable voting on priorities and direct financial support through donation campaigns.',
  },
  {
    question: 'Is child information kept private?',
    answer: 'Yes, child privacy is our top priority. We show only first names or initials, age ranges, and regions — never identifying details, photos, or placement information.',
  },
  {
    question: 'How are placement decisions made?',
    answer: 'Licensed child welfare professionals make all placement decisions based on each child\'s best interests. Community votes inform visibility only and never determine placements.',
  },
  {
    question: 'How can I vote?',
    answer: 'Create a free account, browse "Children We Support" or "Homes & Programs," and cast your vote on profiles you want to support. Your votes are tracked in your dashboard.',
  },
  {
    question: 'How do donations work?',
    answer: 'Donations fund active campaigns for education, therapy, essentials, and enrichment. When you donate, your contribution is securely processed and you receive a receipt for your tax records.',
  },
  {
    question: 'Is there a cost to use HavenBridge?',
    answer: 'Voting is completely free. Donations are optional and go directly to support children and programs. There are no membership fees or hidden costs.',
  },
  {
    question: 'Can I see where my donations go?',
    answer: 'Yes. Your dashboard shows all donations, which campaigns they supported, and impact updates. We believe in full transparency and accountability.',
  },
  {
    question: 'How is my personal information used?',
    answer: 'We never sell or share your personal information. We only use it to process donations, send impact updates, and improve our platform. You can update preferences anytime.',
  },
  {
    question: 'What if I have concerns about a child?',
    answer: 'Contact us immediately at support@havenbridge.org or call 1-800-HAVEN-BR. All reports are taken seriously and handled with utmost care.',
  },
  {
    question: 'Can I delete my account?',
    answer: 'Yes, you can delete your account at any time from your dashboard settings. Your voting and donation history will be archived, and personal information will be removed from our systems.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions about HavenBridge.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-background border border-border overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
