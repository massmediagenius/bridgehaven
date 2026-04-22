'use client'

import * as React from 'react'
import { Users, Heart, TrendingUp, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    icon: Users,
    title: 'Discover Children & Programs',
    description:
      'Browse privacy-safe profiles of children in foster care and licensed homes, learning about their support needs.',
  },
  {
    number: '02',
    icon: Heart,
    title: 'Make Your Voice Heard',
    description:
      'Vote for children and homes you want to support. Votes help prioritize which campaigns and programs get community attention.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Support Through Donations',
    description:
      'Contribute financially to active campaigns that fund education, therapy, essentials, and enrichment programs.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Track Your Impact',
    description:
      'View your voting history and donation records in your dashboard. See the tangible difference your contributions make.',
  },
]

const AUTO_ADVANCE_MS = 4000
const INTERACTION_PAUSE_MS = 8000

export function HowItWorksSteps() {
  const [active, setActive] = React.useState(0)
  const [pausedUntil, setPausedUntil] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < pausedUntil) return
      setActive((i) => (i + 1) % steps.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [pausedUntil])

  const handleInteract = (i: number) => {
    setActive(i)
    setPausedUntil(Date.now() + INTERACTION_PAUSE_MS)
  }

  return (
    <div>
      <div
        className="flex h-48 sm:h-56 gap-1.5 rounded-2xl border border-border bg-background/60 p-1.5 shadow-sm overflow-hidden"
        role="tablist"
        aria-label="Four simple steps"
      >
        {steps.map((step, i) => {
          const isActive = i === active
          const Icon = step.icon
          return (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Step ${step.number}: ${step.title}`}
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
              {/* Collapsed — centered icon + step number */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity duration-300',
                  isActive ? 'opacity-0' : 'opacity-100'
                )}
                aria-hidden={isActive}
              >
                <Icon className="size-5 text-muted-foreground" />
                <span className="text-[10px] font-bold text-muted-foreground/70 tracking-widest">{step.number}</span>
              </div>

              {/* Expanded — full content */}
              <div
                className={cn(
                  'relative w-full h-full p-4 sm:p-5 flex flex-col justify-center transition-opacity duration-500',
                  isActive ? 'opacity-100 delay-150' : 'opacity-0'
                )}
                aria-hidden={!isActive}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-primary/70 tracking-widest uppercase">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-sm sm:text-base leading-tight truncate mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
                  {step.description}
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
        {steps.map((_, i) => (
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
  )
}
