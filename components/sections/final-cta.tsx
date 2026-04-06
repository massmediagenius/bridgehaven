import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance leading-[1.1]">
            A safe home changes everything.
          </h2>
          <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-white/30" />
          <p className="mt-8 text-lg text-primary-foreground/80 leading-relaxed">
            Every child deserves safety, stability, belonging, and a chance to discover their gifts. Join our community of supporters making it possible.
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
              variant="outline"
              asChild
              className="text-base px-8 border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href="/auth/signup">Create Account to Vote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
