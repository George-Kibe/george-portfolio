"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Instagram, Linkedin, XTwitter, Youtube } from "@/components/BrandIcons";
import ProjectCta from "@/components/ProjectCta";
import { AUTHOR, SOCIAL_LINKS } from "@/lib/site";

const SOCIAL_ICONS = { Instagram, LinkedIn: Linkedin, X: XTwitter, YouTube: Youtube };
import { toast } from "react-toastify";
import { sendContactMessage } from "@/app/actions/contact";
import { createSubmissionGuard } from "@/lib/submissionGuard";

const guard = createSubmissionGuard("contact");

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async(e) => {
    e.preventDefault();

    // Every message is a real email from the site's Gmail account, so the send
    // quota is worth protecting. Bots are dropped silently; humans are told to wait.
    if (guard.isBot({ website: e.target.website?.value })) {
      return
    }

    const verdict = guard.check()
    if (!verdict.allowed) {
      toast.error(
        verdict.reason === "too-fast"
          ? `Please wait ${verdict.retryInSeconds}s before sending another message.`
          : "Too many messages sent. Please try again later or email directly."
      )
      return
    }

    toast.info("Sending your message")
    setIsSubmitting(true)
    try {
      const result = await sendContactMessage({ ...formData, website: e.target.website?.value })
      if (result.ok) {
        guard.record()
        toast.success("Message sent successfully. George will get back to you as soon as possible.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("Message sending Error! Try sending again or send a direct Email")
    } finally {
      setIsSubmitting(false)
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: AUTHOR.email,
      href: `mailto:${AUTHOR.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: AUTHOR.phone,
      href: `tel:${AUTHOR.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: `${AUTHOR.locality}, ${AUTHOR.country}`,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative pt-32 pb-20 md:pb-28 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-t from-glow via-background to-background pointer-events-none" />
      

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Let&apos;s Create{" "}
                <span className="text-accent-text">Something Amazing</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed">
                Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can bring your vision to life.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                return (
                <Wrapper
                  key={item.label}
                  {...(item.href && { href: item.href })}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-line flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-accent-text" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{item.label}</p>
                    <p className="text-foreground font-medium group-hover:text-accent-text transition-colors">
                      {item.value}
                    </p>
                  </div>
                </Wrapper>
                );
              })}
            </div>

            {SOCIAL_LINKS.length > 0 && (
              <div className="pt-8 border-t border-line">
                <p className="text-sm text-muted mb-4">Follow me on</p>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = SOCIAL_ICONS[social.label];
                    return (
                      <a
                        key={social.url}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GeorgeEditPro on ${social.label}`}
                        className="size-11 rounded-full bg-accent/5 border border-line-strong flex items-center justify-center text-muted hover:text-accent-text hover:border-accent-text transition-colors duration-200"
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <form
              onSubmit={sendEmail}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-line"
            >
              <div className="space-y-6">
                {/* Honeypot: hidden from people, irresistible to bots. */}
                <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-background border border-line-strong text-foreground placeholder:text-muted focus:outline-none focus:border-accent-text focus:ring-2 focus:ring-accent-text/40 transition-colors duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-background border border-line-strong text-foreground placeholder:text-muted focus:outline-none focus:border-accent-text focus:ring-2 focus:ring-accent-text/40 transition-colors duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-line-strong text-foreground placeholder:text-muted focus:outline-none focus:border-accent-text focus:ring-2 focus:ring-accent-text/40 transition-colors duration-200"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-background border border-line-strong text-foreground placeholder:text-muted focus:outline-none focus:border-accent-text focus:ring-2 focus:ring-accent-text/40 transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <p aria-live="polite" className="sr-only">
                  {isSubmitting ? "Sending your message" : ""}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold rounded-xl transition-colors duration-200 hover:shadow-lg hover:shadow-blue-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ProjectCta className="mt-16 md:mt-20" />
      </div>
    </section>
  );
}