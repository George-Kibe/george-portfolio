import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-white">404 — Page not found</h1>
      <p className="text-gray-400 max-w-prose">
        That page doesn&apos;t exist. It may have moved or never existed.
      </p>
      <nav className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors">
          Go home
        </Link>
        <Link href="/projects" className="px-8 py-4 border border-blue-500/30 hover:border-blue-500 text-white font-semibold rounded-full transition-colors">
          See the work
        </Link>
      </nav>
    </section>
  );
}
