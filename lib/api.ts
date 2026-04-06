const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function apiSignup(data: {
  name: string
  email: string
  password: string
  cardNumber: string
  cardName: string
  expiry: string
  cvc: string
  street: string
  street2: string
  city: string
  state: string
  zip: string
  country: string
}) {
  const res = await fetch(`${API_BASE}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Signup failed')
  }
  return res.json()
}

export async function apiDonate(data: {
  cardNumber: string
  cardName: string
  expiry: string
  cvc: string
  amount: number
  campaign: string
  street?: string
  street2?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}) {
  const res = await fetch(`${API_BASE}/api/donate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Donation failed')
  }
  return res.json()
}
