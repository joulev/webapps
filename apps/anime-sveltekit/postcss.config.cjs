// @ts-check

const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const config = {
  plugins: [
    // Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    // @ts-ignore // remove this and everything breaks lol
    tailwindcss(),
    // But others, like autoprefixer, need to run after,
    autoprefixer,
  ],
};

module.exports = config;
