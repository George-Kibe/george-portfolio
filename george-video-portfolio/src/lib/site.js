// Single source of truth for anything that needs an absolute URL or appears in
// metadata. Override the origin per environment with NEXT_PUBLIC_SITE_URL;
// the fallback is the Vercel default domain for this project.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://george-video-portfolio.vercel.app"
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

// TODO: replace with real profile URLs — these drive the Person schema's
// sameAs, which is how search engines link this site to the same person
// elsewhere. Empty until the real handles are known; inventing them would
// point search engines at the wrong accounts.
export const SOCIAL_PROFILES = [];

export const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];
