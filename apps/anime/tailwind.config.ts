import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";
import tailwindDarkAware from "tailwind-dark-aware";

export default {
  content: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  theme: { extend: { transitionDuration: { 600: "600ms" } } },
  plugins: [plugin, tailwindDarkAware],
} satisfies Config;
