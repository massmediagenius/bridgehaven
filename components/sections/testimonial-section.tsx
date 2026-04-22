import Image from 'next/image'
import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { Typewriter } from '@/components/shared/typewriter'
import type { Testimonial } from '@/lib/types'

const cardVariants = [
  'bg-background border-border',
  'bg-primary/5 border-primary/20',
  'bg-background border-border',
  'bg-muted border-border',
  'bg-primary/[0.04] border-primary/15',
]

const rotations = ['-rotate-1', 'rotate-0', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]']

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const variant = cardVariants[index % cardVariants.length]
  const rotation = rotations[index % rotations.length]
  const initials = testimonial.author
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')

  return (
    <figure
      className={`shrink-0 w-[300px] sm:w-[360px] lg:w-[400px] rounded-2xl border p-6 shadow-sm transition-transform hover:shadow-lg hover:-translate-y-1 ${variant} ${rotation}`}
    >
      <Quote className="size-5 text-primary/40 mb-3" aria-hidden="true" />
      <blockquote className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-5 line-clamp-5">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {testimonial.image ? (
          <div className="relative size-10 shrink-0 rounded-full overflow-hidden bg-primary/10">
            <Image
              src={testimonial.image}
              alt={`${testimonial.author}'s portrait`}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{testimonial.author}</p>
          <p className="text-xs text-muted-foreground truncate">
            {testimonial.role}
            {testimonial.location ? ` · ${testimonial.location}` : ''}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export function TestimonialSection() {
  // Split into two rows; duplicate each for seamless infinite loop.
  const midpoint = Math.ceil(testimonials.length / 2)
  const rowA = testimonials.slice(0, midpoint)
  const rowB = testimonials.slice(midpoint)
  const loopA = [...rowA, ...rowA]
  const loopB = [...rowB, ...rowB]

  return (
    <section className="relative py-24 sm:py-32 border-t border-border overflow-hidden">
      {/* Soft ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-5">
            <Quote className="size-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Voices From Our Community
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto min-h-[3.5rem]">
            <Typewriter text="Foster parents, graduates, caseworkers, donors, and volunteers on what HavenBridge has meant to them." speed={20} startDelay={200} />
          </p>
        </div>
      </div>

      {/* Marquee rows — full-bleed, masked edges */}
      <div
        className="relative space-y-6"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        {/* Row 1 — scrolls left */}
        <div className="marquee-track flex w-max gap-6 py-3">
          {loopA.map((t, i) => (
            <TestimonialCard key={`a-${t.id}-${i}`} testimonial={t} index={i} />
          ))}
        </div>

        {/* Row 2 — scrolls right, slightly offset */}
        <div className="marquee-track-reverse flex w-max gap-6 py-3 pl-12 sm:pl-24">
          {loopB.map((t, i) => (
            <TestimonialCard key={`b-${t.id}-${i}`} testimonial={t} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
