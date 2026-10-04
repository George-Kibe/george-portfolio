import Link from 'next/link'
import AuthCard from '@/components/AuthCard'
import { ResetPasswordForm } from '@/components/PasswordForms'

export const metadata = { title: 'Choose a new password', robots: { index: false, follow: false } }

export default async function ResetPasswordPage({ searchParams }) {
  const { token = '' } = await searchParams
  return (
    <AuthCard title="Choose a new password">
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p>
          This page needs the link from your reset email.{' '}
          <Link href="/forgot-password" className="font-semibold text-primary underline underline-offset-4 dark:text-primary-dark">Request one</Link>.
        </p>
      )}
    </AuthCard>
  )
}
