// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  typescript: { typeCheck: "build", strict: true },
  nitro: { preset: "vercel" },
  app: {
    head: {
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@joulev_3" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://joulev.dev/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
      ],
      link: [
        { rel: "icon", href: "https://joulev.dev/favicon.svg", type: "image/svg+xml" },
        { rel: "icon", href: "https://joulev.dev/favicon.ico", type: "image/x-icon", sizes: "any" },
        {
          rel: "apple-touch-icon",
          href: "https://joulev.dev/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "preload",
          href: "https://joulev.dev/fonts/Synonym-Variable.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
