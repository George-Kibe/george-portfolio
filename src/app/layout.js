import { Poppins } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import {
  AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  KEYWORDS,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  TWITTER_HANDLE,
} from '@/lib/site'
import './globals.css'

// The UI leans on font-medium/semibold/bold, so those weights are loaded
// rather than letting the browser synthesise them from a single 400 face.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  // Makes every relative URL below (and in child pages) resolve to an absolute
  // one, which Open Graph and canonical tags both require.
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1b1b' },
  ],
}

// Person + WebSite structured data. This is what lets Google show a richer
// result for searches on the name rather than just a title and snippet.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: AUTHOR.name,
      url: SITE_URL,
      email: `mailto:${AUTHOR.email}`,
      jobTitle: AUTHOR.jobTitle,
      description: DEFAULT_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        addressLocality: AUTHOR.locality,
        addressCountry: AUTHOR.country,
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: AUTHOR.alumniOf,
      },
      knowsAbout: [
        'Web Development',
        'Mobile Development',
        'React',
        'Next.js',
        'React Native',
        'Django',
        'Data Engineering',
        'Data Science',
      ],
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en',
    },
  ],
}

// Applies the stored theme before first paint so the page never flashes the
// wrong colours. Must stay synchronous and in <head>.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var mode = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.add(mode);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <div className="theme flex bg-light dark:bg-black dark:text-white flex-col justify-between p-4 text-dark w-full min-h-screen">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
