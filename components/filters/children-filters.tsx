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

const ageRanges = ['All Ages', '4-6', '7-9', '10-12', '12-14', '14-16']
const regions = ['All Regions', 'Pacific Northwest', 'Southwest', 'Midwest', 'Southeast', 'Northeast', 'Mountain West']
const supportCategories = ['All Categories', 'Education', 'Therapy', 'Essentials', 'Enrichment', 'Medical']
const urgencyLevels = ['All Urgency', 'Critical', 'High Priority', 'Needs Support', 'Stable']

export function ChildrenFilters() {
  const [ageRange, setAgeRange] = React.useState('All Ages')
  const [region, setRegion] = React.useState('All Regions')
  const [category, setCategory] = React.useState('All Categories')
  const [urgency, setUrgency] = React.useState('All Urgency')

  const activeFiltersCount = [
    ageRange !== 'All Ages',
    region !== 'All Regions',
    category !== 'All Categories',
    urgency !== 'All Urgency',
  ].filter(Boolean).length

  const clearFilters = () => {
    setAgeRange('All Ages')
    setRegion('All Regions')
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
          placeholder="Search by name or needs..."
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <Select value={ageRange} onValueChange={setAgeRange}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[110px] text-sm">
            <SelectValue placeholder="Age Range" />
          </SelectTrigger>
          <SelectContent>
            {ageRanges.map((range) => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[110px] text-sm">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[120px] text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {supportCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={urgency} onValueChange={setUrgency}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[110px] text-sm">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            {urgencyLevels.map((level) => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
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
