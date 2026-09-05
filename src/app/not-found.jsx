import Link from 'next/link'

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-3xl md:text-5xl font-bold">404 — Page not found</h1>
      <p className="max-w-prose">
        That page doesn&apos;t exist. It may have moved or never existed.
      </p>
      <nav className="flex flex-wrap gap-4 justify-center mt-4">
        <Link href="/" className="bg-dark text-light dark:bg-light dark:text-dark p-2 px-6 rounded-lg text-lg font-semibold">
          Go home
        </Link>
        <Link href="/projects" className="p-2 px-6 text-lg font-medium underline underline-offset-2">
          See projects
        </Link>
        <Link href="/contacts" className="p-2 px-6 text-lg font-medium underline underline-offset-2">
          Get in touch
        </Link>
      </nav>
    </main>
  )
}
