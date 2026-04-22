'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, ThumbsUp, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getTopChildren } from '@/lib/data'
import type { Child } from '@/lib/types'

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

function ChildCampaignCard({ child }: { child: Child }) {
  const progressPercentage = Math.round((child.fundsRaised / child.fundingGoal) * 100)

  return (
    <article className="shrink-0 snap-start w-[280px] sm:w-[320px] lg:w-[340px] rounded-2xl bg-background border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] w-full bg-muted">
        {child.image ? (
          <Image
            src={child.image}
            alt={`${child.firstName}'s profile`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 280px, 340px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary font-semibold text-4xl">
            {child.initials}
          </div>
        )}
        <Badge
          variant="outline"
          className={`absolute top-3 right-3 ${urgencyColors[child.urgencyLevel]} bg-background/90 backdrop-blur-sm`}
        >
          {urgencyLabels[child.urgencyLevel]}
        </Badge>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{child.firstName}</h3>
          <p className="text-sm text-muted-foreground">Age {child.ageRange} · {child.region}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{child.supportSummary}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {child.needs.slice(0, 2).map((need) => (
            <Badge key={need} variant="outline" className="text-xs">
              {need}
            </Badge>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-semibold text-primary">
                ${child.fundsRaised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-muted-foreground">
                of ${child.fundingGoal.toLocaleString()}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ThumbsUp className="size-3.5" />
              {child.votes} votes
            </span>
            <span className="flex items-center gap-1">
              <Heart className="size-3.5" />
              {progressPercentage}% funded
            </span>
          </div>

          <Button asChild size="sm" className="w-full">
            <Link href={`/children-we-support/${child.id}`}>Support {child.firstName}</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

export function FeaturedCampaigns() {
  const topChildren = React.useMemo(() => getTopChildren(8), [])
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const updateScrollState = React.useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.8, 320)
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Campaigns
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            The children our community is rallying behind right now — ranked by votes and donations.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy('left')}
          disabled={!canScrollLeft}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-background border border-border shadow-md transition-opacity hover:bg-muted disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy('right')}
          disabled={!canScrollRight}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-background border border-border shadow-md transition-opacity hover:bg-muted disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight className="size-5" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 lg:px-8 pb-4 [scrollbar-width:thin]"
        >
          {topChildren.map((child) => (
            <ChildCampaignCard key={child.id} child={child} />
          ))}
          {/* Trailing spacer so the last card can fully reach the left edge when scrolled */}
          <div aria-hidden className="shrink-0 w-2" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 text-center">
        <Button variant="outline" asChild size="lg">
          <Link href="/children-we-support">
            View All Children
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
