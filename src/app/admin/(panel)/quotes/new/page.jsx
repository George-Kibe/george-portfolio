import Link from 'next/link'
import { requireAdminPage } from '@/lib/session'
import { createQuote } from '@/app/actions/quotes'
import ActionForm from '@/components/admin/ActionForm'
import QuoteFields from '@/components/admin/QuoteFields'
import { PageHeader, Panel } from '@/components/admin/ui'

export const metadata = { title: 'Add quote' }

export default async function NewQuotePage() {
  await requireAdminPage()
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/quotes" className="text-sm font-semibold underline underline-offset-4">← Quotes</Link>
      <PageHeader title="Add a quote" description="For requests that came in by phone, email or a call. The estimate is calculated on save." />
      <Panel>
        <ActionForm action={createQuote} submitLabel="Create quote">
          <QuoteFields />
        </ActionForm>
      </Panel>
    </div>
  )
}
