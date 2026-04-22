import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Typewriter } from '@/components/shared/typewriter'

export function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-primary">
      {/* Background image */}
      <Image
        src="/safehome.jpeg"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover"
      />
      {/* Gradient overlay for text contrast — primary-tinted + dark vignette */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-slate-900/75"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            A safe home changes everything.
          </h2>
          <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-white/50" />
          <p className="mt-8 text-lg text-white/90 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] min-h-[6rem] sm:min-h-[5rem]">
            <Typewriter text="Every child deserves safety, stability, belonging, and a chance to discover their gifts. Join our community of supporters making it possible." speed={20} startDelay={200} />
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              asChild
              className="text-base px-8 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/campaigns">Donate Today</Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="text-base px-8 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/auth/signup">Join HavenBridge</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
