import { Shield, Lock, Eye, UserCheck, HeartHandshake, Scale } from 'lucide-react'

const trustPoints = [
  {
    icon: Scale,
    title: 'No Child Ranked by Money',
    description: 'Placement decisions are never influenced by donations or public votes. Every child receives care based on their needs.',
  },
  {
    icon: UserCheck,
    title: 'Licensed Professionals Only',
    description: 'All placement decisions are made by licensed caseworkers and child welfare professionals.',
  },
  {
    icon: Eye,
    title: 'Votes Affect Visibility Only',
    description: 'Community votes help prioritize which campaigns and homes receive attention. Votes never influence child welfare decisions.',
  },
  {
    icon: HeartHandshake,
    title: 'Donations Support Care',
    description: 'Your donations fund essentials, education, therapy, enrichment, and stability with transparent allocation.',
  },
  {
    icon: Lock,
    title: 'Privacy-Safe Profiles',
    description: 'We show only first names, age ranges, and regions. No identifying information is ever shared publicly.',
  },
  {
    icon: Shield,
    title: 'Trauma-Informed Care',
    description: 'All partner homes and programs are trained in trauma-informed approaches for sensitive, appropriate care.',
  },
]

export function TrustSafety() {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trust & Safety
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Child welfare is our top priority. Here&apos;s how we protect children and maintain transparency.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {trustPoints.map((point) => (
            <div key={point.title} className="text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <point.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
