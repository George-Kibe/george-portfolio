import AnimatedText from '@/components/AnimatedText'
import ProjectCta from '@/components/ProjectCta'
import Link from 'next/link'
import React from 'react'
import { TbArrowRight, TbCheck } from 'react-icons/tb'
import { SERVICES } from '@/lib/services'

export const metadata = {
  title: 'Services — Web, Mobile, Data & Automation',
  description:
    'Web and mobile development, data engineering, cloud computing and AI automations ' +
    'by George Kibe, a full-stack developer in Nairobi, Kenya.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services by George Kibe — Web, Mobile, Data & Automation',
    description:
      'What George Kibe builds: websites, web and mobile apps, data pipelines, cloud setups and AI automations.',
  },
}

const ServicesPage = () => (
  <div className="flex w-full flex-col items-center md:px-8 lg:px-32">
    <main className="w-full">
      <AnimatedText text="What I Can Build For You" />
      <p className="mx-auto max-w-prose text-center leading-relaxed text-dark/75 dark:text-light/75">
        From the screen someone taps to the pipeline behind it. Pick one, or combine them for a product
        that runs end to end.
      </p>

      {/* Jump links, so footer links and long scrolls land on the right card. */}
      <nav aria-label="Services" className="mt-8 flex flex-wrap justify-center gap-2">
        {SERVICES.map(({ id, name }) => (
          <a key={id} href={`#${id}`}
            className="inline-flex h-11 items-center rounded-full border border-dark/20 px-4 text-sm font-medium
              transition-colors hover:border-dark dark:border-light/20 dark:hover:border-light">
            {name}
          </a>
        ))}
      </nav>

      <div className="mt-12 flex flex-col gap-8">
        {SERVICES.map(({ id, name, icon: Icon, summary, includes, tools }) => (
          <section key={id} id={id} aria-labelledby={`${id}-title`}
            className="scroll-mt-8 grid gap-8 rounded-2xl border border-dark bg-white p-6 dark:border-light dark:bg-dark
              md:p-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
            <div>
              <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-xl
                border border-dark/15 text-primary dark:border-light/15 dark:text-primary-dark">
                <Icon className="size-7" />
              </span>
              <h2 id={`${id}-title`} className="mt-4 text-2xl font-bold leading-tight md:text-3xl">{name}</h2>
              <p className="mt-3 leading-relaxed text-dark/75 dark:text-light/75">{summary}</p>
              <Link href="/quote"
                className="group mt-6 inline-flex h-11 items-center gap-2 font-semibold text-primary underline-offset-4
                  hover:underline dark:text-primary-dark">
                Get an estimate<span className="sr-only"> for {name.toLowerCase()}</span>
                <TbArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-dark/70 dark:text-light/70">What&apos;s included</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {includes.map((item) => (
                    <li key={item} className="flex gap-2 leading-snug">
                      <TbCheck className="mt-0.5 size-5 shrink-0 text-primary dark:text-primary-dark" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-dark/70 dark:text-light/70">Tools</h3>
                <ul aria-label={`${name} tools`} className="mt-3 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <li key={tool} className="rounded-full bg-dark/5 px-3 py-1 text-sm font-medium
                      text-dark/85 dark:bg-light/10 dark:text-light/85">{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ProjectCta className="mt-16 md:mt-24" />
    </main>
  </div>
)

export default ServicesPage
