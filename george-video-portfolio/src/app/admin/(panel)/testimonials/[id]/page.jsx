import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteTestimonial, updateTestimonial } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import DeleteButton from '@/components/admin/DeleteButton'
import TestimonialFields from '@/components/admin/TestimonialFields'
import { PageHeader, Panel } from '@/components/admin/ui'
import Testimonial from '@/models/Testimonial'

export const metadata = { title: 'Edit testimonial' }

export default async function EditTestimonialPage({ params }) {
  await requireAdminPage()
  const { id } = await params
  if (!isValidObjectId(id)) notFound()
  await connectDB()
  const item = serialize(await Testimonial.findById(id).lean())
  if (!item) notFound()

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/testimonials" className="text-sm font-semibold underline underline-offset-4">← Testimonials</Link>
      <PageHeader title={`Testimonial from ${item.name}`}
        action={<DeleteButton action={deleteTestimonial.bind(null, id)} redirectTo="/admin/testimonials" />} />
      <Panel>
        <ActionForm action={updateTestimonial.bind(null, id)} submitLabel="Save changes">
          <TestimonialFields item={item} />
        </ActionForm>
      </Panel>
    </div>
  )
}
