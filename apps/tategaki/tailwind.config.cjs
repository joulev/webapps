const { preset } = require("@joulev/theme");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  presets: [preset],
  theme: {
    fontFamily: {
      sans: defaultTheme.fontFamily.serif, // I choose violence today
    },
    extend: {
      fontSize: {
        furigana: [".7rem", "1rem"],
        base: ["1.1rem", "1.5rem"],
        h1: ["2.75rem", "4.5rem"],
      },
    },
  },
};
