"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { reportError } from '@/lib/reportError'

// Catches render and data errors below the root layout. Without this, a thrown
// error rendered Next's bare default page with no reporting and no way back.
export default function Error({ error, reset }) {
  useEffect(() => {
    reportError(error, { boundary: 'app/error' })
  }, [error])

  return (
    <main className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-3xl md:text-5xl font-bold">Something went wrong</h1>
      <p className="max-w-prose">
        That page failed to load. The error has been logged.
      </p>
      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={reset}
          className="bg-dark text-light dark:bg-light dark:text-dark py-3 px-6 rounded-lg text-base font-semibold"
        >
          Try again
        </button>
        <Link href="/" className="py-3 px-6 text-base font-medium underline underline-offset-2">
          Go home
        </Link>
      </div>
      {error?.digest ? (
        <p className="text-xs text-dark/65 dark:text-light/65 mt-2">Reference: {error.digest}</p>
      ) : null}
    </main>
  )
}
