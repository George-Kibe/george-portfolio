"use client"

import { useEffect } from 'react'
import { reportError } from '@/lib/reportError'

// Last resort: catches errors thrown by the root layout itself, where the
// normal error boundary cannot render. Must supply its own <html>/<body>.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    reportError(error, { boundary: 'app/global-error' })
  }, [error])

  return (
    <html lang="en">
      <body style={{
        margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1rem',
        background: '#1b1b1b', color: '#f5f5f5', textAlign: 'center',
        fontFamily: 'system-ui, sans-serif', padding: '2rem',
      }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Something went wrong</h1>
        <p style={{ margin: 0 }}>The site failed to load. The error has been logged.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: '1rem', padding: '0.6rem 1.5rem', fontSize: '1rem',
            borderRadius: '0.5rem', border: 0, cursor: 'pointer',
            background: '#f5f5f5', color: '#1b1b1b', fontWeight: 600,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
