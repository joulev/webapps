const { preset, plugin } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  presets: [preset],
  plugins: [plugin],
};
