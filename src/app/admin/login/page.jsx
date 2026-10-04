import { redirect } from 'next/navigation'
import AuthCard from '@/components/AuthCard'
import AuthForm from '@/components/AuthForm'
import { getCurrentUser } from '@/lib/session'

export const metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const user = await getCurrentUser()
  if (user?.role === 'admin') redirect('/admin')
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard title="Admin" intro="Sign in to manage quotes, testimonials and the blog.">
        <AuthForm mode="admin" next="/admin" />
      </AuthCard>
    </div>
  )
}
