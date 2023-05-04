// @ts-check

/** @type {import("next").NextConfig} */
const nextConfig = {
  redirects: async () => [{ source: "/api/og", destination: "/og", statusCode: 301 }],
};

module.exports = nextConfig;
