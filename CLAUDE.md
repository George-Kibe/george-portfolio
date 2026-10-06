# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repo is

One git repo holding **two independent Next.js portfolio sites** for George Kibe. They share no code, no dependencies, and no build. Treat them as separate projects that happen to live in the same tree.

| | Developer portfolio | Video-editing portfolio |
|---|---|---|
| Location | repo root (`src/`, `public/`) | `george-video-portfolio/` |
| Package name | `portfolio-new` | `george-video-portfolio` |
| Next.js | 16.3.4 (App Router) | 16.3.4 (App Router, React Compiler on) |
| React | 19.2.8 | 19.2.8 |
| Tailwind | v4 (CSS-first, no config file) | v4 (CSS-first, no config file) |
| Icons | `react-icons`, `react-social-icons` | `lucide-react` + local `BrandIcons.jsx` |
| Animation | `framer-motion` 13 | CSS animations + transitions |
| Font | Poppins (`next/font/google`, weights 300–700) | Poppins (`next/font/google`, weights 300–700) |
| Package manager | npm (`package-lock.json`) | bun (`bun.lock`) |
| Backend | MongoDB (Mongoose), Cloudinary, Nodemailer/Gmail, JWT sessions | same stack, own code and own database (`GKVideoPortfolio`) |

Both were upgraded to Next 16.3.4 together; before that the root app was on Next 13 / React 18 / Tailwind v3.

Both are JavaScript, not TypeScript, and both use `jsconfig.json` with the `@/*` → `./src/*` alias.

## Commands

**Developer portfolio (repo root):**
```bash
npm install
npm run dev      # next dev  → http://localhost:3000
npm run build
npm run start
npm run lint     # eslint (flat config in eslint.config.mjs)
npm test         # vitest (pure helpers: quote pricing, slugs, tokens, HTML, Cloudinary URLs)
npm run seed     # starter posts (with covers), brands, testimonial drafts — never touches accounts
npm run make-admin -- you@example.com   # create/promote an admin with no password; set it via "Forgot password?"
```

Env vars are documented in `.env.example` (MONGODB_URI, CLOUDINARY_URL, SENDER_EMAIL,
EMAIL_PASSWORD, SESSION_SECRET, optional NOTIFY_EMAIL). There are no admin credentials in env:
admins are made with `make-admin` and set their password through the reset flow. A missing or
short `SESSION_SECRET` breaks sign-in and the end of a password reset — it is the first thing to check. `MAIL_DRY_RUN=1` logs emails
instead of sending them; use it for any local testing so nothing goes out from the real Gmail.

**Video portfolio:**
```bash
cd george-video-portfolio
bun install
bun run dev      # → http://localhost:3001 (the developer site uses 3000)
bun run build
bun run lint     # eslint (flat config, eslint-config-next core-web-vitals)
bunx vitest run  # tests (quote pricing, video embeds, tokens, HTML, contact form)
bun run seed     # 6 posts with covers, testimonial + project drafts — never touches accounts
bun run make-admin -- you@example.com
```

Next 16 removed `next lint`, so both projects call the ESLint CLI directly. The root
config ignores `george-video-portfolio/**` — each project lints itself.

The root app has Vitest unit tests; the video app has its own. There is no CI and no type checking.

## Developer portfolio — structure

```
src/app/          layout.js, globals.css; public pages in (site)/ (page.jsx, about/ services/ projects/ articles/ contacts/ quote/
                  login/ signup/ forgot-password/ reset-password/ verify-email/); admin/ panel; actions/ (server actions)
                  (each route has a page.jsx and a loading.jsx)
                  sitemap.js, robots.js, opengraph-image.jsx  <- SEO route handlers
src/components/   Navbar, Footer, Logo, HireMe, AnimatedText, DarkModeToggle,
                  Skills, Process, Toolbox, Experience, CareerGraph, Education,
                  LiIcon, ContactForm
src/lib/experience.js  tech roles from the CV (banking/valuation roles left out on purpose);
                  Experience (list) and CareerGraph both read it
src/utils/        Article, FramerImage
src/context/      ThemeContext (client-side dark/light provider)
src/lib/site.js   URLs, author details, keywords, routes — used by metadata + JSON-LD
public/           images/ (profile, articles, svgs) + George-Kibe-Resume.pdf
```

