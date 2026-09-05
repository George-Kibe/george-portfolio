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
| Animation | `framer-motion` 13 | CSS transitions + `IntersectionObserver` |
| Font | Poppins (`next/font/google`, weights 300–700) | Poppins (`next/font/google`, weights 300–700) |
| Package manager | npm (`package-lock.json`) | bun (`bun.lock`) |

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
```

**Video portfolio:**
```bash
cd george-video-portfolio
bun install
bun run dev      # → http://localhost:3000 (conflicts with the other app; use -p to change)
bun run build
bun run lint     # eslint (flat config, eslint-config-next core-web-vitals)
```

Next 16 removed `next lint`, so both projects call the ESLint CLI directly. The root
config ignores `george-video-portfolio/**` — each project lints itself.

There are no tests, no CI, and no type checking in either project.

## Developer portfolio — structure

```
src/app/          layout.js, page.jsx, globals.css + routes: about/ projects/ articles/ contacts/
                  (each route has a page.jsx and a loading.jsx)
                  sitemap.js, robots.js, opengraph-image.jsx  <- SEO route handlers
src/components/   Navbar, Footer, Logo, HireMe, AnimatedText, DarkModeToggle,
                  Skills, Experience, Education, LiIcon, ContactForm
src/utils/        Article, AnimatedNumbers, FramerImage
src/context/      ThemeContext (client-side dark/light provider)
src/lib/site.js   URLs, author details, keywords, routes — used by metadata + JSON-LD
public/           images/ (profile, projects, articles, svgs) + George-Kibe-Resume.pdf
```

Conventions in this app:
- Pages are server components by default and export `metadata`; add `"use client"` only when the component needs hooks or `framer-motion`. `contacts/page.jsx` is a client component, which is why its `metadata` export is commented out.
- Design tokens live in `src/app/globals.css` under `@theme`: `--color-dark` (#1b1b1b), `--color-light` (#f5f5f5), `--color-primary`, `--color-primary-dark`, and `--animate-spin-slow` (used by HireMe). There is **no `tailwind.config.js`** — do not recreate one.
- The `circularLight*` / `circularDark*` backgrounds behind the Skills orbit are `@utility` rules in `globals.css`. Tailwind v4 has no `backgroundImage` theme namespace, and they must stay real utilities because Skills.jsx applies them through `md:` and `dark:` variants.
- Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))`, matching the class `ThemeProvider` puts on a wrapper `<div className={"theme " + mode}>`. The `dark` class comes from React state, not from the OS or `localStorage`. Default mode is `"dark"`.
- All images are local static imports from `public/`. The homepage portrait used to be loaded from the `buenas-portfolio-bucket` S3 bucket, but that origin takes 10-15s to return the file — past the image optimizer's fetch timeout — so the optimizer returned 500 and nothing rendered. The S3 hosts remain in `next.config.js` `images.remotePatterns` but nothing uses them; don't reintroduce that bucket for anything render-critical.
- `public/images/profile/gk.png` (8.4MB) and `gk1.png` (10MB) are very large sources. The `sizes` props keep the served variants small (~10KB at the rendered size), but they slow builds and bloat the repo — worth re-encoding.
- Contact form posts through EmailJS (`@emailjs/browser`, `emailjs.sendForm`) with the service/template/public keys **hardcoded in the component**.

## Video portfolio — structure

```
src/app/          layout.js, page.js, globals.css + about/ projects/ contact/
                  (each page.jsx is a thin server component exporting metadata)
                  sitemap.js, robots.js, opengraph-image.jsx  <- SEO route handlers
src/components/   Header/, Footer/, BrandIcons.jsx,
                  Hero.jsx, AboutSection.jsx, ProjectsSection.jsx, ContactSection.jsx
src/lib/site.js   URLs, author details, keywords, services, routes
public/           only the default create-next-app SVGs
AGENTS.md         Next.js-version warning; CLAUDE.md there is just "@AGENTS.md"
```

Conventions in this app:
- Routes are server components that export `metadata` and render a matching section component from `src/components/`. The sections were originally the route files themselves and were all `"use client"`, which made per-page metadata impossible. `Hero` and `Footer` need no hooks and are now server components; `Header`, `AboutSection`, `ProjectsSection` and `ContactSection` stay client for scroll/`IntersectionObserver`/form state.
- Fixed dark theme: black backgrounds, blue-500/600 accents, gradient text. Not user-switchable.
- Tailwind v4: all theming is in `src/app/globals.css` via `@import "tailwindcss"` and `@theme inline`. There is **no `tailwind.config.js`** — do not create one; add design tokens to `@theme` instead.
- Reveal-on-scroll is hand-rolled: `useState(isVisible)` + `IntersectionObserver` + conditional opacity/translate classes.
- Project data (`projects` array in `projects/page.jsx`) and stats are hardcoded placeholders with Unsplash thumbnails.
- `AGENTS.md` warns that this Next.js version differs from training data — consult `node_modules/next/dist/docs/` before writing framework-level code. That directory is the authoritative, version-matched Next docs and is worth reading for both projects, since they are on the same Next version.
- `lucide-react` v1 removed every brand/social glyph, so Instagram / X / YouTube / LinkedIn live in `src/components/BrandIcons.jsx` as local filled SVGs (paths from simple-icons). They take colour from `currentColor` and ignore stroke utilities, unlike lucide's stroked icons.
- `next.config.mjs` sets `outputFileTracingRoot` because this project is nested inside another Next app; without it Next infers the parent directory as the workspace root and traces the wrong files.

## SEO

Both apps follow the same pattern, so changes should be mirrored:

- `src/lib/site.js` is the single source of truth for the origin, author details, keywords and the route list. **Set `NEXT_PUBLIC_SITE_URL`** per environment; the fallback is the project's Vercel default domain. Getting this wrong points every canonical tag at the wrong host.
- The root layout sets `metadataBase`, a `title.template`, Open Graph, Twitter card and `robots` directives. Pages override with their own `title`, `description`, `alternates.canonical` and `openGraph`.
- Page titles must not repeat the site name — the layout template appends it. Keep the rendered title under ~60 characters.
- `sitemap.js` and `robots.js` generate `/sitemap.xml` and `/robots.txt` from `ROUTES`; add new routes there, not by hand.
- `opengraph-image.jsx` renders the social preview with `next/og` at build time. There is no static image to keep in sync.
- **Exactly one `<h1>` per page.** In the dev portfolio `AnimatedText` renders the heading and takes an `as` prop — pass `as="h2"` for section headings (Experience, Education) so they don't mint extra `<h1>`s, and keep `loading.jsx` skeletons on non-heading elements. In the video portfolio each section's uppercase kicker is a `<p>` and the large heading is the `<h1>`.
- JSON-LD is inlined in each root layout: `Person` + `WebSite` for the dev portfolio, `Person` + `ProfessionalService` + `WebSite` for the video portfolio (the service list comes from `SERVICES`, so copy and schema cannot drift).

## Known issues worth fixing

Do not silently "fix" these while doing unrelated work; they are listed so you recognise them as pre-existing.

Developer portfolio:
- Articles page repeats the same featured article twice with empty `link=""`. Left alone deliberately: deduping or filling in URLs is a content decision, and duplicated entries with no destination are worth fixing for SEO.
- EmailJS credentials are committed in the source of both apps (now `@emailjs/browser` v4, which takes `{ publicKey }` as its fourth argument rather than a bare string).
- `npm run lint` is clean. Next 16 no longer lints during `next build`, so run it explicitly.

Video portfolio:
- Mixed gradient syntax: `bg-gradient-to-*` (v3 spelling) in most files, `bg-linear-to-*` (v4 spelling) in `ContactSection.jsx`. Both still resolve under v4, which keeps the old names as aliases.
- `bun run lint` is clean.
- **Social links are still `href="#"`** in `Footer/index.jsx` and `ContactSection.jsx`, and `SOCIAL_PROFILES` in `src/lib/site.js` is an empty array. Real profile URLs are needed in both places — `sameAs` is how search engines tie this site to the same person elsewhere. Left empty on purpose: guessing handles would point users and crawlers at accounts that may not be George's.
- The footer newsletter `<form>` has no submit handler, so subscribing reloads the page.
- Project data in `ProjectsSection.jsx` is still placeholder content with Unsplash thumbnails, and the per-project links point at `#`. Real work and real URLs would matter more for ranking than any further metadata tuning.
- Contact page email and phone are hardcoded rather than read from `src/lib/site.js`.

## Working rules

- Keep the two projects isolated. Never import across the boundary, and never add a dependency to one because the other has it.
- Match the surrounding style of whichever app you're in — the two still have different idioms (framer-motion vs. IntersectionObserver, `react-icons` vs. `lucide-react`), even though they now share Next, React and Tailwind versions.
- ESLint is pinned to 9.x in both projects. ESLint 10 installs cleanly but crashes (`scopeManager.addGlobals is not a function`) against the plugins `eslint-config-next` 16.3.4 pulls in. Re-test before bumping.
- `framer-motion` v13 deprecated `motion(Component)`; use `motion.create(Component)` (already done in `Logo.jsx` and `FramerImage.jsx`).
- Run `npm run lint` / `bun run lint` in the affected project after changes; there is nothing else to verify against.
- Secrets (EmailJS IDs) are currently in source. If you touch that code, prefer moving them to `NEXT_PUBLIC_*` env vars rather than copying the hardcoded values into new files.
