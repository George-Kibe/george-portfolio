// Single seam for error reporting.
//
// Everything that catches an error calls this, so wiring up a provider is a
// change in one file rather than a hunt through every boundary. If Sentry is
// loaded it receives the error; otherwise this still emits a structured line so
// the failure is visible in Vercel's function logs or the browser console.
//
// This must never throw: an error in the error reporter would replace a useful
// stack trace with a useless one.
export function reportError(error, context = {}) {
  try {
    const sentry = typeof window !== "undefined" ? window.Sentry : globalThis.Sentry;
    if (sentry?.captureException) {
      sentry.captureException(error, { extra: context });
      return;
    }

    console.error(
      JSON.stringify({
        level: "error",
        message: error?.message ?? String(error),
        name: error?.name,
        digest: error?.digest,
        stack: error?.stack,
        ...context,
        at: new Date().toISOString(),
      })
    );
  } catch {
    // Reporting must not mask the original failure.
  }
}
