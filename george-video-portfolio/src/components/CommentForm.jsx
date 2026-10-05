"use client"

import React, { useActionState, useEffect, useRef } from 'react'
import { addComment } from '@/app/actions/content'
import { fieldClass } from './AuthForm'

const CommentForm = ({ postId }) => {
  const [state, action, pending] = useActionState(addComment.bind(null, postId), undefined)
  const formRef = useRef(null)

  // Clear the box once a comment has gone through.
  useEffect(() => {
    if (state?.ok) formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3">
      <label htmlFor="comment-body" className="font-semibold">Add a comment</label>
      <textarea id="comment-body" name="body" rows={4} maxLength={2000} required className={fieldClass}
        placeholder="Share a thought or a question…" />
      {state?.error && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">{state.error}</p>
      )}
      <button type="submit" disabled={pending}
        className="self-start h-11 rounded-lg bg-accent px-5 font-semibold text-white hover:bg-accent-hover disabled:opacity-60
          cursor-pointer">
        {pending ? 'Posting…' : 'Post comment'}
      </button>
    </form>
  )
}

export default CommentForm
