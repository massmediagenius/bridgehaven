import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Heart, Calendar } from 'lucide-react'
import { CampaignCard } from '@/components/cards/campaign-card'
import { CampaignsFilters } from '@/components/filters/campaigns-filters'
import { campaigns } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Donate - Campaigns',
  description: 'Support active campaigns funding essentials, education, therapy, enrichment, and emergency support for children in foster care.',
}

export default function CampaignsPage() {
  // Separate critical/urgent campaigns
  const urgentCampaigns = campaigns.filter(c => c.urgencyLevel === 'critical' || c.urgencyLevel === 'high')
  const otherCampaigns = campaigns.filter(c => c.urgencyLevel !== 'critical' && c.urgencyLevel !== 'high')

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-balance">
              Donate & Support
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your donation directly funds care, education, therapy, and enrichment for children in foster care. Every dollar makes a difference.
            </p>
          </div>

          {/* Trust Notice */}
          <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 max-w-3xl">
            <Shield className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Transparent & Tax-Deductible</p>
              <p className="text-sm text-muted-foreground mt-1">
                HavenBridge is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent allowed by law. We provide transparent impact tracking for every dollar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Giving Feature */}
      <section className="py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 sm:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Heart className="size-3 mr-1" />
                  Monthly Giving
                </Badge>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Become a Monthly Supporter
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Monthly donations provide consistent, reliable funding that helps us plan long-term support for children. Join our community of dedicated supporters making a lasting impact.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/auth/signup">Start Monthly Giving</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { amount: '$25/mo', impact: 'Provides school supplies for 2 children' },
                  { amount: '$50/mo', impact: 'Funds weekly therapy sessions' },
                  { amount: '$100/mo', impact: 'Supports a child\'s enrichment activities' },
                ].map((tier) => (
                  <div key={tier.amount} className="text-center p-4 rounded-xl bg-background border border-border">
                    <p className="text-xl font-bold text-primary">{tier.amount}</p>
                    <p className="text-xs text-muted-foreground mt-2">{tier.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Campaigns */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CampaignsFilters />

          {/* Urgent Campaigns */}
          {urgentCampaigns.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="size-5 text-red-500" />
                <h2 className="text-2xl font-semibold">Urgent Campaigns</h2>
                <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
                  Needs Immediate Support
                </Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {urgentCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>
          )}

          {/* All Other Campaigns */}
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="size-5 text-primary" />
              <h2 className="text-2xl font-semibold">Active Campaigns</h2>
              <span className="text-muted-foreground">({otherCampaigns.length})</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Lock, title: 'Secure Donations', description: 'Your payment information is encrypted and secure.' },
              { icon: Shield, title: 'Transparent Impact', description: 'Track exactly how your donation is used.' },
              { icon: Heart, title: 'Tax-Deductible', description: 'Receive a receipt for your tax records.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
