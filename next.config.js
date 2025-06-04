/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ppr: true, // Removed because it's not supported in current Next.js versions
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Ensure React is properly resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve("react"),
      "react-dom": require.resolve("react-dom"),
    }

    return config
  },
}

module.exports = nextConfig 
