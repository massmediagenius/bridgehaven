import type { Metadata } from 'next'
import { Shield } from 'lucide-react'
import { ChildProfileCard } from '@/components/cards/child-profile-card'
import { ChildrenFilters } from '@/components/filters/children-filters'
import { children } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Children We Support',
  description: 'Privacy-safe profiles of children in foster care who need your support. Every vote and donation makes a difference in their lives.',
}

export default function ChildrenWeSupportPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-balance">
              Children We Support
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              These are privacy-safe profiles of children in foster care who need community support. Your donations and votes help prioritize resources and care for each child.
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 max-w-3xl">
            <Shield className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Privacy-Safe Profiles</p>
              <p className="text-sm text-muted-foreground mt-1">
                We show only first names or initials, age ranges, regions, and support needs. No identifying information, photos, or placement details are ever shared publicly. Placement decisions are handled only by licensed caseworkers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Listings */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ChildrenFilters />
          
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children.map((child) => (
              <ChildProfileCard key={child.id} child={child} />
            ))}
          </div>

          {children.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No children match your current filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
