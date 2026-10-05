import 'server-only'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'
import { AUTHOR, CALENDLY_URL, SITE_NAME, SITE_URL } from '@/lib/site'
import { formatMoney } from '@/lib/quote'
import { reportError } from '@/lib/reportError'

// Outgoing email through Gmail SMTP. SENDER_EMAIL is the Gmail address and
// EMAIL_PASSWORD a Google *app password* (Google Account > Security > App
// passwords), not the account's normal password.
//
// Set MAIL_DRY_RUN=1 to log messages instead of sending them (local testing).

let transporter
const getTransport = () => {
  if (transporter) return transporter
  if (process.env.MAIL_DRY_RUN === '1') {
    transporter = nodemailer.createTransport({ jsonTransport: true })
  } else {
    const user = process.env.SENDER_EMAIL
    const pass = process.env.EMAIL_PASSWORD
    if (!user || !pass) throw new Error('SENDER_EMAIL and EMAIL_PASSWORD must be set to send email.')
    transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
  }
  return transporter
}

// Where quote and contact notifications go: NOTIFY_EMAIL if set, otherwise
// the site's public address (AUTHOR.email in src/lib/site.js).
const inbox = () => process.env.NOTIFY_EMAIL || AUTHOR.email

// Links in emails must point at the site the visitor is actually using
// (localhost in development, the real domain in production).
export async function siteOrigin() {
  try {
    const h = await headers()
    const host = h.get('x-forwarded-host') ?? h.get('host')
    if (host) return `${h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')}://${host}`
  } catch {
    // Outside a request (scripts): use the configured origin.
  }
  return SITE_URL
}

