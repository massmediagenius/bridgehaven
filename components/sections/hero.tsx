import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Typewriter } from '@/components/shared/typewriter'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Mobile-only background image behind headline */}
      <div className="absolute inset-0 -z-10 lg:hidden">
        <Image
          src="/hero-group.jpg"
          alt="HavenBridge community volunteers smiling together"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl text-balance leading-[1.1]">
              Bridge a child from{' '}
              <span className="text-primary">uncertainty</span> to{' '}
              <span className="text-primary">safety</span>.
            </h1>

            <div className="mt-6 h-1 w-16 rounded-full bg-primary" />

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl min-h-[6rem] sm:min-h-[5rem]">
              <Typewriter
                text="HavenBridge helps fund licensed foster homes, developmental programs, and life-changing care so children can grow in safe environments and discover their potential."
                speed={20}
                startDelay={400}
              />
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="text-base px-8">
                <Link href="/children-we-support">Donate Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8">
                <Link href="/children-we-support">Meet the Children</Link>
              </Button>
            </div>
          </div>

          {/* Right — Group photo (desktop only) */}
          <div className="relative hidden lg:block">
            {/* Decorative arch behind the photo */}
            <div className="absolute -top-6 -right-6 w-full h-full rounded-3xl border-2 border-primary/20" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/hero-group.jpg"
                alt="HavenBridge community volunteers smiling together"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 text-white text-sm font-medium">
                Our community of volunteers and supporters
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
