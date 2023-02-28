// @ts-check

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  redirects: async () => [{ source: "/api/og", destination: "/og", statusCode: 301 }],
};

module.exports = nextConfig;
