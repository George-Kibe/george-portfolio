import React from 'react'
import TestimonialCarousel from './TestimonialCarousel'
import { getPublishedTestimonials } from '@/lib/queries'

// Published testimonials from the admin panel, shown as a single scrollable
// row (TestimonialCarousel). Renders nothing until at least one is published,
// so an empty database never leaves a bare heading on the page.
const Testimonials = async () => {
  const items = await getPublishedTestimonials()
  if (items.length === 0) return null

  return (
    <section aria-labelledby="testimonials-heading" className="mt-20 w-full md:mt-28">
      <h2 id="testimonials-heading" className="text-center text-3xl font-bold leading-tight md:text-4xl">
        What clients say
      </h2>
      <TestimonialCarousel items={items} />
    </section>
  )
}

export default Testimonials
