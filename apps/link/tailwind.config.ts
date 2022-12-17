import { Config } from "tailwindcss";
import { preset, plugin } from "@joulev/theme/src";

export default <Config>{
  presets: [preset],
  plugins: [plugin({}), require("tailwind-dark-aware")({})],
};