const escape = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// One simple, readable layout for every email.
const layout = ({ heading, body, cta }) => `<!doctype html>
<html><body style="margin:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#1b1b1b">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;padding:32px">
        <tr><td style="font-size:14px;font-weight:bold;letter-spacing:.04em;color:#0066cc">${escape(SITE_NAME)}</td></tr>
        <tr><td style="padding-top:16px;font-size:22px;font-weight:bold;line-height:1.3">${escape(heading)}</td></tr>
        <tr><td style="padding-top:12px;font-size:15px;line-height:1.6">${body}</td></tr>
        ${cta ? `<tr><td style="padding-top:24px"><a href="${escape(cta.href)}" style="display:inline-block;background:#1b1b1b;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">${escape(cta.label)}</a>
          <p style="font-size:12px;color:#555;line-height:1.5;margin-top:16px">Or paste this link into your browser:<br><span style="word-break:break-all">${escape(cta.href)}</span></p></td></tr>` : ''}
        <tr><td style="padding-top:24px;border-top:1px solid #eee;margin-top:24px;font-size:12px;color:#666">
          ${escape(AUTHOR.name)} · ${escape(AUTHOR.jobTitle)} · ${escape(AUTHOR.locality)}, ${escape(AUTHOR.country)}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

async function send({ to, subject, html, text, replyTo }) {
  const info = await getTransport().sendMail({
    from: `"${SITE_NAME}" <${process.env.SENDER_EMAIL ?? 'no-reply@localhost'}>`,
    to, subject, html, text, replyTo,
  })
  if (process.env.MAIL_DRY_RUN === '1') console.log('[mail:dry-run]', info.message)
  return info
}

// Sends without letting a mail failure break the action that triggered it.
export async function sendSafely(where, message) {
  try {
    await send(message)
    return true
  } catch (error) {
    reportError(error, { where })
    return false
  }
}

// ---- Account emails -------------------------------------------------------

export const verificationEmail = (user, link) => ({
  to: user.email,
  subject: `Confirm your email for ${SITE_NAME}`,
  text: `Hi ${user.name},\n\nConfirm your email address for ${SITE_NAME}:\n${link}\n\nThe link expires in 24 hours. You can keep commenting in the meantime.`,
  html: layout({
    heading: `Confirm your email, ${user.name.split(' ')[0]}`,
    body: `<p>Thanks for signing up. Please confirm this is your email address. You can already sign in and comment; confirming just keeps your account recoverable.</p><p>The link expires in 24 hours.</p>`,
    cta: { href: link, label: 'Confirm email address' },
  }),
})

export const welcomeEmail = (user, origin) => ({
  to: user.email,
  subject: `Welcome to ${SITE_NAME}`,
  text: `Hi ${user.name},\n\nYour email is confirmed. Welcome aboard!\n\nRead the latest articles: ${origin}/articles\nHave a project in mind? ${origin}/quote`,
  html: layout({
    heading: `Welcome, ${user.name.split(' ')[0]}!`,
    body: `<p>Your email address is confirmed and your account is all set.</p>
      <p>I write about web and mobile development, data engineering and automation. Join the conversation in the comments, and if you ever have a project in mind, you can <a href="${escape(origin)}/quote" style="color:#0066cc">get a quick estimate</a> or <a href="${escape(CALENDLY_URL)}" style="color:#0066cc">book a call</a>.</p>`,
    cta: { href: `${origin}/articles`, label: 'Read the articles' },
  }),
})

export const resetEmail = (user, link) => ({
  to: user.email,
  subject: `Reset your ${SITE_NAME} password`,
  text: `Hi ${user.name},\n\nReset your password here:\n${link}\n\nThe link expires in 1 hour. If you didn't ask for this, ignore this email; your password won't change.`,
  html: layout({
    heading: 'Reset your password',
    body: `<p>Someone (hopefully you) asked to reset the password for this account. The link expires in 1 hour.</p><p>If you didn't ask for this, you can ignore this email and your password won't change.</p>`,
    cta: { href: link, label: 'Choose a new password' },
  }),
})

// ---- Site notifications ---------------------------------------------------

export const contactNotification = ({ name, email, message }) => ({
  to: inbox(),
  replyTo: `"${name}" <${email}>`,
  subject: `New message from ${name}`,
  text: `${name} <${email}> wrote:\n\n${message}`,
  html: layout({
    heading: `New message from ${name}`,
    body: `<p><strong>${escape(name)}</strong> &lt;${escape(email)}&gt; wrote:</p><p style="white-space:pre-line">${escape(message)}</p><p style="color:#555">Reply to this email to answer them directly.</p>`,
  }),
})

const quoteRows = (quote) =>
  quote.items.map((i) => `<tr><td style="padding:4px 0">${escape(i.label)}</td><td align="right" style="padding:4px 0">${formatMoney(i.low)} – ${formatMoney(i.high)}</td></tr>`).join('')

export const quoteNotification = (quote, adminUrl) => ({
  to: inbox(),
  replyTo: `"${quote.name}" <${quote.email}>`,
  subject: `New quote request ${quote.reference} from ${quote.name}`,
  text: `${quote.name} <${quote.email}> requested a quote (${quote.reference}).\nEstimate: ${formatMoney(quote.estimateLow)} – ${formatMoney(quote.estimateHigh)}\n\n${quote.details || ''}\n\n${adminUrl}`,
  html: layout({
    heading: `Quote request from ${quote.name}`,
    body: `<p>${escape(quote.email)} · ${escape(quote.reference)}</p>
      <table width="100%" style="font-size:14px;border-collapse:collapse">${quoteRows(quote)}
        <tr><td style="padding-top:8px;border-top:1px solid #eee"><strong>Estimate</strong></td><td align="right" style="padding-top:8px;border-top:1px solid #eee"><strong>${formatMoney(quote.estimateLow)} – ${formatMoney(quote.estimateHigh)}</strong></td></tr>
      </table>
      ${quote.details ? `<p style="white-space:pre-line">${escape(quote.details)}</p>` : ''}`,
    cta: { href: adminUrl, label: 'Open in admin' },
  }),
})

export const quoteConfirmation = (quote) => ({
  to: quote.email,
  replyTo: inbox(),
  subject: `Your quote request ${quote.reference}`,
  text: `Hi ${quote.name},\n\nThanks for your request (${quote.reference}). Your ballpark estimate is ${formatMoney(quote.estimateLow)} – ${formatMoney(quote.estimateHigh)}, about ${quote.weeksLow}–${quote.weeksHigh} weeks. I'll reply with a firm quote, usually within two working days.\n\nPrefer to talk it through? ${CALENDLY_URL}`,
  html: layout({
    heading: `Thanks, ${quote.name.split(' ')[0]}. Your request is in.`,
    body: `<p>Your reference is <strong>${escape(quote.reference)}</strong>. Here's the ballpark you saw:</p>
      <table width="100%" style="font-size:14px;border-collapse:collapse">${quoteRows(quote)}
        <tr><td style="padding-top:8px;border-top:1px solid #eee"><strong>Estimate</strong></td><td align="right" style="padding-top:8px;border-top:1px solid #eee"><strong>${formatMoney(quote.estimateLow)} – ${formatMoney(quote.estimateHigh)}</strong></td></tr>
      </table>
      <p>That's about ${quote.weeksLow}–${quote.weeksHigh} weeks. I'll review the details and reply with a firm quote, usually within two working days.</p>`,
    cta: { href: CALENDLY_URL, label: 'Book a call to discuss it' },
  }),
})

export { send }
