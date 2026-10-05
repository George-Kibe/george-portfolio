import { redirect } from 'next/navigation'
import AuthCard from '@/components/AuthCard'
import AuthForm from '@/components/AuthForm'
import { getCurrentUser } from '@/lib/session'

export const metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({ searchParams }) {
  const { reset } = await searchParams
  const user = await getCurrentUser()
  if (user?.role === 'admin') redirect('/admin')
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard title="Admin" intro="Sign in to manage quotes, testimonials and the blog.">
        {reset === '1' && (
          <p role="status" className="mb-6 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Your password has been updated. Sign in with your new password.
          </p>
        )}
        <AuthForm mode="admin" next="/admin" />
      </AuthCard>
    </div>
  )
}
