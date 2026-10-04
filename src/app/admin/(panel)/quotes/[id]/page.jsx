import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { formatMoney } from '@/lib/quote'
import { deleteQuote, updateQuote } from '@/app/actions/quotes'
import ActionForm from '@/components/admin/ActionForm'
import DeleteButton from '@/components/admin/DeleteButton'
import QuoteFields from '@/components/admin/QuoteFields'
import { Badge, PageHeader, Panel, SavedNotice, formatDate } from '@/components/admin/ui'
import Quote from '@/models/Quote'

export const metadata = { title: 'Quote' }

export default async function QuotePage({ params, searchParams }) {
  await requireAdminPage()
  const { id } = await params
  const { saved } = await searchParams
  if (!isValidObjectId(id)) notFound()
  await connectDB()
  const quote = serialize(await Quote.findById(id).lean())
  if (!quote) notFound()

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/quotes" className="text-sm font-semibold underline underline-offset-4">← Quotes</Link>
      <PageHeader title={quote.name}
        description={<>{quote.reference} · received {formatDate(quote.createdAt)}{quote.source === 'admin' ? ' · added by you' : ''}</>}
        action={<Badge tone={quote.status} />} />
      <SavedNotice show={saved === '1'}>Quote created.</SavedNotice>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <Panel>
          <ActionForm action={updateQuote.bind(null, id)} submitLabel="Save changes">
            <QuoteFields quote={quote} />
          </ActionForm>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel>
            <h2 className="text-sm font-semibold text-dark/70 dark:text-light/70">Estimate</h2>
            <p className="mt-1 text-2xl font-bold tabular-nums">{formatMoney(quote.estimateLow)} – {formatMoney(quote.estimateHigh)}</p>
            {quote.weeksLow && <p className="text-sm text-dark/70 dark:text-light/70">{quote.weeksLow}–{quote.weeksHigh} weeks</p>}
            <ul className="mt-4 flex flex-col gap-1.5 border-t border-dark/10 pt-3 text-sm dark:border-light/10">
              {quote.items.map((item) => (
                <li key={item.label} className="flex justify-between gap-3">
                  <span className="text-dark/80 dark:text-light/80">{item.label}</span>
                  <span className="shrink-0 tabular-nums">{formatMoney(item.low)}–{formatMoney(item.high)}</span>
                </li>
              ))}
            </ul>
            <a href={`mailto:${quote.email}?subject=${encodeURIComponent(`Your quote ${quote.reference}`)}`}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg border-2 border-dark font-semibold
                hover:bg-dark hover:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark">
              Email {quote.name.split(' ')[0]}
            </a>
          </Panel>
          <Panel>
            <h2 className="font-semibold">Delete this quote</h2>
            <p className="mt-1 mb-4 text-sm text-dark/70 dark:text-light/70">This can&apos;t be undone.</p>
            <DeleteButton action={deleteQuote.bind(null, id)} redirectTo="/admin/quotes" />
          </Panel>
        </div>
      </div>
    </div>
  )
}
