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

const states = ['All States', 'OR', 'WA', 'CO', 'TX', 'IL', 'AZ']
const types = ['All Types', 'Foster Home', 'Transitional Home', 'Group Home', 'Education Program', 'Therapy Program', 'Enrichment Program', 'Mentorship Program', 'Life Skills Program']
const verificationStatus = ['All Status', 'Verified Only', 'Pending Verification']
const urgentNeeds = ['All Needs', 'Has Urgent Needs', 'Fully Funded']

export function HomesFilters() {
  const [state, setState] = React.useState('All States')
  const [type, setType] = React.useState('All Types')
  const [verification, setVerification] = React.useState('All Status')
  const [needs, setNeeds] = React.useState('All Needs')

  const activeFiltersCount = [
    state !== 'All States',
    type !== 'All Types',
    verification !== 'All Status',
    needs !== 'All Needs',
  ].filter(Boolean).length

  const clearFilters = () => {
    setState('All States')
    setType('All Types')
    setVerification('All Status')
    setNeeds('All Needs')
  }

  return (
    <div className="space-y-3">
      {/* Search row */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search homes and programs..."
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[100px] text-sm">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[110px] text-sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={verification} onValueChange={setVerification}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[110px] text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {verificationStatus.map((v) => (
              <SelectItem key={v} value={v}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={needs} onValueChange={setNeeds}>
          <SelectTrigger className="h-11 w-full sm:w-auto sm:min-w-[110px] text-sm">
            <SelectValue placeholder="Needs" />
          </SelectTrigger>
          <SelectContent>
            {urgentNeeds.map((n) => (
              <SelectItem key={n} value={n}>{n}</SelectItem>
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
