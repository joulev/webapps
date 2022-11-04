import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";
import customTailwindSpacing from "./utils/custom-tailwind-spacing"; // cannot use absolute path here

export default <Config>{
  content: ["./nuxt.config.ts"],
  presets: [preset],
  plugins: [plugin({ styleBody: false, mode: "dark" }), customTailwindSpacing],
};
