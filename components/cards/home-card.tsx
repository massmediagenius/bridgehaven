import Link from 'next/link'
import { MapPin, Users, ThumbsUp, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { Home, Program } from '@/lib/types'

interface HomeCardProps {
  home: Home | Program
  type: 'home' | 'program'
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

export function HomeCard({ home, type }: HomeCardProps) {
  const progressPercentage = Math.round((home.donationProgress / home.donationGoal) * 100)
  const basePath = type === 'home' ? '/homes-programs' : '/homes-programs'

  return (
    <div className="group rounded-2xl bg-background p-6 shadow-sm border border-border transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          {home.isVerified && (
            <div className="flex items-center gap-1 text-primary">
              <BadgeCheck className="size-5" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
        </div>
        <Badge variant="secondary">
          {typeLabels[home.type as keyof typeof typeLabels]}
        </Badge>
      </div>

      <h3 className="text-xl font-semibold mb-2">{home.name}</h3>
      
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
        <MapPin className="size-4" />
        <span>{home.city}, {home.state}</span>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{home.mission}</p>

      {/* Current Needs */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Current Needs</p>
        <div className="flex flex-wrap gap-1.5">
          {home.currentNeeds.slice(0, 3).map((need) => (
            <Badge key={need} variant="outline" className="text-xs">
              {need}
            </Badge>
          ))}
          {home.currentNeeds.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{home.currentNeeds.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-medium">{home.childrenSupported}</span>
            <span className="text-muted-foreground"> children</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThumbsUp className="size-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-medium">{home.votes}</span>
            <span className="text-muted-foreground"> votes</span>
          </span>
        </div>
      </div>

      {/* Donation Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-primary">${home.donationProgress.toLocaleString()}</span>
          <span className="text-muted-foreground">of ${home.donationGoal.toLocaleString()}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Button asChild className="w-full">
        <Link href={`${basePath}/${home.id}`}>View Details</Link>
      </Button>
    </div>
  )
}
