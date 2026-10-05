import 'server-only'
import { connectDB } from '@/lib/db'
import { hashToken } from '@/lib/tokens'
import { sendSafely, siteOrigin, welcomeEmail } from '@/lib/mailer'
import User from '@/models/User'

// Confirms an email from the link in the verification email. Returns
// 'verified' | 'already' | 'invalid'. The welcome email goes out once, on the
// first successful confirmation.
export async function verifyEmailToken(token) {
  if (!token) return 'invalid'
  await connectDB()
  const user = await User.findOne({ verifyTokenHash: hashToken(token) }).select('+verifyTokenExpires')
  if (!user) return 'invalid'
  if (user.emailVerifiedAt) return 'already'
  if (!user.verifyTokenExpires || user.verifyTokenExpires < new Date()) return 'invalid'

  // The token hash stays until it expires so a second click on the same link
  // reads "already confirmed" instead of "invalid".
  user.emailVerifiedAt = new Date()
  await user.save()
  await sendSafely('welcomeEmail', welcomeEmail(user, await siteOrigin()))
  return 'verified'
}
