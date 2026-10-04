"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb'
import AnimatedText from './AnimatedText'

// Ordered bottom-up: each step is a layer the next one rests on.
const STEPS = [
  {
    title: 'Understand',
    body: 'Before any code, I find out what the problem really is, who it affects and what it costs them today. The boring, repetitive parts of someone’s work are usually where the best solutions are hiding.',
    delivers: ['Problem brief', 'Success criteria'],
  },
  {
    title: 'Design',
    body: 'Next I sketch the flows people will move through and the system that carries them: screens, data models and the APIs in between. A diagram is cheap to change; a database in production is not.',
    delivers: ['User flows', 'System design'],
  },
  {
    title: 'Data',
    body: 'I work out where the data comes from and how it should live: scraping and cleaning it, then choosing SQL or NoSQL for how it will be read. Solid data underneath keeps every layer above it simple.',
    delivers: ['Database schema', 'Data pipelines'],
  },
  {
    title: 'Build',
    body: 'Then the product itself: web apps in React and Next.js, mobile apps in React Native, and APIs in Django, Node.js or Spring Boot. I ship in small pieces so there is something real to react to early.',
    delivers: ['Web app', 'Mobile app', 'APIs'],
  },
  {
    title: 'Automate',
    body: 'Anything that runs on a schedule or on repeat gets handed to a machine: background jobs with Celery and Redis, and n8n and AI automations for the workflows around the product.',
    delivers: ['Background jobs', 'Workflow automations'],
  },
  {
    title: 'Ship',
    body: 'Finally I deploy to AWS or Google Cloud and Firebase, watch how it is actually used, and feed that back into the next round. Launch is the start of the feedback loop, not the end of the project.',
    delivers: ['Live deployment', 'Monitoring'],
  },
]

const LAST = STEPS.length - 1
const pad = (n) => String(n + 1).padStart(2, '0')

// Planes are squares turned into an isometric diamond. --s is the square's
// side, --gap the vertical distance between layers; the diamond is s√2 wide
// and half that tall.
const planeTone = (state) => ({
  active: 'border-primary dark:border-primary-dark text-primary/40 dark:text-primary-dark/45 bg-[color-mix(in_oklab,var(--color-primary)_18%,var(--color-light))] dark:bg-[color-mix(in_oklab,var(--color-primary-dark)_34%,black)]',
  done: 'border-primary/50 dark:border-primary-dark/45 text-primary/20 dark:text-primary-dark/20 bg-[color-mix(in_oklab,var(--color-primary)_7%,var(--color-light))] dark:bg-[color-mix(in_oklab,var(--color-primary-dark)_14%,black)]',
  todo: 'border-dark/30 dark:border-light/30 text-dark/10 dark:text-light/12 bg-light dark:bg-black',
}[state])

const gridStyle = {
  backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
  backgroundSize: 'calc(var(--s) / 8) calc(var(--s) / 8)',
}

