'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TypewriterProps {
  text: string
  // Ms per character (default 24). Lower = faster typing.
  speed?: number
  // Ms to wait before starting to type.
  startDelay?: number
  // Show a blinking caret after the text finishes.
  caret?: boolean
  // Wait to scroll into view before starting. Default true — makes below-the-fold typewriters fire at the right moment.
  startOnView?: boolean
  className?: string
}

export function Typewriter({
  text,
  speed = 24,
  startDelay = 150,
  caret = true,
  startOnView = true,
  className,
}: TypewriterProps) {
  const [displayed, setDisplayed] = React.useState('')
  const [done, setDone] = React.useState(false)
  const [shouldStart, setShouldStart] = React.useState(!startOnView)
  const wrapperRef = React.useRef<HTMLSpanElement | null>(null)

  // Viewport trigger — fire once on first intersection.
  React.useEffect(() => {
    if (!startOnView || shouldStart) return
    const node = wrapperRef.current
    if (!node) return

    // Already on screen at mount (e.g. hero) — start immediately.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShouldStart(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldStart(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [startOnView, shouldStart])

  // Type out once we're allowed to start.
  React.useEffect(() => {
    if (!shouldStart) return
    let raf: number
    let timeoutId: ReturnType<typeof setTimeout>
    let i = 0

    const step = () => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i < text.length) {
        timeoutId = setTimeout(() => {
          raf = requestAnimationFrame(step)
        }, speed)
      } else {
        setDone(true)
      }
    }

    timeoutId = setTimeout(() => {
      raf = requestAnimationFrame(step)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [shouldStart, text, speed, startDelay])

  return (
    <span
      ref={wrapperRef}
      className={cn('whitespace-pre-wrap', className)}
      aria-label={text}
    >
      {displayed}
      {caret && shouldStart && (
        <span
          aria-hidden
          className={cn(
            'inline-block w-[2px] h-[1em] translate-y-[2px] ml-[2px] bg-current',
            done ? 'typewriter-caret-blink' : 'opacity-100'
          )}
        />
      )}
    </span>
  )
}
