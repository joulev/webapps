// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  typescript: { typeCheck: "build", strict: true },
  app: {
    head: {
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@joulev_3" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://static.joulev.dev/og?title=presentation" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
      ],
      link: [
        {
          rel: "icon",
          href: "https://static.joulev.dev/images/favicon.svg",
          type: "image/svg+xml",
        },
        {
          rel: "icon",
          href: "https://static.joulev.dev/favicon.ico",
          type: "image/x-icon",
          sizes: "any",
        },
        {
          rel: "apple-touch-icon",
          href: "https://static.joulev.dev/images/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "dns-prefetch",
          href: "https://static.joulev.dev",
        },
        {
          rel: "preconnect",
          href: "https://static.joulev.dev",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "https://static.joulev.dev/fonts/Synonym-Variable.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
      bodyAttrs: {
        class: "bg-main-950 text-main-50",
      },
    },
  },
});
