// @ts-check

const defaultTheme = require("tailwindcss/defaultTheme");
const { preset, plugin } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  theme: {
    extend: {
      transitionDuration: { 600: "600ms" },
      fontFamily: { mono: defaultTheme.fontFamily.mono },
      fontSize: { base: ["0.875rem", { lineHeight: "1.25rem" }] },
    },
  },
  plugins: [plugin({ withFont: false }), require("tailwind-dark-aware")({ withDark: false })],
};
