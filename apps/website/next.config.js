/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|ico|ttf|woff|woff2)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, must-revalidate" }],
    },
  ],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
