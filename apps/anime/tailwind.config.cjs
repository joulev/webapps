const { preset } = require("@joulev/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  presets: [preset],
};