const Process = () => {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <section className="mt-24 md:mt-32">
      <AnimatedText text="My Process" as="h2" />
      <p className="mx-auto max-w-prose text-center leading-relaxed text-dark/75 dark:text-light/75">
        Every project I take on moves through the same six layers. Each one rests on the layer below, so when
        something feels off near the top, I trace it back down the stack and fix it at the source.
      </p>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        {/* The stack */}
        <ol aria-label="Process steps"
          className="relative mx-auto shrink-0 w-[calc(var(--s)*1.4142+160px)] sm:w-[calc(var(--s)*1.4142+180px)] [--s:90px] min-[360px]:[--s:100px] [--gap:44px] sm:[--s:128px] sm:[--gap:50px]"
          style={{ height: `calc(${LAST} * var(--gap) + var(--s) * 0.7071 + 12px)` }}>
          {STEPS.map(({ title }, i) => {
            const state = i === active ? 'active' : i < active ? 'done' : 'todo'
            const top = `calc(${LAST - i} * var(--gap) + 12px)`
            return (
              <li key={title}>
                {/* Plane */}
                <div aria-hidden="true"
                  className={`absolute left-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                    ${state === 'active' ? '-translate-y-2.5' : ''}`}
                  style={{ top, width: 'calc(var(--s) * 1.4142)', height: 'calc(var(--s) * 0.7071)' }}>
                  <div className={`absolute left-1/2 top-1/2 size-(--s) rounded-md border ${planeTone(state)}
                      ${state === 'active' ? 'shadow-[8px_8px_24px_rgb(41_151_255/0.4)]' : ''}`}
                    style={{ ...gridStyle, transform: 'translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)' }} />
                </div>
                {/* Label: the whole row is the hit area */}
                <button type="button" onClick={() => setActive(i)} aria-current={i === active ? 'step' : undefined}
                  className={`group absolute right-0 flex items-center gap-2 pr-1 text-left text-sm sm:text-base
                    rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                    dark:focus-visible:outline-primary-dark cursor-pointer`}
                  style={{
                    top: `calc(${LAST - i} * var(--gap) + 12px + var(--s) * 0.3535 - var(--gap) / 2)`,
                    height: 'var(--gap)',
                    left: 'calc(var(--s) * 1.4142 + 8px)',
                  }}>
                  <span aria-hidden="true"
                    className={`h-px w-5 sm:w-8 transition-colors ${state === 'active'
                      ? 'bg-primary dark:bg-primary-dark' : 'border-t border-dashed border-dark/30 dark:border-light/30'}`} />
                  <span className={`tabular-nums text-xs font-semibold ${state === 'active'
                    ? 'text-primary dark:text-primary-dark' : 'text-dark/60 dark:text-light/60'}`}>{pad(i)}</span>
                  <span className={`font-semibold transition-colors ${state === 'active'
                    ? 'text-primary dark:text-primary-dark'
                    : 'text-dark/70 group-hover:text-dark dark:text-light/70 dark:group-hover:text-light'}`}>{title}</span>
                </button>
              </li>
            )
          })}
        </ol>

        {/* The detail card */}
        <div className="min-w-0 rounded-2xl border border-dark/15 bg-white p-5 sm:p-6 shadow-[0_8px_24px_rgb(0_0_0/0.06)]
          dark:border-light/15 dark:bg-dark md:p-8">
          <div aria-live="polite" className="min-h-64 sm:min-h-56">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}>
                <h3 className="flex items-baseline gap-3 text-2xl font-bold leading-tight">
                  <span className="tabular-nums text-primary dark:text-primary-dark">{pad(active)}</span>
                  {step.title}
                </h3>
                <p className="mt-4 max-w-prose leading-relaxed text-dark/80 dark:text-light/80">{step.body}</p>
                <h4 className="mt-6 text-sm font-semibold text-dark/70 dark:text-light/70">What you get</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {step.delivers.map((item) => (
                    <li key={item} className="rounded-full border border-dark/20 px-3 py-1 text-sm font-medium
                      dark:border-light/20">{item}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dark/10 pt-6 dark:border-light/10">
            <div className="flex gap-1 sm:gap-1.5" aria-hidden="true">
              {STEPS.map(({ title }, i) => (
                <span key={title} className={`h-1 w-3.5 sm:w-7 rounded-full transition-colors duration-300
                  ${i <= active ? 'bg-primary dark:bg-primary-dark' : 'bg-dark/15 dark:bg-light/15'}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setActive((a) => a - 1)} disabled={active === 0}
                className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-dark/40 px-3 sm:px-4 font-semibold
                  transition-colors hover:bg-dark/5 disabled:cursor-not-allowed disabled:opacity-40
                  dark:border-light/40 dark:hover:bg-light/10 cursor-pointer">
                <TbArrowLeft aria-hidden="true" /> Back
              </button>
              <button type="button" onClick={() => setActive((a) => a + 1)} disabled={active === LAST}
                className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-dark px-3 sm:px-4 font-semibold text-light
                  transition-colors hover:bg-dark/85 disabled:cursor-not-allowed disabled:opacity-40
                  dark:bg-light dark:text-dark dark:hover:bg-light/85 cursor-pointer">
                Next <TbArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
