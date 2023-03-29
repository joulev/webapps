import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import { preset, plugin } from "@joulev/theme/src";
import tailwindDarkAware from "tailwind-dark-aware";

export default {
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
  plugins: [plugin({ vertical: true }), tailwindDarkAware],
} satisfies Config;
