import Link from 'next/link'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { formatMoney, PROJECT_TYPES } from '@/lib/quote'
import { Badge, Empty, NewButton, PageHeader, formatDate, inputClass } from '@/components/admin/ui'
import Quote from '@/models/Quote'

export const metadata = { title: 'Quotes' }

const STATUSES = ['all', 'new', 'contacted', 'quoted', 'won', 'lost']
const typeLabel = (id) => PROJECT_TYPES.find((t) => t.id === id)?.label ?? id
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default async function QuotesPage({ searchParams }) {
  await requireAdminPage()
  const { status = 'all', q = '' } = await searchParams
  await connectDB()

  const filter = {}
  if (STATUSES.includes(status) && status !== 'all') filter.status = status
  const term = q.trim().slice(0, 100)
  if (term) {
    const rx = new RegExp(escapeRegex(term), 'i')
    filter.$or = [{ name: rx }, { email: rx }, { reference: rx }]
  }
  const quotes = serialize(await Quote.find(filter).sort({ createdAt: -1 }).limit(200).lean())

  const tabHref = (s) => `/admin/quotes?${new URLSearchParams({ ...(s !== 'all' && { status: s }), ...(term && { q: term }) })}`

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Quotes" description="Every request from the Get a Quote page, newest first."
        action={<NewButton href="/admin/quotes/new">Add quote</NewButton>} />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <Link key={s} href={tabHref(s)} aria-current={status === s ? 'page' : undefined}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold capitalize
                ${status === s ? 'bg-accent text-white' : 'bg-foreground/5 hover:bg-foreground/10'}`}>
              {s}
            </Link>
          ))}
        </nav>
        <form className="flex gap-2" role="search">
          {status !== 'all' && <input type="hidden" name="status" value={status} />}
          <label htmlFor="quote-search" className="sr-only">Search quotes</label>
          <input id="quote-search" name="q" defaultValue={term} placeholder="Name, email or reference" className={`${inputClass} md:w-72`} />
        </form>
      </div>

      {quotes.length === 0 ? (
        <Empty>{term || status !== 'all' ? 'No quotes match this filter.' : 'No quote requests yet.'}</Empty>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-foreground/5 text-xs uppercase tracking-wide ">
              <tr>
                <th scope="col" className="px-4 py-3">Client</th>
                <th scope="col" className="px-4 py-3">Project</th>
                <th scope="col" className="px-4 py-3">Estimate</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/10 bg-card">
              {quotes.map((quote) => (
                <tr key={quote._id} className="hover:bg-foreground/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/quotes/${quote._id}`} className="font-semibold underline-offset-4 hover:underline">{quote.name}</Link>
                    <div className="text-muted">{quote.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    {typeLabel(quote.projectType)}
                    <div className="text-xs text-muted">{quote.reference}</div>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{formatMoney(quote.estimateLow)}–{formatMoney(quote.estimateHigh)}</td>
                  <td className="px-4 py-3"><Badge tone={quote.status} /></td>
                  <td className="px-4 py-3 text-muted">{formatDate(quote.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
