import type { DefaultColors } from "tailwindcss/types/generated/colors";

export const getColour = (colorObject: Record<keyof DefaultColors["amber"], string>) => ({
  DEFAULT: colorObject[500],
  ...colorObject,
});
