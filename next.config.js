/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC and use JavaScript fallback compiler in WebContainer
  experimental: {
    swcMinify: false,
    optimizePackageImports: ['lucide-react'],
  },
  swcMinify: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig