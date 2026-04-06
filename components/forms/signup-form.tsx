'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, CreditCard, Lock, Info, ChevronLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type Step = 1 | 2

export function SignupForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter()
  const [step, setStep] = React.useState<Step>(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [agreedToPayment, setAgreedToPayment] = React.useState(false)

  // Step 1 fields
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')

  // Step 2 fields
  const [cardNumber, setCardNumber] = React.useState('')
  const [cardName, setCardName] = React.useState('')
  const [expiry, setExpiry] = React.useState('')
  const [cvc, setCvc] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [street2, setStreet2] = React.useState('')
  const [city, setCity] = React.useState('')
  const [state, setState] = React.useState('')
  const [zip, setZip] = React.useState('')
  const [country, setCountry] = React.useState('US')

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  function handleStep1Next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.')
      return
    }
    setPasswordError('')
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleStep2Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { apiSignup } = await import('@/lib/api')
      const result = await apiSignup({
        name: fullName,
        email,
        password,
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardName,
        expiry,
        cvc,
        street,
        street2,
        city,
        state,
        zip,
        country,
      })
      sessionStorage.setItem('user', JSON.stringify({
        id: result.user?.id || 'user-' + Math.random().toString(36).substr(2, 9),
        name: fullName,
        email,
        createdAt: new Date().toISOString(),
      }))
    } catch (err) {
      console.error('API signup failed:', err)
      sessionStorage.setItem('user', JSON.stringify({
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: fullName,
        email,
        createdAt: new Date().toISOString(),
      }))
    }
    router.push(redirectTo || '/dashboard')
  }

  const inputClass =
    'w-full h-11 px-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow'

  return (
    <div>
      {/* Stepper indicator */}
      <div className="flex items-center gap-3 mb-8">
        {([1, 2] as const).map((n, idx) => (
          <React.Fragment key={n}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex size-8 items-center justify-center rounded-full text-sm font-semibold border-2 transition-colors',
                  step > n
                    ? 'bg-primary border-primary text-primary-foreground'
                    : step === n
                    ? 'border-primary text-primary bg-background'
                    : 'border-border text-muted-foreground bg-background',
                )}
              >
                {step > n ? <CheckCircle className="size-4" /> : n}
              </div>
              <span
                className={cn(
                  'text-sm font-medium hidden sm:inline',
                  step === n ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {n === 1 ? 'Your Details' : 'Payment Method'}
              </span>
            </div>
            {idx < 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 rounded-full transition-colors',
                  step > 1 ? 'bg-primary' : 'bg-border',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── STEP 1: Account details ── */}
      {step === 1 && (
        <form onSubmit={handleStep1Next} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              placeholder="John Smith"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="john@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={cn(inputClass, 'pr-11')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={cn(inputClass, 'pr-11', passwordError && 'border-destructive focus:ring-destructive')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1.5 text-xs text-destructive">{passwordError}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Next — Add Payment Method
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </form>
      )}

      {/* ── STEP 2: Payment method + billing ── */}
      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-5">
          {/* Info banner */}
          <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <Info className="size-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              A payment method is required to activate voting access and streamline future support actions.{' '}
              <strong className="text-foreground">You will not be charged automatically.</strong>
            </p>
          </div>

          {/* Card details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              <h3 className="font-semibold text-sm">Card Details</h3>
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  className={cn(inputClass, 'pr-11')}
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                Name on Card
              </label>
              <input
                id="cardName"
                type="text"
                required
                placeholder="John Smith"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                  Expiry
                </label>
                <input
                  id="expiry"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium mb-2">
                  CVC
                </label>
                <div className="relative">
                  <input
                    id="cvc"
                    type="text"
                    inputMode="numeric"
                    required
                    placeholder="123"
                    maxLength={4}
                    value={cvc}
                    onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className={cn(inputClass, 'pr-9')}
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Billing address */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-semibold text-sm">Billing Address</h3>

            <div>
              <label htmlFor="billingStreet" className="block text-sm font-medium mb-2">
                Street Address
              </label>
              <input
                id="billingStreet"
                type="text"
                required
                placeholder="123 Main St"
                value={street}
                onChange={e => setStreet(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="billingStreet2" className="block text-sm font-medium mb-2">
                Apt, Suite, Unit{' '}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id="billingStreet2"
                type="text"
                placeholder="Apt 4B"
                value={street2}
                onChange={e => setStreet2(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="billingCity" className="block text-sm font-medium mb-2">
                  City
                </label>
                <input
                  id="billingCity"
                  type="text"
                  required
                  placeholder="New York"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="billingState" className="block text-sm font-medium mb-2">
                  State
                </label>
                <input
                  id="billingState"
                  type="text"
                  required
                  placeholder="NY"
                  maxLength={2}
                  value={state}
                  onChange={e => setState(e.target.value.toUpperCase().slice(0, 2))}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="billingZip" className="block text-sm font-medium mb-2">
                  ZIP Code
                </label>
                <input
                  id="billingZip"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="10001"
                  value={zip}
                  onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="billingCountry" className="block text-sm font-medium mb-2">
                  Country
                </label>
                <select
                  id="billingCountry"
                  required
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="agreement"
              checked={agreedToPayment}
              onCheckedChange={checked => setAgreedToPayment(checked as boolean)}
              className="mt-0.5"
            />
            <label htmlFor="agreement" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
              I understand this card will not be charged automatically. I may use it for donations when I choose.
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-1">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading || !agreedToPayment}
            >
              {isLoading ? (
                <>
                  <Spinner className="size-4 mr-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <ChevronLeft className="size-4" />
              Back to account details
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
