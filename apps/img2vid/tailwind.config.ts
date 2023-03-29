import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";
import tailwindDarkAware from "tailwind-dark-aware";

export default {
  content: ["./pages/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  plugins: [plugin, tailwindDarkAware],
} satisfies Config;
