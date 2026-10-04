import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteComment, deletePost, updatePost } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import DeleteButton from '@/components/admin/DeleteButton'
import PostFields from '@/components/admin/PostFields'
import { PageHeader, Panel, SavedNotice, formatDate } from '@/components/admin/ui'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import '@/models/User'

export const metadata = { title: 'Edit post' }

export default async function EditPostPage({ params, searchParams }) {
  await requireAdminPage()
  const { id } = await params
  const { saved } = await searchParams
  if (!isValidObjectId(id)) notFound()
  await connectDB()
  const [post, comments] = await Promise.all([
    Post.findById(id).lean().then(serialize),
    Comment.find({ post: id }).sort({ createdAt: -1 }).populate('user', 'name email').lean().then(serialize),
  ])
  if (!post) notFound()

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/blog" className="text-sm font-semibold underline underline-offset-4">← Blog</Link>
      <PageHeader title={post.title}
        description={post.published ? <Link href={`/articles/${post.slug}`} className="underline underline-offset-4">View on site</Link> : 'Draft: not visible on the site.'}
        action={<DeleteButton action={deletePost.bind(null, id)} redirectTo="/admin/blog" label="Delete post" />} />
      <SavedNotice show={saved === '1'}>Post created.</SavedNotice>

      <Panel>
        <ActionForm action={updatePost.bind(null, id)} submitLabel="Save post">
          <PostFields post={post} />
        </ActionForm>
      </Panel>

      <Panel>
        <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
        {comments.length === 0 ? (
          <p className="mt-3 text-dark/70 dark:text-light/70">No comments on this post.</p>
        ) : (
          <ul className="mt-4 divide-y divide-dark/10 dark:divide-light/10">
            {comments.map((c) => (
              <li key={c._id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{c.user?.name ?? 'Deleted user'}</span>
                    <span className="text-dark/65 dark:text-light/65"> · {c.user?.email} · {formatDate(c.createdAt)}</span>
                  </p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed">{c.body}</p>
                </div>
                <DeleteButton action={deleteComment.bind(null, c._id)} small />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}
