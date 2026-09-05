const { securityHeaders } = require('./src/lib/securityHeaders.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Framework disclosure serves no purpose.
    poweredByHeader: false,
    images: {
        // `images.domains` was deprecated in Next 16 in favour of remotePatterns.
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'buenas-portfolio-bucket.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'buenas-portfolio-bucket.s3.eu-west-1.amazonaws.com',
            },
        ]
    },
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }]
    },
}

module.exports = nextConfig
