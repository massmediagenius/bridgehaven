'use client'

import * as React from 'react'
import { BookOpen, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StorySegment } from '@/lib/types'

interface ChildStoryCarouselProps {
  firstName: string
  story: StorySegment[]
}

export function ChildStoryCarousel({ firstName, story }: ChildStoryCarouselProps) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const [active, setActive] = React.useState(0)

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current
    if (!el) return
    const child = el.children[i] as HTMLElement | undefined
    if (!child) return
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }

  const goPrev = () => scrollToIndex(Math.max(0, active - 1))
  const goNext = () => scrollToIndex(Math.min(story.length - 1, active + 1))

  // Track the nearest-snap slide index as the user scrolls/swipes.
  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const slideWidth = el.clientWidth
      if (!slideWidth) return
      const idx = Math.round(el.scrollLeft / slideWidth)
      setActive((prev) => (prev === idx ? prev : idx))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  if (story.length === 0) return null

  return (
    <section className="relative">
      {/* Section header */}
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-semibold mb-1">
            <BookOpen className="size-3.5" />
            Their story
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">{firstName}&apos;s journey</h2>
        </div>
        <p className="hidden sm:block text-xs text-muted-foreground">
          Swipe or use the arrows · {story.length} chapters
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-4" role="tablist" aria-label={`${firstName}'s story chapters`}>
        {story.map((seg, i) => (
          <button
            key={seg.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to chapter ${i + 1}: ${seg.chapter}`}
            onClick={() => scrollToIndex(i)}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i === active
                ? 'bg-primary'
                : i < active
                  ? 'bg-primary/50'
                  : 'bg-muted-foreground/20 hover:bg-muted-foreground/40'
            )}
          />
        ))}
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          onClick={goPrev}
          disabled={active === 0}
          aria-label="Previous chapter"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex size-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-md hover:bg-background transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={goNext}
          disabled={active === story.length - 1}
          aria-label="Next chapter"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex size-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-md hover:bg-background transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Scroll-snap track */}
        <div
          ref={scrollerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-background [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {story.map((seg, i) => (
            <article
              key={seg.id}
              role="tabpanel"
              aria-label={`Chapter ${i + 1}: ${seg.chapter}`}
              className="snap-start shrink-0 w-full p-6 sm:p-10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  {seg.chapter}
                </p>
              </div>

              {seg.pullQuote && (
                <div className="flex gap-3 mb-4 pl-1">
                  <Quote className="size-5 shrink-0 text-primary/40 mt-0.5" />
                  <p className="text-base sm:text-lg font-medium leading-snug text-foreground/90 italic">
                    {seg.pullQuote}
                  </p>
                </div>
              )}

              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{seg.body}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Chapter counter */}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Chapter {active + 1} of {story.length} · {story[active]?.chapter}
      </p>
    </section>
  )
}