Conventions in this app:
- Pages are server components by default and export `metadata`; add `"use client"` only when the component needs hooks or `framer-motion`. `contacts/page.jsx` is a client component, which is why its `metadata` export is commented out.
- Design tokens live in `src/app/globals.css` under `@theme`: `--color-dark` (#1b1b1b), `--color-light` (#f5f5f5), `--color-primary` (#0066cc, for light surfaces) and `--color-primary-dark` (#2997ff, for dark surfaces — pair them as `text-primary dark:text-primary-dark` unless the element keeps a light background in dark mode), and `--animate-spin-slow` (HireMe's ring, deliberately kept for attention; applied as `motion-safe:animate-spin-slow`). There is **no `tailwind.config.js`** — do not recreate one.
- Hand-written CSS in `globals.css` that sets properties utilities also set (like the `.theme *` colour transition) must go in `@layer base`. Unlayered CSS beats every Tailwind utility regardless of specificity, which previously cancelled all `transition-*` classes site-wide.
- Motion defaults: 200–300ms, `cubic-bezier(0.2, 0, 0, 1)` (framer: `ease: [0.2, 0, 0, 1]`), small travel (~12–16px), `viewport={{once:true}}` on scroll reveals. The one deliberate exception is HireMe's slow spin.
- Heading sizes come from `AnimatedText`'s `SIZES` map, keyed by the `as` level (h1 `text-4xl lg:text-6xl`, h2 `text-3xl md:text-5xl`). Don't pass font-size classes through its `className` — Tailwind decides which same-property utility wins, not string order, so such overrides silently fail.
- The `circularLight*` / `circularDark*` backgrounds behind the Skills orbit are `@utility` rules in `globals.css`. Tailwind v4 has no `backgroundImage` theme namespace, and they must stay real utilities because Skills.jsx applies them through `md:` and `dark:` variants.
- Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))`, matching the class `ThemeProvider` puts on a wrapper `<div className={"theme " + mode}>`. The `dark` class comes from React state, not from the OS or `localStorage`. Default mode is `"dark"`.
- All images are local static imports from `public/`. The homepage portrait used to be loaded from the `buenas-portfolio-bucket` S3 bucket, but that origin takes 10-15s to return the file — past the image optimizer's fetch timeout — so the optimizer returned 500 and nothing rendered. The S3 hosts remain in `next.config.js` `images.remotePatterns` but nothing uses them; don't reintroduce that bucket for anything render-critical.
- `public/images/profile/gk.png` (8.4MB) and `gk1.png` (10MB) are very large sources. The `sizes` props keep the served variants small (~10KB at the rendered size), but they slow builds and bloat the repo — worth re-encoding.
- The About page runs: bio + stats aside, `Process` (six-layer stack, client), `Skills` orbit, `Toolbox` (server, grouped tools — only list tools George actually uses), `Experience` (`CareerGraph` above the list), `Education`. No portrait there; it lives on the home page.
- `DarkModeToggle` is a round sun/moon button with a fixed "Dark mode" label plus `aria-pressed`. Where `document.startViewTransition` exists (and Reduce Motion is off) it reveals the new theme as a circle from the button; the keyframes and the `.theme-switching` transition kill-switch are in `globals.css`.
- `Skills` positions chips as % offsets inside a box capped at `max-w-3xl` (square on phones, 5:4 from `sm`). Don't go back to vw offsets: the orbit grew to ~1150px tall on desktop.
- `CareerGraph` plots main roles as a stepped line; roles with `alongside: true` (e.g. the Explore internship during Dowell) get their own lane under it. It rounds "now" to the start of the month so server and client agree on path coordinates; the path is drawn in measured pixels (ResizeObserver), not a stretched viewBox.
- Projects come from MongoDB (`models/Project.js`, `/admin/projects`): title, type, summary, image (Cloudinary only — the save action rejects anything else; folder `gk-portfolio/projects`), live link, GitHub, order, featured/published. `/projects` is ISR (5 min) and revalidated on save; `featured` entries take a full row, the rest pair up. Cards render through `CloudImage` (16:9 `c_fill,g_auto`, `f_auto,q_auto`, blur placeholder); the first is preloaded and the page preconnects to `res.cloudinary.com`. The seed adds the five original projects (published) with image URLs from `scripts/project-images.json`; the original files are backed up in the git-ignored `backups/images/projects/`.
- `/services` renders `SERVICES` from `src/lib/services.js`; the footer's Services column reads the same list and links to `/services#<id>`.
- `ProjectCta` (home + contacts) offers "Book a consultation" (`CALENDLY_URL` in `site.js`, new tab) and "Get a quote" (`/quote`). The quote builder asks three things (type, features, timeline) plus name/email; prices live in `src/lib/quote.js` (placeholder USD rates, covered by `quote.test.js`).

