import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";

export default <Config>{
  content: ["./nuxt.config.ts"],
  presets: [preset],
  plugins: [plugin({ styleBody: false })],
};
