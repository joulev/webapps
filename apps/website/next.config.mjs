// @ts-check
import { env } from "./env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  rewrites: async () => [
    { source: "/cv", destination: env.RESUME_URL },
    { source: "/cv.pdf", destination: env.RESUME_URL },
    { source: "/resume", destination: env.RESUME_URL },
  ],
  redirects: async () => [
    { source: "/sponsor", destination: "https://github.com/sponsors/joulev", permanent: false },
  ],
};

export default nextConfig;
