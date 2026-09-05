"use client"

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createSubmissionGuard } from '@/lib/submissionGuard'

const guard = createSubmissionGuard('contact')

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
      <ToastContainer />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-1 flex-col items-start sm:items-center md:px-20 gap-2 mb-4 sm:mx-4 md:mx-0 xl:mx-24"
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
          className="p-2 rounded-md w-full dark:text-dark"
          placeholder="Your Name"
        />
        <label htmlFor="contact-email" className="sr-only">Your Email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          className="p-2 rounded-md w-full dark:text-dark"
          placeholder="Your Email"
        />
        <label htmlFor="contact-message" className="sr-only">Your Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="6"
          className="p-2 rounded-md w-full dark:text-dark"
          placeholder="Your Message"
        />
        <button
          type="submit"
          disabled={isSending}
          className="self-start bg-blue-500 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSending ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </>
  )
}

export default ContactForm
