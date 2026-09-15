// Single source of truth for anything that needs an absolute URL or appears in
// metadata. Override the origin per environment with NEXT_PUBLIC_SITE_URL;
// the fallback is the Vercel default domain for this repo.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://george-portfolio.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "George Kibe";

export const AUTHOR = {
  name: "George Kibe",
  jobTitle: "Full-Stack Web & Mobile Developer",
  email: "georgekibew@gmail.com",
  locality: "Nairobi",
  country: "Kenya",
  alumniOf: "University of Nairobi",
};

export const DEFAULT_TITLE =
  "George Kibe — Full-Stack Web & Mobile Developer";

export const DEFAULT_DESCRIPTION =
  "George Kibe is a full-stack web and mobile developer in Nairobi, Kenya, " +
  "building React, Next.js, React Native and Django applications, plus data " +
  "engineering and data science solutions. See projects, experience and articles.";

export const KEYWORDS = [
  "George Kibe",
  "full-stack developer",
  "web developer Nairobi",
  "mobile app developer Kenya",
  "React developer",
  "Next.js developer",
  "React Native developer",
  "Django developer",
  "data engineering",
  "data science",
  "software engineer Kenya",
];

// Every social link the UI renders, in display order. `profile: false` marks a
// contact channel rather than an account, so it stays out of the schema below.
export const SOCIAL_LINKS = [
  { url: "https://github.com/George-Kibe", label: "GitHub" },
  { url: "https://stackoverflow.com/users/17756485/george-kibe-w", label: "Stack Overflow" },
  { url: "https://www.linkedin.com/in/george-kibe", label: "LinkedIn" },
  { url: "https://x.com/kibegeorge_", label: "X" },
  { url: "https://web.whatsapp.com/send?phone=+254795288155", label: "WhatsApp", profile: false },
];

// Profiles used for the Person schema's sameAs, which is how search engines
// connect this site to the same person elsewhere. Derived so the markup and the
// structured data can't drift apart.
export const SOCIAL_PROFILES = SOCIAL_LINKS.filter(
  (link) => link.profile !== false
).map((link) => link.url);

export const TWITTER_HANDLE = "@kibegeorge_";

// Every indexable route, reused by the sitemap and the footer's nav column.
export const ROUTES = [
  { path: "/", label: "Home", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", label: "About", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", label: "Projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/articles", label: "Articles", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contacts", label: "Contact", priority: 0.6, changeFrequency: "yearly" },
];

export const RESUME_PATH = "/George-Kibe-Resume.pdf";
export const WHATSAPP_URL = "https://wa.link/rcnr3u";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path}`;
