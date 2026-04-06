'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Lock, CreditCard, CheckCircle, ChevronLeft, Eye, EyeOff, X, Heart, Shield, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface Donor {
  name: string
  amount: number
  isAnonymous: boolean
  date: string
}

const INITIAL_DONORS: Donor[] = [
  { name: 'Jennifer M.', amount: 100, isAnonymous: false, date: '2 hours ago' },
  { name: 'Anonymous', amount: 50, isAnonymous: true, date: '5 hours ago' },
  { name: 'Robert K.', amount: 250, isAnonymous: false, date: '1 day ago' },
  { name: 'Sarah & Tom', amount: 75, isAnonymous: false, date: '2 days ago' },
  { name: 'Anonymous', amount: 25, isAnonymous: true, date: '2 days ago' },
]

interface DonationFlowProps {
  title: string
  amountRaised: number
  goalAmount: number
  supporterCount: number
  progressPercentage: number
  showVoteButton?: boolean
  voteLabel?: string
}

type Step = 'amount' | 'payment' | 'confirmed'

export function DonationFlow({
  title,
  amountRaised,
  goalAmount,
  supporterCount,
  progressPercentage,
  showVoteButton = false,
  voteLabel = 'Vote for Priority',
}: DonationFlowProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [step, setStep] = useState<Step>('amount')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isMonthly, setIsMonthly] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [donorName, setDonorName] = useState('')
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  // Auto-vote after signup redirect
  useEffect(() => {
    if (searchParams.get('voted') === 'true' && showVoteButton && !hasVoted) {
      const user = sessionStorage.getItem('user')
      if (user) {
        setHasVoted(true)
        toast({
          title: 'Vote registered!',
          description: `Your vote for "${title.replace("Support ", "").replace("'s Needs", "")}" has been recorded. Thank you for making your voice heard!`,
        })
        // Clean up the URL without reloading
        window.history.replaceState({}, '', pathname)
      }
    }
  }, [searchParams, showVoteButton, hasVoted, toast, title, pathname])

  // Payment fields
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [street, setStreet] = useState('')
  const [street2, setStreet2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('US')

  const finalAmount = selectedAmount ?? (customAmount ? parseFloat(customAmount) : null)
  const displayRaised = amountRaised + (showConfirmation && finalAmount ? finalAmount : 0)
  const displayCount = supporterCount + (showConfirmation ? 1 : 0)

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }
  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  function handleAmountNext() {
    if (!finalAmount || finalAmount <= 0) return
    setStep('payment')
  }

  async function handlePaymentSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const { apiDonate } = await import('@/lib/api')
      await apiDonate({
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardName,
        expiry,
        cvc,
        amount: finalAmount!,
        campaign: title,
        street,
        street2,
        city,
        state,
        zip,
        country,
      })
    } catch (err) {
      console.error('API donate failed:', err)
    }
    const newDonor: Donor = {
      name: isAnonymous ? 'Anonymous' : (donorName.trim() || 'A supporter'),
      amount: finalAmount!,
      isAnonymous,
      date: 'Just now',
    }
    setDonors([newDonor, ...donors])
    setStep('confirmed')
    setShowConfirmation(true)
  }

  function handleClose() {
    setStep('amount')
    setSelectedAmount(null)
    setCustomAmount('')
    setIsMonthly(false)
    setIsAnonymous(false)
    setDonorName('')
    setCardNumber('')
    setCardName('')
    setExpiry('')
    setCvc('')
    setStreet('')
    setStreet2('')
    setCity('')
    setState('')
    setZip('')
    setCountry('US')
  }

  function handleVote() {
    const user = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null
    if (user) {
      setHasVoted(true)
    } else {
      router.push(`/auth/signup?redirect=${encodeURIComponent(pathname + '?voted=true')}`)
    }
  }

  return (
    <div className="rounded-2xl bg-background shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border bg-muted/30">
        <h3 className="font-semibold text-sm">{title}</h3>
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="font-bold text-primary text-lg">${displayRaised.toLocaleString()}</span>
            <span className="text-muted-foreground text-xs">of ${goalAmount.toLocaleString()}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1.5">
            <span>{progressPercentage}% funded</span>
            <span>{displayCount} supporters</span>
          </div>
        </div>
      </div>

      {/* Step: Amount */}
      {step === 'amount' && (
        <div className="p-5 space-y-5">
          <div>
            <p className="text-sm font-medium mb-3">Select amount</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[25, 50, 100, 250, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount('') }}
                  className={cn(
                    'py-2.5 px-3 text-sm font-medium rounded-lg border transition-colors',
                    selectedAmount === amt
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input hover:bg-muted hover:border-primary'
                  )}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
              <input
                type="number"
                min="1"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                className="w-full h-11 pl-7 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isMonthly}
              onChange={(e) => setIsMonthly(e.target.checked)}
              className="size-4 rounded border-input accent-primary"
            />
            <span className="text-sm">Make this a monthly donation</span>
          </label>

          <Button
            className="w-full"
            size="lg"
            onClick={handleAmountNext}
            disabled={!finalAmount || finalAmount <= 0}
          >
            Continue to Payment
            {finalAmount && finalAmount > 0 ? ` — $${finalAmount}${isMonthly ? '/mo' : ''}` : ''}
          </Button>

          {showVoteButton && (
            hasVoted ? (
              <div className="w-full flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                <ThumbsUp className="size-4" />
                You&apos;ve voted — thank you!
              </div>
            ) : (
              <Button variant="outline" className="w-full" size="lg" onClick={handleVote}>
                <ThumbsUp className="size-4 mr-2" />
                {voteLabel}
              </Button>
            )
          )}

          {/* Recent Donors */}
          <RecentDonors donors={donors} />
        </div>
      )}

      {/* Step: Payment */}
      {step === 'payment' && (
        <form onSubmit={handlePaymentSubmit} className="p-5 space-y-5">
          <button
            type="button"
            onClick={() => setStep('amount')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back
          </button>

          <div className="rounded-lg bg-primary/5 border border-primary/10 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium">Donating</span>
            <span className="font-bold text-primary">
              ${finalAmount}{isMonthly ? '/month' : ' one-time'}
            </span>
          </div>

          {/* Card Details */}
          <div>
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              Card Details
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1.5">Card Number</label>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Name on Card</label>
                <input
                  required
                  type="text"
                  placeholder="Jane Smith"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Expiry</label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">CVC</label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="w-full h-11 px-3 pr-9 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <p className="text-sm font-semibold mb-3">Billing Address</p>
            <div className="space-y-3">
              <input
                required
                type="text"
                placeholder="Street address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Apt, Suite, Unit (optional)"
                value={street2}
                onChange={(e) => setStreet2(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  required
                  type="text"
                  placeholder="State"
                  maxLength={2}
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
                  className="h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="ZIP Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-11 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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

          {/* Donor Identity */}
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm font-semibold">Your Name on Donation</p>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer bg-muted/30">
              <button
                type="button"
                role="switch"
                aria-checked={isAnonymous}
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={cn(
                  'relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0',
                  isAnonymous ? 'bg-primary' : 'bg-muted-foreground/30'
                )}
              >
                <span className={cn(
                  'inline-block size-4 rounded-full bg-white shadow transition-transform',
                  isAnonymous ? 'translate-x-4' : 'translate-x-0.5'
                )} />
              </button>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {isAnonymous ? <EyeOff className="size-4 text-muted-foreground shrink-0" /> : <Eye className="size-4 text-muted-foreground shrink-0" />}
                <span className="text-sm">{isAnonymous ? 'Donate anonymously' : 'Show my name publicly'}</span>
              </div>
            </div>
            {!isAnonymous && (
              <input
                type="text"
                placeholder="Display name (e.g. Jane D. or Jane & Bob)"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Lock className="size-4 mr-2" />
            Donate ${finalAmount}{isMonthly ? '/month' : ' Securely'}
          </Button>

          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
            <Shield className="size-3.5" />
            Encrypted & secure. Tax-deductible receipt by email.
          </p>
        </form>
      )}

      {/* Step: Confirmed */}
      {step === 'confirmed' && (
        <div className="p-5">
          {/* Success Banner */}
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center mb-5">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3">
              <CheckCircle className="size-8 text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-1">Donation Confirmed!</h4>
            <p className="text-muted-foreground text-sm">
              Thank you for your{isMonthly ? ' monthly ' : ' '}donation of{' '}
              <span className="font-semibold text-foreground">${finalAmount}{isMonthly ? '/mo' : ''}</span>.
              A tax-deductible receipt has been sent to your email.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1.5 text-xs">
              {isAnonymous ? <EyeOff className="size-3.5 text-muted-foreground" /> : <Eye className="size-3.5 text-muted-foreground" />}
              <span className="text-muted-foreground">
                {isAnonymous ? 'Listed as Anonymous' : `Listed as ${donorName || 'A supporter'}`}
              </span>
            </div>
          </div>

          {/* Updated Progress */}
          <div className="mb-5 p-4 rounded-xl border border-border">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-bold text-primary">${displayRaised.toLocaleString()}</span>
              <span className="text-muted-foreground text-xs">of ${goalAmount.toLocaleString()}</span>
            </div>
            <Progress value={progressPercentage} className="h-2.5" />
            <p className="text-xs text-muted-foreground mt-1.5">{displayCount} supporters — including you!</p>
          </div>

          {/* Recent Donors */}
          <RecentDonors donors={donors} highlight />

          <Button variant="outline" className="w-full mt-4" onClick={handleClose}>
            <X className="size-4 mr-2" />
            Close
          </Button>
        </div>
      )}
    </div>
  )
}

function RecentDonors({ donors, highlight = false }: { donors: Donor[]; highlight?: boolean }) {
  return (
    <div className={cn('rounded-xl border border-border overflow-hidden', highlight && 'border-primary/20')}>
      <div className="px-4 py-2.5 bg-muted/40 border-b border-border flex items-center gap-2">
        <Heart className="size-3.5 text-primary" />
        <span className="text-xs font-semibold">Recent Donors</span>
      </div>
      <ul className="divide-y divide-border">
        {donors.slice(0, 5).map((donor, i) => (
          <li key={i} className={cn('flex items-center justify-between px-4 py-2.5', i === 0 && highlight && 'bg-primary/5')}>
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {donor.isAnonymous ? '?' : donor.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{donor.name}</p>
                <p className="text-xs text-muted-foreground">{donor.date}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-primary shrink-0 ml-2">${donor.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
