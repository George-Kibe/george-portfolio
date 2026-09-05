// Security headers applied to every response by next.config.js.
//
// CSP notes: this site inlines two <script> tags in the root layout (the
// pre-paint theme script and the JSON-LD block), and Next injects inline
// bootstrap scripts of its own, so 'unsafe-inline' is required for scripts
// today. Moving to a nonce would mean rendering the layout dynamically on every
// request, which would give up full static prerendering for every route. For a
// static marketing site with no auth, no cookies and no user data, that trade
// is not worth it -- the headers below still close off clickjacking, MIME
// sniffing, referrer leakage and mixed content.
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
  // next/font self-hosts its files, so no external font origin is needed.
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  // EmailJS is the only third-party the browser talks to.
  "connect-src 'self' https://api.emailjs.com",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  // Vercel terminates TLS; this is what makes the browser refuse plain HTTP next time.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];
