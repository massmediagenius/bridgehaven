import Link from 'next/link'
import { Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { Campaign } from '@/lib/types'

interface CampaignCardProps {
  campaign: Campaign
  variant?: 'default' | 'compact'
}

const urgencyColors = {
  low: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  medium: 'bg-amber-500/10 text-amber-600 border-amber-200',
  high: 'bg-orange-500/10 text-orange-600 border-orange-200',
  critical: 'bg-red-500/10 text-red-600 border-red-200',
}

const urgencyLabels = {
  low: 'Ongoing',
  medium: 'Moderate Need',
  high: 'High Priority',
  critical: 'Urgent',
}

export function CampaignCard({ campaign, variant = 'default' }: CampaignCardProps) {
  const progressPercentage = Math.round((campaign.amountRaised / campaign.goalAmount) * 100)

  if (variant === 'compact') {
    return (
      <div className="rounded-xl bg-background p-6 shadow-sm border border-border">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-semibold line-clamp-1">{campaign.title}</h3>
          <Badge variant="outline" className={urgencyColors[campaign.urgencyLevel]}>
            {urgencyLabels[campaign.urgencyLevel]}
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-3" />
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">${campaign.amountRaised.toLocaleString()} raised</span>
          <span className="text-muted-foreground">${campaign.goalAmount.toLocaleString()} goal</span>
        </div>
        <Button asChild className="w-full mt-4" size="sm">
          <Link href={`/campaigns/${campaign.id}`}>Donate</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="group rounded-2xl bg-background p-6 shadow-sm border border-border transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4 mb-4">
        <Badge variant="outline" className={urgencyColors[campaign.urgencyLevel]}>
          {urgencyLabels[campaign.urgencyLevel]}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="size-4" />
          <span>Ends {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{campaign.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-primary">${campaign.amountRaised.toLocaleString()}</span>
          <span className="text-muted-foreground">of ${campaign.goalAmount.toLocaleString()}</span>
        </div>
        <Progress value={progressPercentage} className="h-2.5" />
        <p className="text-xs text-muted-foreground mt-1">{progressPercentage}% funded</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Users className="size-4" />
        <span>{campaign.supporterCount} supporters</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4 p-3 rounded-lg bg-muted/50">
        {campaign.impactDescription}
      </p>

      <Button asChild className="w-full">
        <Link href={`/campaigns/${campaign.id}`}>Donate Now</Link>
      </Button>
    </div>
  )
}
