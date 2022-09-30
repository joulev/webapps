const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      c: colors.stone,
    },
    fontFamily: {
      sans: ["Synonym", ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  plugins: [],
};
