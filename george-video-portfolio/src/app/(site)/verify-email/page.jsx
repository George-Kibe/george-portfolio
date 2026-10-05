import Link from 'next/link'
import AuthCard from '@/components/AuthCard'
import VerifyBanner from '@/components/VerifyBanner'
import { verifyEmailToken } from '@/lib/verifyEmail'
import { getCurrentUser } from '@/lib/session'
import { reportError } from '@/lib/reportError'

export const metadata = { title: 'Confirm your email', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const COPY = {
 verified: { title: 'Email confirmed', body: 'Thanks! Your email address is confirmed and a welcome email is on its way.' },
 already: { title: 'Already confirmed', body: 'This email address was confirmed earlier. You’re all set.' },
 invalid: { title: 'Link expired', body: 'This confirmation link is invalid or has expired.' },
}

export default async function VerifyEmailPage({ searchParams }) {
 const { token = '' } = await searchParams
 let result = 'invalid'
 try {
 result = await verifyEmailToken(token)
  } catch (error) {
 reportError(error, { where: 'VerifyEmailPage' })
  }
 const user = result === 'invalid' ? await getCurrentUser() : null
 const { title, body } = COPY[result]

 return (
    <AuthCard title={title} intro={body}>
      {user && !user.verified ? (
        <VerifyBanner email={user.email} />
      ) : result === 'invalid' ? (
        <p className="text-sm">Sign in, then use “Resend the link” under any article’s comments to get a fresh one.</p>
      ) : null}
      <Link href="/articles" className="mt-6 inline-flex h-12 items-center rounded-lg bg-accent px-6 font-semibold text-white">
        Go to the articles
      </Link>
    </AuthCard>
  )
}
