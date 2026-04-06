import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  MapPin,
  Shield,
  Sparkles,
  Target,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getChildById, programs, campaigns } from '@/lib/data'
import { DonationFlow } from '@/components/donation/donation-flow'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const child = getChildById(id)
  if (!child) return { title: 'Child Not Found' }
  return {
    title: `Support ${child.firstName}`,
    description: `Support ${child.firstName}'s needs: ${child.needs.join(', ')}`,
  }
}

const urgencyColors = {
  low: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  medium: 'bg-amber-500/10 text-amber-600 border-amber-200',
  high: 'bg-orange-500/10 text-orange-600 border-orange-200',
  critical: 'bg-red-500/10 text-red-600 border-red-200',
}

const urgencyLabels = {
  low: 'Stable',
  medium: 'Needs Support',
  high: 'High Priority',
  critical: 'Urgent Need',
}

export default async function ChildProfilePage({ params }: { params: Params }) {
  const { id } = await params
  const child = getChildById(id)

  if (!child) {
    notFound()
  }

  const progressPercentage = Math.round((child.fundsRaised / child.fundingGoal) * 100)
  const relatedPrograms = programs.filter(p => child.relatedPrograms.includes(p.id))
  const activeCampaigns = campaigns.filter(c => child.activeCampaigns.includes(c.id))

  return (
    <div className="pt-20 pb-16">
      {/* Back navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/children-we-support">
            <ArrowLeft className="size-4" />
            Back to Children We Support
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            {/* Profile Header */}
            <div className="rounded-2xl bg-background p-8 shadow-sm border border-border">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {child.image ? (
                    <div className="relative size-20 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={child.image}
                        alt={`${child.firstName}'s profile`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ) : (
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-2xl">
                      {child.initials}
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold">{child.firstName}</h1>
                    <p className="text-muted-foreground">Age {child.ageRange}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="size-4" />
                      <span>{child.region}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={urgencyColors[child.urgencyLevel]}>
                  {urgencyLabels[child.urgencyLevel]}
                </Badge>
              </div>

              {/* Privacy Notice */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                <Shield className="size-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This is a privacy-safe profile. Placement decisions are made only by licensed caseworkers and child welfare professionals.
                </p>
              </div>

              <p className="text-muted-foreground">{child.supportSummary}</p>
            </div>

            {/* Support Needs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-primary" />
                  Current Support Needs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {child.needs.map((need) => (
                    <Badge key={need} variant="secondary" className="text-sm py-1.5 px-3">
                      {need}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goals & Talents */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="size-5 text-primary" />
                    Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {child.goals.map((goal) => (
                      <li key={goal} className="flex items-start gap-2 text-sm">
                        <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-5 text-primary" />
                    Talents & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {child.talents.map((talent) => (
                      <li key={talent} className="flex items-start gap-2 text-sm">
                        <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {talent}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recent Updates */}
            {child.recentUpdates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="size-5 text-primary" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {child.recentUpdates.map((update) => (
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

            {/* Related Programs */}
            {relatedPrograms.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPrograms.map((program) => (
                      <Link 
                        key={program.id} 
                        href={`/homes-programs/${program.id}`}
                        className="block p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                      >
                        <h4 className="font-medium">{program.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{program.mission}</p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Campaigns */}
            {activeCampaigns.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Active Campaigns Benefiting {child.firstName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                      <Link 
                        key={campaign.id} 
                        href={`/campaigns/${campaign.id}`}
                        className="block p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                      >
                        <h4 className="font-medium">{campaign.title}</h4>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-primary font-medium">${campaign.amountRaised.toLocaleString()}</span>
                            <span className="text-muted-foreground">of ${campaign.goalAmount.toLocaleString()}</span>
                          </div>
                          <Progress value={Math.round((campaign.amountRaised / campaign.goalAmount) * 100)} className="h-1.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="sticky top-24">
              <Suspense>
                <DonationFlow
                  title={`Support ${child.firstName}'s Needs`}
                  amountRaised={child.fundsRaised}
                  goalAmount={child.fundingGoal}
                  supporterCount={child.votes}
                  progressPercentage={progressPercentage}
                  showVoteButton
                  voteLabel="Vote for Priority"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
