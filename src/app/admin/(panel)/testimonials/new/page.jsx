import Link from 'next/link'
import { requireAdminPage } from '@/lib/session'
import { createTestimonial } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import TestimonialFields from '@/components/admin/TestimonialFields'
import { PageHeader, Panel } from '@/components/admin/ui'

export const metadata = { title: 'Add testimonial' }

export default async function NewTestimonialPage() {
  await requireAdminPage()
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/testimonials" className="text-sm font-semibold underline underline-offset-4">← Testimonials</Link>
      <PageHeader title="Add a testimonial" />
      <Panel>
        <ActionForm action={createTestimonial} submitLabel="Add testimonial">
          <TestimonialFields item={{ published: true }} />
        </ActionForm>
      </Panel>
    </div>
  )
}
