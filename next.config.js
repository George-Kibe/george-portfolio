/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'buenas-portfolio-bucket.s3.amazonaws.com',
            'buenas-portfolio-bucket.s3.eu-west-1.amazonaws.com',
        ]
    }
}

module.exports = nextConfig
