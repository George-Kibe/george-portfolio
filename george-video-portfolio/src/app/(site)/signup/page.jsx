import { redirect } from 'next/navigation'
import AuthCard from '@/components/AuthCard'
import AuthForm from '@/components/AuthForm'
import { getCurrentUser } from '@/lib/session'

export const metadata = {
  title: 'Create an account',
  robots: { index: false, follow: false },
}

export default async function SignupPage({ searchParams }) {
  const { next = '' } = await searchParams
  if (await getCurrentUser()) redirect(next.startsWith('/') && !next.startsWith('//') ? next : '/articles')
  return (
    <AuthCard title="Create an account" intro="A name, an email and a password. That's all it takes to comment.">
      <AuthForm mode="signup" next={next} />
    </AuthCard>
  )
}
