// Starter articles for the blog, in Markdown (converted to HTML by seed.mjs).
// edit or replace any of them from /admin/blog.

export const POSTS = [
  {
    title: 'Shipping a React Native App to Both Stores: My Release Checklist',
    slug: 'react-native-release-checklist',
    tags: ['React Native', 'Mobile', 'Release'],
    publishedAt: '2026-09-22',
    excerpt: 'Getting an app approved on the App Store and Google Play is its own project. This is the checklist I run before every release.',
    content: `Writing the app is only half the job. The other half is getting it through two review processes that each have their own rules, tooling and surprises. After shipping apps like PearlMarilyn to both stores, this is the list I go through before every release.

## Before you build

- **Bump both version numbers.** The user-facing version (\`1.4.0\`) and the build number (iOS \`buildNumber\`, Android \`versionCode\`). The stores reject a build number they've seen before.
- **Check permissions.** Every permission needs a plain-English reason on iOS. "We need your location" is not enough; say what the app does with it.
- **Point at production.** API URLs, payment keys and analytics should all come from the production environment, not whatever you tested with last.

## Building

With Expo and EAS, a release build is one command per platform:

\`\`\`bash
eas build --platform ios --profile production
eas build --platform android --profile production
\`\`\`

Keep the build profiles in \`eas.json\` so nobody has to remember flags.

## Store listings

Screenshots, descriptions and privacy answers take longer than people expect. Apple wants screenshots for specific device sizes, and both stores ask detailed questions about the data you collect. Answer them honestly: a mismatch between your privacy label and what the app actually does is a common reason for rejection.

## Review

- **Give reviewers a test account.** If the app needs a login, put working credentials in the review notes.
- **Explain anything unusual.** Payments for real-world services, user-generated content and location use all get extra scrutiny.
- **Expect at least one rejection.** Read the message carefully, fix exactly what they ask, and reply in the resolution centre.

## After release

Watch crash reports for the first 48 hours, and use staged rollouts on Google Play so a bad build only reaches a slice of users. The release isn't done when it's approved; it's done when it's stable.`,
  },
  {
    title: 'Why I Build Client Sites with the Next.js App Router',
    slug: 'why-nextjs-app-router',
    tags: ['Next.js', 'React', 'Web'],
    publishedAt: '2026-09-08',
    excerpt: 'Server components, built-in metadata and per-page rendering choices make the App Router my default for business websites.',
    content: `Most of the websites I build for clients have the same needs: they must load fast, rank well, be easy to update, and occasionally talk to a database. The Next.js App Router covers all of that without stitching together half a dozen tools.

## Less JavaScript by default

Components are server components unless you opt out. A page of text, images and links ships almost no JavaScript, and only the interactive pieces (a form, a menu, a carousel) become client components with \`"use client"\`. Visitors on slower phones notice the difference.

## SEO without plugins

Each page exports its own metadata:

\`\`\`js
export const metadata = {
  title: 'Projects',
  description: 'Selected web and mobile work.',
  alternates: { canonical: '/projects' },
}
\`\`\`

Add \`sitemap.js\`, \`robots.js\` and an \`opengraph-image\` file and the essentials are covered, generated from the same source of truth as the pages.

## The right rendering for each page

Not every page needs the same strategy:

- **Static** for pages that rarely change, like About and Services.
- **Revalidated** for content that updates occasionally, like a blog list that refreshes when a post is saved.
- **Dynamic** for anything personal, like a dashboard or a page that knows who is signed in.

You choose per route, not per project.

## Server actions for forms

Contact forms, quote requests and admin edits can call a server function directly. Validation, database writes and authorisation checks all run on the server, and there's no separate API layer to maintain for simple sites.

## The trade-off

The App Router has a learning curve, and the line between server and client code takes some getting used to. For content-led business sites, though, the result is faster pages and less code, and that's what clients are paying for.`,
  },
  {
    title: 'Designing Django REST APIs That Mobile Apps Love',
    slug: 'django-rest-apis-for-mobile',
    tags: ['Django', 'APIs', 'Mobile'],
    publishedAt: '2026-08-25',
    excerpt: 'Mobile clients live with slow networks and old app versions. A few API habits make life much easier for them.',
    content: `A web frontend is redeployed with the backend. A mobile app isn't: people keep old versions installed for months, on networks that drop out mid-request. That changes how I design Django APIs.

## Version from day one

Put a version in the URL (\`/api/v1/\`) before the first release. When a breaking change comes, and it will, the old app keeps working against \`v1\` while the new one moves to \`v2\`.

## Paginate everything that's a list

Never return an unbounded list. Cursor pagination works well for feeds because new items don't shift pages around:

\`\`\`python
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.CursorPagination",
    "PAGE_SIZE": 20,
}
\`\`\`

## Return what the screen needs

If a screen shows a list of bookings with the customer's name, include the name in the booking payload. Making the app fetch each customer separately turns one request into twenty on a slow connection.

## Consistent errors

Pick one error shape and use it everywhere, so the app can show a sensible message without special cases:

\`\`\`json
{ "error": "validation_error", "fields": { "email": ["Enter a valid email."] } }
\`\`\`

## Tokens that refresh

Short-lived access tokens with a refresh token keep users signed in without long-lived secrets on the device. Make sure the app handles a \`401\` by refreshing once and retrying, not by logging the user out.

## Make writes safe to retry

When a request times out, the app doesn't know whether it succeeded. Accept a client-generated idempotency key on important writes such as payments and bookings, so a retry doesn't create a duplicate.

None of this is complicated, but adding it later, after thousands of installs, is much harder than starting with it.`,
  },
  {
    title: 'Automating the Boring Stuff with n8n',
    slug: 'automating-with-n8n',
    tags: ['Automation', 'n8n', 'AI'],
    publishedAt: '2026-08-11',
    excerpt: 'Most small teams lose hours a week copying data between tools. n8n workflows win that time back without a custom app.',
    content: `I like building software, but some problems don't need new software. They need the tools a team already uses to talk to each other. That's where n8n comes in.

## What n8n is

n8n is a workflow automation tool: you connect a trigger (a form submission, a new row in a sheet, a webhook, a schedule) to a series of steps that read, transform and send data. It can be self-hosted, which matters when the data is sensitive.

## Workflows that pay for themselves

These are the kinds of workflows I build for sales and marketing teams:

- **Lead capture.** A website form creates a contact in the CRM, sends a tailored welcome email and posts a summary to the team chat.
- **Follow-ups.** If a lead hasn't replied in three days, a reminder lands with the right salesperson.
- **Reporting.** Every Monday, pull the week's numbers from several tools into one summary email.
- **Content.** Draft social posts from a new blog article with an AI step, then queue them for human review.

## Keep a human in the loop

AI steps are great at drafting, sorting and summarising. They shouldn't send anything important unsupervised. I route AI output to an approval step, a message with "approve" and "edit" buttons, before it goes anywhere public.

## Build them to fail loudly

Automations break quietly: an API key expires, a field gets renamed. Every workflow I hand over has an error branch that alerts someone, and a short note explaining what it does and who owns it.

## When to write code instead

If a workflow grows dozens of branches, needs complex business rules or handles high volumes, it has outgrown a visual tool. That's the point to turn it into a proper service. Until then, n8n gets the job done in an afternoon instead of a sprint.`,
  },
  {
    title: 'Building ETL Pipelines with Python and PySpark: Lessons from Data Engineering',
    slug: 'etl-pipelines-python-pyspark',
    tags: ['Data Engineering', 'Python', 'PySpark'],
    publishedAt: '2026-07-28',
    excerpt: 'What I learned designing pipelines as a data engineering intern: start simple, make every step re-runnable, and test the data, not just the code.',
    content: `During my data engineering internship with Explore Data Science Academy, much of my time went into ETL pipelines: extracting data from several sources, transforming it into something useful, and loading it where analysts and models could use it. These are the lessons that stuck.

## Start with plain Python

Spark is powerful, but it's overkill for a few hundred megabytes. I start with pandas and only move to PySpark when the data or the processing time genuinely demands it. The structure of the pipeline stays the same either way.

## Make every step re-runnable

A pipeline will fail halfway through at some point. If re-running it creates duplicates, you have a bigger problem than the failure. Write each step so that running it twice gives the same result:

\`\`\`python
(df.write
   .mode("overwrite")
   .partitionBy("event_date")
   .parquet("s3://warehouse/events/"))
\`\`\`

Overwriting one date partition at a time means a rerun replaces that day's data instead of appending to it.

## Separate raw from clean

Keep an untouched copy of the raw input. When a transformation turns out to be wrong, and one eventually will, you can rebuild the clean tables from the source instead of asking the source system for history it may no longer have.

## Test the data

Unit tests catch bugs in code. They don't catch a supplier who starts sending dates in a new format. Add checks at the boundaries:

- Row counts within an expected range
- No nulls in key columns
- Values inside sensible bounds

Fail the run when a check fails. Loading bad data quietly is worse than loading nothing.

## Schedule and observe

Use a scheduler, not a cron job on someone's laptop, and record how long each run takes and how many rows it moved. When a run that normally takes ten minutes takes two hours, you want to know before the morning report goes out.`,
  },
  {
    title: 'Background Jobs with Celery and Redis: When and How',
    slug: 'celery-redis-background-jobs',
    tags: ['Django', 'Celery', 'Redis'],
    publishedAt: '2026-07-14',
    excerpt: 'If a request makes the user wait for something they don’t need to see, it belongs in a background job.',
    content: `A good rule of thumb: if a request makes the user wait for work they don't need to see the result of, move that work out of the request. In Django projects, I use Celery with Redis for this.

## What belongs in the background

- Sending emails and push notifications
- Generating PDFs and reports
- Resizing uploaded images
- Calling slow third-party APIs
- Scheduled work: reminders, clean-ups, nightly syncs

The user gets an immediate response, and the work happens a moment later.

## A minimal task

\`\`\`python
from celery import shared_task

@shared_task(bind=True, max_retries=3, default_retry_delay=30)
def send_booking_confirmation(self, booking_id):
    booking = Booking.objects.select_related("customer").get(pk=booking_id)
    try:
        email_service.send_confirmation(booking)
    except TemporaryEmailError as exc:
        raise self.retry(exc=exc)
\`\`\`

Two habits in that snippet matter:

1. **Pass ids, not objects.** The task loads fresh data when it runs, rather than working from a stale copy serialised minutes earlier.
2. **Retry what's temporary.** A mail server hiccup shouldn't lose the confirmation.

## Queue after the transaction commits

If you queue a task inside a database transaction, the worker can start before the data is saved and fail to find the record. Django has a clean fix:

\`\`\`python
transaction.on_commit(lambda: send_booking_confirmation.delay(booking.id))
\`\`\`

## Keep tasks small and safe to repeat

Tasks can run more than once: after a retry, or after a worker restarts mid-job. Write them so a second run does no harm, for example by checking whether the email was already sent.

## Watch the queues

A tool like Flower, or simply logging task durations and failures, tells you when a queue is backing up. A growing queue is often the first sign that something downstream is struggling.`,
  },
  {
    title: 'Adding Stripe Checkout to a React Native E-commerce App',
    slug: 'stripe-checkout-react-native',
    tags: ['React Native', 'Stripe', 'E-commerce'],
    publishedAt: '2026-06-30',
    excerpt: 'Payments are where an e-commerce app earns trust. Here’s the flow I use so card details never touch my servers.',
    content: `On e-commerce apps like Haute Corner, the checkout is the screen that matters most. It has to be smooth, and it has to be secure. Stripe makes both achievable without handling card numbers yourself.

## The shape of the flow

1. The app sends the cart to **your** backend.
2. The backend works out the total from its own prices and creates a **PaymentIntent** with Stripe.
3. The backend returns the PaymentIntent's client secret to the app.
4. The app shows Stripe's Payment Sheet, which collects and submits the card details directly to Stripe.
5. Stripe notifies your backend through a **webhook** when the payment succeeds.

Card details go from the phone straight to Stripe. Your servers never see them, which keeps you out of most PCI compliance work.

## Never trust prices from the app

The app can be modified. Always calculate the amount on the server from product ids and quantities:

\`\`\`js
const amount = cart.reduce((sum, item) => {
  const product = productsById[item.productId]
  return sum + product.priceInCents * item.quantity
}, 0)

const intent = await stripe.paymentIntents.create({
  amount,
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
})
\`\`\`

## Fulfil orders from the webhook

Don't mark an order as paid because the app said so. Mark it paid when Stripe's \`payment_intent.succeeded\` webhook arrives, after verifying the webhook signature. The app can lose connection right after paying; the webhook still arrives.

## Test the unhappy paths

Stripe's test cards cover declines, insufficient funds and 3D Secure challenges. Run through each one before launch. A customer who sees a clear "your card was declined, try another" message often completes the purchase; one who sees a spinner forever doesn't.

## Use the Payment Sheet

Stripe's prebuilt sheet handles Apple Pay, Google Pay, saved cards and authentication challenges. Building that yourself takes weeks and is easy to get wrong.`,
  },
  {
    title: 'MongoDB Schema Design for Marketplace Apps',
    slug: 'mongodb-schema-design-marketplaces',
    tags: ['MongoDB', 'Databases', 'Architecture'],
    publishedAt: '2026-06-16',
    excerpt: 'Embed or reference? For marketplaces that match two sides, like tenants and landlords, the answer follows from how the app reads data.',
    content: `Apps like RealHive match two groups of people: property seekers with owners, tenants with landlords. MongoDB works well for this, as long as the schema is shaped around how the app reads data rather than how a relational diagram would look.

## Design for your queries

List the screens first. For a property marketplace:

- A search screen filtering listings by location, price and type
- A listing page with photos, details and the owner's public profile
- A conversation between a seeker and an owner

Each screen should need as few queries as possible.

## Embed what you always read together

A listing's photos, amenities and address are only ever shown with the listing, so they live inside it:

\`\`\`js
{
  title: '2-bedroom apartment, Kilimani',
  price: 65000,
  location: { type: 'Point', coordinates: [36.78, -1.29] },
  photos: [{ url: '…', caption: 'Living room' }],
  amenities: ['parking', 'backup water'],
  owner: ObjectId('…'),
}
\`\`\`

## Reference what's shared or grows without limit

The owner is shared across many listings, so listings store the owner's id. Messages grow without limit, so they live in their own collection with a conversation id, never as an ever-growing array inside a document.

## Index for the search screen

Searches filter on several fields at once. A compound index that matches the common filter order, plus a geospatial index for "near me" searches, keeps them fast:

\`\`\`js
listingSchema.index({ type: 1, price: 1 })
listingSchema.index({ location: '2dsphere' })
\`\`\`

## Copy small, stable fields

It's fine to store the owner's display name on a listing so the search results don't need a second query. Just accept that you'll update those copies when the name changes, which is rare.

The guiding question is always the same: what does this screen need, and how do I get it in one read?`,
  },
  {
    title: 'AWS for Small Teams: The Services I Actually Use',
    slug: 'aws-for-small-teams',
    tags: ['AWS', 'Cloud', 'DevOps'],
    publishedAt: '2026-06-02',
    excerpt: 'AWS has hundreds of services. Most small products need about five. Here’s my short list and when I reach for each.',
    content: `AWS can feel overwhelming: the console lists hundreds of services. As an AWS Certified Cloud Practitioner who deploys products for small teams, I find most projects only need a handful. Here's my short list.

## S3 for files

User uploads, images, documents and backups all go to S3. It's cheap, durable and works with almost everything. Two rules: keep buckets private by default, and give the app pre-signed URLs to upload and download instead of making files public.

## CloudFront in front of it

A CDN in front of S3 (or your app) serves files from a location close to each user. For an audience spread across continents, that's the difference between images that pop in and images that crawl.

## A simple compute option

For a small API, I prefer the simplest thing that works:

- **Lightsail or a single EC2 instance** with Docker for predictable, low-cost hosting
- **Elastic Beanstalk or ECS** when the app needs to scale out or roll out without downtime
- **Lambda** for occasional background jobs and webhooks

## Managed databases

Running your own database server means doing your own backups, upgrades and failover. RDS handles all three. If you use MongoDB, Atlas on AWS gives you the same convenience.

## Amplify for mobile backends

For mobile apps that need authentication, storage and an API quickly, Amplify ties several AWS services together with a client library. It's a fast way to get a React Native app talking to a real backend.

## Guardrails from day one

- **Billing alerts**, so a misconfigured service doesn't become a surprise invoice
- **IAM users with least privilege**, never the root account for daily work
- **Infrastructure written down**, whether as code or at least in a checklist, so the setup can be recreated

Start small, add services when a real need appears, and keep an eye on the bill.`,
  },
  {
    title: 'From Real Estate Valuation to Software Engineering',
    slug: 'from-real-estate-to-software',
    tags: ['Career', 'Personal'],
    publishedAt: '2026-05-19',
    excerpt: 'I studied Real Estate and worked in banking before writing code for a living. The detour turned out to be an advantage.',
    content: `I didn't start out in tech. I studied Real Estate at the University of Nairobi, worked in a bank as a relationship officer, and later prepared valuations and feasibility studies for property projects. Today I build web and mobile apps and data pipelines. Here's how that happened, and why the detour helped.

## Spreadsheets were the gateway

Valuation work runs on spreadsheets: cash flow projections, comparable sales, financial models. I kept looking for ways to make them faster and less error-prone, and that curiosity led to Python. Automating one tedious report was enough to get me hooked.

## Learning deliberately

I didn't want to just follow tutorials, so I took structured routes: a software engineering diploma with ALX Africa, then data engineering with Explore Data Science Academy. Alongside the courses, I built things. RealHive, a property app that matches tenants with landlords, came straight out of problems I'd seen in my real estate work.

## What the detour gave me

- **Domain knowledge.** I understand how businesses in property and finance actually operate, which makes requirements conversations much easier.
- **Comfort with numbers and money.** Payments, reports and financial logic don't intimidate me.
- **Empathy for users.** I've been the person stuck with clunky internal tools. I build with that person in mind.

## Advice for career changers

1. **Start with a problem you know.** Your old industry is full of them, and you understand them better than most developers do.
2. **Build in public.** A GitHub profile and a few live projects say more than a certificate alone.
3. **Don't hide your background.** It's not a gap in your CV; it's a specialism.

If you're thinking about making the switch, my inbox is open.`,
  },
]
