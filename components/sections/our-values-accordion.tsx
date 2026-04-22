'use client'

import * as React from 'react'
import { Shield, Users, BarChart3, HeartHandshake } from 'lucide-react'
import { cn } from '@/lib/utils'

const values = [
  {
    icon: Shield,
    title: 'Child Safety First',
    description:
      'Every decision prioritizes the safety, privacy, and well-being of the children we serve. No exceptions.',
  },
  {
    icon: Users,
    title: 'Community Power',
    description:
      'We believe in the collective wisdom and compassion of communities supporting vulnerable children.',
  },
  {
    icon: BarChart3,
    title: 'Transparency & Accountability',
    description:
      'We operate with full transparency and are accountable to the children, families, and communities we serve.',
  },
  {
    icon: HeartHandshake,
    title: 'Trauma-Informed Care',
    description:
      'All partner homes and programs are trained in trauma-informed approaches for sensitive, appropriate care.',
  },
]

const AUTO_ADVANCE_MS = 4000
const INTERACTION_PAUSE_MS = 8000

export function OurValuesAccordion() {
  const [active, setActive] = React.useState(0)
  const [pausedUntil, setPausedUntil] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < pausedUntil) return
      setActive((i) => (i + 1) % values.length)
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
        className="flex h-44 sm:h-52 gap-1.5 rounded-2xl border border-border bg-background/60 p-1.5 shadow-sm overflow-hidden"
        role="tablist"
        aria-label="Our values"
      >
        {values.map((value, i) => {
          const isActive = i === active
          const Icon = value.icon
          return (
            <button
              key={value.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={value.title}
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
              {/* Collapsed — centered icon */}
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
                  isActive ? 'opacity-0' : 'opacity-100'
                )}
                aria-hidden={isActive}
              >
                <Icon className="size-5 text-muted-foreground" />
              </div>

              {/* Expanded — icon + title + description */}
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
                    {value.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
                  {value.description}
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
        {values.map((_, i) => (
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
