# George Kibe — Portfolio Sites

This repository holds two separate portfolio websites for George Kibe, a full-stack web and mobile developer and video editor based in Nairobi, Kenya.

| | Developer portfolio | Video-editing portfolio (GeorgeEditPro) |
|---|---|---|
| Location | repo root (`src/`, `public/`) | [`george-video-portfolio/`](george-video-portfolio/) |
| Purpose | Projects, experience, skills and articles as a developer | Services, projects and contact as a video editor |
| Live URL | https://georgekibe.site | https://v.georgekibe.site |
| Framework | Next.js 16.3.4 (App Router), React 19.2.8 | Next.js 16.3.4 (App Router, React Compiler), React 19.2.8 |
| Styling | Tailwind CSS v4 (CSS-first, no config file) | Tailwind CSS v4 (CSS-first, no config file) |
| Animation | `framer-motion` 13 | CSS animations and transitions |
| Icons | `react-icons`, `react-social-icons` | `lucide-react` plus local SVGs in `BrandIcons.jsx` |
| Theme | Light/dark toggle (defaults to dark) | Fixed dark theme |
| Package manager | npm | bun |

The two apps share no code, dependencies or build. Each has its own lockfile, lint config, tests and deployment. Both are written in JavaScript (not TypeScript) and map `@/*` to `./src/*` in `jsconfig.json`.

## Requirements

- Node.js 24.18.0 (pinned in [`.nvmrc`](.nvmrc); `>=20.9.0` is the minimum)
- npm, for the developer portfolio
- Bun 1.4.0 (pinned in [`.bun-version`](.bun-version)), for the video portfolio

## Getting started

