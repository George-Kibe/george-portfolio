import { redirect } from 'next/navigation'
import AuthCard from '@/components/AuthCard'
import AuthForm from '@/components/AuthForm'
import { getCurrentUser } from '@/lib/session'

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
}

export default async function LoginPage({ searchParams }) {
  const { next = '' } = await searchParams
  if (await getCurrentUser()) redirect(next.startsWith('/') && !next.startsWith('//') ? next : '/articles')
  return (
    <AuthCard title="Sign in" intro="Sign in to join the conversation on the articles.">
      <AuthForm mode="login" next={next} />
    </AuthCard>
  )
}
