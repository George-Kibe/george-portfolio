import Link from 'next/link'
import React from 'react'

// Shared admin building blocks (server-safe: no hooks).

export const inputClass =
  'w-full rounded-lg border border-dark/40 bg-white px-3 py-2.5 text-dark ' +
  'dark:border-light/35 dark:bg-black dark:text-light ' +
  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary dark:focus-visible:outline-primary-dark'

export const buttonClass =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-dark px-5 font-semibold text-light transition-colors ' +
  'hover:bg-dark/85 disabled:opacity-60 dark:bg-light dark:text-dark dark:hover:bg-light/85 cursor-pointer'

export const ghostButtonClass =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-dark/70 px-5 font-semibold transition-colors ' +
  'hover:bg-dark hover:text-light dark:border-light/70 dark:hover:bg-light dark:hover:text-dark'

export const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      {description && <p className="mt-1 text-dark/70 dark:text-light/70">{description}</p>}
    </div>
    {action}
  </div>
)

export const NewButton = ({ href, children }) => (
  <Link href={href} className={buttonClass}>{children}</Link>
)

export const Field = ({ label, htmlFor, hint, children, className = '' }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">{label}</label>
    {children}
    {hint && <p className="mt-1 text-xs text-dark/65 dark:text-light/65">{hint}</p>}
  </div>
)

export const Panel = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-dark/15 bg-white p-5 dark:border-light/15 dark:bg-dark md:p-6 ${className}`}>
    {children}
  </div>
)

const STATUS_TONE = {
  new: 'bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark',
  contacted: 'bg-amber-500/15 text-amber-800 dark:text-amber-300',
  quoted: 'bg-violet-500/15 text-violet-800 dark:text-violet-300',
  won: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
  lost: 'bg-dark/10 text-dark/70 dark:bg-light/10 dark:text-light/70',
  published: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
  draft: 'bg-dark/10 text-dark/70 dark:bg-light/10 dark:text-light/70',
}

export const Badge = ({ tone, children }) => (
  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_TONE[tone] ?? STATUS_TONE.draft}`}>
    {children ?? tone}
  </span>
)

export const Empty = ({ children }) => (
  <p className="rounded-2xl border border-dashed border-dark/25 p-8 text-center text-dark/70 dark:border-light/25 dark:text-light/70">
    {children}
  </p>
)

export const SavedNotice = ({ show, children = 'Saved.' }) =>
  show ? (
    <p role="status" className="rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
      {children}
    </p>
  ) : null

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
