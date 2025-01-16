/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add specific configuration for Vercel deployment
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig

