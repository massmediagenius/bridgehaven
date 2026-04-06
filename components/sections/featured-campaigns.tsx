import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CampaignCard } from '@/components/cards/campaign-card'
import { getFeaturedCampaigns } from '@/lib/data'

export function FeaturedCampaigns() {
  const campaigns = getFeaturedCampaigns(3)

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Campaigns
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Direct your support where it matters most. Every donation creates immediate impact.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild size="lg">
            <Link href="/campaigns">
              View All Campaigns
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
