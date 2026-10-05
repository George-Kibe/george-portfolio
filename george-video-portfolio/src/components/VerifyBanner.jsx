"use client"

import React, { useState, useTransition } from 'react'
import { resendVerification } from '@/app/actions/auth'

// Gentle reminder for members who haven't confirmed their email. Nothing is
// blocked by it; it just offers to resend the link.
const VerifyBanner = ({ email }) => {
 const [result, setResult] = useState(null)
 const [pending, startTransition] = useTransition()
 return (
    <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">
      <p>
        Please confirm <strong>{email}</strong> using the link we emailed you.{' '}
        <button type="button" disabled={pending}
 onClick={() => startTransition(async () => setResult(await resendVerification()))}
 className="font-semibold underline underline-offset-4 disabled:opacity-60 cursor-pointer">
          {pending ? 'Sending…' : 'Resend the link'}
        </button>
      </p>
      {result && (
        <p role="status" className={`mt-1 font-medium ${result.ok ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-600 dark:text-red-400'}`}>
          {result.message ?? result.error}
        </p>
      )}
    </div>
  )
}

export default VerifyBanner
