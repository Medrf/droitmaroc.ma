// Force rebuild for env vars
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
