import Link from 'next/link'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteProject } from '@/app/actions/content'
import CloudImage from '@/components/CloudImage'
import DeleteButton from '@/components/admin/DeleteButton'
import { Badge, Empty, NewButton, PageHeader, SavedNotice } from '@/components/admin/ui'
import Project from '@/models/Project'

export const metadata = { title: 'Projects' }

export default async function ProjectsPage({ searchParams }) {
  await requireAdminPage()
  const { saved } = await searchParams
  await connectDB()
  const projects = serialize(await Project.find().sort({ order: 1, createdAt: -1 }).lean())

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Projects" description="Work shown on the Projects page, in order."
        action={<NewButton href="/admin/projects/new">Add project</NewButton>} />
      <SavedNotice show={saved === '1'}>Project added.</SavedNotice>

      {projects.length === 0 ? (
        <Empty>No projects yet.</Empty>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <li key={p._id} className="flex flex-col overflow-hidden rounded-2xl border border-dark/15 bg-white dark:border-light/15 dark:bg-dark">
              <div className="relative aspect-video bg-dark/5 dark:bg-light/10">
                {p.image && <CloudImage src={p.image} alt="" sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 100vw" />}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-xs font-medium text-dark/65 dark:text-light/65">{p.type || 'Project'} · order {p.order}</p>
                <Link href={`/admin/projects/${p._id}`} className="font-semibold underline-offset-4 hover:underline">{p.title}</Link>
                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <span className="flex gap-2">
                    <Badge tone={p.published ? 'published' : 'draft'}>{p.published ? 'Shown' : 'Hidden'}</Badge>
                    {p.featured && <Badge tone="new">Featured</Badge>}
                  </span>
                  <DeleteButton action={deleteProject.bind(null, p._id)} small />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
