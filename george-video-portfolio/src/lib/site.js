// Single source of truth for anything that needs an absolute URL or appears in
// metadata. Override the origin per environment with NEXT_PUBLIC_SITE_URL;
// the fallback is the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://v.georgekibe.site"
).replace(/\/$/, "");

export const SITE_NAME = "GeorgeEditPro";

export const AUTHOR = {
  name: "George Kibe",
  brand: "GeorgeEditPro",
  jobTitle: "Professional Video Editor",
  email: "georgekibew@gmail.com",
  phone: "+254 704 817 466",
  locality: "Nairobi",
  country: "Kenya",
};

export const DEFAULT_TITLE =
  "GeorgeEditPro — Professional Video Editor in Nairobi";

export const DEFAULT_DESCRIPTION =
  "Professional video editing by George Kibe in Nairobi, Kenya. Commercial, " +
  "music video, documentary and corporate editing, colour grading, motion " +
  "graphics and sound design. View the reel and get a quote.";

export const KEYWORDS = [
  "video editor",
  "video editing Nairobi",
  "video editor Kenya",
  "colour grading",
  "color grading",
  "motion graphics",
  "sound design",
  "commercial video editing",
  "music video editor",
  "documentary editor",
  "corporate video",
  "Adobe Premiere Pro editor",
  "DaVinci Resolve editor",
  "After Effects",
];

// Services offered, reused by the page copy and the LocalBusiness schema so the
// two cannot drift apart.
export const SERVICES = [
  { name: "Video Editing", description: "Professional cutting, sequencing, and pacing to tell your story effectively." },
  { name: "Color Grading", description: "Cinematic color correction and grading to set the perfect mood." },
  { name: "Sound Design", description: "Audio mixing, sound effects, and music synchronization." },
  { name: "Motion Graphics", description: "Dynamic titles, lower thirds, and visual effects." },
];

// Social profiles: shown in the footer and contact page, and used for the
// Person schema's sameAs. TODO: add the real URLs, e.g.
//   { label: "Instagram", url: "https://www.instagram.com/<handle>" }
// Labels must be one of Instagram, YouTube, LinkedIn, X (they pick the icon).
// Empty until the real handles are known; inventing them would send visitors
// and search engines to accounts that may not be George's.
export const SOCIAL_LINKS = [];

export const SOCIAL_PROFILES = SOCIAL_LINKS.map((link) => link.url);

// Indexable routes: the sitemap, the header nav (`nav: true`) and the footer.
export const ROUTES = [
  { path: "/", label: "Home", nav: true, priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", label: "About", nav: true, priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", label: "Projects", nav: true, priority: 0.9, changeFrequency: "weekly" },
  { path: "/articles", label: "Blog", nav: true, priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", label: "Contact", nav: true, priority: 0.7, changeFrequency: "yearly" },
  { path: "/quote", label: "Get a Quote", priority: 0.7, changeFrequency: "monthly" },
];

export const CALENDLY_URL = "https://calendly.com/georgekibe";