### Developer portfolio (repo root)

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint         # ESLint (flat config in eslint.config.mjs)
npm test             # Vitest, single run
npm run test:watch   # Vitest, watch mode
npm run build
npm run start
```

### Video portfolio

```bash
cd george-video-portfolio
bun install
bun run dev -p 3001  # both apps default to port 3000
bun run lint
bun run test
bun run build
```

Next.js 16 no longer runs ESLint during `next build`, so run the lint command yourself. The root ESLint config ignores `george-video-portfolio/**`, and each project lints itself.

## Environment variables

| Variable | Used by | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | both apps | Public origin used for canonical URLs, the sitemap, Open Graph and JSON-LD. Falls back to the live URLs above. Set it for each environment, because a wrong value points every canonical tag at the wrong host. |

Each app reads it from `src/lib/site.js`. The `.env.local` files are gitignored.

## Developer portfolio

### Pages

| Route | Contents |
|---|---|
| `/` | Hero with portrait, intro, résumé download and "Hire me" badge |
| `/about` | Biography, stats, skills orbit, experience and education timelines |
| `/projects` | Featured and regular project cards |
| `/articles` | Article cards |
| `/contacts` | Contact form (emailed via Nodemailer) and social links |

Every route has a `loading.jsx` skeleton. The app also provides `error.jsx`, `global-error.jsx` and `not-found.jsx`.

### Layout

```
src/
  app/          layout.js, page.jsx, globals.css, one folder per route,
                sitemap.js, robots.js, opengraph-image.jsx, icon.png, apple-icon.png
  components/   Navbar, Footer, Logo, HireMe, AnimatedText, DarkModeToggle, Skills, Process, Toolbox, CareerGraph,
                Experience, Education, LiIcon, ContactForm, SocialLinks (+ *.test.jsx)
  context/      ThemeContext.jsx (light/dark provider)
  lib/          site.js, securityHeaders.js, submissionGuard.js, reportError.js (+ tests)
  utils/        Article.jsx, FramerImage.jsx
public/
  images/       profile, projects, articles and SVG assets
  George-Kibe-Resume.pdf
```

### Notes

- Design tokens (colours, the slow spin animation) live under `@theme` in `src/app/globals.css`. There is no `tailwind.config.js`.
- Dark mode is a `dark` class on a wrapper element, set by `ThemeProvider` from React state. It does not follow the OS setting.
- All images are local static imports from `public/`.

## Video portfolio

### Pages

| Route | Contents |
|---|---|
| `/` | Hero and stats |
| `/about` | Biography, skills and services |
| `/projects` | Project grid with category filter |
| `/contact` | Contact form (EmailJS), email and phone |

### Layout

```
george-video-portfolio/src/
  app/          layout.js, page.js, globals.css, about/ projects/ contact/,
                sitemap.js, robots.js, opengraph-image.jsx, error pages, icons
  components/   Header/, Footer/, Hero, AboutSection, ProjectsSection,
                ContactSection, BrandIcons
  lib/          site.js (incl. SERVICES), securityHeaders.js,
                submissionGuard.js, reportError.js (+ tests)
```

Each route file is a thin server component that exports `metadata` and renders a section component from `src/components/`. Reveal animations are pure CSS, so content is visible without JavaScript. They are turned off when the visitor prefers reduced motion.

[`george-video-portfolio/AGENTS.md`](george-video-portfolio/AGENTS.md) notes that this Next.js version differs from older documentation. The version-matched docs are in `node_modules/next/dist/docs/`.

## Shared patterns

The two apps implement these features separately, so a change to one should usually be mirrored in the other.

- **SEO.** `src/lib/site.js` is the single source of truth for the origin, author details, keywords and routes. The root layout sets `metadataBase`, a title template, Open Graph, Twitter card and robots directives, and inlines JSON-LD: `Person` and `WebSite` on the developer site, plus `ProfessionalService` on the video site. `sitemap.js` and `robots.js` are generated from `ROUTES`, and `opengraph-image.jsx` renders the social preview with `next/og`. Each page has exactly one `<h1>`.
- **Security headers.** `src/lib/securityHeaders.js` defines a Content-Security-Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy and Permissions-Policy. They are applied to every path through `next.config`. `poweredByHeader` is disabled.
- **Contact forms.** Both forms send through `@emailjs/browser` v4 and show results with `react-toastify`. EmailJS keys are public by design. `submissionGuard.js` limits how often one browser can send (one message every 30 seconds, five per hour, tracked in `localStorage`) to protect the send quota. If storage is unavailable, the guard lets the message through.
- **Error reporting.** Error boundaries and catch blocks call `reportError.js`. It forwards to Sentry when `window.Sentry` is present and otherwise writes a structured JSON line to the console.
- **Accessibility.** Both apps target WCAG AA contrast, 44px tap targets and `prefers-reduced-motion`.

## Testing and CI

Tests use [Vitest](https://vitest.dev) with jsdom and Testing Library. Test files sit next to the code they cover as `*.test.js` / `*.test.jsx`.

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on pushes to `master`/`main` and on pull requests. It has one job per app, and each job installs from the lockfile, then runs lint, tests and a production build.

## Deployment

Each app is a separate Vercel project: the repo root for the developer portfolio, and `george-video-portfolio/` as the root directory for the video portfolio. Set `NEXT_PUBLIC_SITE_URL` in each project's environment settings. `george-video-portfolio/next.config.mjs` sets `outputFileTracingRoot` so Next.js doesn't treat the parent app as the workspace root.

## Known issues

- **Developer portfolio:** the articles page lists the same featured article twice, with empty links. `public/images/profile/gk.png` (8.4 MB) and `gk1.png` (10 MB) should be re-encoded. `next.config.js` still allows an unused S3 image host.
- **Video portfolio:** project entries are placeholders with Unsplash thumbnails and `#` links. Social links are `href="#"`, and `SOCIAL_PROFILES` is empty until the real handles are added. The footer newsletter form has no submit handler. The contact email and phone are hardcoded instead of read from `site.js`.

## Contributing notes

- Keep the two apps isolated. Never import across the boundary or add a dependency to one app just because the other has it.
- Follow the style of the app you're working in: framer-motion and `react-icons` in the root app, CSS animations and `lucide-react` in the video app.
- ESLint is pinned to 9.x. ESLint 10 crashes with the plugins that `eslint-config-next` 16.3.4 pulls in.
- [`CLAUDE.md`](CLAUDE.md) has more detailed conventions for AI coding assistants and contributors.
