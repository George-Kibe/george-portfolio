"use client"

import React, { useActionState } from 'react'
import Link from 'next/link'
import { login, signup } from '@/app/actions/auth'

export const fieldClass =
  'w-full rounded-lg border border-line bg-card px-4 py-3 text-foreground placeholder:text-muted ' +
  ' ' +
  'aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400'

const Field = ({ id, label, error, ...props }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
    <input id={id} className={fieldClass} aria-invalid={Boolean(error)}
 aria-describedby={error ? `${id}-error` : undefined} {...props} />
    {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
)

// mode: 'login' | 'signup' | 'admin'
const AuthForm = ({ mode = 'login', next = '' }) => {
 const isSignup = mode === 'signup'
 const [state, action, pending] = useActionState(isSignup ? signup : login, undefined)
 const values = state?.values ?? {}
 const query = next ? `?next=${encodeURIComponent(next)}` : ''

 return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="next" value={next} />
      {mode === 'admin' && <input type="hidden" name="admin" value="1" />}

      {isSignup && (
        <Field id="auth-name" name="name" label="Name" autoComplete="name" required
 defaultValue={values.name} error={state?.errors?.name} />
      )}
      <Field id="auth-email" name="email" type="email" label="Email" autoComplete="email" required
 defaultValue={values.email} error={state?.errors?.email} />
      <Field id="auth-password" name="password" type="password" label="Password" required
 autoComplete={isSignup ? 'new-password' : 'current-password'} error={state?.errors?.password}
 minLength={isSignup ? 8 : undefined} />

      {!isSignup && (
        <Link href="/forgot-password" className="-mt-2 self-end text-sm font-semibold text-accent-text underline-offset-4 hover:underline">
          Forgot password?
        </Link>
      )}

      {state?.message && (
        <p role="alert" className="rounded-lg bg-red-600/10 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending}
 className="h-12 rounded-lg bg-accent font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60
 cursor-pointer
 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text">
        {pending ? 'Please wait…' : isSignup ? 'Create account' : 'Sign in'}
      </button>

      {mode !== 'admin' && (
        <p className="text-center text-sm text-muted">
          {isSignup ? 'Already have an account? ' : 'New here? '}
          <Link href={`${isSignup ? '/login' : '/signup'}${query}`}
 className="font-semibold text-accent-text underline underline-offset-4">
            {isSignup ? 'Sign in' : 'Create an account'}
          </Link>
        </p>
      )}
    </form>
  )
}

export default AuthForm
