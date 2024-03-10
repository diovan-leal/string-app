/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "cloudflare-ipfs.com",
            "rlcugkdw6bdbdd9c.public.blob.vercel-storage.com"
        ],
    },
    async rewrites() {
        return [
          {
            source: '/login',
            destination: '/signin',
          },
          {
            source: '/criar-conta',
            destination: '/signup',
          },
        ]
      },
    
}

module.exports = nextConfig
