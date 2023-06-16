import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";
import tailwindTypography from "@tailwindcss/typography";
import tailwindDarkAware from "tailwind-dark-aware";

export default {
  content: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
  presets: [preset],
  plugins: [plugin, tailwindDarkAware, tailwindTypography],
} satisfies Config;
