// @ts-check

const { preset, plugin } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  theme: { extend: { transitionDuration: { 600: "600ms" } } },
  plugins: [plugin, require("tailwind-dark-aware")({ withDark: false })],
};
