"use client"

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createSubmissionGuard } from '@/lib/submissionGuard'

const guard = createSubmissionGuard('contact')

// Tailwind v4's preflight makes form controls transparent and borderless, so
// without an explicit fill and border the fields vanish into the page.
const fieldClass =
  'w-full rounded-lg border border-dark/50 bg-white px-4 py-3 text-dark placeholder:text-dark/65 ' +
  'dark:border-light/40 dark:bg-dark dark:text-light dark:placeholder:text-light/65'

const ContactForm = () => {
  const form = useRef(null)
  const [isSending, setIsSending] = useState(false)

  const sendEmail = async (e) => {
    e.preventDefault()
    const formEl = e.target
    const { name, email, message } = formEl

    // Was `|` (bitwise) rather than `||`, so this guard only ever fired when
    // the numeric coercion happened to work out.
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      toast.error('You have missing details!')
      return
    }

    // The EmailJS keys are public by necessity, so the send quota is the thing
    // worth protecting. Bots get dropped silently; humans get told to wait.
    if (guard.isBot({ website: formEl.website?.value })) {
      return
    }

    const verdict = guard.check()
    if (!verdict.allowed) {
      toast.error(
        verdict.reason === 'too-fast'
          ? `Please wait ${verdict.retryInSeconds}s before sending another message.`
          : 'Too many messages sent. Please try again later or email directly.'
      )
      return
    }

    setIsSending(true)
    toast.info('Sending your message')

    try {
      const response = await emailjs.sendForm(
        'service_zejea4b',
        'template_d1kc1do',
        form.current,
        { publicKey: 'qO3BsJQp9qAyPG6LX' }
      )
      if (response.status === 200) {
        guard.record()
        toast.success(
          'Message sent successfully. George will get back to you as soon as possible.'
        )
        formEl.reset()
      } else {
        toast.error('Message sending Error! Try sending again or send a direct Email')
      }
    } catch {
      toast.error('Message sending Error! Try sending again or send a direct Email')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <ToastContainer transition={Slide} />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-1 flex-col items-start sm:items-center gap-4"
      >
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="contact-name" className="sr-only">Your Name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          className={fieldClass}
          placeholder="Your Name"
        />
        <label htmlFor="contact-email" className="sr-only">Your Email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="Your Email"
        />
        <label htmlFor="contact-message" className="sr-only">Your Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="6"
          className={fieldClass}
          placeholder="Your Message"
        />
        <button
          type="submit"
          disabled={isSending}
          className="self-start rounded-lg bg-dark px-6 py-3 text-base font-semibold text-light hover:bg-dark/85
            disabled:opacity-60 dark:bg-light dark:text-dark dark:hover:bg-light/85
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
            dark:focus-visible:outline-primary-dark"
        >
          {isSending ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </>
  )
}

export default ContactForm
