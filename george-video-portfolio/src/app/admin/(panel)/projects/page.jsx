import Link from 'next/link'
import { connectDB, serialize } from '@/lib/db'
import { requireAdminPage } from '@/lib/session'
import { deleteProject } from '@/app/actions/content'
import { cld } from '@/lib/cloudinaryUrl'
import { youtubeThumbnail } from '@/lib/video'
import DeleteButton from '@/components/admin/DeleteButton'
import { Badge, Empty, NewButton, PageHeader, SavedNotice } from '@/components/admin/ui'
import Project from '@/models/Project'

export const metadata = { title: 'Projects' }

export default async function ProjectsAdminPage({ searchParams }) {
  await requireAdminPage()
  const { saved } = await searchParams
  await connectDB()
  const projects = serialize(await Project.find().sort({ order: 1, year: -1, createdAt: -1 }).lean())

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Projects" description="Videos on the Projects page. Featured ones also appear on the home page."
        action={<NewButton href="/admin/projects/new">Add project</NewButton>} />
      <SavedNotice show={saved === '1'}>Project saved.</SavedNotice>

      {projects.length === 0 ? (
        <Empty>No projects yet. Add your first video.</Empty>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => {
            const thumb = p.thumbnail ? cld(p.thumbnail, { width: 480, height: 270, crop: 'fill', gravity: 'auto' }) : youtubeThumbnail(p.videoUrl)
            return (
              <li key={p._id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card">
                <div className="aspect-video bg-foreground/5">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small admin thumbnail, already resized */}
                  {thumb && <img src={thumb} alt="" className="size-full object-cover" loading="lazy" />}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/admin/projects/${p._id}`} className="font-semibold underline-offset-4 hover:underline">{p.title}</Link>
                    <div className="flex shrink-0 gap-1">
                      {p.featured && <Badge tone="new">Featured</Badge>}
                      <Badge tone={p.published ? 'published' : 'draft'}>{p.published ? 'Shown' : 'Hidden'}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted">{[p.category, p.client, p.year].filter(Boolean).join(' · ')}</p>
                  <div className="mt-auto flex items-center gap-3 pt-2">
                    <Link href={`/admin/projects/${p._id}`} className="inline-flex h-9 items-center rounded-lg border-2 border-line-strong px-3 text-sm font-semibold">Edit</Link>
                    <DeleteButton action={deleteProject.bind(null, p._id)} small />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
