import { Hero } from '@/components/sections/hero'
import { ImpactStats } from '@/components/sections/impact-stats'
import { HowOneActionHelps } from '@/components/sections/how-one-action-helps'
import { ChildrenShowcase } from '@/components/sections/children-showcase'
import { TestimonialSection } from '@/components/sections/testimonial-section'
import { TrustSafety } from '@/components/sections/trust-safety'
import { FinalCTA } from '@/components/sections/final-cta'
import { ScrollReveal } from '@/components/shared/scroll-reveal'

export default function HomePage() {
  return (
    <>
      <ScrollReveal immediate>
        <Hero />
      </ScrollReveal>
      <ScrollReveal>
        <ImpactStats />
      </ScrollReveal>
      <ScrollReveal>
        <ChildrenShowcase />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialSection />
      </ScrollReveal>
      <ScrollReveal>
        <TrustSafety />
      </ScrollReveal>
      <ScrollReveal>
        <HowOneActionHelps />
      </ScrollReveal>
      <ScrollReveal>
        <FinalCTA />
      </ScrollReveal>
    </>
  )
}
