import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme";

export default <Config>{
  presets: [preset],
  plugins: [plugin({ styleBody: false })],
};
