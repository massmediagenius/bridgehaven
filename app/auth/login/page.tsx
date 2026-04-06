'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { Shield, ThumbsUp } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-20 bg-muted/20">
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="HavenBridge"
            width={320}
            height={96}
            className="h-20 w-auto"
          />
        </Link>

        <LoginForm />

        <p className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <Shield className="size-3" />
          Your information is private and secure.
        </p>
      </div>
    </div>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (email && password) {
        sessionStorage.setItem('user', JSON.stringify({
          email,
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        }))
        toast({ title: 'Welcome back!', description: `Logged in as ${email}` })
        router.push(redirectTo || '/dashboard')
      }
    } catch {
      toast({ title: 'Login failed', description: 'Please check your credentials and try again.', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your HavenBridge account</CardDescription>
      </CardHeader>
      <CardContent>
        {redirectTo && (
          <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
            <ThumbsUp className="size-4 shrink-0" />
            <span>Sign in to cast your vote and support this cause.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full" size="lg">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href={redirectTo ? `/auth/signup?redirect=${encodeURIComponent(redirectTo)}` : '/auth/signup'}
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
