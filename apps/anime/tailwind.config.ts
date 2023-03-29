import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme/src";
import tailwindDarkAware from "tailwind-dark-aware";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  presets: [preset],
  plugins: [plugin, tailwindDarkAware],
} satisfies Config;
