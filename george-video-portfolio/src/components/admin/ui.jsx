import Link from 'next/link'
import React from 'react'

// Shared admin building blocks (server-safe: no hooks).

export const inputClass =
  'w-full rounded-lg border border-line bg-background px-3 py-2.5 text-foreground ' +
  '  ' +
  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent-text'

export const buttonClass =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 font-semibold text-white transition-colors ' +
  'hover:bg-accent-hover disabled:opacity-60 cursor-pointer'

export const ghostButtonClass =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-line px-5 font-semibold transition-colors ' +
  'hover:bg-foreground hover:text-background'

export const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      {description && <p className="mt-1 text-muted">{description}</p>}
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
    {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
  </div>
)

export const Panel = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-line bg-card p-5 md:p-6 ${className}`}>
    {children}
  </div>
)

const STATUS_TONE = {
 new: 'bg-accent/15 text-accent-text',
 contacted: 'bg-amber-500/15 text-amber-800 dark:text-amber-300',
 quoted: 'bg-violet-500/15 text-violet-800 dark:text-violet-300',
 won: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
 lost: 'bg-foreground/10 text-muted  ',
 published: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
 draft: 'bg-foreground/10 text-muted  ',
}

export const Badge = ({ tone, children }) => (
  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_TONE[tone] ?? STATUS_TONE.draft}`}>
    {children ?? tone}
  </span>
)

export const Empty = ({ children }) => (
  <p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted ">
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
