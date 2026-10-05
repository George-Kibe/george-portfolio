"use client"

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

// Two-step delete: the first click arms it, the second deletes. Avoids a
// blocking confirm() dialog while still guarding against slips.
const DeleteButton = ({ action, redirectTo, label = 'Delete', small = false }) => {
 const [armed, setArmed] = useState(false)
 const [pending, startTransition] = useTransition()
 const router = useRouter()

 const run = () => startTransition(async () => {
 await action()
 if (redirectTo) router.push(redirectTo)
 router.refresh()
  })

 const size = small ? 'h-9 px-3 text-sm' : 'h-11 px-5'
 if (!armed) {
 return (
      <button type="button" onClick={() => setArmed(true)}
 className={`inline-flex items-center rounded-lg border-2 border-red-600/60 font-semibold text-red-700
 hover:bg-red-600/10 dark:border-red-400/60 dark:text-red-300 cursor-pointer ${size}`}>
        {label}
      </button>
    )
  }
 return (
    <span className="inline-flex items-center gap-2">
      <button type="button" onClick={run} disabled={pending}
 className={`inline-flex items-center rounded-lg bg-red-600 font-semibold text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer ${size}`}>
        {pending ? 'Deleting…' : 'Confirm delete'}
      </button>
      <button type="button" onClick={() => setArmed(false)} disabled={pending}
 className={`inline-flex items-center rounded-lg font-semibold underline underline-offset-4 cursor-pointer ${size}`}>
        Cancel
      </button>
    </span>
  )
}

export default DeleteButton
