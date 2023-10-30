import Navbar from '@/components/Navbar'
import './globals.css'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
const poppins = Poppins({ subsets: ['latin'], weight: "400" })

export const metadata = {
  title: "George's Portfolio",
  description: "Portfolio for George Kibe in Nextjs: George is a Kenyan based web and mobile developer and Data Engineer",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/profile/gk.png",
        type: "image/png",
        href: "/images/profile/gk.png",      
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "images/profile/gk1.png",
        type: "image/png",
        href: "/images/profile/gk1.png",   
      },
    ]
  }  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} duration-300`}>
        <ThemeProvider>
          <div className={`flex bg-light dark:bg-black dark:text-white flex-col justify-between p-4 text-dark w-full min-h-screen `}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
