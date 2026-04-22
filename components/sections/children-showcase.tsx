'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChildProfileCard } from '@/components/cards/child-profile-card'
import { Typewriter } from '@/components/shared/typewriter'
import { getFeaturedChildren } from '@/lib/data'

export function ChildrenShowcase() {
  const children = React.useMemo(() => getFeaturedChildren(6), [])
  const [index, setIndex] = React.useState(0)

  const count = children.length
  const goPrev = () => setIndex((i) => (i - 1 + count) % count)
  const goNext = () => setIndex((i) => (i + 1) % count)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  if (count === 0) return null

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Children We Support
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto min-h-[3.5rem]">
            <Typewriter text="Privacy-safe profiles of children who need your support. Every vote and donation makes a difference." speed={20} startDelay={200} />
          </p>
        </div>

        {/* Privacy Notice — compact single-line infinite ticker */}
        <div className="relative flex items-center gap-3 h-9 px-3 rounded-full bg-primary/5 border border-primary/10 mb-10 max-w-2xl mx-auto overflow-hidden">
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
                'Privacy-safe profiles',
                'First names or initials only',
                'No identifying information shared',
                'No placement details public',
                'Licensed caseworkers only',
                'Trauma-informed care',
              ].concat([
                'Privacy-safe profiles',
                'First names or initials only',
                'No identifying information shared',
                'No placement details public',
                'Licensed caseworkers only',
                'Trauma-informed care',
              ]).map((item, i) => (
                <span key={i} className="flex items-center gap-6">
                  <span>{item}</span>
                  <span className="size-1 rounded-full bg-primary/50" aria-hidden />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Single-card carousel with arrows */}
        <div className="relative mx-auto max-w-md sm:max-w-lg">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous child"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-10 flex size-10 sm:size-12 items-center justify-center rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {children.map((child) => (
                <div key={child.id} className="w-full shrink-0 px-1">
                  <ChildProfileCard child={child} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next child"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-10 flex size-10 sm:size-12 items-center justify-center rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {children.map((child, i) => (
            <button
              key={child.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View ${child.firstName}`}
              aria-current={i === index ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {index + 1} of {count}
        </p>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild size="lg">
            <Link href="/children-we-support">
              View All Children
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
