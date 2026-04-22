import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { childSlug } from '@/lib/data'
import type { Child } from '@/lib/types'

interface ChildProfileCardCompactProps {
  child: Child
}

const urgencyDot = {
  low: 'bg-emerald-500',
  medium: 'bg-amber-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
}

const urgencyLabels = {
  low: 'Stable',
  medium: 'Support',
  high: 'High',
  critical: 'Urgent',
}

export function ChildProfileCardCompact({ child }: ChildProfileCardCompactProps) {
  return (
    <Link
      href={`/children-we-support/${childSlug(child)}`}
      className="group block rounded-xl bg-background border border-border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
    >
      <div className="relative aspect-square w-full">
        {child.image ? (
          <Image
            src={child.image}
            alt={`${child.firstName}'s profile`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-semibold text-xl">
            {child.initials}
          </div>
        )}
        <span
          className={`absolute top-1.5 right-1.5 size-2.5 rounded-full ring-2 ring-background ${urgencyDot[child.urgencyLevel]}`}
          aria-label={urgencyLabels[child.urgencyLevel]}
        />
      </div>
      <div className="p-2 text-center">
        <p className="text-sm font-semibold truncate leading-tight">{child.firstName}</p>
        <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">Age {child.ageRange}</p>
        <Badge variant="outline" className="mt-1.5 text-[10px] px-1.5 py-0 font-medium">
          {urgencyLabels[child.urgencyLevel]}
        </Badge>
      </div>
    </Link>
  )
}
