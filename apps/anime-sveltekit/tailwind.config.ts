import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";
import tailwindDarkAware from "tailwind-dark-aware";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  presets: [preset],
  plugins: [plugin, tailwindDarkAware],
} satisfies Config;
