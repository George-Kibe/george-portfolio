import Link from 'next/link'
import { requireAdminPage } from '@/lib/session'
import { createPost } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import PostFields from '@/components/admin/PostFields'
import { PageHeader, Panel } from '@/components/admin/ui'

export const metadata = { title: 'New post' }

export default async function NewPostPage() {
  await requireAdminPage()
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/blog" className="text-sm font-semibold underline underline-offset-4">← Blog</Link>
      <PageHeader title="New post" />
      <Panel>
        <ActionForm action={createPost} submitLabel="Create post">
          <PostFields />
        </ActionForm>
      </Panel>
    </div>
  )
}
