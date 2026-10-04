"use client"

import React, { useActionState } from 'react'
import Link from 'next/link'
import { requestPasswordReset, resetPassword } from '@/app/actions/auth'
import { fieldClass } from './AuthForm'

const submitClass =
  'h-12 rounded-lg bg-dark font-semibold text-light transition-colors hover:bg-dark/85 disabled:opacity-60 ' +
  'dark:bg-light dark:text-dark dark:hover:bg-light/85 cursor-pointer'

const FieldError = ({ id, error }) =>
  error ? <p id={id} className="mt-1.5 text-sm text-red-700 dark:text-red-300">{error}</p> : null

export const ForgotPasswordForm = () => {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined)
  if (state?.ok) {
    return (
      <div role="status" className="flex flex-col gap-4">
        <p className="rounded-lg bg-emerald-500/15 px-4 py-3 font-medium text-emerald-800 dark:text-emerald-300">{state.message}</p>
        <Link href="/login" className="font-semibold text-primary underline underline-offset-4 dark:text-primary-dark">Back to sign in</Link>
      </div>
    )
  }
  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="forgot-email" className="mb-1.5 block text-sm font-semibold">Email</label>
        <input id="forgot-email" name="email" type="email" autoComplete="email" required className={fieldClass}
          defaultValue={state?.values?.email} aria-invalid={Boolean(state?.errors?.email)}
          aria-describedby={state?.errors?.email ? 'forgot-email-error' : undefined} />
        <FieldError id="forgot-email-error" error={state?.errors?.email} />
      </div>
      <button type="submit" disabled={pending} className={submitClass}>{pending ? 'Sending…' : 'Send reset link'}</button>
      <p className="text-center text-sm">
        <Link href="/login" className="font-semibold text-primary underline underline-offset-4 dark:text-primary-dark">Back to sign in</Link>
      </p>
    </form>
  )
}

export const ResetPasswordForm = ({ token }) => {
  const [state, action, pending] = useActionState(resetPassword, undefined)
  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="token" value={token} />
      <div>
        <label htmlFor="reset-password" className="mb-1.5 block text-sm font-semibold">New password</label>
        <input id="reset-password" name="password" type="password" autoComplete="new-password" minLength={8} required
          className={fieldClass} aria-invalid={Boolean(state?.errors?.password)}
          aria-describedby={state?.errors?.password ? 'reset-password-error' : 'reset-password-hint'} />
        {state?.errors?.password
          ? <FieldError id="reset-password-error" error={state.errors.password} />
          : <p id="reset-password-hint" className="mt-1.5 text-xs text-dark/65 dark:text-light/65">At least 8 characters.</p>}
      </div>
      <div>
        <label htmlFor="reset-confirm" className="mb-1.5 block text-sm font-semibold">Confirm new password</label>
        <input id="reset-confirm" name="confirm" type="password" autoComplete="new-password" required className={fieldClass}
          aria-invalid={Boolean(state?.errors?.confirm)} aria-describedby={state?.errors?.confirm ? 'reset-confirm-error' : undefined} />
        <FieldError id="reset-confirm-error" error={state?.errors?.confirm} />
      </div>
      {state?.message && (
        <p role="alert" className="rounded-lg bg-red-600/10 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300">
          {state.message}{' '}
          {state.expired && <Link href="/forgot-password" className="underline underline-offset-4">Request a new link</Link>}
        </p>
      )}
      <button type="submit" disabled={pending} className={submitClass}>{pending ? 'Saving…' : 'Set new password'}</button>
    </form>
  )
}
