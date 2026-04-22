import type { Metadata } from 'next'
import { Shield } from 'lucide-react'
import { ChildrenFilters } from '@/components/filters/children-filters'
import { ChildrenGrid } from '@/components/children/children-grid'
import { children } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Children We Support',
  description: 'Privacy-safe profiles of children in foster care who need your support. Every vote and donation makes a difference in their lives.',
}

export default function ChildrenWeSupportPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-muted/30 pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-balance">
              Children We Support
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              These are privacy-safe profiles of children in foster care who need community support. Your donations and votes help prioritize resources and care for each child.
            </p>
          </div>

          {/* Privacy Notice — compact single-line infinite ticker */}
          <div className="mt-6 relative flex items-center gap-3 h-9 px-3 rounded-full bg-primary/5 border border-primary/10 max-w-3xl overflow-hidden">
            <Shield className="size-4 text-primary shrink-0 z-10" />
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              }}
            >
              <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap text-xs text-muted-foreground">
                {[
                  'Privacy-safe profiles',
                  'First names or initials only',
                  'No identifying information shared',
                  'No placement details public',
                  'Licensed caseworkers only',
                  'Trauma-informed care',
                ].concat([
                  'Privacy-safe profiles',
                  'First names or initials only',
                  'No identifying information shared',
                  'No placement details public',
                  'Licensed caseworkers only',
                  'Trauma-informed care',
                ]).map((item, i) => (
                  <span key={i} className="flex items-center gap-6">
                    <span>{item}</span>
                    <span className="size-1 rounded-full bg-primary/50" aria-hidden />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Listings */}
      <section className="pt-4 pb-12 sm:pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ChildrenFilters />

          <div className="mt-6">
            <ChildrenGrid children={children} />
          </div>
        </div>
      </section>
    </div>
  )
}
