"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft as TbChevronLeft, ChevronRight as TbChevronRight, Quote as TbQuote, Star as TbStarFilled } from 'lucide-react'

// One horizontal row of testimonials: one card per view on phones, two on
// tablets, three on desktop. Native scroll-snap does the swiping; the chevrons
// step one card at a time and dim at either end. They hide when everything
// already fits.
const TestimonialCarousel = ({ items }) => {
 const trackRef = useRef(null)
 const [edges, setEdges] = useState({ start: true, end: false, overflow: false })

 const update = useCallback(() => {
 const el = trackRef.current
 if (!el) return
 const overflow = el.scrollWidth > el.clientWidth + 2
 setEdges({
 start: el.scrollLeft <= 2,
 end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
 overflow,
    })
  }, [])

 useEffect(() => {
 const el = trackRef.current
 if (!el) return
 update()
 el.addEventListener('scroll', update, { passive: true })
 const observer = new ResizeObserver(update)
 observer.observe(el)
 return () => {
 el.removeEventListener('scroll', update)
 observer.disconnect()
    }
  }, [update])

 const step = (direction) => {
 const el = trackRef.current
 const card = el?.firstElementChild
 if (!card) return
 const gap = parseFloat(getComputedStyle(el).columnGap) || 0
 const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
 el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduce ? 'auto' : 'smooth' })
  }

 const chevron = 'flex size-11 items-center justify-center rounded-full border border-line bg-card text-foreground shadow-[0_4px_12px_rgb(0_0_0/0.12)] ' +
    'transition-opacity disabled:cursor-default disabled:opacity-30 cursor-pointer'

 return (
    <div className="relative mt-6 md:mt-8" aria-roledescription="carousel">
      <ul ref={trackRef} tabIndex={0} aria-label="Testimonials"
 className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 motion-reduce:scroll-auto
 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text rounded-2xl">
        {items.map((t, i) => (
          <li key={t._id} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}
 className="flex w-full shrink-0 snap-start flex-col rounded-2xl border border-line bg-card p-5 md:w-[calc(50%-0.5rem)] xl:w-[calc((100%-2rem)/3)]">
            <TbQuote className="size-6 text-accent-text" aria-hidden="true" />
            <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
              <p className="whitespace-pre-line">{t.quote}</p>
            </blockquote>
            <div className="mt-4 flex items-end justify-between gap-4 border-t border-line pt-3">
              <div>
                <p className="font-semibold">{t.name}</p>
                {t.role && <p className="text-sm text-muted">{t.role}</p>}
              </div>
              <p className="flex shrink-0 gap-0.5 text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }, (_, k) => <TbStarFilled key={k} className="size-4" aria-hidden="true" />)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {edges.overflow && (
        <>
          {/* Desktop: chevrons sit on the row's edges. */}
          <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous testimonial"
 className={`${chevron} absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex`}>
            <TbChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="Next testimonial"
 className={`${chevron} absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 lg:flex`}>
            <TbChevronRight className="size-6" aria-hidden="true" />
          </button>
          {/* Phones and tablets: below the row, out of the card's way. */}
          <div className="mt-4 flex justify-center gap-3 lg:hidden">
            <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous testimonial" className={chevron}>
              <TbChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="Next testimonial" className={chevron}>
              <TbChevronRight className="size-6" aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TestimonialCarousel
