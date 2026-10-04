"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { TbCalendarEvent, TbCheck, TbCircleCheckFilled } from 'react-icons/tb'
import {
  DEFAULT_SELECTION, PROJECT_TYPES, TIMELINES,
  estimateQuote, featuresFor, formatMoney,
} from '@/lib/quote'
import { submitQuote } from '@/app/actions/quotes'
import { CALENDLY_URL } from '@/lib/site'
import { createSubmissionGuard } from '@/lib/submissionGuard'
import { reportError } from '@/lib/reportError'

const guard = createSubmissionGuard('quote')

// Same field treatment as ContactForm: v4 preflight leaves inputs borderless.
const fieldClass =
  'w-full rounded-lg border border-dark/50 bg-white px-4 py-3 text-dark placeholder:text-dark/65 ' +
  'dark:border-light/40 dark:bg-dark dark:text-light dark:placeholder:text-light/65'

// Real radio/checkbox inputs, visually replaced by the card around them; the
// card picks up checked and keyboard-focus states through :has().
const optionCard =
  'relative flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-colors ' +
  'border-dark/15 hover:border-dark/40 dark:border-light/15 dark:hover:border-light/40 ' +
  'has-[:checked]:border-primary has-[:checked]:bg-primary/5 ' +
  'dark:has-[:checked]:border-primary-dark dark:has-[:checked]:bg-primary-dark/10 ' +
  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ' +
  'dark:has-[:focus-visible]:outline-primary-dark'

const Step = ({ n, title, hint, children }) => (
  // The divider sits on a wrapper: on the fieldset itself, browsers cut the
  // border around the legend and draw a line through the heading row.
  <div className="border-t border-dark/10 pt-8 first:border-t-0 first:pt-0 dark:border-light/10">
    <fieldset>
      <legend className="flex items-baseline gap-3 text-xl font-bold">
        <span className="tabular-nums text-primary dark:text-primary-dark">{n}</span>{title}
      </legend>
      {hint && <p className="mt-1 text-sm text-dark/70 dark:text-light/70">{hint}</p>}
      <div className="mt-4">{children}</div>
    </fieldset>
  </div>
)

const RadioCards = ({ name, options, value, onChange, cols = 'sm:grid-cols-2' }) => (
  <div className={`grid gap-3 ${cols}`}>
    {options.map((option) => (
      <label key={option.id} className={optionCard}>
        <input type="radio" name={name} value={option.id} checked={value === option.id}
          onChange={() => onChange(option.id)} className="sr-only" />
        <span className="flex items-center justify-between gap-2 font-semibold">
          {option.label}
          {value === option.id && <TbCircleCheckFilled className="size-5 shrink-0 text-primary dark:text-primary-dark" aria-hidden="true" />}
        </span>
        <span className="text-sm text-dark/70 dark:text-light/70">{option.blurb}</span>
      </label>
    ))}
  </div>
)

