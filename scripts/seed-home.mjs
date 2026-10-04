// Home page content for `npm run seed`.

// Brands from George's CV and projects. Logos are added later in /admin/brands;
// until then each shows as a wordmark. Websites are only filled in where known.
export const BRANDS = [
  { name: 'MyIcebreaker', website: '', order: 1 },
  { name: 'PearlMarilyn', website: 'https://apps.apple.com/us/app/pearlmarilyn/id6747705508', order: 2 },
  { name: 'Dowell Research', website: '', order: 3 },
  { name: 'E&M Technology', website: '', order: 4 },
  { name: 'Explore Data Science Academy', website: 'https://admissions.explore.ai/', order: 5 },
  { name: 'RealHive Consultants', website: 'https://realhive-consultants.vercel.app/', order: 6 },
]

// DRAFTS, seeded hidden (published: false). They show the layout and the kind
// of feedback worth collecting, but they are not real client quotes. Replace
// each with a real client's words (and their permission), then tick "Show on
// the site" in /admin/testimonials.
export const TESTIMONIALS = [
  {
    name: 'Amina W.',
    role: 'Founder, e-commerce startup',
    quote: 'George took our app from a rough idea to live on both app stores. Checkout with Stripe just works, and he explained every trade-off in plain language.',
    rating: 5,
    order: 1,
  },
  {
    name: 'Daniel O.',
    role: 'Operations Manager, logistics company',
    quote: 'The n8n workflows he set up replaced hours of copy-pasting every week. Leads now land in our CRM and the team chat automatically.',
    rating: 5,
    order: 2,
  },
  {
    name: 'Grace M.',
    role: 'Head of Data, edtech platform',
    quote: 'Our reporting pipeline used to break every other week. George rebuilt it so reruns are safe and bad data gets caught before it reaches the dashboards.',
    rating: 5,
    order: 3,
  },
  {
    name: 'Peter K.',
    role: 'Managing Director, property agency',
    quote: 'Fast, SEO-friendly website and a listings app our agents actually use. Enquiries went up within the first month.',
    rating: 5,
    order: 4,
  },
  {
    name: 'Sarah N.',
    role: 'CTO, SaaS startup',
    quote: 'Solid Django APIs, clear documentation and great communication. He also mentored two of our junior developers along the way.',
    rating: 4,
    order: 5,
  },
]
