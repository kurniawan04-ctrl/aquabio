import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // Increase body size limit for Server Actions to support file uploads up to 10MB
  // For Next.js 15, use experimental.serverActions
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb', // Set to 15MB to allow 10MB files with some margin
    },
  },
}

export default nextConfig

