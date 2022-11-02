// @ts-check

const { preset } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  plugins: [require("tailwind-dark-aware")],
};
