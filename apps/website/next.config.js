/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
    { source: "/cv", destination: process.env.RESUME_URL },
    { source: "/cv.pdf", destination: process.env.RESUME_URL },
    { source: "/resume", destination: process.env.RESUME_URL },
  ],
  experimental: { appDir: true },
};

module.exports = nextConfig;
