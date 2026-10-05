import React from 'react'
import { FEATURES, PROJECT_TYPES, TIMELINES } from '@/lib/quote'
import { Field, inputClass } from './ui'

const STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost']

// Fields for creating or editing a quote. Features that don't apply to the
// chosen project type are dropped on save, and the estimate is recalculated.
const QuoteFields = ({ quote = {} }) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Name" htmlFor="q-name">
        <input id="q-name" name="name" required defaultValue={quote.name} className={inputClass} />
      </Field>
      <Field label="Email" htmlFor="q-email">
        <input id="q-email" name="email" type="email" required defaultValue={quote.email} className={inputClass} />
      </Field>
      <Field label="Project type" htmlFor="q-type">
        <select id="q-type" name="projectType" defaultValue={quote.projectType ?? 'webapp'} className={inputClass}>
          {PROJECT_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </Field>
      <Field label="Timeline" htmlFor="q-timeline">
        <select id="q-timeline" name="timeline" defaultValue={quote.timeline ?? 'standard'} className={inputClass}>
          {TIMELINES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </Field>
      <Field label="Status" htmlFor="q-status">
        <select id="q-status" name="status" defaultValue={quote.status ?? 'new'} className={`${inputClass} capitalize`}>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
    </div>

    <fieldset>
      <legend className="mb-2 text-sm font-semibold">Features</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <label key={f.id} className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="features" value={f.id} defaultChecked={quote.features?.includes(f.id)}
              className="size-4" />
            {f.label}
          </label>
        ))}
      </div>
    </fieldset>

    <Field label="Project details (from the client)" htmlFor="q-details">
      <textarea id="q-details" name="details" rows={4} defaultValue={quote.details} className={inputClass} />
    </Field>
    <Field label="Private notes" htmlFor="q-notes" hint="Only visible here.">
      <textarea id="q-notes" name="adminNotes" rows={4} defaultValue={quote.adminNotes} className={inputClass} />
    </Field>
  </>
)

export default QuoteFields
