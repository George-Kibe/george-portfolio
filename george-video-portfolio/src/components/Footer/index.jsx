import Link from "next/link";
import { Play, Mail, CalendarDays } from "lucide-react";
import { Instagram, Linkedin, XTwitter, Youtube } from "@/components/BrandIcons";
import { AUTHOR, CALENDLY_URL, ROUTES, SERVICES, SOCIAL_LINKS } from "@/lib/site";

const ICONS = { Instagram, LinkedIn: Linkedin, X: XTwitter, YouTube: Youtube };

export default function Footer() {
  return (
    <footer className="bg-background border-t border-line relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-glow to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group" aria-label="GeorgeEditPro home">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Play className="w-5 h-5 text-white fill-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-foreground">
                George<span className="text-accent-text">EditPro</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Crafting visual stories that captivate, inspire, and leave lasting impressions. Professional video editing for creators and brands.
            </p>
            {/* Only real profiles are shown; see SOCIAL_LINKS in src/lib/site.js. */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = ICONS[social.label];
                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="size-11 rounded-full bg-accent/10 border border-line-strong flex items-center justify-center text-muted hover:text-accent-text hover:border-accent-text transition-colors duration-200"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {ROUTES.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-muted hover:text-accent-text transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.name}>
                  <Link href="/about" className="text-muted hover:text-accent-text transition-colors duration-300 text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Replaces a newsletter form that had no handler and just reloaded the page. */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Have footage that needs a story?</h3>
            <p className="text-muted text-sm mb-4">
              Get a ballpark price in a minute, or book a quick call.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/quote"
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg text-center transition-colors duration-200"
              >
                Get a quote
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 inline-flex items-center justify-center gap-2 border border-line-strong hover:border-accent-text text-foreground font-medium rounded-lg transition-colors duration-200"
              >
                <CalendarDays className="w-4 h-4" aria-hidden="true" /> Book a call
                <span className="sr-only">(opens Calendly in a new tab)</span>
              </a>
              <a href={`mailto:${AUTHOR.email}`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent-text transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" /> {AUTHOR.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} GeorgeEditPro. All rights reserved.
          </p>
          <Link href="/contact" className="text-sm text-muted hover:text-accent-text transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
