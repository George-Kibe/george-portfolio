// app/sections/Contact.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Instagram } from "lucide-react";
import { toast } from "react-toastify";
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sendEmail = async(e) => {
    e.preventDefault();
    console.log("Form submitted", formData)
    toast.info("Sending your message")
    try {
      setIsSubmitting(true)
      const response = await emailjs.send('service_zejea4b', 'template_d1kc1do', formData, 'qO3BsJQp9qAyPG6LX')
      if(response.status === 200){
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
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-t from-blue-950/10 via-black to-black" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
                Get In Touch
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Let's Create{" "}
                <span className="text-blue-500">Something Amazing</span>
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your vision to life.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-blue-500/10">
              <p className="text-sm text-gray-500 mb-4">Follow me on</p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-500/5 border border-blue-500/20 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <form
              onSubmit={sendEmail}
              className="p-8 rounded-3xl bg-linear-to-br from-blue-500/5 to-transparent border border-blue-500/10 backdrop-blur-sm"
            >
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-blue-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-blue-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-blue-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-blue-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {
                        isSubmitting? "Sending...": "Send Message"
                      }
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