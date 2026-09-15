import Link from 'next/link'
import React from 'react'
import SocialLinks from './SocialLinks'
import { AUTHOR, ROUTES } from '@/lib/site'

// Muted body copy, full-strength headings. Both clear 4.5:1 in either theme
// (dark/75 on #f5f5f5 is 7.22, light/75 on black is 10.56).
const muted = 'text-dark/75 dark:text-light/75'
const linkClass = `${muted} hover:text-primary dark:hover:text-primary-dark transition-colors`
const headingClass = 'font-semibold text-dark dark:text-light mb-4'

const Footer = () => {
  return (
    <footer className='mt-24 md:mt-32 mx-4 md:mx-32 border-t border-dark/10 dark:border-light/10'>
      <div className='py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Brand */}
        <div className='flex flex-col items-start gap-4'>
          <Link
            href='/'
            className='flex items-center gap-3 group'
            aria-label={`${AUTHOR.name} — home`}
          >
            <span className='flex size-11 items-center justify-center rounded-full bg-dark text-light
              dark:bg-light dark:text-dark font-bold transition-transform duration-200 group-hover:scale-105'>
              GK
            </span>
            <span className='font-bold text-lg text-dark dark:text-light'>{AUTHOR.name}</span>
          </Link>
          <p className={`${muted} max-w-xs text-sm my-4 leading-relaxed`}>
            {AUTHOR.jobTitle} in {AUTHOR.locality}, {AUTHOR.country}. Building web and
            mobile products, and the data pipelines behind them.
          </p>
          <div className='flex flex-wrap items-center gap-2'>
            <SocialLinks sizeClass='size-7' />
          </div>
        </div>

        {/* Navigation */}
        <nav aria-labelledby='footer-nav'>
          <h2 id='footer-nav' className={headingClass}>Navigation</h2>
          <ul className='flex flex-col gap-3 text-sm'>
            {ROUTES.map(({path, label}) => (
              <li key={path}>
                <Link href={path} className={linkClass}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-labelledby='footer-services'>
          <h2 id='footer-services' className={headingClass}>Services</h2>
          <ul className='flex flex-col gap-3 text-sm'>
            <li>
              Mobile development
            </li>
            <li>
              Web development
            </li>
            <li>
              Data engineering
            </li>
            <li>
              Cloud Computing
            </li>   
            <li>
              Ai Automations
            </li>         
          </ul>
        </nav>

        {/* Call to action */}
        <div>
          <h2 className={headingClass}>Have a project in mind?</h2>
          <p className={`${muted} text-sm leading-relaxed mb-4`}>
            Tell me what you&apos;re building and I&apos;ll get back to you.
          </p>
          <Link
            href='/contacts'
            className='inline-flex rounded-lg bg-dark px-6 py-3 text-base font-semibold text-light
              hover:bg-dark/85 dark:bg-light dark:text-dark dark:hover:bg-light/85 transition-colors'
          >
            Start a conversation
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-dark/10 dark:border-light/10 py-6 flex flex-col md:flex-row
        items-center justify-between gap-2 text-sm'>
        <p className={muted}>
          2022-{new Date().getFullYear()} &copy; {AUTHOR.name}. All Rights Reserved.
        </p>
        <p className={muted}>
          Built with <span className='text-primary dark:text-primary-dark'>&#9825;</span> and Next.js
        </p>
      </div>
    </footer>
  )
}

export default Footer
