import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import DarkModeToggle from '@/components/DarkModeToggle'
import { requireAdminPage } from '@/lib/session'
import { logout } from '@/app/actions/auth'

export const metadata = {
  title: { default: 'Admin', template: '%s · Admin' },
  robots: { index: false, follow: false },
}

// Every page under here also calls requireAdminPage(): layouts don't re-run
// on client-side navigation, so the layout check alone isn't enough.
export default async function AdminLayout({ children }) {
  const admin = await requireAdminPage()

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 lg:flex-row lg:gap-10">
      <aside className="flex flex-col gap-4 border-b border-dark/10 pb-4 dark:border-light/10
        lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-56 lg:shrink-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/admin" className="text-lg font-bold">GK Admin</Link>
          <DarkModeToggle />
        </div>
        <AdminNav />
        <div className="mt-auto hidden flex-col gap-2 text-sm lg:flex">
          <p className="truncate text-dark/70 dark:text-light/70" title={admin.email}>{admin.email}</p>
          <Link href="/" className="font-semibold underline underline-offset-4">View site</Link>
          <form action={logout}>
            <button type="submit" className="font-semibold text-red-700 underline underline-offset-4 dark:text-red-300 cursor-pointer">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 pb-16">{children}</main>
      <div className="flex items-center justify-between border-t border-dark/10 pt-4 text-sm dark:border-light/10 lg:hidden">
        <Link href="/" className="font-semibold underline underline-offset-4">View site</Link>
        <form action={logout}>
          <button type="submit" className="font-semibold text-red-700 underline underline-offset-4 dark:text-red-300 cursor-pointer">Sign out</button>
        </form>
      </div>
    </div>
  )
}
