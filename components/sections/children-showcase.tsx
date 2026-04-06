import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChildProfileCard } from '@/components/cards/child-profile-card'
import { getFeaturedChildren } from '@/lib/data'

export function ChildrenShowcase() {
  const children = getFeaturedChildren(4)

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Children We Support
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Privacy-safe profiles of children who need your support. Every vote and donation makes a difference.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-border mb-12 max-w-2xl mx-auto">
          <Shield className="size-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Privacy-safe profiles:</span> We show only first names or initials, age ranges, and regions. No identifying information is ever shared publicly.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {children.map((child) => (
            <ChildProfileCard key={child.id} child={child} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild size="lg">
            <Link href="/children-we-support">
              View All
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
