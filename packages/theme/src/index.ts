import * as defaultTheme from "tailwindcss/defaultTheme";
import * as colors from "tailwindcss/colors";
import type { Config } from "tailwindcss";

const getColour = (colorObject: Record<keyof typeof colors["amber"], string>) => ({
  DEFAULT: colorObject[500],
  ...colorObject,
});

export const preset: Omit<Config, "content"> = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      main: colors.stone,
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
      sans: ["Synonym", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        18: "4.5rem",
      },
    },
  },
};
