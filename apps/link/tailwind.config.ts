import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";
import tailwindDarkAware from "tailwind-dark-aware";

export default <Config>{
  presets: [preset],
  plugins: [plugin, tailwindDarkAware],
};
