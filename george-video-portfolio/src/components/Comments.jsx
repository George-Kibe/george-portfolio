import Link from 'next/link'
import React from 'react'
import CommentForm from './CommentForm'
import VerifyBanner from './VerifyBanner'
import { deleteComment } from '@/app/actions/content'
import { logout } from '@/app/actions/auth'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

// Anyone can read comments; posting needs an account. Authors can delete their
// own comments and admins can delete any (deleteComment re-checks this).
const Comments = ({ postId, slug, comments, user }) => {
  const back = `/articles/${slug}#comments`
  return (
    <section id="comments" aria-labelledby="comments-heading" className="mt-16 border-t border-line pt-10">
      <h2 id="comments-heading" className="text-2xl font-bold">
        Comments <span className="text-muted">({comments.length})</span>
      </h2>

      {comments.length === 0 ? (
        <p className="mt-4 text-muted">No comments yet. Start the conversation.</p>
      ) : (
        <ol className="mt-6 flex flex-col gap-4">
          {comments.map((comment) => {
            const canDelete = user && (user.role === 'admin' || user.id === comment.user?._id)
            return (
              <li key={comment._id} className="rounded-2xl border border-line bg-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">{comment.user?.name ?? 'Former member'}</p>
                  <time dateTime={comment.createdAt} className="text-sm text-muted">
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-muted">{comment.body}</p>
                {canDelete && (
                  <form action={deleteComment.bind(null, comment._id)} className="mt-2">
                    <button type="submit" className="text-sm font-semibold text-red-700 underline-offset-4 hover:underline dark:text-red-300 cursor-pointer">
                      Delete
                    </button>
                  </form>
                )}
              </li>
            )
          })}
        </ol>
      )}

      <div className="mt-8">
        {user ? (
          <>
            {!user.verified && <div className="mb-4"><VerifyBanner email={user.email} /></div>}
            <CommentForm postId={postId} />
            <form action={logout} className="mt-3 text-sm text-muted">
              <input type="hidden" name="next" value={back} />
              Signed in as <strong className="text-foreground">{user.name}</strong>.{' '}
              <button type="submit" className="font-semibold underline underline-offset-4 cursor-pointer">Sign out</button>
            </form>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-line p-6 text-center">
            <p className="font-semibold">Join the conversation</p>
            <p className="mt-1 text-sm text-muted">Sign in or create a free account to comment.</p>
            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={`/login?next=${encodeURIComponent(back)}`}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 font-semibold text-white">
                Sign in
              </Link>
              <Link href={`/signup?next=${encodeURIComponent(back)}`}
                className="inline-flex h-11 items-center justify-center rounded-lg border-2 border-foreground px-5 font-semibold">
                Create account
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Comments
