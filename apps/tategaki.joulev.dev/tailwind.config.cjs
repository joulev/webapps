/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontSize: {
      furigana: [".7rem", "1rem"],
      base: ["1.1rem", "1.5rem"],
      h1: ["2.75rem", "4.5rem"],
    },
    extend: {
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
