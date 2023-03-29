import internal from "tailwindcss/plugin";
import { mergedStyles, themedStyle, type Mode } from "./utils";

type Option = { vertical: boolean; withFont: boolean; mode: Mode; styleBody: boolean };

const defaultOption: Option = { vertical: false, withFont: true, mode: "system", styleBody: true };

export const plugin = internal.withOptions<Partial<Option>>(
  (userOptions = {}) =>
    ({ addComponents, addBase, theme }) => {
      const { vertical, withFont, mode, styleBody } = { ...defaultOption, ...userOptions };

      const main = theme("colors.main");
      const space = theme("space");
      const fontSize = (key: string) => {
        const [size, { lineHeight }] = theme("fontSize")![key];
        // return lineHeight ? { fontSize: size, lineHeight } : { fontSize: size };
        return { fontSize: size, lineHeight };
      };
      const padding = (size: "sm" | "base") =>
        size === "sm"
          ? { padding: vertical ? `${space![3]} ${space![1]}` : `${space![1]} ${space![3]}` }
          : { padding: vertical ? `${space![4]} ${space![1.5]}` : `${space![1.5]} ${space![4]}` };
      const transition = {
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "150ms",
      };
      const rounded = { borderRadius: theme("borderRadius.DEFAULT")! };

      // someone helps me with naming these
      const colour = {
        same: (key: string) => themedStyle(mode, key, [main![50], main![950]]),
        card: (key: string) => themedStyle(mode, key, [main![100], main![900]]),
        faded: (key: string) => themedStyle(mode, key, [main![200], main![800]]),
        reduced: (key: string) => themedStyle(mode, key, [main![300], main![700]]),
        muted: (key: string) => themedStyle(mode, key, [main![500], main![500]]),
        contrast: (key: string) => themedStyle(mode, key, [main![950], main![50]]),
      };

      if (withFont)
        addBase({
          "@font-face": {
            fontFamily: '"__Synonym__"',
            src: 'url("https://static.joulev.dev/fonts/Synonym-Variable.woff2") format("woff2")',
            fontWeight: "200 700",
            fontDisplay: "swap",
            fontStyle: "normal",
          },
        });

      if (styleBody)
        addBase({ body: mergedStyles(colour.same("backgroundColor"), colour.contrast("color")) });

      addComponents({ ".help-text": mergedStyles(colour.muted("color"), fontSize("sm")) });

      addComponents({
        ".anchor": mergedStyles(
          transition,
          themedStyle(mode, "background-image", [
            `linear-gradient(${main![300]}, ${main![300]}), linear-gradient(to right, ${
              main![500]
            }, ${main![500]})`,
            `linear-gradient(${main![700]}, ${main![700]}), linear-gradient(to right, ${
              main![500]
            }, ${main![500]})`,
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
            themedStyle(mode, "backgroundColor", [main![700], main![300]], "&:hover"),
          ),

          "&.btn-secondary": mergedStyles(
            colour.contrast("color"),
            colour.faded("backgroundColor"),
          ),

          "&.btn-tertiary": mergedStyles(
            colour.contrast("color"),
            themedStyle(mode, "color", [main![600], main![400]], "&:hover"),
          ),
        }),
      });

      addComponents({
        ".input": mergedStyles(
          transition,
          padding("base"),
          colour.reduced("borderColor"),
          rounded,
          {
            backgroundColor: "transparent",
            outline: "none",
            borderWidth: theme("borderWidth.DEFAULT"),
            "&::placeholder": colour.muted("color"),
            "&:focus": colour.muted("borderColor"),
          },
        ),
      });

      addComponents({
        ".card": mergedStyles(transition, colour.card("backgroundColor"), rounded, {
          overflow: "hidden",
        }),
      });
    },
);
