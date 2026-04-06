import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

export function TestimonialSection() {
  const featured = testimonials[0]

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-8">
            <Quote className="size-6 text-primary" />
          </div>

          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed mb-10">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mb-3">
              {featured.author.split(' ').map(n => n[0]).join('')}
            </div>
            <p className="font-semibold">{featured.author}</p>
            <p className="text-sm text-muted-foreground">{featured.role}</p>
            <p className="text-sm text-muted-foreground">{featured.location}</p>
          </div>
        </div>

        {/* Additional testimonials */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {testimonials.slice(1).map((testimonial) => (
            <div key={testimonial.id} className="rounded-2xl p-8 border border-border">
              <Quote className="size-5 text-primary/40 mb-4" />
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
