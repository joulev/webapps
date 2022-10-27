// @ts-check

const { preset, plugin } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  presets: [preset],
  plugins: [plugin, require("tailwind-dark-aware")],
};
