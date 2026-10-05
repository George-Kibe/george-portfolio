import { redirect } from 'next/navigation'
import AuthCard from '@/components/AuthCard'
import AuthForm from '@/components/AuthForm'
import { getCurrentUser } from '@/lib/session'

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
}

export default async function LoginPage({ searchParams }) {
  const { next = '', reset } = await searchParams
  if (await getCurrentUser()) redirect(next.startsWith('/') && !next.startsWith('//') ? next : '/articles')
  return (
    <AuthCard title="Sign in" intro="Sign in to join the conversation on the articles.">
      {reset === '1' && (
        <p role="status" className="mb-6 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-800 dark:text-emerald-300">
          Your password has been updated. Sign in with your new password.
        </p>
      )}
      <AuthForm mode="login" next={next} />
    </AuthCard>
  )
}
