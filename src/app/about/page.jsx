import AnimatedText from '@/components/AnimatedText'
import React from 'react'
import Link from 'next/link'
import { TbBook2, TbChess, TbMapPin, TbPlane, TbSchool } from 'react-icons/tb'
import { RiDownload2Line } from 'react-icons/ri'
import Process from '@/components/Process'
import Skills from '@/components/Skills'
import Toolbox from '@/components/Toolbox'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import { AUTHOR, RESUME_PATH } from '@/lib/site'


export const metadata = {
  title: 'About — Developer & Data Engineer in Nairobi',
  description:
    'George Kibe is a University of Nairobi graduate and full-stack developer ' +
    'specialising in mobile and web development, data engineering and data science. ' +
    'Read about his process, toolbox, work experience and education.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About George Kibe — Developer & Data Engineer in Nairobi',
    description:
      'Process, toolbox, experience and education of George Kibe, a full-stack web and ' +
      'mobile developer based in Nairobi, Kenya.',
  },
}

const STATS = [
  { value: 25, label: 'Satisfied clients' },
  { value: 30, label: 'Completed projects' },
  { value: 4, label: 'Years of experience' },
]

const OFF_THE_CLOCK = [
  { icon: TbChess, label: 'Chess' },
  { icon: TbBook2, label: 'Creative reading & writing' },
  { icon: TbPlane, label: 'Travelling' },
]

const strong = 'font-semibold text-dark dark:text-light'

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center md:px-8 lg:px-32">
      <main className="w-full items-center">
        <AnimatedText text={"Passion Fuels Purpose! Why Fuels How!"} />

        <section className="mt-6 grid w-full items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">{AUTHOR.jobTitle}</h2>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-dark/75 dark:text-light/75">
              <span className="inline-flex items-center gap-1.5">
                <TbMapPin className="size-4.5 text-primary dark:text-primary-dark" aria-hidden="true" />
                {AUTHOR.locality}, {AUTHOR.country}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <TbSchool className="size-4.5 text-primary dark:text-primary-dark" aria-hidden="true" />
                {AUTHOR.alumniOf}
              </span>
            </p>

            <div className="mt-6 flex max-w-prose flex-col gap-4 leading-relaxed text-dark/80 dark:text-light/80">
              <p>
                Hola! I&apos;m George, a tech enthusiast who likes building solutions that take
                the <span className={strong}>boring, repetitive work</span> off people&apos;s plates. Most of what
                I build pairs an app people actually touch with the <span className={strong}>automation and
                data pipelines</span> quietly running behind it.
              </p>
              <p>
                My route here wasn&apos;t a straight line. I studied Real Estate at the University of Nairobi
                and worked in banking and property valuation before retraining in software engineering
                and data engineering. Today I build <span className={strong}>web and mobile applications</span> with
                React, Next.js, React Native and Django, and do <span className={strong}>data engineering and
                data science</span> work in Python and SQL.
              </p>
              <p>
                I&apos;m especially drawn to <span className={strong}>innovative startups</span>. If you&apos;re building
                one, or anything that needs a solid app and the data behind it, I&apos;d love to hear about it.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={RESUME_PATH} target="_blank" download
                className="inline-flex h-12 items-center rounded-lg border-2 border-transparent bg-dark px-6 font-semibold text-light
                  transition-colors hover:border-dark hover:bg-light hover:text-dark
                  dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light">
                Resume <RiDownload2Line className="ml-2 size-5" aria-hidden="true" />
              </Link>
              <Link href="/contacts"
                className="inline-flex h-12 items-center rounded-lg border-2 border-dark px-6 font-semibold
                  transition-colors hover:bg-dark hover:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark">
                Let&apos;s talk
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-dark/15 bg-white p-6 dark:border-light/15 dark:bg-dark md:p-8">
            {/* Plain numbers: the old count-up rendered a bare "+" until JS ran. */}
            <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-dark/10 lg:dark:divide-light/10">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse gap-1 lg:flex-row-reverse lg:items-baseline lg:justify-end lg:gap-4 lg:py-4 lg:first:pt-0">
                  <dt className="text-sm font-medium text-dark/75 dark:text-light/75 md:text-base">{label}</dt>
                  <dd className="text-3xl font-bold tabular-nums md:text-4xl lg:w-20">{value}+</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-dark/10 pt-6 dark:border-light/10">
              <h2 className="font-semibold">Off the clock</h2>
              <ul className="mt-3 flex flex-col gap-2.5 text-dark/80 dark:text-light/80">
                {OFF_THE_CLOCK.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon className="size-5 text-primary dark:text-primary-dark" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <Process />
        <Skills />
        <Toolbox />
        <Experience />
        <Education />
      </main>
    </div>
  )
}

export default AboutPage
