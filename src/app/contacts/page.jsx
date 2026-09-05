import { MdOutlineEmail } from "react-icons/md"
import { BsWhatsapp } from "react-icons/bs"
import { ImTwitter } from "react-icons/im"
import AnimatedText from "@/components/AnimatedText"
import ContactForm from "@/components/ContactForm"
import { AUTHOR } from "@/lib/site"

// This page is a server component so it can export metadata; only the form
// itself needs to run on the client.
export const metadata = {
  title: 'Contact — Hire a Web & Mobile Developer',
  description:
    'Get in touch with George Kibe for full-stack web, mobile and data ' +
    'engineering work. Reach out by email, WhatsApp or Twitter, or send a ' +
    'message straight from the site.',
  alternates: { canonical: '/contacts' },
  openGraph: {
    type: 'website',
    url: '/contacts',
    title: 'Contact George Kibe — Hire a Web & Mobile Developer',
    description:
      'Email, WhatsApp or message George Kibe about web, mobile and data projects.',
  },
}

const ContactsPage = () => {
  return (
    <div className="items-center p-4 md:p-8">
      <h5 className="text-center text-xs">Get In Touch</h5>
      <AnimatedText text={"Contact Me"} />
      <div className="flex flex-col md:flex-row">
        <address className="not-italic flex flex-col flex-1 md:items-center gap-4 mb-4 sm:mx-4 md:mx-0 xl:mx-24">
          <article className="flex flex-col items-center justify-center border-2 dark:border-light p-2 w-full rounded-xl">
            <MdOutlineEmail className="text-[25px] md:text-[40px]" aria-hidden="true" />
            <h2 className="text-center">Email</h2>
            <p className="text-center">{AUTHOR.email}</p>
            <a href={`mailto:${AUTHOR.email}`} className="items-center underline underline-offset-2">
              Send an Email
            </a>
          </article>
          <article className="flex flex-col items-center justify-center border-2 dark:border-light p-2 w-full rounded-xl">
            <ImTwitter className="text-[25px] md:text-[40px]" aria-hidden="true" />
            <h2>Twitter</h2>
            <p>@KibeGeorge_</p>
            <a
              href="https://twitter.com/kibegeorge_"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Message me on Twitter
            </a>
          </article>
          <article className="flex flex-col items-center justify-center border-2 dark:border-light p-2 w-full rounded-xl">
            <BsWhatsapp className="text-[25px] md:text-[40px]" aria-hidden="true" />
            <h2>Whatsapp</h2>
            <p>+254 704 817 466</p>
            <a
              href="https://wa.link/rcnr3u"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Whatsapp Me
            </a>
          </article>
        </address>
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactsPage
