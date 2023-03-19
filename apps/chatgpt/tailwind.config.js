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
    },
  },
  plugins: [plugin({ withFont: false }), require("tailwind-dark-aware")({ withDark: false })],
};
