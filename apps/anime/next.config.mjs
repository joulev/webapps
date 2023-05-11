// @ts-check
import "./env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        pathname: "/file/anilistcdn/media/anime/cover/small/**",
      },
    ],
  },
};

export default nextConfig;
