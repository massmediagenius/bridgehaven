'use client'

import * as React from 'react'
import { impactStats } from '@/lib/data'
import type { ImpactStat } from '@/lib/types'

const ANIMATION_DURATION_MS = 1800

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function formatValue(stat: ImpactStat, current: number) {
  const decimals = stat.decimals ?? 0
  const formatted = current.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return `${stat.prefix ?? ''}${formatted}${stat.suffix ?? ''}`
}

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (!start) return
    let frame: number
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)
      setValue(target * easeOutCubic(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, start])

  return value
}

function StatCard({ stat, animate }: { stat: ImpactStat; animate: boolean }) {
  const current = useCountUp(stat.target, animate)
  return (
    <div className="shrink-0 w-64 sm:w-72 px-6 text-center" aria-label={`${stat.label}: ${stat.value}`}>
      <p className="text-4xl font-bold text-primary tabular-nums">
        {animate ? formatValue(stat, current) : stat.value}
      </p>
      <p className="mt-2 font-semibold text-sm sm:text-base">{stat.label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
    </div>
  )
}

export function ImpactStats() {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  React.useEffect(() => {
    const node = sectionRef.current
    if (!node || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasAnimated])

  // Duplicate the stats so the marquee can loop seamlessly at -50% translate.
  const loop = [...impactStats, ...impactStats]

  return (
    <section ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Collective Impact
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Together, our community of supporters is transforming lives every day.
          </p>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max gap-4 py-4">
          {loop.map((stat, i) => (
            <StatCard key={`${stat.label}-${i}`} stat={stat} animate={hasAnimated} />
          ))}
        </div>
      </div>
    </section>
  )
}
