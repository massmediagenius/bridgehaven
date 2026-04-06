import Image from 'next/image'
import Link from 'next/link'
import { Shield, Lock, Eye, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const trustItems = [
  { icon: Shield, label: 'Licensed Partner Homes' },
  { icon: Eye, label: 'Privacy-Safe Advocacy' },
  { icon: Lock, label: 'Secure Giving' },
  { icon: BarChart3, label: 'Transparent Impact' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
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

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              HavenBridge helps fund licensed foster homes, developmental programs, and life-changing care so children can grow in safe environments and discover their potential.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="text-base px-8">
                <Link href="/campaigns">Donate Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8">
                <Link href="/homes-programs">Explore Homes & Programs</Link>
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="size-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Group photo */}
          <div className="relative">
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
