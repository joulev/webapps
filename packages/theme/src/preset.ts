import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import type { Config } from "tailwindcss";
import { getColour } from "./utils";

export const preset: Config = {
  content: [],
  theme: {
    borderRadius: {
      DEFAULT: defaultTheme.borderRadius.lg,
      full: "9999px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      main: colors.zinc,
      red: getColour(colors.red),
      yellow: getColour(colors.yellow),
      green: getColour(colors.emerald),
      blue: getColour(colors.sky),
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    fontFamily: {
      sans: ['"__Synonym__"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        18: "4.5rem",
      },
    },
  },
};
