import Link from 'next/link'
import { requireAdminPage } from '@/lib/session'
import { createBrand } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import BrandFields from '@/components/admin/BrandFields'
import { PageHeader, Panel } from '@/components/admin/ui'

export const metadata = { title: 'Add brand' }

export default async function NewBrandPage() {
  await requireAdminPage()
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/brands" className="text-sm font-semibold underline underline-offset-4">← Brands</Link>
      <PageHeader title="Add a brand" />
      <Panel>
        <ActionForm action={createBrand} submitLabel="Add brand">
          <BrandFields />
        </ActionForm>
      </Panel>
    </div>
  )
}
