"use client"

import React, { useActionState } from 'react'
import { buttonClass } from './ui'

// A form bound to a server action that returns { ok, error?, message? }.
// Create actions redirect on success instead of returning.
const ActionForm = ({ action, submitLabel = 'Save', children, className = '' }) => {
  const [state, formAction, pending] = useActionState(action, undefined)
  return (
    <form action={formAction} className={`flex flex-col gap-5 ${className}`}>
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? 'Saving…' : submitLabel}
        </button>
        <p aria-live="polite" className="text-sm font-medium">
          {state?.error && <span className="text-red-700 dark:text-red-300">{state.error}</span>}
          {state?.ok && state.message && <span className="text-emerald-700 dark:text-emerald-300">{state.message}</span>}
        </p>
      </div>
    </form>
  )
}

export default ActionForm
