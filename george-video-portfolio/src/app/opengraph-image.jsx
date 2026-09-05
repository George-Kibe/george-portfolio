import { ImageResponse } from "next/og";
import { AUTHOR, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — ${AUTHOR.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build time, so there is no static asset to keep in sync.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 70% 30%, rgba(59,130,246,0.35), transparent 55%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#60a5fa", letterSpacing: 3 }}>
          {AUTHOR.jobTitle.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            color: "#ffffff",
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          Crafting Visual Stories
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#9ca3af", marginTop: 20 }}>
          {SITE_NAME} · {AUTHOR.locality}, {AUTHOR.country}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            height: 8,
            width: 240,
            backgroundColor: "#2563eb",
          }}
        />
      </div>
    ),
    size
  );
}
