"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/reportError";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    reportError(error, { boundary: "app/global-error" });
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        margin: 0, minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "1rem",
        background: "#000", color: "#fff", textAlign: "center",
        fontFamily: "system-ui, sans-serif", padding: "2rem",
      }}>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Something went wrong</h1>
        <p style={{ margin: 0, color: "#9ca3af" }}>The site failed to load. The error has been logged.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1rem", padding: "0.75rem 2rem", fontSize: "1rem",
            borderRadius: "9999px", border: 0, cursor: "pointer",
            background: "#2563eb", color: "#fff", fontWeight: 600,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
