import React from 'react'
import { getPublishedBrands } from '@/lib/queries'
import { cld } from '@/lib/cloudinaryUrl'

// "Brands I've worked with": an infinite, CSS-only marquee. The list is
// rendered twice and the track slides by exactly half its width, so the loop
// is seamless. It pauses on hover/focus, and under Reduce Motion it becomes a
// static, wrapped row (see .marquee in globals.css).

const Brand = ({ brand, hidden = false }) => {
  const mark = brand.logo ? (
    // eslint-disable-next-line @next/next/no-img-element -- Cloudinary already serves a resized, auto-format logo
    <img src={cld(brand.logo, { height: 96 })} alt={hidden ? '' : brand.name} loading="lazy" decoding="async"
      className="h-8 w-auto max-w-40 object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0
        dark:brightness-0 dark:invert md:h-10" />
  ) : (
    <span className="whitespace-nowrap text-lg font-bold tracking-tight text-muted transition-colors group-hover:text-foreground md:text-xl">
      {brand.name}
    </span>
  )
  const className = 'group flex shrink-0 items-center px-6 md:px-10'
  return brand.website && !hidden ? (
    <a href={brand.website} target="_blank" rel="noopener noreferrer" className={className} title={brand.name}>{mark}</a>
  ) : (
    <span className={className}>{mark}</span>
  )
}

const BrandMarquee = async () => {
  const brands = await getPublishedBrands()
  if (brands.length === 0) return null

  // About 3.5s per brand keeps the speed steady however many there are.
  const duration = `${Math.max(20, brands.length * 3.5)}s`

  return (
    <section aria-labelledby="brands-heading" className="mt-12 w-full md:mt-16">
      <h2 id="brands-heading" className="text-center text-sm font-semibold text-muted">
        Brands I&apos;ve worked with
      </h2>
      <div className="marquee mt-5 overflow-hidden">
        <div className="marquee-track flex w-max items-center" style={{ '--marquee-duration': duration }}>
          <ul className="flex items-center">
            {brands.map((b) => <li key={b._id}><Brand brand={b} /></li>)}
          </ul>
          <ul className="marquee-copy flex items-center" aria-hidden="true">
            {brands.map((b) => <li key={b._id}><Brand brand={b} hidden /></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee
