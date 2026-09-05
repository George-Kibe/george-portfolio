/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // This project is nested inside another Next.js app that has its own lockfile.
  // Without this, Next infers the parent directory as the workspace root and
  // traces the wrong files.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
