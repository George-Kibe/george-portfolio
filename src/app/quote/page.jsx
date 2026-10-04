import AnimatedText from '@/components/AnimatedText'
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
  <div className="flex w-full flex-col items-center md:px-8 lg:px-32">
    <main className="w-full">
      <AnimatedText text="Get A Quote" />
      <p className="mx-auto max-w-prose text-center leading-relaxed text-dark/75 dark:text-light/75">
        Answer a few questions to see a ballpark price and timeline. Send it over and I&apos;ll come back
        with a firm quote.
      </p>
      <div className="mt-12">
        <QuoteBuilder />
      </div>
    </main>
  </div>
)

export default QuotePage
