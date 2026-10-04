import Link from 'next/link'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteTestimonial } from '@/app/actions/content'
import DeleteButton from '@/components/admin/DeleteButton'
import { Badge, Empty, NewButton, PageHeader, SavedNotice } from '@/components/admin/ui'
import Testimonial from '@/models/Testimonial'

export const metadata = { title: 'Testimonials' }

export default async function TestimonialsPage({ searchParams }) {
  await requireAdminPage()
  const { saved } = await searchParams
  await connectDB()
  const items = serialize(await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean())

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Testimonials" description="Published ones appear on the home page under “What clients say”."
        action={<NewButton href="/admin/testimonials/new">Add testimonial</NewButton>} />
      <SavedNotice show={saved === '1'}>Testimonial added.</SavedNotice>

      {items.length === 0 ? (
        <Empty>No testimonials yet. Add one from a happy client and tick “Show on the site”.</Empty>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((t) => (
            <li key={t._id} className="flex flex-col gap-3 rounded-2xl border border-dark/15 bg-white p-5 dark:border-light/15 dark:bg-dark">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  {t.role && <p className="text-sm text-dark/70 dark:text-light/70">{t.role}</p>}
                </div>
                <Badge tone={t.published ? 'published' : 'draft'}>{t.published ? 'Published' : 'Hidden'}</Badge>
              </div>
              <p className="line-clamp-4 text-sm leading-relaxed text-dark/80 dark:text-light/80">{t.quote}</p>
              <p className="text-xs text-dark/60 dark:text-light/60">{t.rating}/5 · order {t.order}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <Link href={`/admin/testimonials/${t._id}`} className="inline-flex h-9 items-center rounded-lg border-2 border-dark/70 px-3 text-sm font-semibold dark:border-light/70">Edit</Link>
                <DeleteButton action={deleteTestimonial.bind(null, t._id)} small />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
