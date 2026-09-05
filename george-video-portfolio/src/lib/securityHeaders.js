// Security headers applied to every response by next.config.mjs.
//
// CSP notes: the root layout inlines a JSON-LD <script>, and Next injects its
// own inline bootstrap scripts, so 'unsafe-inline' is required for scripts
// today. A nonce would mean rendering the layout dynamically on every request,
// giving up static prerendering on every route -- not worth it for a static
// marketing site with no auth, cookies or user data.
//
// 'unsafe-eval' is deliberately NOT included.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  // Project thumbnails are served from Unsplash through next/image.
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://api.emailjs.com",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];
