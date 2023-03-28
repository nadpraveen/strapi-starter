/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["api.staging.finezzy.com"],
  },
}

module.exports = nextConfig
