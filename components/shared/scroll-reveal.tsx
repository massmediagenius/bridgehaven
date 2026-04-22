'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  // Viewport intersection threshold (0..1). Default 0.15 fires relatively early.
  threshold?: number
  // Animation delay in ms — useful for staggering a chain of revealed sections.
  delay?: number
  // If true, the element starts visible immediately (skip animation). Use for above-the-fold.
  immediate?: boolean
  className?: string
}

export function ScrollReveal({
  children,
  threshold = 0.15,
  delay = 0,
  immediate = false,
  className,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = React.useState(immediate)

  React.useEffect(() => {
    if (immediate) return
    const node = ref.current
    if (!node) return

    // If the element is already on screen at mount, reveal immediately (no "pop" on refresh).
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, immediate])

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden',
        className
      )}
      style={isVisible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
