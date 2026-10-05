import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteBrand, updateBrand } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import BrandFields from '@/components/admin/BrandFields'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader, Panel } from '@/components/admin/ui'
import Brand from '@/models/Brand'

export const metadata = { title: 'Edit brand' }

export default async function EditBrandPage({ params }) {
  await requireAdminPage()
  const { id } = await params
  if (!isValidObjectId(id)) notFound()
  await connectDB()
  const brand = serialize(await Brand.findById(id).lean())
  if (!brand) notFound()

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/brands" className="text-sm font-semibold underline underline-offset-4">← Brands</Link>
      <PageHeader title={brand.name}
        action={<DeleteButton action={deleteBrand.bind(null, id)} redirectTo="/admin/brands" />} />
      <Panel>
        <ActionForm action={updateBrand.bind(null, id)} submitLabel="Save changes">
          <BrandFields brand={brand} />
        </ActionForm>
      </Panel>
    </div>
  )
}
