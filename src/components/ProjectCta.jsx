import Link from 'next/link'
import React from 'react'
import { TbArrowRight, TbCalendarEvent, TbExternalLink } from 'react-icons/tb'
import { CALENDLY_URL } from '@/lib/site'

// The two ways to start working together, used on the home and contact pages.
// It follows the theme like the site's other cards (white on light, #1b1b1b on
// black) and gets its weight from the bordered frame and offset edge used by
// the project cards, rather than from an inverted panel.
const ProjectCta = ({ className = '' }) => (
  <section aria-labelledby="project-cta"
    className={`w-full rounded-3xl border-2 border-r-8 border-b-8 border-dark bg-white p-8 text-dark
      dark:border-light dark:bg-dark dark:text-light md:p-12 ${className}`}>
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-xl">
        <h2 id="project-cta" className="text-3xl font-bold leading-tight md:text-4xl">Let&apos;s build your next project</h2>
        <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">
          Book a free call to talk it through, or put together a quick estimate for your web, mobile or
          data project in a couple of minutes.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-dark px-6
            font-semibold text-light transition-colors hover:border-dark hover:bg-transparent hover:text-dark
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-transparent dark:hover:text-light
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
            dark:focus-visible:outline-primary-dark">
          <TbCalendarEvent className="size-5" aria-hidden="true" />
          Book a consultation
          <TbExternalLink className="size-4 opacity-70" aria-hidden="true" />
          <span className="sr-only">(opens Calendly in a new tab)</span>
        </a>
        <Link href="/quote"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-dark px-6 font-semibold
            transition-colors hover:bg-dark hover:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
            dark:focus-visible:outline-primary-dark">
          Get a quote
          <TbArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
)

export default ProjectCta
