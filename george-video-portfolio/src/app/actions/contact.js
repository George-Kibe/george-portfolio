'use server'

import { contactNotification, sendSafely } from '@/lib/mailer'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Contact form: emails the message to George with Reply-To set to the sender.
export async function sendContactMessage(input) {
  if (input?.website) return { ok: true } // honeypot: pretend success for bots
  const name = String(input?.name ?? '').trim().slice(0, 120)
  const email = String(input?.email ?? '').trim().slice(0, 200)
  const subject = String(input?.subject ?? '').trim().slice(0, 160)
  const body = String(input?.message ?? '').trim().slice(0, 5000)
  const message = subject ? `Subject: ${subject}\n\n${body}` : body

  if (!name || !EMAIL.test(email) || !body) return { ok: false, error: 'Please fill in your name, a valid email and a message.' }
  const sent = await sendSafely('sendContactMessage', contactNotification({ name, email, message }))
  return sent ? { ok: true } : { ok: false, error: 'Message sending failed. Please try again or email directly.' }
}
