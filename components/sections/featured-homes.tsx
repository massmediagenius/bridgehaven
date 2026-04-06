import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HomeCard } from '@/components/cards/home-card'
import { getFeaturedHomes, getFeaturedPrograms } from '@/lib/data'

export function FeaturedHomes() {
  const homes = getFeaturedHomes(2)
  const programs = getFeaturedPrograms(2)

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Homes & Programs
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Licensed homes and verified programs creating safe, nurturing environments for children.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {homes.map((home) => (
            <HomeCard key={home.id} home={home} type="home" />
          ))}
          {programs.map((program) => (
            <HomeCard key={program.id} home={program} type="program" />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild size="lg">
            <Link href="/homes-programs">
              View All
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
