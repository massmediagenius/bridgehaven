import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getChildById } from '@/lib/data'
import { DonationFlow } from '@/components/donation/donation-flow'
import { ChildInfoTabs } from '@/components/children/child-info-tabs'
import { ChildStoryCarousel } from '@/components/children/child-story-carousel'

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
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
          {/* Profile Header — always on top on mobile, top-left on desktop */}
          <div className="order-1 lg:col-span-2 lg:col-start-1 lg:row-start-1">
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

              {/* Privacy Notice — compact single-line infinite ticker */}
              <div className="relative flex items-center gap-3 h-9 px-3 rounded-full bg-primary/5 border border-primary/10 mb-6 overflow-hidden">
                <Shield className="size-4 text-primary shrink-0 z-10" />
                <div
                  className="relative flex-1 overflow-hidden"
                  style={{
                    maskImage:
                      'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                  }}
                >
                  <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap text-xs text-muted-foreground">
                    {[
                      'Privacy-safe profile',
                      'Licensed caseworkers only',
                      'No identifying information shared',
                      'Trauma-informed care',
                      'Placements handled by professionals',
                      'Verified partner homes',
                    ].concat([
                      'Privacy-safe profile',
                      'Licensed caseworkers only',
                      'No identifying information shared',
                      'Trauma-informed care',
                      'Placements handled by professionals',
                      'Verified partner homes',
                    ]).map((item, i) => (
                      <span key={i} className="flex items-center gap-6">
                        <span>{item}</span>
                        <span className="size-1 rounded-full bg-primary/50" aria-hidden />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">{child.supportSummary}</p>
            </div>
          </div>

          {/* Rest of main content — story carousel + segmented tab switcher */}
          <div className="order-3 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-2 space-y-8">
            {child.story && child.story.length > 0 && (
              <ChildStoryCarousel firstName={child.firstName} story={child.story} />
            )}
            <ChildInfoTabs
              needs={child.needs}
              goals={child.goals}
              talents={child.talents}
              recentUpdates={child.recentUpdates}
            />
          </div>

          {/* Sidebar — directly under profile on mobile, sticky right column on desktop */}
          <div className="order-2 space-y-6 lg:order-none lg:col-start-3 lg:row-start-1 lg:row-span-2">
            <div className="lg:sticky lg:top-24">
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
