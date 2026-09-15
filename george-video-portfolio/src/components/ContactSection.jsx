"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Instagram, Linkedin, XTwitter } from "@/components/BrandIcons";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
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

    // The EmailJS keys are public by necessity, so the send quota is the thing
    // worth protecting. Bots are dropped silently; humans are told to wait.
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
    try {
      setIsSubmitting(true)
      const response = await emailjs.send(
        'service_zejea4b',
        'template_d1kc1do',
        formData,
        { publicKey: 'qO3BsJQp9qAyPG6LX' }
      )
      if(response.status === 200){
        guard.record()
        toast.success("Message sent successfully. George will get back to you as soon as possible.")
        e.target.reset()
      }else{
        toast.error("Message sending Error! Try sending again or send a direct Email")
        return
      }  
    } catch (error) {
      toast.error("Message sending Error! Try sending again or send a direct Email")
        return
    } finally{
      setIsSubmitting(false)
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "georgekibew@gmail.com",
      href: "mailto:georgekibew@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+254 704 817 466",
      href: "tel:+254704817466",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Nairobi, Kenya",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-t from-blue-950/10 via-black to-black" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
                Get In Touch</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Let&apos;s Create{" "}
                <span className="text-blue-500">Something Amazing</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can bring your vision to life.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-blue-500/10">
              <p className="text-sm text-gray-400 mb-4">Follow me on</p>
              <div className="flex gap-4">
                {[Instagram, XTwitter, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={`GeorgeEditPro on ${Icon.name}`}
                    className="size-11 rounded-full bg-blue-500/5 border border-blue-500/40 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 hover:scale-105"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <form
              onSubmit={sendEmail}
              className="p-8 rounded-3xl bg-linear-to-br from-blue-500/5 to-transparent border border-blue-500/10 backdrop-blur-sm"
            >
              <div className="space-y-6">
                {/* Honeypot: hidden from people, irresistible to bots. */}
                <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-300 mb-2">
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
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
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
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <p aria-live="polite" className="sr-only">
                  {isSubmitting ? "Sending your message" : ""}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-xl transition-colors duration-200 hover:shadow-lg hover:shadow-blue-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 flex items-center justify-center gap-2 group"
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
      </div>
    </section>
  );
}