## Developer portfolio — backend

- **Routes:** public pages are in the `src/app/(site)` route group (its layout adds Navbar/Footer). The admin panel is `src/app/admin/(panel)` with its own layout; `/admin/login` sits outside that group so the auth check can't redirect it to itself.
- **Data:** `src/lib/db.js` caches one Mongoose connection on `globalThis`. Models in `src/models/` (User, Quote, Post, Comment, Testimonial, Brand, Project) are registered through `defineModel()`, which rebuilds a model in development when its schema changes. Don't go back to `mongoose.models.X || mongoose.model(...)`: after a schema edit the dev server kept the old schema and silently dropped new fields (password-reset tokens were emailed but never saved). Public reads go through `src/lib/queries.js`, which returns empty results instead of throwing, so a DB outage or a build without `MONGODB_URI` degrades to empty sections.
- **Writes are server actions** in `src/app/actions/` (auth, quotes, content, contact). Every admin action calls `assertAdmin()`; every admin page calls `requireAdminPage()` (layouts don't re-run on client navigation, so the layout check alone isn't enough). Admin rights are re-read from the DB on each request, not trusted from the JWT.
- **Auth:** `src/lib/session.js` — HS256 JWT in an httpOnly cookie (`SESSION_SECRET`), 7 days. The cookie is `gk_session` here and `gkv_session` in the video app: cookies are shared across localhost ports, so a common name made each app sign the other out. Passwords use bcrypt via `bcryptjs` (cost 12). Email verification and password reset use random tokens stored only as SHA-256 hashes (`src/lib/tokens.js`), 24h and 1h expiry. Verification is optional: unverified members can sign in and comment. Verify → welcome email. Failed logins lock an email for 15 min after 5 tries (in memory).
- **Email:** `src/lib/mailer.js` (Nodemailer, Gmail SMTP with an app password). Links use the request's origin (`siteOrigin()`), so dev emails point at localhost. Notifications go to `NOTIFY_EMAIL`, else `AUTHOR.email`. Reset/verify email subjects name the site, so links from the two apps can't be confused. Mail failures are logged via `sendSafely` and never fail the action that triggered them.
- **Blog:** posts are HTML from the Tiptap editor (`components/admin/RichTextEditor.jsx`), sanitised with `sanitize-html` on save and again on render (`src/lib/html.js`). `/articles` is ISR (5 min) and revalidated on every admin save; `/articles/[slug]` is dynamic because of comments. Starter posts live in `scripts/seed-posts.mjs` as Markdown and are converted with `marked` when seeded.
- **Images:** uploads go straight from the browser to Cloudinary with a signature from `getUploadSignature()` (admin only; folder `gk-portfolio/blog`), which is why the CSP allows `connect-src https://api.cloudinary.com`. Display goes through `src/lib/cloudinaryUrl.js` (`f_auto,q_auto`, width/crop) and `components/CloudImage.jsx` (next/image with a Cloudinary loader, blurred 40px placeholder, fade-in).
- **Blog lists** are paginated and searchable: `/articles?q=&page=` (9 per page, featured post only on the unfiltered first page) and `/admin/blog` (20 per page), both via `postSearchFilter()` and `components/Pagination.jsx` (server-rendered links, works without JS).
- **Testimonials** show on the home page as a single scroll-snap row (`TestimonialCarousel.jsx`: 1/2/3 per view, chevrons on the sides on desktop and below on mobile), ISR and revalidated on save, only when at least one is published. The seed adds 5 *hidden drafts* (`scripts/seed-home.mjs`); they are illustrative, not real client quotes, so never publish them as-is.
- **Brands** (`models/Brand.js`, `/admin/brands`) feed the home page marquee (`components/BrandMarquee.jsx`, CSS in `globals.css` `.marquee`): the list renders twice and slides by -50% for a seamless loop, pauses on hover, and becomes a static wrapped row under Reduce Motion. Logos upload to Cloudinary `gk-portfolio/brands`; without a logo the name shows as a wordmark.
- **Blog covers** for the starter posts are Cloudinary images `gk-portfolio/blog/cover-<slug>`; their URLs are in `scripts/blog-covers.json`, which the seed uses.

