const { preset } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
};
