import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ThumbsUp, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { Child } from '@/lib/types'
import { childSlug } from '@/lib/data'

interface ChildProfileCardProps {
  child: Child
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

export function ChildProfileCard({ child }: ChildProfileCardProps) {
  const progressPercentage = Math.round((child.fundsRaised / child.fundingGoal) * 100)

  return (
    <div className="group rounded-2xl bg-background p-6 shadow-sm border border-border transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Child photo */}
      {child.image && (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
          <Image
            src={child.image}
            alt={`${child.firstName}'s profile`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          {!child.image && (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-base">
              {child.initials}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{child.firstName}</h3>
            <p className="text-sm text-muted-foreground">Age {child.ageRange}</p>
          </div>
        </div>
        <Badge variant="outline" className={`shrink-0 ${urgencyColors[child.urgencyLevel]}`}>
          {urgencyLabels[child.urgencyLevel]}
        </Badge>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
        <MapPin className="size-4" />
        <span>{child.region}</span>
      </div>

      {/* Support Summary */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{child.supportSummary}</p>

      {/* Top Needs */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Top Needs</p>
        <div className="flex flex-wrap gap-1.5">
          {child.needs.slice(0, 3).map((need) => (
            <Badge key={need} variant="outline" className="text-xs">
              {need}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <ThumbsUp className="size-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-medium">{child.votes}</span>
            <span className="text-muted-foreground"> votes</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="size-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-medium">${child.fundsRaised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-muted-foreground"> raised</span>
          </span>
        </div>
      </div>

      {/* Funding Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">{progressPercentage}% of ${child.fundingGoal.toLocaleString()} goal</span>
        </div>
        <Progress value={progressPercentage} className="h-1.5" />
      </div>

      <Button asChild className="w-full">
        <Link href={`/children-we-support/${childSlug(child)}`}>Support This Child&apos;s Needs</Link>
      </Button>
    </div>
  )
}