## Video portfolio — structure

The video app now mirrors the developer portfolio's features with its own copy of the code (never imports across the boundary): public pages in `src/app/(site)/` (home, about, projects, articles, contact, quote, login/signup/forgot/reset/verify), admin in `src/app/admin/(panel)` (projects, quotes, testimonials, blog, brands) with `/admin/login` outside it, server actions in `src/app/actions/`, models in `src/models/` (adds `Project`), libs in `src/lib/` (same db/session/mailer/cloudinary/html helpers as the root app, plus `video.js` for YouTube/Vimeo embeds and video-specific pricing in `quote.js`).

Conventions in this app:
- **Theme:** light/dark toggle (`components/DarkModeToggle.jsx` + `context/ThemeContext.jsx`), dark by default, applied before paint by the script in the root layout. Colours are semantic tokens in `globals.css` (`bg-background`, `text-foreground`, `text-muted`, `bg-card`, `border-line`, `border-line-strong`, `bg-accent`, `text-accent-text`, `--glow`), redefined under `.dark`. Use them rather than raw black/white/gray so both themes keep working; `text-accent-text` is blue-700 on light and blue-400 on dark for contrast.
- **Projects** come from MongoDB (`/admin/projects`): YouTube/Vimeo link, Cloudinary thumbnail (falls back to the YouTube thumbnail), category, client, duration, year, featured/published. Cards (`ProjectGrid.jsx`) open the video in a native `<dialog>`; the CSP allows `frame-src` for youtube-nocookie.com and player.vimeo.com. The card title's `::after` covers the card and needs `z-10` to sit above the thumbnail overlay. Featured projects appear on the home page.
- Home: Hero, brand marquee (renders only with brands), featured projects, testimonials carousel, `ProjectCta`. About: intro + services, `Process` (editing workflow, CSS-only), `Toolbox`, CTA. The old percentage skill bars and the unverified awards strip / "Awards Won" stat were removed.
- Reveals stay CSS animations (`animate-fade-in-up` with inline `animationDelay`); no framer-motion in this app. Icons are lucide (copied components import lucide icons under their old `Tb*` names as aliases).
- Social links: `SOCIAL_LINKS` in `src/lib/site.js` (empty until real URLs are known); footer and contact render nothing when it's empty, and `sameAs` derives from it.
- Seeded content: 6 blog posts with Cloudinary covers (`scripts/blog-covers.json`, `gk-video/blog/cover-<slug>`), 5 testimonial drafts and the 6 old Unsplash placeholder projects — both seeded **hidden**; they are not real work or real quotes.
- `next.config.mjs` sets `outputFileTracingRoot` because this project is nested inside another Next app.

