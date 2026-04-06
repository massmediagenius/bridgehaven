import { Heart, ThumbsUp, Home } from 'lucide-react'

const actions = [
  {
    icon: Heart,
    title: 'One Donation',
    description: 'Can fund essentials, education, therapy, or enrichment for a child in need.',
    examples: ['School supplies', 'Therapy sessions', 'Warm clothing', 'Extracurricular activities'],
  },
  {
    icon: ThumbsUp,
    title: 'One Vote',
    description: 'Can elevate urgent home or program needs, directing community attention where it matters most.',
    examples: ['Highlight urgent campaigns', 'Boost program visibility', 'Prioritize critical needs', 'Rally community support'],
  },
  {
    icon: Home,
    title: 'One Safe Placement',
    description: 'Can change a life forever. Every child deserves stability, belonging, and a chance to thrive.',
    examples: ['Stable home environment', 'Consistent caregivers', 'Educational continuity', 'Emotional healing'],
  },
]

export function HowOneActionHelps() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How One Action Helps
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Small actions create ripples of change. Every contribution matters.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {actions.map((action) => (
            <div key={action.title} className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                <action.icon className="size-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{action.title}</h3>
              <p className="text-muted-foreground mb-6">{action.description}</p>
              <ul className="space-y-2 text-left max-w-xs mx-auto">
                {action.examples.map((example) => (
                  <li key={example} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
