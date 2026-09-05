"use client";

import { useEffect } from "react";
import Link from "next/link";
import { reportError } from "@/lib/reportError";

export default function Error({ error, reset }) {
  useEffect(() => {
    reportError(error, { boundary: "app/error" });
  }, [error]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-white">Something went wrong</h1>
      <p className="text-gray-400 max-w-prose">
        That page failed to load. The error has been logged.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          onClick={reset}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-8 py-4 border border-blue-500/30 hover:border-blue-500 text-white font-semibold rounded-full transition-colors"
        >
          Go home
        </Link>
      </div>
      {error?.digest ? (
        <p className="text-xs text-gray-600">Reference: {error.digest}</p>
      ) : null}
    </section>
  );
}
