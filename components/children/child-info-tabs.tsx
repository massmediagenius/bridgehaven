'use client'

import * as React from 'react'
import { Target, Sparkles, Calendar, HandHeart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Update } from '@/lib/types'

interface ChildInfoTabsProps {
  needs: string[]
  goals: string[]
  talents: string[]
  recentUpdates: Update[]
}

type TabKey = 'needs' | 'goals' | 'talents' | 'updates'

interface TabMeta {
  key: TabKey
  label: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string }>
  // Soft gradient tint for the panel background
  bgGradient: string
  // Accent color for the watermark icon & active tab icon
  accentClass: string
  // Optional real image path — drop a file at this path to replace the gradient
  imageSrc?: string
}

const tabs: TabMeta[] = [
  {
    key: 'needs',
    label: 'Support Needs',
    shortLabel: 'Needs',
    icon: HandHeart,
    bgGradient:
      'bg-[radial-gradient(120%_100%_at_0%_0%,rgba(244,63,94,0.12)_0%,rgba(244,63,94,0.04)_45%,transparent_85%)]',
    accentClass: 'text-rose-500',
    // imageSrc: '/category/needs.jpg',
  },
  {
    key: 'goals',
    label: 'Goals',
    shortLabel: 'Goals',
    icon: Target,
    bgGradient:
      'bg-[radial-gradient(120%_100%_at_100%_0%,rgba(14,165,233,0.14)_0%,rgba(14,165,233,0.05)_45%,transparent_85%)]',
    accentClass: 'text-sky-500',
    // imageSrc: '/category/goals.jpg',
  },
  {
    key: 'talents',
    label: 'Talents',
    shortLabel: 'Talents',
    icon: Sparkles,
    bgGradient:
      'bg-[radial-gradient(120%_100%_at_100%_100%,rgba(168,85,247,0.14)_0%,rgba(168,85,247,0.05)_45%,transparent_85%)]',
    accentClass: 'text-violet-500',
    // imageSrc: '/category/talents.jpg',
  },
  {
    key: 'updates',
    label: 'Updates',
    shortLabel: 'Updates',
    icon: Calendar,
    bgGradient:
      'bg-[radial-gradient(120%_100%_at_0%_100%,rgba(245,158,11,0.12)_0%,rgba(245,158,11,0.04)_45%,transparent_85%)]',
    accentClass: 'text-amber-500',
    // imageSrc: '/category/updates.jpg',
  },
]

export function ChildInfoTabs({ needs, goals, talents, recentUpdates }: ChildInfoTabsProps) {
  const [active, setActive] = React.useState<TabKey>('needs')

  const availableTabs = tabs.filter((t) => {
    if (t.key === 'needs') return needs.length > 0
    if (t.key === 'goals') return goals.length > 0
    if (t.key === 'talents') return talents.length > 0
    if (t.key === 'updates') return recentUpdates.length > 0
    return true
  })

  return (
    <Card className="overflow-hidden">
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Child information categories"
        className="grid gap-1 p-1.5 border-b border-border bg-muted/40"
        style={{ gridTemplateColumns: `repeat(${availableTabs.length}, minmax(0, 1fr))` }}
      >
        {availableTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.key === active
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.key)}
              className={cn(
                'relative flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
              )}
            >
              <Icon className={cn('size-4 transition-colors', isActive ? tab.accentClass : 'text-muted-foreground')} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          )
        })}
      </div>

      {/* Panel with crossfade — each panel absolutely positioned, faded */}
      <CardContent className="relative p-0 min-h-[220px]">
        {availableTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.key === active
          return (
            <div
              key={tab.key}
              role="tabpanel"
              aria-hidden={!isActive}
              className={cn(
                'transition-opacity duration-500',
                isActive
                  ? 'relative opacity-100 pointer-events-auto'
                  : 'absolute inset-0 opacity-0 pointer-events-none'
              )}
            >
              {/* Background layer — real image if provided, otherwise gradient tint */}
              <div className={cn('absolute inset-0 overflow-hidden', !tab.imageSrc && tab.bgGradient)}>
                {tab.imageSrc && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
                    style={{ backgroundImage: `url(${tab.imageSrc})` }}
                  />
                )}
                {/* Giant watermark icon in the corner */}
                <Icon
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-6 -right-6 size-52 sm:size-64 opacity-[0.06] rotate-12 pointer-events-none',
                    tab.accentClass
                  )}
                />
                {/* Subtle top-to-content gradient to keep text readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background/50" />
              </div>

              {/* Content layer */}
              <div className="relative p-5 sm:p-6">
                {tab.key === 'needs' && <NeedsPanel needs={needs} />}
                {tab.key === 'goals' && <BulletPanel items={goals} emptyLabel="No goals listed yet." accentClass={tab.accentClass} />}
                {tab.key === 'talents' && <BulletPanel items={talents} emptyLabel="No talents listed yet." accentClass={tab.accentClass} />}
                {tab.key === 'updates' && <UpdatesPanel updates={recentUpdates} accentClass={tab.accentClass} />}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function NeedsPanel({ needs }: { needs: string[] }) {
  if (needs.length === 0) {
    return <p className="text-sm text-muted-foreground">No support needs listed yet.</p>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {needs.map((need) => (
        <Badge key={need} variant="secondary" className="text-sm py-1.5 px-3 bg-background/80 backdrop-blur-sm">
          {need}
        </Badge>
      ))}
    </div>
  )
}

function BulletPanel({
  items,
  emptyLabel,
  accentClass,
}: {
  items: string[]
  emptyLabel: string
  accentClass: string
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>
  }
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm">
          <span className={cn('size-1.5 rounded-full mt-[0.55rem] shrink-0 bg-current', accentClass)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function UpdatesPanel({ updates, accentClass }: { updates: Update[]; accentClass: string }) {
  if (updates.length === 0) {
    return <p className="text-sm text-muted-foreground">No updates yet — check back soon.</p>
  }
  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <div key={update.id} className={cn('border-l-2 pl-4 border-current/30', accentClass)}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Calendar className="size-3.5" />
            <span>
              {new Date(update.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <h4 className="font-medium text-sm text-foreground">{update.title}</h4>
          <p className="text-sm text-muted-foreground mt-0.5">{update.content}</p>
        </div>
      ))}
    </div>
  )
}
