const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      c: colors.stone,
      dropped: colors.red[500],
      paused: colors.yellow[500],
      watching: colors.green[500],
      rewatching: colors.sky[500],
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    fontFamily: {
      sans: ["Synonym", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
