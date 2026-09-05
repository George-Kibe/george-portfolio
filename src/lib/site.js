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

// Profiles used for the Person schema's sameAs, which is how search engines
// connect this site to the same person elsewhere.
export const SOCIAL_PROFILES = [
  "https://github.com/George-Kibe",
  "https://www.linkedin.com/in/george-kibe-17b431110",
  "https://twitter.com/kibegeorge_",
  "https://stackoverflow.com/users/17756485/george-kibe-w",
  "https://dribbble.com/GeorgeKibe",
];

export const TWITTER_HANDLE = "@kibegeorge_";

// Every indexable route, reused by the sitemap.
export const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/articles", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contacts", priority: 0.6, changeFrequency: "yearly" },
];

export const absoluteUrl = (path = "/") => `${SITE_URL}${path}`;
