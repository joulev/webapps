// @ts-check

/** @type {import("next").NextConfig} */
const nextConfig = {
  rewrites: async () => [
    { source: "/cv", destination: process.env.RESUME_URL ?? "https://example.com" },
    { source: "/cv.pdf", destination: process.env.RESUME_URL ?? "https://example.com" },
    { source: "/resume", destination: process.env.RESUME_URL ?? "https://example.com" },
  ],
};

module.exports = nextConfig;
