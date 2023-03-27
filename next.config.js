/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig


const withPWA = require('next-pwa')({
  dest: 'public',
    buildExcludes: [/middleware-manifest.json$/],
})

module.exports = withPWA({
  // next.js config
})