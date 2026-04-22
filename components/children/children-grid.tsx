'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChildProfileCard } from '@/components/cards/child-profile-card'
import { ChildProfileCardCompact } from '@/components/cards/child-profile-card-compact'
import type { Child } from '@/lib/types'

interface ChildrenGridProps {
  children: Child[]
}

const PAGE_SIZE = 12 // 3 columns × 4 rows

export function ChildrenGrid({ children }: ChildrenGridProps) {
  const [page, setPage] = React.useState(0)

  const totalPages = Math.max(1, Math.ceil(children.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages - 1)
  const pageStart = currentPage * PAGE_SIZE
  const pageItems = children.slice(pageStart, pageStart + PAGE_SIZE)

  if (children.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No children match your current filters.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Mobile: compact 3x4 cards. Tablet/Desktop: full 3x4 cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:grid-cols-3">
        {pageItems.map((child) => (
          <React.Fragment key={child.id}>
            {/* Compact variant on mobile */}
            <div className="sm:hidden">
              <ChildProfileCardCompact child={child} />
            </div>
            {/* Full variant on sm+ */}
            <div className="hidden sm:block">
              <ChildProfileCard child={child} />
            </div>
          </React.Fragment>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === currentPage ? 'page' : undefined}
                className={`size-2 rounded-full transition-colors ${
                  i === currentPage ? 'bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Showing {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, children.length)} of {children.length} children
      </p>
    </div>
  )
}
