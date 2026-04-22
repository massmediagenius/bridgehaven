'use client'

import * as React from 'react'
import { Shield, Lock, Eye, UserCheck, HeartHandshake, Scale } from 'lucide-react'
import { Typewriter } from '@/components/shared/typewriter'
import { cn } from '@/lib/utils'

const trustPoints = [
  {
    icon: Scale,
    title: 'No Child Ranked by Money',
    description:
      'Placement decisions are never influenced by donations or public votes. Every child receives care based on their needs.',
  },
  {
    icon: UserCheck,
    title: 'Licensed Professionals Only',
    description:
      'All placement decisions are made by licensed caseworkers and child welfare professionals.',
  },
  {
    icon: Eye,
    title: 'Votes Affect Visibility Only',
    description:
      'Community votes help prioritize which campaigns and homes receive attention. Votes never influence child welfare decisions.',
  },
  {
    icon: HeartHandshake,
    title: 'Donations Support Care',
    description:
      'Your donations fund essentials, education, therapy, enrichment, and stability with transparent allocation.',
  },
  {
    icon: Lock,
    title: 'Privacy-Safe Profiles',
    description:
      'We show only first names, age ranges, and regions. No identifying information is ever shared publicly.',
  },
  {
    icon: Shield,
    title: 'Trauma-Informed Care',
    description:
      'All partner homes and programs are trained in trauma-informed approaches for sensitive, appropriate care.',
  },
]

const AUTO_ADVANCE_MS = 4000
const INTERACTION_PAUSE_MS = 8000

export function TrustSafety() {
  const [active, setActive] = React.useState(0)
  const [pausedUntil, setPausedUntil] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < pausedUntil) return
      setActive((i) => (i + 1) % trustPoints.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [pausedUntil])

  const handleInteract = (i: number) => {
    setActive(i)
    setPausedUntil(Date.now() + INTERACTION_PAUSE_MS)
  }

  return (
    <section className="py-14 sm:py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trust & Safety</h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto min-h-[2rem]">
            <Typewriter text="Child welfare is our top priority." speed={32} startDelay={200} />
          </p>
        </div>

        <div
          className="flex h-44 sm:h-52 gap-1.5 rounded-2xl border border-border bg-muted/30 p-1.5 shadow-sm overflow-hidden"
          role="tablist"
          aria-label="Trust and safety principles"
        >
          {trustPoints.map((point, i) => {
            const isActive = i === active
            const Icon = point.icon
            return (
              <button
                key={point.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={point.title}
                onMouseEnter={() => handleInteract(i)}
                onFocus={() => handleInteract(i)}
                onClick={() => handleInteract(i)}
                className={cn(
                  'relative flex items-center overflow-hidden rounded-xl text-left transition-[flex-grow,background-color] duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive
                    ? 'bg-background shadow-md flex-[5]'
                    : 'bg-muted/40 hover:bg-muted/70 flex-[1]'
                )}
              >
                {/* Collapsed state — centered icon only */}
                <div
                  className={cn(
                    'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
                    isActive ? 'opacity-0' : 'opacity-100'
                  )}
                  aria-hidden={isActive}
                >
                  <Icon className="size-5 text-muted-foreground" />
                </div>

                {/* Expanded state — icon + title + description */}
                <div
                  className={cn(
                    'relative w-full h-full p-4 sm:p-5 flex flex-col justify-center transition-opacity duration-500',
                    isActive ? 'opacity-100 delay-150' : 'opacity-0'
                  )}
                  aria-hidden={!isActive}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base leading-tight truncate">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {point.description}
                  </p>

                  {/* Auto-advance progress bar */}
                  <div className="absolute left-4 right-4 bottom-2 h-0.5 rounded-full bg-muted overflow-hidden">
                    <div
                      key={`${active}-${pausedUntil}`}
                      className={cn(
                        'h-full bg-primary/70',
                        Date.now() < pausedUntil ? 'animate-none w-0' : 'trust-progress-bar'
                      )}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Dot indicators */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {trustPoints.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === active ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
