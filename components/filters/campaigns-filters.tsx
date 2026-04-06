'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = ['All Categories', 'Essentials', 'Education', 'Therapy', 'Enrichment', 'Emergency', 'Home Upgrades']
const urgencyLevels = ['All Urgency', 'Critical', 'High Priority', 'Moderate', 'Ongoing']
const sortOptions = ['Most Urgent', 'Most Supporters', 'Ending Soon', 'Newest', 'Most Funded']

export function CampaignsFilters() {
  const [category, setCategory] = React.useState('All Categories')
  const [urgency, setUrgency] = React.useState('All Urgency')
  const [sort, setSort] = React.useState('Most Urgent')

  const activeFiltersCount = [
    category !== 'All Categories',
    urgency !== 'All Urgency',
  ].filter(Boolean).length

  const clearFilters = () => {
    setCategory('All Categories')
    setUrgency('All Urgency')
  }

  return (
    <div className="space-y-3">
      {/* Search row */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search campaigns..."
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[120px] text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={urgency} onValueChange={setUrgency}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[120px] text-sm">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            {urgencyLevels.map((u) => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[120px] text-sm">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-11 shrink-0 col-span-2 sm:col-span-1">
            <X className="size-4 mr-1" />
            Clear
            <Badge variant="secondary" className="ml-1">{activeFiltersCount}</Badge>
          </Button>
        )}
      </div>
    </div>
  )
}
