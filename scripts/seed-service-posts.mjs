// Four articles per service on /services (src/lib/services.js), in Markdown
// (converted to HTML by seed.mjs). The first tag names the service so a search
// on /articles finds each group. Edit or replace any of them from /admin/blog.

export const SERVICE_POSTS = [
  // ── Web development ────────────────────────────────────────────────────
  {
    title: 'A Practical Core Web Vitals Checklist for Business Sites',
    slug: 'core-web-vitals-checklist',
    tags: ['Web Development', 'Performance', 'SEO'],
    publishedAt: '2026-11-12',
    excerpt: 'LCP, INP and CLS explained in plain terms, with the handful of fixes that move each one on a typical company website.',
    content: `Google uses three Core Web Vitals as a ranking signal, and visitors feel all three whether or not they know the names. Most business sites can pass them with a short list of fixes.

## Largest Contentful Paint (LCP): under 2.5s

LCP measures how long the biggest thing on screen, usually a hero image or headline, takes to appear.

- **Serve the hero image at the size it's shown.** A 4000px photo squeezed into a 600px box is the most common cause of a slow LCP.
- **Preload it.** In Next.js, \`priority\` on the hero \`<Image>\` adds the preload for you.
- **Use modern formats.** AVIF and WebP are often half the size of a JPEG at the same quality.

## Interaction to Next Paint (INP): under 200ms

INP measures how quickly the page responds after a tap or click. Heavy JavaScript is the usual culprit.

- Ship less of it: keep static sections as server components.
- Load chat widgets, heatmaps and other third-party scripts after the page is interactive.
- Break long tasks up so a click never waits behind a 300ms script.

## Cumulative Layout Shift (CLS): under 0.1

CLS measures how much the page jumps around while it loads.

- Give every image and embed a width and height (or an aspect ratio).
- Reserve space for banners and ads instead of pushing content down when they arrive.
- Load web fonts with \`font-display: swap\` and a matching fallback so text doesn't reflow.

## Measure the real thing

Lab tools like Lighthouse are good for debugging, but the ranking signal comes from real visitors. Check the field data in Search Console or PageSpeed Insights, fix the worst page template first, and re-check a month later.`,
  },
  {
    title: 'Handling Forms with Next.js Server Actions',
    slug: 'nextjs-server-actions-forms',
    tags: ['Web Development', 'Next.js', 'Forms'],
    publishedAt: '2026-10-21',
    excerpt: 'Server actions remove the API route between a form and your database. Here is a pattern for validation, errors and pending states.',
    content: `A contact form used to need three pieces: the form, an API route and the fetch call between them. With server actions in the Next.js App Router, the form posts straight to a function that runs on the server.

## The basic shape

\`\`\`js
'use server'

export async function sendMessage(prevState, formData) {
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()
  if (!email.includes('@')) return { error: 'Please enter a valid email.' }
  if (message.length < 10) return { error: 'Tell me a little more.' }
  await saveMessage({ email, message })
  return { ok: true }
}
\`\`\`

On the client, \`useActionState\` wires the form to the action and gives you the returned state and a pending flag:

\`\`\`js
const [state, formAction, pending] = useActionState(sendMessage, {})
\`\`\`

## Rules worth keeping

- **Validate on the server, always.** Browser validation is a convenience; the action is the real gate.
- **Return errors, don't throw them.** A returned \`{ error }\` can be shown next to the form. A thrown error lands on the error page.
- **Check permissions inside every action.** An action is a public endpoint. If it changes admin data, verify the session in the action itself, not only in the page or layout.
- **Disable the button while pending** so a double click doesn't send two messages.

## Progressive enhancement

Because the form uses a real \`action\`, it still submits if JavaScript hasn't loaded yet. That matters on slow connections, and it's free.`,
  },
  {
    title: 'Accessible Forms: Small Fixes That Make a Big Difference',
    slug: 'accessible-web-forms',
    tags: ['Web Development', 'Accessibility', 'UX'],
    publishedAt: '2026-08-27',
    excerpt: 'Labels, error messages, focus and contrast: the form problems that block real users, and how to fix each one.',
    content: `Forms are where most websites lose people who use screen readers, keyboards or zoom. The good news is that the fixes are small and they help everyone.

## Every field needs a real label

Placeholder text disappears as soon as someone types and is often too faint to read. Use a visible \`<label>\` tied to the input with \`for\`/\`id\`. If a design really has no room, the label can be visually hidden, but it must exist.

## Say what went wrong, next to the field

"Invalid input" at the top of the page doesn't help. Put the message beside the field, say how to fix it ("Use the format 0712 345 678"), and connect it with \`aria-describedby\` so screen readers announce it. Mark the field with \`aria-invalid="true"\`.

## Keep focus where people expect it

- After a failed submit, move focus to the first field with an error.
- Never remove the focus outline without replacing it with something just as visible.
- Make sure the whole form works with Tab, Shift+Tab, Space and Enter.

## Contrast and size

WCAG AA asks for 4.5:1 contrast for text and 3:1 for input borders. Light grey borders on white often fail. Tap targets should be around 44px so fields and buttons are easy to hit on a phone.

## Ask for less

The most accessible field is the one you don't include. Every extra question is another chance to give up. If you don't need a phone number, don't ask for it.`,
  },
  {
    title: 'Stripe Webhooks Done Right: Verification and Idempotency',
    slug: 'stripe-webhooks-done-right',
    tags: ['Web Development', 'Stripe', 'Payments'],
    publishedAt: '2026-07-15',
    excerpt: 'Payment confirmations should come from webhooks, not redirects. How to verify them, handle retries and avoid double fulfilment.',
    content: `When a customer pays, it's tempting to mark the order paid as soon as they land on your success page. Don't. People close tabs, lose signal and refresh. The reliable signal is the webhook Stripe sends to your server.

## Verify the signature

Anyone can POST to a public URL. Stripe signs each event, and you check that signature with the raw request body and your endpoint secret:

\`\`\`js
const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)
\`\`\`

The body must be the exact bytes Stripe sent. If your framework parses JSON first, verification fails, so read the raw text.

## Expect duplicates

Stripe retries events that don't get a 2xx response quickly, and occasionally delivers the same event twice. Your handler must be safe to run more than once:

- Store each processed \`event.id\` and skip ones you've seen.
- Or make fulfilment itself idempotent: "set order status to paid" is safe to repeat; "send another product" isn't.

## Respond fast, work later

Return \`200\` as soon as the event is verified and recorded. Send emails, generate invoices and call other APIs from a background job, so a slow email provider never causes Stripe to retry.

## Listen only for what you use

For one-off payments, \`checkout.session.completed\` is usually enough. For subscriptions, add \`invoice.paid\` and \`customer.subscription.deleted\`. Test them locally with \`stripe listen --forward-to localhost:3000/api/webhooks\` before going live.`,
  },

  // ── Mobile development ────────────────────────────────────────────────
  {
    title: 'Offline-Friendly React Native Apps',
    slug: 'react-native-offline-friendly',
    tags: ['Mobile Development', 'React Native', 'Offline'],
    publishedAt: '2026-11-05',
    excerpt: 'Phones lose signal all the time. Caching, optimistic updates and a write queue keep an app usable when the network drops.',
    content: `Mobile users go through lifts, matatus and patchy coverage every day. An app that shows a spinner forever the moment the connection drops feels broken, even if the code is "correct".

## Show cached data first

Render the last data you successfully loaded, then refresh it in the background. Libraries like TanStack Query do this out of the box and can persist their cache to device storage, so the app opens with content even with no connection.

## Know when you're offline

\`@react-native-community/netinfo\` tells you the connection state. Use it to show a small "You're offline" banner rather than error popups on every screen, and to pause retries until the network returns.

## Queue writes instead of failing them

For actions like saving a note or liking a post:

1. Update the UI straight away (an optimistic update).
2. Put the request in a queue stored on the device.
3. Send queued requests when the connection comes back, oldest first.
4. If the server rejects one, roll back that change and tell the user.

Give each queued write a client-generated ID so a retry never creates a duplicate on the server.

## Decide what must be online

Payments, sign-in and anything involving live stock or prices should require a connection and say so clearly. Being offline-friendly doesn't mean everything works offline; it means nothing breaks in a confusing way.

## Test it properly

Turn on airplane mode halfway through a flow. Use the network link conditioner on iOS or throttling in the Android emulator. Most offline bugs only show up when the connection drops at the worst moment.`,
  },
  {
    title: 'Push Notifications in React Native with Expo',
    slug: 'push-notifications-expo',
    tags: ['Mobile Development', 'React Native', 'Notifications'],
    publishedAt: '2026-09-30',
    excerpt: 'From asking permission at the right moment to sending from your backend: a working setup for iOS and Android notifications.',
    content: `Push notifications are one of the best ways to bring people back to an app, and one of the fastest ways to get it uninstalled. Getting both the plumbing and the etiquette right matters.

## Ask at the right moment

iOS lets you ask for permission once. If the user says no, they have to go into Settings to change it. So don't ask on first launch. Ask when the value is obvious, for example right after someone books an appointment: "Want a reminder the day before?"

## Get a push token

With \`expo-notifications\`, once permission is granted you get a token for the device:

\`\`\`js
const { status } = await Notifications.requestPermissionsAsync()
if (status === 'granted') {
  const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId })
  await api.saveDevice({ token, platform: Platform.OS })
}
\`\`\`

Store tokens per device on your backend, since one user may have a phone and a tablet.

## Send from the server

Your backend posts messages to Expo's push service, which delivers through Apple (APNs) and Google (FCM). Check the receipts it returns: a \`DeviceNotRegistered\` error means the app was uninstalled, so delete that token.

## Android channels

Android 8+ groups notifications into channels that users can mute separately. Create channels like "Reminders" and "Promotions" so people can turn off marketing without losing the alerts they actually want.

## Handle the tap

A notification should open the screen it's about. Include a route in the notification's data and navigate to it in the response listener, including when the app was fully closed.

## Keep it worth receiving

Send fewer, more useful notifications. Every message should be something the user would be glad to know right now.`,
  },
  {
    title: 'Keeping Long Lists Fast in React Native',
    slug: 'react-native-list-performance',
    tags: ['Mobile Development', 'React Native', 'Performance'],
    publishedAt: '2026-08-12',
    excerpt: 'Feeds, chats and product grids are where React Native apps slow down. The FlatList settings and habits that keep scrolling smooth.',
    content: `A list of 20 items will be fast however you build it. A feed of 2,000 products with images is where jank shows up, especially on mid-range Android phones.

## Never map a long array into a ScrollView

\`ScrollView\` renders every child at once. Use \`FlatList\` (or \`FlashList\` from Shopify for very long or complex lists), which only renders what's near the screen.

## Give the list what it needs

\`\`\`js
<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={renderProduct}
  getItemLayout={(_, index) => ({ length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index })}
  initialNumToRender={8}
  windowSize={7}
/>
\`\`\`

- A stable \`keyExtractor\` lets React reuse rows instead of rebuilding them.
- \`getItemLayout\` skips measuring rows when they all have the same height.
- A smaller \`windowSize\` keeps fewer off-screen rows in memory.

## Keep rows cheap

- Wrap the row component in \`React.memo\` and define \`renderItem\` outside the render, or with \`useCallback\`, so rows don't re-render when unrelated state changes.
- Don't do formatting or filtering inside the row. Prepare the data once, before it reaches the list.

## Images are usually the real cost

Request thumbnails at the size they're displayed, not full-size uploads. A caching image component such as \`expo-image\` avoids downloading the same picture again as rows scroll back into view.

## Measure on a slow phone

Test release builds on a low-end Android device, not a simulator on a fast laptop. Development builds are much slower and will send you chasing problems that don't exist.`,
  },
  {
    title: 'Storing Auth Tokens Safely in a Mobile App',
    slug: 'mobile-auth-secure-storage',
    tags: ['Mobile Development', 'Security', 'Authentication'],
    publishedAt: '2026-06-24',
    excerpt: 'AsyncStorage is not a vault. Where to keep access and refresh tokens, how long they should live, and how to sign users out cleanly.',
    content: `Once a user signs in, your app holds a token that acts as their password for every request. Where you keep it, and for how long, decides how bad a lost or compromised phone can get.

## Use the platform's secure storage

\`AsyncStorage\` is plain, unencrypted storage. Tokens belong in the iOS Keychain and Android Keystore, which \`expo-secure-store\` wraps:

\`\`\`js
await SecureStore.setItemAsync('refreshToken', token)
const token = await SecureStore.getItemAsync('refreshToken')
\`\`\`

Keep the short-lived access token in memory and only persist the refresh token.

## Short access tokens, rotating refresh tokens

- **Access token:** minutes to an hour. Sent with every API call.
- **Refresh token:** days to weeks. Used only to get a new access token.

Rotate the refresh token on every use: the server issues a new one and invalidates the old one. If an old token is ever presented again, someone copied it, so revoke the whole session.

## Refresh in one place

Put the refresh logic in your API client, not in each screen. When a request returns 401, refresh once, retry the request, and if the refresh fails, send the user to sign-in. Make sure several requests failing at once trigger only one refresh.

## Sign out properly

Signing out should delete the stored token on the device *and* revoke it on the server. Offer "sign out of all devices" for when a phone is lost.

## Extras worth considering

- Ask for Face ID or a fingerprint before opening apps that hold sensitive data.
- Never log tokens, even in development builds; logs end up in crash reports.`,
  },

  // ── Data engineering ──────────────────────────────────────────────────
  {
    title: 'Designing Idempotent Data Pipelines',
    slug: 'idempotent-data-pipelines',
    tags: ['Data Engineering', 'ETL', 'Reliability'],
    publishedAt: '2026-10-29',
    excerpt: 'Pipelines fail and get re-run. If a re-run creates duplicates or gaps, every report downstream is wrong. How to make re-runs safe.',
    content: `Every pipeline eventually fails halfway: an API times out, a server restarts, a file arrives late. Someone re-runs it. The question is whether the re-run fixes things or quietly doubles yesterday's revenue.

A pipeline is **idempotent** when running it twice for the same input gives the same result as running it once.

## Process in fixed windows

Give every run a clear slice of data, usually a date or hour: "load orders for 2026-10-28". Avoid "load everything since last time", because "last time" changes when a run fails.

## Replace, don't append

For each window, overwrite that window's output instead of adding rows to it:

\`\`\`sql
DELETE FROM daily_sales WHERE sale_date = '2026-10-28';
INSERT INTO daily_sales SELECT ... WHERE sale_date = '2026-10-28';
\`\`\`

Run both statements in one transaction, or write to a partition and swap it in, so readers never see a half-loaded day.

## Upsert on natural keys

When records arrive individually, use a key that identifies the real-world thing (an order ID, not an auto-increment) and upsert on it. A duplicate delivery then updates the row instead of adding a second one.

## Keep raw data

Land the source data unchanged before transforming it. If a transformation bug is found next month, you can rebuild from raw files instead of asking the source system for history it may no longer have.

## Backfills become easy

Once each window is self-contained and replaceable, fixing a bad month is just running the pipeline for those 30 dates. That's the real payoff: recovering from mistakes stops being an emergency.`,
  },
  {
    title: "Web Scraping That Doesn't Break Every Week",
    slug: 'reliable-web-scraping',
    tags: ['Data Engineering', 'Scraping', 'Python'],
    publishedAt: '2026-09-17',
    excerpt: 'Scrapers fail when sites change. Prefer APIs, select elements carefully, validate output and scrape politely.',
    content: `Scraping is often the only way to collect data a site doesn't offer any other way. It's also fragile: a redesign can break a scraper overnight. These habits make scrapers last longer and fail loudly when they do break.

## Look for the data before scraping the page

Open the browser's network tab. Many modern sites load their content from a JSON endpoint, which is far more stable than the HTML around it. Check for an official API or a data export too.

## Choose selectors that survive redesigns

- Prefer meaningful attributes (\`data-testid\`, \`itemprop\`, \`aria-label\`) over long CSS paths like \`div > div:nth-child(3) > span\`.
- Anchor on visible labels ("Price") rather than position.
- Keep all selectors in one place so a site change is a one-file fix.

## Validate every record

Check each scraped item against what you expect: price is a positive number, date parses, required fields aren't empty. If more than a small share of records fail, stop the run and alert someone. A scraper that silently returns empty fields is worse than one that crashes.

## Be polite

- Read the site's terms and \`robots.txt\`, and respect them.
- Limit your request rate and add delays between pages.
- Set a clear User-Agent and cache pages you've already fetched.
- Scrape during quiet hours where you can.

## Handle JavaScript-heavy sites last

Tools like Playwright can drive a real browser, but they're slower and heavier. Use them only when the data truly isn't available in the HTML or an underlying request.

## Store the raw page

Save the HTML or JSON you fetched along with the parsed result. When parsing breaks, you can fix the parser and re-run it on stored pages without scraping again.`,
  },
  {
    title: 'Data Quality Checks Every Pipeline Needs',
    slug: 'data-quality-checks',
    tags: ['Data Engineering', 'Data Quality', 'Testing'],
    publishedAt: '2026-08-05',
    excerpt: 'A pipeline that runs successfully can still load wrong data. Six cheap checks that catch most problems before anyone sees a report.',
    content: `A green checkmark on a pipeline only means the code didn't crash. It says nothing about whether the numbers are right. A few automated checks after each load catch most problems before they reach a dashboard.

## 1. Row counts

Compare today's row count with recent days. A drop to zero, or a sudden tenfold jump, almost always means something upstream changed.

## 2. Freshness

Check the newest timestamp in the table. If the latest order is from three days ago, the source has stopped sending data, even if the pipeline "succeeded".

## 3. Required fields

Columns that must always be filled (IDs, dates, amounts) should be checked for nulls. A few nulls might be acceptable; set a threshold rather than demanding perfection.

## 4. Uniqueness

Primary keys must be unique. Duplicates usually mean a join went wrong or a load ran twice.

\`\`\`sql
SELECT order_id, COUNT(*) FROM orders GROUP BY order_id HAVING COUNT(*) > 1;
\`\`\`

## 5. Valid values

Amounts should be positive, statuses should come from a known list, percentages should be between 0 and 100. These checks catch unit mix-ups, like cents loaded as shillings.

## 6. Reconciliation

Totals in the warehouse should match the source system: revenue for the day, number of active customers. This is the check business users trust most.

## What to do when a check fails

Decide in advance. Critical failures should stop the pipeline and keep yesterday's data in place. Warnings can let data through but notify the team. Either way, a failed check should reach a person, not sit in a log nobody reads.`,
  },
  {
    title: 'SQL Window Functions for Everyday Reporting',
    slug: 'sql-window-functions-reporting',
    tags: ['Data Engineering', 'SQL', 'Reporting'],
    publishedAt: '2026-06-10',
    excerpt: 'Running totals, rankings and month-over-month change in a single query, without self-joins or spreadsheet gymnastics.',
    content: `Most reporting questions have the same shape: compare each row with others around it. "What's the running total?", "Which product ranked first each month?", "How did this month compare with last?" Window functions answer all of these in plain SQL.

## The idea

A window function calculates across a set of rows related to the current row, without collapsing them like \`GROUP BY\` does. The \`OVER\` clause defines that set.

## Running totals

\`\`\`sql
SELECT sale_date, amount,
       SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM daily_sales;
\`\`\`

## Rankings within a group

\`\`\`sql
SELECT month, product, revenue,
       RANK() OVER (PARTITION BY month ORDER BY revenue DESC) AS rank_in_month
FROM monthly_product_sales;
\`\`\`

Filter with \`WHERE rank_in_month <= 3\` in an outer query to get the top three products per month.

## Change from the previous period

\`\`\`sql
SELECT month, revenue,
       revenue - LAG(revenue) OVER (ORDER BY month) AS change,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 1) AS pct_change
FROM monthly_revenue;
\`\`\`

\`NULLIF\` avoids dividing by zero in the first month or any month with no revenue.

## Moving averages

Daily figures are noisy. A seven-day average shows the trend:

\`\`\`sql
AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)
\`\`\`

## Why it matters

Doing this in SQL keeps the logic in one place. Every dashboard and export reads the same numbers, instead of each spreadsheet calculating its own slightly different version.`,
  },

  // ── Cloud computing ───────────────────────────────────────────────────
  {
    title: 'Keeping Cloud Bills Predictable: Budgets, Alerts and Tags',
    slug: 'cloud-cost-guardrails',
    tags: ['Cloud Computing', 'AWS', 'Costs'],
    publishedAt: '2026-11-15',
    excerpt: 'Surprise cloud bills are usually avoidable. Set budgets and alerts on day one, tag resources, and clean up what you no longer use.',
    content: `Cloud pricing is pay-as-you-go, which is great until a forgotten test server or a runaway function shows up on the invoice. A few guardrails, set up on the first day, prevent most surprises.

## Set a budget with alerts

Both AWS Budgets and Google Cloud billing budgets can email you when actual or *forecast* spending passes a threshold. Set alerts at 50%, 80% and 100% of what you expect to spend. The forecast alert is the valuable one: it warns you mid-month, not after the bill arrives.

## Tag everything

Add tags like \`project\`, \`environment\` (prod, staging, dev) and \`owner\` to every resource. Then the cost reports can answer "what does the staging environment cost us?" instead of showing one big number.

## Know the usual suspects

Costs that commonly surprise small teams:

- **Idle servers and databases** left running after a test.
- **Data transfer out** to the internet, especially for video or large downloads.
- **NAT gateways**, which charge per hour and per gigabyte.
- **Logs kept forever.** Set a retention period on log groups.
- **Unattached disks, old snapshots and unused IP addresses.**

## Turn off what isn't needed

Development environments don't need to run at night or at weekends. A scheduled job that stops them outside working hours can cut their cost by more than half.

## Review monthly

Spend fifteen minutes each month in the cost explorer, sorted by service. Anything you don't recognise is either waste or a sign that something is misconfigured. Both are worth knowing.

## Right-size later

Start small, measure real usage for a few weeks, then adjust. It's easier to scale up a server that's struggling than to notice one that's been oversized for a year.`,
  },
  {
    title: "Backups You've Actually Restored",
    slug: 'database-backups-restore',
    tags: ['Cloud Computing', 'Databases', 'Backups'],
    publishedAt: '2026-10-08',
    excerpt: "A backup you haven't restored is a hope, not a plan. How to set retention, store copies safely and rehearse a recovery.",
    content: `Almost every managed database offers automatic backups, and most teams switch them on and never look again. The trouble is finding out during an outage that the backups were incomplete, too old or impossible to restore in time.

## Decide two numbers first

- **RPO (recovery point objective):** how much data you can afford to lose. An hour? A day?
- **RTO (recovery time objective):** how long you can afford to be down while restoring.

These decide everything else: how often to back up, which backup features to pay for, and how much to practise.

## Use point-in-time recovery where it exists

Managed databases like Amazon RDS, Cloud SQL and MongoDB Atlas paid tiers can restore to any moment within a retention window. That covers the most common disaster: someone runs a bad update or deletes the wrong records.

Free and entry tiers often don't include automated backups at all. Check before you rely on them, and schedule your own exports if needed.

## Keep a copy somewhere else

Backups stored in the same account as the database can be deleted by the same mistake or the same attacker. Copy periodic exports to separate storage, ideally a different account or provider, with deletion protection turned on.

## Back up files too

User uploads, generated documents and configuration matter as much as database rows. Turn on versioning for storage buckets so overwritten or deleted files can be recovered.

## Rehearse the restore

Every few months, restore a backup into a fresh environment and check that the app runs against it. Time how long it takes and write down the steps. The first rehearsal almost always finds a missing permission, an outdated script or a backup that wasn't running.

## Automate the check

A small scheduled job that confirms the latest backup exists and is a sensible size will catch silent failures long before you need the backup.`,
  },
  {
    title: 'Firebase vs AWS Amplify for a Small App Backend',
    slug: 'firebase-vs-aws-amplify',
    tags: ['Cloud Computing', 'Firebase', 'AWS Amplify'],
    publishedAt: '2026-08-19',
    excerpt: 'Both give you auth, a database, storage and hosting without running servers. How they differ and how to choose.',
    content: `For a new mobile or web app, a serverless backend can save weeks: sign-in, a database, file storage and hosting are ready to use. Firebase and AWS Amplify are the two most common choices, and they suit slightly different projects.

## What they share

Both offer:

- User authentication with email, phone and social sign-in.
- A database the app can talk to directly, protected by rules.
- File storage for uploads.
- Hosting and serverless functions for custom logic.
- A free tier that's generous enough for most early products.

## Firebase

- **Database:** Firestore, a document database with real-time updates built in. Great for chat, live dashboards and collaborative features.
- **Security:** rules written in Firebase's own language, checked on every read and write.
- **Strengths:** very fast to start, excellent mobile SDKs, push notifications through FCM, analytics and crash reporting included.
- **Watch out for:** pricing per document read, which can grow quickly if screens read many documents; limited querying compared with SQL.

## AWS Amplify

- **Database:** a GraphQL or REST API backed by DynamoDB, defined in code.
- **Security:** authorisation rules on your data models, backed by Cognito and IAM.
- **Strengths:** runs on AWS, so you can add any other AWS service later; infrastructure lives in your repository.
- **Watch out for:** a steeper learning curve, and debugging sometimes means understanding the AWS services underneath.

## How to choose

Pick **Firebase** when speed to a working app matters most, the app is mobile-first, or real-time updates are central.

Pick **Amplify** when the business already uses AWS, you expect to need more AWS services, or you want infrastructure defined in code from the start.

Either way, keep your business logic in your own functions rather than spread across client code, so a future move is a migration, not a rewrite.`,
  },
  {
    title: 'Direct-to-Storage Uploads with Presigned URLs',
    slug: 'presigned-url-uploads',
    tags: ['Cloud Computing', 'AWS S3', 'Uploads'],
    publishedAt: '2026-07-01',
    excerpt: 'Let browsers and phones upload files straight to S3 or Cloud Storage, so large files never pass through your server.',
    content: `Sending uploads through your own server means it has to receive, buffer and forward every byte. With large photos or videos, that's slow, expensive and a common cause of timeouts. Presigned URLs let the client upload straight to storage instead.

## How it works

1. The app asks your server for permission to upload a file.
2. Your server checks the user is allowed to, then creates a short-lived signed URL for one specific object.
3. The app uploads the file directly to that URL.
4. The app tells your server the upload finished, and the server records it.

The storage credentials never leave the server; the client only gets a URL that works for a few minutes and one file.

## Creating the URL on AWS

\`\`\`js
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const key = \`uploads/\${userId}/\${crypto.randomUUID()}.jpg\`
const url = await getSignedUrl(
  s3,
  new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: 'image/jpeg' }),
  { expiresIn: 300 }
)
\`\`\`

Google Cloud Storage has the same idea under the name "signed URLs".

## Rules to keep it safe

- **Generate the object key on the server.** Never let the client choose the path, or it could overwrite other people's files.
- **Limit type and size.** Use a presigned POST policy if you need to enforce a maximum file size.
- **Keep expiry short.** Five minutes is plenty for most uploads.
- **Keep the bucket private.** Serve files through signed download URLs or a CDN, not a public bucket.
- **Configure CORS** on the bucket for your site's origin, or browser uploads will fail.

## After the upload

Process files in the background: resize images, scan for malware, extract video thumbnails. Storage events can trigger a function automatically when a new object arrives.`,
  },

  // ── AI automations ────────────────────────────────────────────────────
  {
    title: 'Routing Website Leads into a CRM with n8n',
    slug: 'n8n-lead-routing-crm',
    tags: ['AI Automations', 'n8n', 'CRM'],
    publishedAt: '2026-11-01',
    excerpt: 'A walkthrough of a lead workflow: capture the form, clean and de-duplicate the contact, score it, and alert the right person.',
    content: `Leads that sit in an inbox go cold. A small n8n workflow can move every enquiry into the CRM within seconds, tidy it up, and make sure someone follows up.

## 1. Capture

Start with a **Webhook** node and point your website form at its URL. Most form tools (and any custom form) can post JSON to a webhook. Respond immediately so the visitor isn't kept waiting.

## 2. Clean

Use a **Set** or **Code** node to normalise the data:

- Trim spaces and lowercase the email address.
- Format phone numbers consistently, including the country code.
- Split a single "name" field into first and last name if the CRM needs it.

## 3. De-duplicate

Search the CRM for an existing contact with the same email. If one exists, update it and add a note about the new enquiry; if not, create a new contact. This keeps one record per person instead of five.

## 4. Score and route

Add simple rules with an **IF** or **Switch** node: budget, company size, service requested, location. An AI step can also read a free-text message and classify it as "sales", "support" or "spam", returning a label the workflow can branch on.

High-value leads can be assigned to a specific salesperson; support questions can go to the helpdesk instead.

## 5. Notify

Send a message to the right Slack or Teams channel, or an email, with the key details and a link to the CRM record. Include the lead's message so nobody has to click through to understand it.

## 6. Follow up

Add a **Wait** node and a check: if the lead hasn't been contacted in 24 hours, remind the owner. This is often the step that makes the biggest difference.

## Keep it maintainable

Turn on error workflows so failures send an alert, and store credentials in n8n's credential manager rather than inside nodes.`,
  },
  {
    title: 'Summarising Documents with an LLM Without Losing the Facts',
    slug: 'llm-document-summaries',
    tags: ['AI Automations', 'LLMs', 'Documents'],
    publishedAt: '2026-09-24',
    excerpt: 'Language models summarise well but can invent details. Prompting, structure and checks that keep summaries accurate.',
    content: `Contracts, reports, meeting transcripts and support tickets all pile up faster than anyone can read them. Large language models are very good at summarising them, but they can also state things confidently that aren't in the document. A few techniques keep summaries useful and trustworthy.

## Ask for structure, not prose

A free-form summary is hard to check. Ask for specific fields instead:

\`\`\`text
From the contract below, return JSON with:
- parties: names of each party
- start_date, end_date
- payment_terms: amounts and due dates
- termination: how either party can end it
If a field is not stated in the document, use null. Do not guess.
\`\`\`

Structured output can be validated, stored in a database and compared across documents.

## Tell the model to quote

Ask it to include the sentence each answer came from. Quotes make it easy for a person to check the summary, and they discourage the model from filling gaps with assumptions.

## Handle long documents in pieces

If a document is longer than the model handles comfortably, split it into sections, summarise each one, then summarise the summaries. Keep page or section numbers with each piece so answers can be traced back.

## Check automatically where you can

- Dates and amounts in the summary should appear in the source text.
- Required fields shouldn't be empty for documents of that type.
- If checks fail, send the document for human review instead of saving the summary.

## Keep sensitive data in mind

Check what the provider does with your data before sending contracts or personal information. Use business plans with data-retention controls, and strip out details the summary doesn't need.

## Measure on real examples

Before rolling it out, compare the model's summaries with ones a person wrote for twenty real documents. That shows whether it's good enough, and where it tends to slip.`,
  },
  {
    title: 'Human-in-the-Loop: Where AI Automations Should Ask First',
    slug: 'human-in-the-loop-automation',
    tags: ['AI Automations', 'AI Agents', 'Workflows'],
    publishedAt: '2026-07-29',
    excerpt: 'Fully automatic is not always the goal. How to decide which steps need approval, and how to make approving quick.',
    content: `AI can draft emails, categorise tickets, update records and make decisions. The question isn't whether it can do a task, but what happens when it gets one wrong. The answer decides where a person should approve the result first.

## Sort tasks by risk

Ask two questions for each step: how likely is a mistake, and how costly is it?

- **Low cost, easy to undo:** tagging a support ticket, drafting an internal note, sorting files. Let these run automatically and review a sample.
- **Visible to customers:** replies, quotes, social posts. Have a person approve them, at least at first.
- **Hard to undo:** payments, refunds, deleting data, contract changes. Always require approval.

## Make approval fast

An approval step only works if it's easy. Send the draft to where people already are, a Slack message or an email, with the context needed to decide and buttons to approve, edit or reject. n8n's wait-for-approval and form nodes make this straightforward.

If approving takes more effort than doing the task by hand, people will stop approving carefully.

## Set confidence thresholds

Many steps can report how sure they are. Route clear cases automatically and send uncertain ones to a person. A classifier that's confident 80% of the time still saves most of the work.

## Learn from the edits

Record what people change before approving. If they keep fixing the same thing, adjust the prompt or rules. Over time, steps with consistently good output can move to automatic, with spot checks.

## Keep a log

Store what the automation did, what data it used, and who approved it. When a customer asks why something happened, you'll have the answer.

## Start strict, then relax

Launch with more approval steps than you think you need. It's easy to remove a check once it's clearly unnecessary, and much harder to rebuild trust after an automation sends the wrong thing to a customer.`,
  },
  {
    title: 'Automated Weekly Reports Your Team Will Actually Read',
    slug: 'automated-weekly-reports',
    tags: ['AI Automations', 'Reporting', 'Scheduling'],
    publishedAt: '2026-06-17',
    excerpt: 'Pull the numbers, explain what changed, and deliver it where people already look. A recipe for a scheduled report that earns attention.',
    content: `Many teams spend Monday morning copying numbers from three tools into a spreadsheet. A scheduled automation can do that work, and with a little AI help, explain what the numbers mean.

## Start with the questions

Before building anything, ask the people receiving the report what they decide based on it. A good weekly report answers three or four questions, for example:

- Did sales go up or down, and why?
- Which campaigns brought in leads?
- Are support tickets being resolved on time?

Anything that doesn't help answer them can go.

## Collect the data on a schedule

Use a scheduled trigger in n8n, or a cron job running Celery or a cloud function, to pull figures from each source: the database, the CRM, analytics, the helpdesk. Calculate the comparisons in code or SQL, such as this week against last week and against the same week last year.

Do the maths in code, not in the AI step. Models describe numbers well but shouldn't be trusted to calculate them.

## Add a short explanation

Pass the calculated figures to a language model and ask for three or four plain sentences on what changed, mentioning only the numbers provided. "Leads rose 18%, mostly from the new landing page; ticket resolution slowed on Thursday and Friday." That paragraph is what most people read.

## Deliver it where people look

Post it to the team's Slack or Teams channel, or send a short email, with a link to the full dashboard. Keep the message short enough to read on a phone.

## Flag the unusual

Highlight anything outside the normal range so it stands out instead of hiding in a table. If nothing unusual happened, say so; that's useful too.

## Check it's still useful

Every few months, ask whether people read it and act on it. Remove sections nobody uses. A report that stays short keeps getting read.`,
  },
]
