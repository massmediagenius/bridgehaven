'use client'

import * as React from 'react'
import { Heart, ThumbsUp, Home } from 'lucide-react'
import { Typewriter } from '@/components/shared/typewriter'
import { cn } from '@/lib/utils'

const actions = [
  {
    icon: Heart,
    title: 'One Donation',
    description: 'Can fund essentials, education, therapy, or enrichment for a child in need.',
    examples: ['School supplies', 'Therapy sessions', 'Warm clothing', 'Extracurricular activities'],
  },
  {
    icon: ThumbsUp,
    title: 'One Vote',
    description: 'Can elevate urgent home or program needs, directing community attention where it matters most.',
    examples: ['Highlight urgent campaigns', 'Boost program visibility', 'Prioritize critical needs', 'Rally community support'],
  },
  {
    icon: Home,
    title: 'One Safe Placement',
    description: 'Can change a life forever. Every child deserves stability, belonging, and a chance to thrive.',
    examples: ['Stable home environment', 'Consistent caregivers', 'Educational continuity', 'Emotional healing'],
  },
]

export function HowOneActionHelps() {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [pulse, setPulse] = React.useState(false)

  React.useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setPulse(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How One Action Helps
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto min-h-[3.5rem]">
            <Typewriter text="Small actions create ripples of change. Every contribution matters." speed={24} startDelay={200} />
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
          {actions.map((action, i) => (
            <div key={action.title} className="text-center min-w-0">
              <div
                className={cn(
                  'inline-flex p-2 sm:p-3 lg:p-4 rounded-full bg-primary/10 mb-2 sm:mb-4 lg:mb-6',
                  pulse && 'action-icon-pulse'
                )}
                style={pulse ? { animationDelay: `${i * 0.35}s` } : undefined}
              >
                <action.icon className="size-4 sm:size-6 lg:size-7 text-primary" />
              </div>
              <h3 className="text-xs sm:text-base lg:text-xl font-semibold mb-1.5 sm:mb-2 lg:mb-3 leading-tight">
                {action.title}
              </h3>
              <p className="hidden sm:block text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6">
                {action.description}
              </p>
              <ul className="hidden sm:block space-y-1.5 lg:space-y-2 text-left max-w-xs mx-auto">
                {action.examples.map((example) => (
                  <li key={example} className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
