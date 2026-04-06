import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  ArrowLeft, 
  MapPin, 
  BadgeCheck, 
  Calendar,
  Briefcase,
  FileText,
  PieChart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getHomeById, getProgramById } from '@/lib/data'
import type { Home, Program } from '@/lib/types'
import { DonationFlow } from '@/components/donation/donation-flow'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const home = getHomeById(id)
  const program = getProgramById(id)
  const entity = home || program
  if (!entity) return { title: 'Not Found' }
  return {
    title: entity.name,
    description: entity.mission,
  }
}

const typeLabels = {
  foster: 'Foster Home',
  transitional: 'Transitional Home',
  group: 'Group Home',
  education: 'Education Program',
  therapy: 'Therapy Program',
  enrichment: 'Enrichment Program',
  mentorship: 'Mentorship Program',
  'life-skills': 'Life Skills Program',
}

function isHome(entity: Home | Program): entity is Home {
  return 'capacity' in entity
}

export default async function HomeDetailPage({ params }: { params: Params }) {
  const { id } = await params
  const home = getHomeById(id)
  const program = getProgramById(id)
  const entity = home || program

  if (!entity) {
    notFound()
  }

  const progressPercentage = Math.round((entity.donationProgress / entity.donationGoal) * 100)

  return (
    <div className="pt-20 pb-16">
      {/* Back navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/homes-programs">
            <ArrowLeft className="size-4" />
            Back to Homes & Programs
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            {/* Header */}
            <div className="rounded-2xl bg-background p-8 shadow-sm border border-border">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {entity.isVerified && (
                      <div className="flex items-center gap-1 text-primary">
                        <BadgeCheck className="size-5" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                    <Badge variant="secondary">
                      {typeLabels[entity.type as keyof typeof typeLabels]}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold">{entity.name}</h1>
                  <div className="flex items-center gap-1 text-muted-foreground mt-2">
                    <MapPin className="size-4" />
                    <span>{entity.city}, {entity.state}</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground">{entity.mission}</p>
            </div>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{entity.description}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="size-5 text-primary" />
                  Services Provided
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {entity.services.map((service) => (
                    <div key={service} className="flex items-center gap-2 text-sm">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {service}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Needs */}
            <Card>
              <CardHeader>
                <CardTitle>Current Urgent Needs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {entity.currentNeeds.map((need) => (
                    <Badge key={need} variant="outline" className="text-sm py-1.5 px-3">
                      {need}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Funding Allocation - only for homes */}
            {isHome(entity) && entity.fundingAllocation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="size-5 text-primary" />
                    Funding Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entity.fundingAllocation.map((allocation) => (
                      <div key={allocation.category}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{allocation.category}</span>
                          <span className="font-medium">{allocation.percentage}%</span>
                        </div>
                        <Progress value={allocation.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Team - only for homes */}
            {isHome(entity) && entity.teamMembers && (
              <Card>
                <CardHeader>
                  <CardTitle>Team & Caregivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {entity.teamMembers.map((member) => (
                      <div key={member.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role} - {member.yearsExperience} years</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Licensing Info - only for homes */}
            {isHome(entity) && entity.licensingInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    Transparency & Licensing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{entity.licensingInfo}</p>
                </CardContent>
              </Card>
            )}

            {/* Recent Updates */}
            {entity.recentUpdates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="size-5 text-primary" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entity.recentUpdates.map((update) => (
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="sticky top-24">
              <Suspense>
                <DonationFlow
                  title={`Support ${entity.name}`}
                  amountRaised={entity.donationProgress}
                  goalAmount={entity.donationGoal}
                  supporterCount={entity.votes}
                  progressPercentage={progressPercentage}
                  showVoteButton
                  voteLabel="Vote for Visibility"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