## SEO

Both apps follow the same pattern, so changes should be mirrored:

- `src/lib/site.js` is the single source of truth for the origin, author details, keywords and the route list. **Set `NEXT_PUBLIC_SITE_URL`** per environment; the fallback is the production domain (`georgekibe.site` / `v.georgekibe.site`). Getting this wrong points every canonical tag at the wrong host.
- The root layout sets `metadataBase`, a `title.template`, Open Graph, Twitter card and `robots` directives. Pages override with their own `title`, `description`, `alternates.canonical` and `openGraph`.
- Page titles must not repeat the site name — the layout template appends it. Keep the rendered title under ~60 characters.
- `sitemap.js` and `robots.js` generate `/sitemap.xml` and `/robots.txt` from `ROUTES`; add new routes there, not by hand.
- `opengraph-image.jsx` renders the social preview with `next/og` at build time. There is no static image to keep in sync.
- **Exactly one `<h1>` per page.** In the dev portfolio `AnimatedText` renders the heading and takes an `as` prop — pass `as="h2"` for section headings (Experience, Education) so they don't mint extra `<h1>`s, and keep `loading.jsx` skeletons on non-heading elements. In the video portfolio each section's uppercase kicker is a `<p>` and the large heading is the `<h1>`.
- JSON-LD is inlined in each root layout: `Person` + `WebSite` for the dev portfolio, `Person` + `ProfessionalService` + `WebSite` for the video portfolio (the service list comes from `SERVICES`, so copy and schema cannot drift).

## Known issues worth fixing

Do not silently "fix" these while doing unrelated work; they are listed so you recognise them as pre-existing.

Developer portfolio:
- Neither app uses EmailJS any more; all email goes through Nodemailer on the server.
- `npm run lint` is clean. Next 16 no longer lints during `next build`, so run it explicitly.

Video portfolio:
- `bun run lint` is clean.
- **Social links are empty** (`SOCIAL_LINKS` in `src/lib/site.js`) until real profile URLs are provided; guessing handles would send people to accounts that may not be George's.
- The real project list is empty: the seeded placeholders are hidden drafts with stock images (one Unsplash image, "Tech Forward", no longer exists). Add real videos in `/admin/projects`.
- Quote prices in `src/lib/quote.js` are placeholder USD rates.

## Working rules

- Keep the two projects isolated. Never import across the boundary, and never add a dependency to one because the other has it.
- Match the surrounding style of whichever app you're in — the two still have different idioms (framer-motion vs. plain CSS animations, `react-icons` vs. `lucide-react`), even though they now share Next, React and Tailwind versions.
- Both apps target WCAG AA: 4.5:1 for body text, 3:1 for large or bold text and for control boundaries. On the video portfolio's black background that rules out `text-gray-500` (4.34) and `border-blue-500/20` (1.20); use `text-gray-400` (8.07) and `border-gray-500` on form fields. Tap targets are 44px.
- ESLint is pinned to 9.x in both projects. ESLint 10 installs cleanly but crashes (`scopeManager.addGlobals is not a function`) against the plugins `eslint-config-next` 16.3.4 pulls in. Re-test before bumping.
- `framer-motion` v13 deprecated `motion(Component)`; use `motion.create(Component)` (already done in `Logo.jsx` and `FramerImage.jsx`).
- Run `npm run lint` / `bun run lint` in the affected project after changes; there is nothing else to verify against.
- Secrets live in each app's `.env.local` (git-ignored); each app's `.env.example` lists them.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
