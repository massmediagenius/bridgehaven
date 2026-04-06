'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { LogOut, Heart, DollarSign, ThumbsUp, TrendingUp, User, Home } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'votes' | 'donations'>('votes')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userStr = sessionStorage.getItem('user')
    if (!userStr) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userStr))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    toast({ title: 'Logged out', description: 'See you next time!' })
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen pt-20 pb-16 bg-muted/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2 text-muted-foreground">
              <Link href="/">
                <Home className="size-4 mr-1" />
                Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user.name}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="self-start flex items-center gap-2">
            <LogOut className="size-4" />
            Log Out
          </Button>
        </div>

        {/* Account Info */}
        <Card className="mb-8 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-4 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-medium text-sm">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                <p className="font-medium text-sm">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b border-border">
          <button
            onClick={() => setActiveTab('votes')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors rounded-t-lg ${
              activeTab === 'votes'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ThumbsUp className="size-4" />
            My Votes
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors rounded-t-lg ${
              activeTab === 'donations'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <DollarSign className="size-4" />
            My Donations
          </button>
        </div>

        {activeTab === 'votes' && <VotesContent />}
        {activeTab === 'donations' && <DonationsContent />}
      </div>
    </div>
  )
}

function VotesContent() {
  const votes = [
    { id: 1, type: 'child', name: 'Maya R.', detail: 'Age 8 • Education', date: '2024-03-28', votesCount: 234 },
    { id: 2, type: 'home', name: 'Sunrise Children\'s Home', detail: 'Phoenix, AZ • Capacity 15', date: '2024-03-25', votesCount: 456 },
    { id: 3, type: 'campaign', name: 'Winter Warmth Drive 2024', detail: '$38,750 / $50,000 raised', date: '2024-03-20', votesCount: 189, raised: 38750, goal: 50000 },
  ]

  if (votes.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">You haven&apos;t voted yet.</p>
          <Button asChild>
            <Link href="/children-we-support">Start Voting</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {votes.map((vote) => (
        <Card key={`${vote.type}-${vote.id}`} className="border-border shadow-sm">
          <CardContent className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-sm">{vote.name}</h3>
                  <Badge variant="secondary" className="text-xs capitalize">{vote.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{vote.detail}</p>
                <p className="text-xs text-muted-foreground">Voted {new Date(vote.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                {vote.goal && (
                  <div className="mt-3">
                    <Progress value={Math.round(((vote.raised ?? 0) / vote.goal) * 100)} className="h-1.5" />
                  </div>
                )}
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0 shrink-0">
                <p className="text-2xl font-bold text-primary">{vote.votesCount}</p>
                <p className="text-xs text-muted-foreground">total votes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function DonationsContent() {
  const donations = [
    { id: 1, campaignName: 'School Supplies Fund', amount: 50, date: '2024-03-28', status: 'completed' },
    { id: 2, campaignName: 'Emergency Medical Fund', amount: 100, date: '2024-03-15', status: 'completed' },
    { id: 3, campaignName: 'Winter Warmth Drive 2024', amount: 75, date: '2024-03-10', status: 'completed' },
  ]

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card className="border-border shadow-sm bg-primary/5">
        <CardContent className="p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">${totalDonated}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Donated</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{donations.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Donations</p>
            </div>
            <div>
              <p className="text-2xl font-bold">${Math.round(totalDonated / donations.length)}</p>
              <p className="text-xs text-muted-foreground mt-1">Average</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact note */}
      <div className="flex items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border">
        <TrendingUp className="size-4 text-primary shrink-0" />
        <p className="text-sm text-muted-foreground">Your donations have supported <span className="font-medium text-foreground">3 campaigns</span> and helped children access care and education.</p>
      </div>

      {donations.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven&apos;t made any donations yet.</p>
            <Button asChild>
              <Link href="/campaigns">Make a Donation</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        donations.map((donation) => (
          <Card key={donation.id} className="border-border shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{donation.campaignName}</h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(donation.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                  <p className="text-xl font-bold text-primary">${donation.amount}</p>
                  <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-emerald-500/10 text-xs">
                    {donation.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
