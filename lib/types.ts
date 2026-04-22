// HavenBridge Type Definitions

export interface StorySegment {
  id: string
  // Short tag/emoji + category label, e.g. "Their beginning"
  chapter: string
  // Main body text of this slide
  body: string
  // Optional pull-quote or highlight line surfaced above the body
  pullQuote?: string
}

export interface Child {
  id: string
  firstName: string
  initials: string
  ageRange: string
  region: string
  image?: string
  supportSummary: string
  needs: string[]
  goals: string[]
  talents: string[]
  votes: number
  fundsRaised: number
  fundingGoal: number
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  recentUpdates: Update[]
  relatedPrograms: string[]
  activeCampaigns: string[]
  story?: StorySegment[]
}

export interface Home {
  id: string
  name: string
  type: 'foster' | 'transitional' | 'group'
  city: string
  state: string
  isVerified: boolean
  mission: string
  description: string
  services: string[]
  currentNeeds: string[]
  childrenSupported: number
  capacity: number
  donationProgress: number
  donationGoal: number
  votes: number
  teamMembers: TeamMember[]
  licensingInfo: string
  recentUpdates: Update[]
  fundingAllocation: FundingAllocation[]
}

export interface Program {
  id: string
  name: string
  type: 'education' | 'therapy' | 'enrichment' | 'mentorship' | 'life-skills'
  city: string
  state: string
  isVerified: boolean
  mission: string
  description: string
  services: string[]
  currentNeeds: string[]
  childrenSupported: number
  donationProgress: number
  donationGoal: number
  votes: number
  recentUpdates: Update[]
}

export interface Campaign {
  id: string
  title: string
  description: string
  category: 'essentials' | 'education' | 'therapy' | 'enrichment' | 'emergency' | 'home-upgrades'
  goalAmount: number
  amountRaised: number
  supporterCount: number
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  endDate: string
  beneficiaryType: 'child' | 'home' | 'program' | 'general'
  beneficiaryId?: string
  beneficiaryName?: string
  recentUpdates: Update[]
  impactDescription: string
}

export interface Update {
  id: string
  date: string
  title: string
  content: string
}

export interface TeamMember {
  name: string
  role: string
  yearsExperience: number
}

export interface FundingAllocation {
  category: string
  percentage: number
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  location: string
  image?: string
}

export interface User {
  id: string
  fullName: string
  email: string
  votesUsed: number
  totalDonated: number
  savedCauses: string[]
  followedCampaigns: string[]
  paymentMethods: PaymentMethod[]
}

export interface PaymentMethod {
  id: string
  type: 'card'
  last4: string
  expiry: string
  cardholderName: string
  isDefault: boolean
}

export interface Donation {
  id: string
  amount: number
  date: string
  recipientType: 'campaign' | 'home' | 'program' | 'general'
  recipientId: string
  recipientName: string
  isRecurring: boolean
}

export interface Vote {
  id: string
  date: string
  targetType: 'home' | 'program' | 'campaign' | 'child'
  targetId: string
  targetName: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface ImpactStat {
  label: string
  value: string
  description: string
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export interface TrustBadge {
  icon: string
  label: string
  description: string
}

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical'
