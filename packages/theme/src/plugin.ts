import internal from "tailwindcss/plugin";
import { mergedStyles, themedStyle } from "./utils";

type Option = { vertical?: boolean };
const defaultOption: Option = { vertical: false };
export const plugin = internal.withOptions<Option>(
  ({ vertical } = defaultOption) =>
    ({ addUtilities, addComponents, addBase, theme }) => {
      const main = theme("colors.main");
      const space = theme("space");
      const fontSize = (key: string) => {
        const [size, { lineHeight }] = theme("fontSize")[key];
        return lineHeight ? { fontSize: size, lineHeight } : { fontSize: size };
      };
      const padding = (size: "sm" | "base") =>
        size === "sm"
          ? { padding: vertical ? `${space[3]} ${space[1]}` : `${space[1]} ${space[3]}` }
          : { padding: vertical ? `${space[4]} ${space[1.5]}` : `${space[1.5]} ${space[4]}` };
      const transition = {
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "150ms",
      };
      const rounded = { borderRadius: theme("borderRadius.DEFAULT") };

      // someone helps me with naming these
      const colour = {
        same: (key: string) => themedStyle(key, [main[100], main[900]]),
        card: (key: string) => themedStyle(key, [main[200], main[800]]),
        faded: (key: string) => themedStyle(key, [main[300], main[700]]),
        muted: (key: string) => themedStyle(key, [main[400], main[500]]),
        reduced: (key: string) => themedStyle(key, [main[600], main[400]]),
        contrast: (key: string) => themedStyle(key, [main[900], main[100]]),
      };
      const colouredStyles: ([string, string] | string)[] = [
        ["backgroundColor", "bg"],
        ["color", "text"],
        ["borderColor", "border"],
        "fill",
        "stroke",
      ];

      ["Extralight", "Light", "Regular", "Medium", "Semibold", "Bold"].forEach((weight, idx) =>
        addBase({
          "@font-face": {
            fontFamily: "Synonym",
            src: `url("https://joulev.dev/fonts/Synonym-${weight}.woff2") format("woff2"),
              url("https://joulev.dev/fonts/Synonym-${weight}.woff") format("woff"),
              url("https://joulev.dev/fonts/Synonym-${weight}.ttf") format("truetype")`,
            fontWeight: (200 + idx * 100).toString(),
            fontDisplay: "swap",
            fontStyle: "normal",
          },
        }),
      );

      addBase({ body: mergedStyles(colour.same("backgroundColor"), colour.contrast("color")) });

      Object.entries(colour).forEach(([key, getColour]) => {
        colouredStyles.forEach(style => {
          if (typeof style === "string") addUtilities({ [`.${style}-${key}`]: getColour(style) });
          else addUtilities({ [`.${style[1]}-${key}`]: getColour(style[0]) });
        });
      });
      addComponents({ ".help-text": mergedStyles(colour.muted("color"), fontSize("sm")) });

      addComponents({
        ".anchor": mergedStyles(
          transition,
          themedStyle("background-image", [
            `linear-gradient(${main[300]}, ${main[300]}), linear-gradient(to right, ${main[600]}, ${main[600]})`,
            `linear-gradient(${main[700]}, ${main[700]}), linear-gradient(to right, ${main[400]}, ${main[400]})`,
          ]),
          {
            backgroundPosition: "100% 100%, 0% 100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 1px, 0 1px",
            "&:hover": { backgroundSize: "0 1px, 100% 1px" },
          },
        ),
      });

      addComponents({
        ".btn": mergedStyles(transition, rounded, {
          display: "inline-block",
          textAlign: "center",
          "&:active": { transform: "translateY(2px)" },

          "&:not(.btn-sm):not(.btn-nopadding)": mergedStyles(padding("base"), fontSize("base")),
          "&.btn-sm": mergedStyles(padding("sm"), fontSize("sm")),
          "&.btn-nopadding": fontSize("base"),

          "&.btn-primary": mergedStyles(
            colour.same("color"),
            colour.contrast("backgroundColor"),
            themedStyle("backgroundColor", [main[700], main[300]], "&:hover"),
          ),

          "&.btn-secondary": mergedStyles(
            colour.contrast("color"),
            colour.faded("backgroundColor"),
          ),

          "&.btn-tertiary": mergedStyles(
            colour.contrast("color"),
            themedStyle("color", [main[600], main[400]], "&:hover"),
          ),
        }),
      });

      addComponents({
        ".input": mergedStyles(transition, padding("base"), colour.faded("borderColor"), rounded, {
          backgroundColor: "transparent",
          outline: "none",
          borderWidth: theme("borderWidth.DEFAULT"),
          "&::placeholder": colour.muted("color"),
          "&:focus": colour.muted("borderColor"),
        }),
      });

      addComponents({
        ".card": mergedStyles(transition, colour.card("backgroundColor"), rounded, {
          overflow: "hidden",
        }),
      });
    },
);
