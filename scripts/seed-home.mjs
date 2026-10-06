// Home page content for `npm run seed`.

// Brands from George's CV and projects. Logos are added later in /admin/brands;
// until then each shows as a wordmark. Websites are only filled in where known.
export const BRANDS = [
  { name: 'MyIcebreaker', website: '', order: 1 },
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

// The projects that used to be hard-coded on /projects, seeded published.
// `imageKey` looks up the Cloudinary URL in project-images.json
// (gk-portfolio/projects/<key>).
export const PROJECTS = [
  {
    type: 'Web Application',
    title: 'Buenas Electronics Store',
    summary: 'An online store for an electronics shop with the full shopping flow: product catalogue, latest arrivals, browsing by category, a cart and Stripe checkout.',
    imageKey: 'buenas-electronics-store',
    link: 'https://buenas-ecommerce.vercel.app',
    github: 'https://github.com/George-Kibe/Ecommerce-next',
    featured: true,
    order: 1,
  },
  {
    type: 'Mobile Application',
    title: 'RealHive',
    summary: 'Inspired by Airbnb, a React Native app that matches property seekers with property owners, and tenants with landlords.',
    imageKey: 'realhive',
    link: 'https://play.google.com/store/apps/details?id=com.realhive.app',
    github: 'https://github.com/George-Kibe',
    order: 2,
  },
  {
    type: 'Website',
    title: 'Buenas Consultants',
    summary: 'A company website for an IT consultancy, presenting its services and projects, with a blog on trends in the industry.',
    imageKey: 'buenas-consultants',
    link: 'https://buenas-portfolio.vercel.app/',
    github: 'https://github.com/George-Kibe/Nextjs',
    order: 3,
  },
  {
    type: 'Mobile Application',
    title: 'Haute Corner',
    summary: 'An e-commerce mobile app built with React Native and AWS Amplify: product catalogue, latest arrivals, browsing by category, a cart and Stripe checkout.',
    imageKey: 'haute-corner',
    link: 'https://play.google.com/store/apps/details?id=com.hautecorner.app',
    github: 'https://github.com/George-Kibe/Haute-corner',
    featured: true,
    order: 4,
  },
  {
    type: 'Web Application',
    title: 'Mernbnb',
    summary: 'Inspired by Airbnb, a web app for booking holiday homes, where guests book stays and view their accommodation. Built on the MERN stack (MongoDB, Express, React, Node.js) with AWS for cloud storage.',
    imageKey: 'mernbnb',
    link: 'https://mernbnb.vercel.app/',
    github: 'https://github.com/George-Kibe/Mernbnbclone',
    featured: true,
    order: 5,
  },
]
