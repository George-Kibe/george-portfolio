import AuthCard from '@/components/AuthCard'
import { ForgotPasswordForm } from '@/components/PasswordForms'

export const metadata = { title: 'Forgot password', robots: { index: false, follow: false } }

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Forgot your password?" intro="Enter your email and we'll send you a link to choose a new one.">
      <ForgotPasswordForm />
    </AuthCard>
  )
}
