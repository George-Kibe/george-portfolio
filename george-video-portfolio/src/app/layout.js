import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  KEYWORDS,
  SERVICES,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
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
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "video production",
};

// Dark by default; the theme script and ThemeContext switch this when a
// visitor picks light.
export const viewport = {
  themeColor: "#000000",
};

// Applies the theme before first paint so there's no flash. Dark for everyone
// unless they've chosen light with the toggle (stored by ThemeContext).
const themeScript = `
(function () {
  var mode = 'dark';
  try {
    if (localStorage.getItem('theme') === 'light') mode = 'light';
  } catch (e) {}
  document.documentElement.classList.add(mode);
  if (mode === 'light') {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#ffffff');
  }
})();
`;

// ProfessionalService carries the location and service list, which is what a
// local search like "video editor Nairobi" is matched against.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR.name,
      alternateName: AUTHOR.brand,
      url: SITE_URL,
      email: `mailto:${AUTHOR.email}`,
      telephone: AUTHOR.phone,
      jobTitle: AUTHOR.jobTitle,
      ...(SOCIAL_PROFILES.length > 0 && { sameAs: SOCIAL_PROFILES }),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      email: `mailto:${AUTHOR.email}`,
      telephone: AUTHOR.phone,
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: { "@type": "Country", name: AUTHOR.country },
      address: {
        "@type": "PostalAddress",
        addressLocality: AUTHOR.locality,
        addressCountry: AUTHOR.country,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Video editing services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
