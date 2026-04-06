import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  ArrowLeft, 
  Clock, 
  Shield, 
  Lock,
  Calendar,
  Heart,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCampaignById, getHomeById, getProgramById } from '@/lib/data'
import { DonationFlow } from '@/components/donation/donation-flow'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const campaign = getCampaignById(id)
  if (!campaign) return { title: 'Campaign Not Found' }
  return {
    title: campaign.title,
    description: campaign.description,
  }
}

const urgencyColors = {
  low: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  medium: 'bg-amber-500/10 text-amber-600 border-amber-200',
  high: 'bg-orange-500/10 text-orange-600 border-orange-200',
  critical: 'bg-red-500/10 text-red-600 border-red-200',
}

const urgencyLabels = {
  low: 'Ongoing',
  medium: 'Moderate Need',
  high: 'High Priority',
  critical: 'Urgent',
}

const categoryLabels = {
  essentials: 'Essentials',
  education: 'Education',
  therapy: 'Therapy',
  enrichment: 'Enrichment',
  emergency: 'Emergency',
  'home-upgrades': 'Home Upgrades',
}

export default async function CampaignDetailPage({ params }: { params: Params }) {
  const { id } = await params
  const campaign = getCampaignById(id)

  if (!campaign) {
    notFound()
  }

  const progressPercentage = Math.round((campaign.amountRaised / campaign.goalAmount) * 100)
  const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  // Get beneficiary details if applicable
  let beneficiary = null
  if (campaign.beneficiaryId) {
    beneficiary = getHomeById(campaign.beneficiaryId) || getProgramById(campaign.beneficiaryId)
  }

  return (
    <div className="pt-20 pb-16">
      {/* Back navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/campaigns">
            <ArrowLeft className="size-4" />
            Back to Campaigns
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            {/* Header */}
            <div className="rounded-2xl bg-background p-8 shadow-sm border border-border">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className={urgencyColors[campaign.urgencyLevel]}>
                  {urgencyLabels[campaign.urgencyLevel]}
                </Badge>
                <Badge variant="secondary">
                  {categoryLabels[campaign.category]}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-lg text-muted-foreground">{campaign.description}</p>

              {/* Beneficiary info */}
              {beneficiary && (
                <Link 
                  href={`/homes-programs/${beneficiary.id}`}
                  className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Benefiting</p>
                    <p className="font-medium">{beneficiary.name}</p>
                  </div>
                </Link>
              )}
            </div>

            {/* Impact Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-primary" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{campaign.impactDescription}</p>
                
                {/* Impact examples */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { amount: '$25', impact: 'Basic supplies' },
                    { amount: '$50', impact: 'Educational materials' },
                    { amount: '$100', impact: 'Therapy session' },
                  ].map((example) => (
                    <div key={example.amount} className="text-center p-4 rounded-xl border border-border">
                      <p className="text-xl font-bold text-primary">{example.amount}</p>
                      <p className="text-sm text-muted-foreground mt-1">{example.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            {campaign.recentUpdates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="size-5 text-primary" />
                    Campaign Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaign.recentUpdates.map((update) => (
                      <div key={update.id} className="border-l-2 border-primary/30 pl-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <span>{new Date(update.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <h4 className="font-medium">{update.title}</h4>
                        <p className="text-sm text-muted-foreground">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-5 text-primary" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Lock, title: 'Secure Donations', description: 'Your payment info is encrypted' },
                    { icon: Shield, title: 'Verified Campaign', description: 'Reviewed by HavenBridge team' },
                    { icon: CheckCircle, title: 'Tax-Deductible', description: 'Receive a receipt for taxes' },
                    { icon: Heart, title: 'Transparent Use', description: 'Track how funds are used' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Donation Card */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="sticky top-24">
              <Suspense>
                <DonationFlow
                  title={`Support: ${campaign.title}`}
                  amountRaised={campaign.amountRaised}
                  goalAmount={campaign.goalAmount}
                  supporterCount={campaign.supporterCount}
                  progressPercentage={progressPercentage}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
