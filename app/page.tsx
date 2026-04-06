import { Hero } from '@/components/sections/hero'
import { ImpactStats } from '@/components/sections/impact-stats'
import { HowOneActionHelps } from '@/components/sections/how-one-action-helps'
import { FeaturedCampaigns } from '@/components/sections/featured-campaigns'
import { FeaturedHomes } from '@/components/sections/featured-homes'
import { ChildrenShowcase } from '@/components/sections/children-showcase'
import { TestimonialSection } from '@/components/sections/testimonial-section'
import { TrustSafety } from '@/components/sections/trust-safety'
import { FinalCTA } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <HowOneActionHelps />
      <FeaturedCampaigns />
      <FeaturedHomes />
      <ChildrenShowcase />
      <TestimonialSection />
      <TrustSafety />
      <FinalCTA />
    </>
  )
}
