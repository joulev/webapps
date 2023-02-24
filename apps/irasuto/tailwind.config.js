// @ts-check

const { preset, plugin } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  theme: {},
  plugins: [plugin, require("tailwind-dark-aware")({ withDark: false })],
};
