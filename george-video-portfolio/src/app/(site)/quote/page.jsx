import QuoteBuilder from '@/components/QuoteBuilder'

export const metadata = {
 title: 'Get a Quote — Web, Mobile & Data Projects',
 description:
    'Build an instant estimate for a website, web app, mobile app, data pipeline or ' +
    'automation project with George Kibe, then request a firm quote.',
 alternates: { canonical: '/quote' },
 openGraph: {
 type: 'website',
 url: '/quote',
 title: 'Get a Quote from George Kibe',
 description:
      'An instant estimate for your web, mobile or data project, and a firm quote by email.',
  },
}

const QuotePage = () => (
  <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-32 pb-20 sm:px-6 lg:px-8">
    <div className="w-full">
      <h1 className="text-center text-4xl sm:text-5xl font-bold text-foreground">Get a <span className="text-accent-text">Quote</span></h1>
      <p className="mx-auto mt-4 max-w-prose text-center text-lg leading-relaxed text-muted">
        Answer a few questions to see a ballpark price and timeline. Send it over and I&apos;ll come back
 with a firm quote.
      </p>
      <div className="mt-12">
        <QuoteBuilder />
      </div>
    </div>
  </div>
)

export default QuotePage
