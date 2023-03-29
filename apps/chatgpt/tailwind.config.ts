import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import { preset, plugin } from "@joulev/theme/src";
import tailwindDarkAware from "tailwind-dark-aware";

export default {
  content: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  theme: {
    extend: {
      transitionDuration: { 600: "600ms" },
      fontFamily: { mono: defaultTheme.fontFamily.mono },
      fontSize: { base: ["0.875rem", { lineHeight: "1.25rem" }] },
    },
  },
  plugins: [plugin({ withFont: false }), tailwindDarkAware],
} satisfies Config;
