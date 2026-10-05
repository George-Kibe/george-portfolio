import Link from 'next/link'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteBrand } from '@/app/actions/content'
import { cld } from '@/lib/cloudinaryUrl'
import DeleteButton from '@/components/admin/DeleteButton'
import { Badge, Empty, NewButton, PageHeader, SavedNotice } from '@/components/admin/ui'
import Brand from '@/models/Brand'

export const metadata = { title: 'Brands' }

export default async function BrandsPage({ searchParams }) {
 await requireAdminPage()
 const { saved } = await searchParams
 await connectDB()
 const brands = serialize(await Brand.find().sort({ order: 1, name: 1 }).lean())

 return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Brands" description="Companies you've worked with, scrolling across the home page."
 action={<NewButton href="/admin/brands/new">Add brand</NewButton>} />
      <SavedNotice show={saved === '1'}>Brand added.</SavedNotice>

      {brands.length === 0 ? (
        <Empty>No brands yet.</Empty>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {brands.map((b) => (
            <li key={b._id} className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4">
              <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
                {b.logo
                  // eslint-disable-next-line @next/next/no-img-element -- tiny admin thumbnail, already resized by Cloudinary
                  ? <img src={cld(b.logo, { height: 96 })} alt="" className="max-h-9 max-w-16 object-contain" />
                  : <span className="px-1 text-center text-[10px] font-bold leading-tight">{b.name}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/brands/${b._id}`} className="block truncate font-semibold underline-offset-4 hover:underline">{b.name}</Link>
                <p className="truncate text-xs text-muted">{b.website || 'No website'} · order {b.order}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Badge tone={b.published ? 'published' : 'draft'}>{b.published ? 'Shown' : 'Hidden'}</Badge>
                <DeleteButton action={deleteBrand.bind(null, b._id)} small />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
