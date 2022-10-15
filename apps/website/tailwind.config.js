const { preset, plugin } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  plugins: [plugin, require("tailwind-dark-aware")],
};
