/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: { remotePatterns: [{ protocol: "https", hostname: "pbs.twimg.com" }] },
};

module.exports = nextConfig;
