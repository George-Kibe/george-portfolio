/** @type {import('next').NextConfig} */
const nextConfig = {
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
    }
}

module.exports = nextConfig
