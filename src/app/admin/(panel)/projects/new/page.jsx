import Link from 'next/link'
import { requireAdminPage } from '@/lib/session'
import { createProject } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import ProjectFields from '@/components/admin/ProjectFields'
import { PageHeader, Panel } from '@/components/admin/ui'

export const metadata = { title: 'Add project' }

export default async function NewProjectPage() {
  await requireAdminPage()
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/projects" className="text-sm font-semibold underline underline-offset-4">← Projects</Link>
      <PageHeader title="Add a project" />
      <Panel>
        <ActionForm action={createProject} submitLabel="Add project">
          <ProjectFields />
        </ActionForm>
      </Panel>
    </div>
  )
}
