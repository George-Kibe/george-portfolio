import Link from 'next/link'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { formatMoney, PROJECT_TYPES } from '@/lib/quote'
import { Badge, Empty, PageHeader, Panel, formatDate } from '@/components/admin/ui'
import Quote from '@/models/Quote'
import Post from '@/models/Post'
import Testimonial from '@/models/Testimonial'
import Comment from '@/models/Comment'
import User from '@/models/User'
import Brand from '@/models/Brand'
import Project from '@/models/Project'

export const metadata = { title: 'Dashboard' }

const typeLabel = (id) => PROJECT_TYPES.find((t) => t.id === id)?.label ?? id

export default async function AdminDashboard() {
  await requireAdminPage()
  await connectDB()

  const [newQuotes, quotes, published, drafts, testimonials, comments, members, brands, projects, recent] = await Promise.all([
    Quote.countDocuments({ status: 'new' }),
    Quote.countDocuments(),
    Post.countDocuments({ published: true }),
    Post.countDocuments({ published: false }),
    Testimonial.countDocuments(),
    Comment.countDocuments(),
    User.countDocuments({ role: 'user' }),
    Brand.countDocuments(),
    Project.countDocuments(),
    Quote.find().sort({ createdAt: -1 }).limit(5).lean().then(serialize),
  ])

  const stats = [
    { label: 'New quotes', value: newQuotes, href: '/admin/quotes?status=new' },
    { label: 'All quotes', value: quotes, href: '/admin/quotes' },
    { label: 'Published posts', value: published, href: '/admin/blog' },
    { label: 'Drafts', value: drafts, href: '/admin/blog' },
    { label: 'Testimonials', value: testimonials, href: '/admin/testimonials' },
    { label: 'Comments', value: comments, href: '/admin/blog' },
    { label: 'Projects', value: projects, href: '/admin/projects' },
    { label: 'Brands', value: brands, href: '/admin/brands' },
    { label: 'Members', value: members },
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Dashboard" description="Quote requests, testimonials and the blog at a glance." />

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {stats.map(({ label, value, href }) => {
          const body = (
            <>
              <dt className="text-sm font-medium text-dark/70 dark:text-light/70">{label}</dt>
              <dd className="mt-1 text-3xl font-bold tabular-nums">{value}</dd>
            </>
          )
          return href ? (
            <Link key={label} href={href} className="rounded-2xl border border-dark/15 bg-white p-4 transition-colors
              hover:border-dark dark:border-light/15 dark:bg-dark dark:hover:border-light">{body}</Link>
          ) : (
            <div key={label} className="rounded-2xl border border-dark/15 bg-white p-4 dark:border-light/15 dark:bg-dark">{body}</div>
          )
        })}
      </dl>

      <Panel>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">Latest quote requests</h2>
          <Link href="/admin/quotes" className="text-sm font-semibold underline underline-offset-4">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="mt-4"><Empty>No quote requests yet. They&apos;ll appear here as soon as someone sends one.</Empty></div>
        ) : (
          <ul className="mt-4 divide-y divide-dark/10 dark:divide-light/10">
            {recent.map((q) => (
              <li key={q._id}>
                <Link href={`/admin/quotes/${q._id}`} className="flex flex-wrap items-center justify-between gap-3 py-3 hover:underline underline-offset-4">
                  <span>
                    <span className="font-semibold">{q.name}</span>
                    <span className="text-dark/70 dark:text-light/70"> · {typeLabel(q.projectType)}</span>
                  </span>
                  <span className="flex items-center gap-3 text-sm">
                    <span className="tabular-nums">{formatMoney(q.estimateLow)}–{formatMoney(q.estimateHigh)}</span>
                    <Badge tone={q.status} />
                    <span className="text-dark/65 dark:text-light/65">{formatDate(q.createdAt)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}
