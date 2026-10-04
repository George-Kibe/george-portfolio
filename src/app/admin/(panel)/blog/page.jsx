import Link from 'next/link'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { Badge, Empty, NewButton, PageHeader, formatDate, inputClass } from '@/components/admin/ui'
import Pagination from '@/components/Pagination'
import { postSearchFilter } from '@/lib/queries'
import Post from '@/models/Post'
import Comment from '@/models/Comment'

export const metadata = { title: 'Blog' }

const PER_PAGE = 20

export default async function BlogAdminPage({ searchParams }) {
  await requireAdminPage()
  const params = await searchParams
  const q = String(params.q ?? '').trim().slice(0, 100)
  await connectDB()

  const filter = postSearchFilter(q)
  const total = await Post.countDocuments(filter)
  const pages = Math.max(1, Math.ceil(total / PER_PAGE))
  const page = Math.min(Math.max(1, Number.parseInt(params.page, 10) || 1), pages)
  const [posts, counts] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1, _id: -1 }).skip((page - 1) * PER_PAGE).limit(PER_PAGE).select('-content').lean().then(serialize),
    Comment.aggregate([{ $group: { _id: '$post', n: { $sum: 1 } } }]),
  ])
  const href = (n) => {
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (n > 1) sp.set('page', String(n))
    const qs = sp.toString()
    return qs ? `/admin/blog?${qs}` : '/admin/blog'
  }
  const commentCount = Object.fromEntries(counts.map((c) => [String(c._id), c.n]))

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Blog" description="Published posts appear on the Articles page."
        action={<NewButton href="/admin/blog/new">New post</NewButton>} />
      <form role="search" className="flex flex-wrap items-center gap-2">
        <label htmlFor="post-search" className="sr-only">Search posts</label>
        <input id="post-search" name="q" type="search" defaultValue={q} placeholder="Search title, excerpt or tag"
          className={`${inputClass} md:w-80`} />
        <button type="submit" className="h-11 rounded-lg border-2 border-dark/70 px-4 font-semibold dark:border-light/70 cursor-pointer">Search</button>
        {q && <Link href="/admin/blog" className="text-sm font-semibold underline underline-offset-4">Clear</Link>}
        <span className="ml-auto text-sm text-dark/65 dark:text-light/65">{total} post{total === 1 ? '' : 's'}</span>
      </form>

      {posts.length === 0 ? (
        <Empty>{q ? 'No posts match that search.' : <>No posts yet. Write one, or run <code>npm run seed</code> to load the starter articles.</>}</Empty>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-dark/15 dark:border-light/15">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-dark/5 text-xs uppercase tracking-wide dark:bg-light/5">
              <tr>
                <th scope="col" className="px-4 py-3">Title</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Comments</th>
                <th scope="col" className="px-4 py-3">Published</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/10 bg-white dark:divide-light/10 dark:bg-dark">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-dark/5 dark:hover:bg-light/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${post._id}`} className="font-semibold underline-offset-4 hover:underline">{post.title}</Link>
                    <div className="text-xs text-dark/60 dark:text-light/60">/articles/{post.slug}</div>
                  </td>
                  <td className="px-4 py-3"><Badge tone={post.published ? 'published' : 'draft'}>{post.published ? 'Published' : 'Draft'}</Badge></td>
                  <td className="px-4 py-3 tabular-nums">{commentCount[post._id] ?? 0}</td>
                  <td className="px-4 py-3 text-dark/70 dark:text-light/70">{post.publishedAt ? formatDate(post.publishedAt) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} pages={pages} href={href} label="Post pages" />
    </div>
  )
}
