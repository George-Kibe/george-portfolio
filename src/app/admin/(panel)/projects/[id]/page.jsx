import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteProject, updateProject } from '@/app/actions/content'
import ActionForm from '@/components/admin/ActionForm'
import ProjectFields from '@/components/admin/ProjectFields'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader, Panel } from '@/components/admin/ui'
import Project from '@/models/Project'

export const metadata = { title: 'Edit project' }

export default async function EditProjectPage({ params }) {
  await requireAdminPage()
  const { id } = await params
  if (!isValidObjectId(id)) notFound()
  await connectDB()
  const project = serialize(await Project.findById(id).lean())
  if (!project) notFound()

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/projects" className="text-sm font-semibold underline underline-offset-4">← Projects</Link>
      <PageHeader title={project.title}
        action={<DeleteButton action={deleteProject.bind(null, id)} redirectTo="/admin/projects" />} />
      <Panel>
        <ActionForm action={updateProject.bind(null, id)} submitLabel="Save changes">
          <ProjectFields project={project} />
        </ActionForm>
      </Panel>
    </div>
  )
}
