/** @type {import("next").NextConfig} */
module.exports = {
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
