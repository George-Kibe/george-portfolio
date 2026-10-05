import Link from 'next/link'
import React from 'react'
import { ArrowRight as TbArrowRight, CalendarDays as TbCalendarEvent, ExternalLink as TbExternalLink } from 'lucide-react'
import { CALENDLY_URL } from '@/lib/site'

// The two ways to start working together: book a call or get a quote. Used on
// the home, about and contact pages; follows the theme like the other cards.
const ProjectCta = ({ className = '' }) => (
  <section aria-labelledby="project-cta"
    className={`w-full rounded-3xl border border-line shadow-[0_12px_32px_-12px_rgb(37_99_235/0.35)] bg-card p-8 text-foreground md:p-12 ${className}`}>
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-xl">
        <h2 id="project-cta" className="text-3xl font-bold leading-tight md:text-4xl">Let&apos;s tell your story</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Book a free call to talk through your footage, or get a ballpark price for your edit in about a
          minute.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-transparent bg-accent px-6
            font-semibold text-white transition-colors hover:border-foreground hover:bg-transparent hover:text-foreground
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text">
          <TbCalendarEvent className="size-5" aria-hidden="true" />
          Book a consultation
          <TbExternalLink className="size-4 opacity-70" aria-hidden="true" />
          <span className="sr-only">(opens Calendly in a new tab)</span>
        </a>
        <Link href="/quote"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-foreground px-6 font-semibold
            transition-colors hover:bg-foreground hover:text-background
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text">
          Get a quote
          <TbArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
)

export default ProjectCta
