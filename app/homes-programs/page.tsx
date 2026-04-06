import type { Metadata } from 'next'
import { Shield, BadgeCheck } from 'lucide-react'
import { HomeCard } from '@/components/cards/home-card'
import { HomesFilters } from '@/components/filters/homes-filters'
import { homes, programs } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Homes & Programs',
  description: 'Licensed foster homes, transitional homes, and verified developmental programs creating safe, nurturing environments for children.',
}

export default function HomesProgramsPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-balance">
              Homes & Programs
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Licensed foster homes and verified programs providing safe, nurturing environments where children can heal, grow, and discover their potential.
            </p>
          </div>

          {/* Trust Notice */}
          <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 max-w-3xl">
            <BadgeCheck className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Verified Partners Only</p>
              <p className="text-sm text-muted-foreground mt-1">
                Every home and program in our network is state-licensed, background-checked, and committed to trauma-informed care. Your support directly funds their mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Listings */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HomesFilters />
          
          {/* Homes Section */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="size-5 text-primary" />
              <h2 className="text-2xl font-semibold">Licensed Homes</h2>
              <span className="text-muted-foreground">({homes.length})</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {homes.map((home) => (
                <HomeCard key={home.id} home={home} type="home" />
              ))}
            </div>
          </div>

          {/* Programs Section */}
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <BadgeCheck className="size-5 text-primary" />
              <h2 className="text-2xl font-semibold">Verified Programs</h2>
              <span className="text-muted-foreground">({programs.length})</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {programs.map((program) => (
                <HomeCard key={program.id} home={program} type="program" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
