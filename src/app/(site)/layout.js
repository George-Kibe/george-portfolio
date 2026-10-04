import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Public pages share the site navbar and footer. The admin panel lives outside
// this group so it can use its own chrome. The fragment keeps Navbar, the page
// and Footer as direct children of the root layout's flex column.
export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
