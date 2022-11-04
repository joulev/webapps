import type { DefaultColors } from "tailwindcss/types/generated/colors";

export type Mode = "system" | "dark" | "light";

export const getColour = (colorObject: Record<keyof DefaultColors["amber"], string>) => ({
  DEFAULT: colorObject[500],
  ...colorObject,
});

export const themedStyle = (
  mode: Mode,
  style: string,
  [light, dark]: [string, string],
  state?: string,
) => {
  const cssObj =
    mode === "system"
      ? { [style]: light, "@media (prefers-color-scheme: dark)": { [style]: dark } }
      : { [style]: mode === "light" ? light : dark };
  return state ? { [state]: cssObj } : cssObj;
};

type Style = { [key: string]: string | Style };
const mergedTwoStyle = (obj1: Style, obj2: Style) => {
  const entries = Object.entries(obj1);
  entries.forEach(([key, value], index) => {
    if (Object.hasOwn(obj2, key)) {
      const v = obj2[key];
      if (typeof value === "string" || typeof v === "string") entries[index][1] = v;
      else entries[index][1] = mergedTwoStyle(value, v);
    }
  });
  for (const key in obj2) if (!Object.hasOwn(obj1, key)) entries.push([key, obj2[key]]);
  entries.sort(([key1], [key2]) => {
    // In JS, the order of object keys is not guaranteed, but we still have to do this nonsensical
    // sorting because order of CSS properties matters...
    if (key1.startsWith("@media")) return 1;
    if (key2.startsWith("@media")) return -1;
    return 0;
  });
  return Object.fromEntries(entries);
};
export const mergedStyles = (...styles: Style[]) => styles.reduce(mergedTwoStyle, {});
