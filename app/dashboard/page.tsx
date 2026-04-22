'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { LogOut, DollarSign, ThumbsUp, User, Home } from 'lucide-react'

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
  return (
    <Card className="border-border">
      <CardContent className="py-14 text-center">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <ThumbsUp className="size-5 text-primary" />
        </div>
        <p className="text-base font-medium mb-1">You have no votes</p>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          Help our community prioritize care for the children who need it most. Pick a child and cast your first vote.
        </p>
        <Button asChild size="lg">
          <Link href="/children-we-support">Make a Vote</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function DonationsContent() {
  return (
    <Card className="border-border">
      <CardContent className="py-14 text-center">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <DollarSign className="size-5 text-primary" />
        </div>
        <p className="text-base font-medium mb-1">You have no donations</p>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          Every dollar goes directly toward a specific child&apos;s needs. Pick a child and make your first donation.
        </p>
        <Button asChild size="lg">
          <Link href="/children-we-support">Make a Donation</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