const QuoteBuilder = () => {
  const [selection, setSelection] = useState(DEFAULT_SELECTION)
  const [status, setStatus] = useState({ state: 'idle' })
  const estimate = useMemo(() => estimateQuote(selection), [selection])
  const doneRef = useRef(null)

  // The confirmation replaces a long form, so bring it into view (and give it
  // focus for screen readers) instead of leaving the visitor at the footer.
  useEffect(() => {
    if (status.state !== 'sent') return
    doneRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    doneRef.current?.focus({ preventScroll: true })
  }, [status.state])
  const available = featuresFor(selection.type)

  const set = (key) => (value) => setSelection((s) => ({ ...s, [key]: value }))

  // Switching type drops features that don't apply to the new one.
  const setType = (type) => setSelection((s) => {
    const allowed = featuresFor(type).map((f) => f.id)
    return { ...s, type, features: s.features.filter((f) => allowed.includes(f)) }
  })

  const toggleFeature = (id) => setSelection((s) => ({
    ...s,
    features: s.features.includes(id) ? s.features.filter((f) => f !== id) : [...s.features, id],
  }))

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    if (guard.isBot({ website: data.website })) return
    const verdict = guard.check()
    if (!verdict.allowed) {
      setStatus({
        state: 'error',
        message: verdict.reason === 'too-fast'
          ? `Please wait ${verdict.retryInSeconds}s before sending another request.`
          : 'Too many requests sent. Please try again later, or book a consultation instead.',
      })
      return
    }

    const contact = { name: data.name.trim(), email: data.email.trim(), details: data.details?.trim() }
    setStatus({ state: 'sending' })

    // Saved to the database, then emailed to George and the client from the
    // server (see submitQuote).
    let saved
    try {
      saved = await submitQuote({ ...contact, ...selection })
    } catch (error) {
      reportError(error, { where: 'QuoteBuilder.submit' })
      saved = { ok: false, error: 'The request didn’t go through. Please try again, or book a consultation instead.' }
    }
    if (!saved.ok) {
      setStatus({ state: 'error', message: saved.error })
      return
    }
    guard.record()

    setStatus({ state: 'sent', reference: saved.reference, estimate, name: contact.name })
  }

  if (status.state === 'sent') {
    const sent = status.estimate
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="mx-auto max-w-2xl rounded-3xl focus:outline-none border border-dark/15 bg-white p-8 text-center dark:border-light/15 dark:bg-dark md:p-12">
        <TbCircleCheckFilled className="mx-auto size-12 text-primary dark:text-primary-dark" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold md:text-3xl">Thanks, {status.name}. Your request is in.</h2>
        <p className="mt-3 leading-relaxed text-dark/80 dark:text-light/80">
          Your reference is <strong className="tabular-nums text-dark dark:text-light">{status.reference}</strong>.
          A copy is on its way to your inbox. I&apos;ll review the details and reply with a firm quote, usually within
          two working days.
        </p>
        <p className="mt-6 text-sm font-medium text-dark/70 dark:text-light/70">Your estimate</p>
        <p className="text-3xl font-bold tabular-nums">{formatMoney(sent.low)} – {formatMoney(sent.high)}</p>
        <p className="text-sm text-dark/70 dark:text-light/70">{sent.weeks[0]}–{sent.weeks[1]} weeks</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-dark px-6 font-semibold text-light
              hover:bg-dark/85 dark:bg-light dark:text-dark dark:hover:bg-light/85">
            <TbCalendarEvent className="size-5" aria-hidden="true" /> Book a call to discuss it
            <span className="sr-only">(opens Calendly in a new tab)</span>
          </a>
          <button type="button" onClick={() => { setSelection(DEFAULT_SELECTION); setStatus({ state: 'idle' }) }}
            className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-dark px-6 font-semibold
              hover:bg-dark hover:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark cursor-pointer">
            Start another quote
          </button>
        </div>
      </div>
    )
  }

  const total = `${formatMoney(estimate.low)} – ${formatMoney(estimate.high)}`

  return (
    <form onSubmit={submit} className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
      <div className="flex flex-col gap-8">
        <Step n="1" title="What are you building?">
          <RadioCards name="type" options={PROJECT_TYPES} value={selection.type} onChange={setType} />
        </Step>

        <Step n="2" title="What should it do?" hint="Pick any that apply. Leave them all off if you're not sure yet.">
          <div className="flex flex-wrap gap-2">
            {available.map((feature) => {
              const on = selection.features.includes(feature.id)
              return (
                <label key={feature.id}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium
                    transition-colors border-dark/15 hover:border-dark/40 dark:border-light/15 dark:hover:border-light/40
                    has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-white
                    dark:has-[:checked]:border-primary-dark dark:has-[:checked]:bg-primary-dark dark:has-[:checked]:text-black
                    has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
                  <input type="checkbox" checked={on} onChange={() => toggleFeature(feature.id)} className="sr-only" />
                  {on && <TbCheck className="size-4" aria-hidden="true" />}
                  {feature.label}
                </label>
              )
            })}
          </div>
        </Step>

        <Step n="3" title="When do you need it?">
          <RadioCards name="timeline" options={TIMELINES} value={selection.timeline} onChange={set('timeline')} cols="sm:grid-cols-3" />
        </Step>

        <Step n="4" title="Where should I send the quote?">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Honeypot: hidden from people, irresistible to bots. */}
            <div aria-hidden="true" className="absolute -m-px h-px w-px overflow-hidden opacity-0 pointer-events-none">
              <label htmlFor="quote-website">Leave this field empty</label>
              <input id="quote-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div>
              <label htmlFor="quote-name" className="mb-1.5 block text-sm font-semibold">Name</label>
              <input id="quote-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="quote-email" className="mb-1.5 block text-sm font-semibold">Email</label>
              <input id="quote-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="quote-details" className="mb-1.5 block text-sm font-semibold">
                Tell me about the project <span className="font-normal text-dark/65 dark:text-light/65">(optional)</span>
              </label>
              <textarea id="quote-details" name="details" rows={3} className={fieldClass}
                placeholder="Anything I should know? Who it's for, what exists already…" />
            </div>
          </div>
        </Step>
      </div>

      {/* Estimate: sticky beside the form on desktop, at the end on smaller screens. */}
      <aside aria-labelledby="estimate-heading"
        className="rounded-3xl border border-dark/15 bg-white p-6 dark:border-light/15 dark:bg-dark lg:sticky lg:top-8">
        <h2 id="estimate-heading" className="text-sm font-semibold text-dark/70 dark:text-light/70">Your estimate</h2>
        <div aria-live="polite">
          <p className="mt-1 text-3xl font-bold tabular-nums leading-tight">{total}</p>
          <p className="mt-1 text-sm text-dark/70 dark:text-light/70">
            About {estimate.weeks[0]}–{estimate.weeks[1]} weeks
          </p>
        </div>
        <ul className="mt-6 flex flex-col gap-2 border-t border-dark/10 pt-4 text-sm dark:border-light/10">
          {estimate.items.map((item) => (
            <li key={item.label} className="flex justify-between gap-4">
              <span className="text-dark/80 dark:text-light/80">{item.label}</span>
              <span className="shrink-0 tabular-nums">{formatMoney(item.low)}–{formatMoney(item.high)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-dark/70 dark:text-light/70">
          A ballpark to plan around, not a final price. I&apos;ll confirm a fixed quote after a short call about the details.
        </p>

        {status.state === 'error' && (
          <p role="alert" className="mt-4 rounded-lg bg-red-600/10 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300">
            {status.message}
          </p>
        )}

        <button type="submit" disabled={status.state === 'sending'}
          className="mt-6 h-12 w-full rounded-lg bg-dark font-semibold text-light transition-colors hover:bg-dark/85
            disabled:opacity-60 dark:bg-light dark:text-dark dark:hover:bg-light/85 cursor-pointer
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary-dark">
          {status.state === 'sending' ? 'Sending…' : 'Request this quote'}
        </button>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
          className="mt-3 flex h-11 items-center justify-center gap-2 text-sm font-semibold underline underline-offset-4">
          <TbCalendarEvent className="size-4" aria-hidden="true" /> Rather talk it through? Book a call
          <span className="sr-only">(opens Calendly in a new tab)</span>
        </a>
      </aside>

      {/* Phones: keep the running total in view while picking options. */}
      <div className="sticky bottom-3 z-10 -mt-6 flex items-center justify-between gap-3 rounded-2xl bg-dark px-4 py-3 text-light
        shadow-[0_8px_24px_rgb(0_0_0/0.25)] dark:bg-light dark:text-dark lg:hidden" aria-hidden="true">
        <span className="text-xs font-medium opacity-80">Estimate</span>
        <span className="font-bold tabular-nums">{total}</span>
      </div>
    </form>
  )
}

export default QuoteBuilder
