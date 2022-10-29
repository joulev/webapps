import plugin from "tailwindcss/plugin";

export default plugin(({ matchUtilities }) => {
  const values = Object.fromEntries(
    new Array(10)
      .fill(null)
      .map((_, i) => [i + 1, `calc(${(i + 1) * 0.25} * var(--base-space))`] as const),
  );
  // Should I write a helper function to reduce code repetition? Probably yes. But GitHub Copilot is faster...
  matchUtilities(
    {
      "slide-p": value => ({ padding: value }),
      "slide-px": value => ({ paddingLeft: value, paddingRight: value }),
      "slide-py": value => ({ paddingTop: value, paddingBottom: value }),
      "slide-pt": value => ({ paddingTop: value }),
      "slide-pr": value => ({ paddingRight: value }),
      "slide-pb": value => ({ paddingBottom: value }),
      "slide-pl": value => ({ paddingLeft: value }),

      "slide-w": value => ({ width: value }),
      "slide-min-w": value => ({ minWidth: value }),
      "slide-max-w": value => ({ maxWidth: value }),
      "slide-h": value => ({ height: value }),
      "slide-min-h": value => ({ minHeight: value }),
      "slide-max-h": value => ({ maxHeight: value }),

      "slide-gap": value => ({ gap: value }),
      "slide-gap-x": value => ({ columnGap: value }),
      "slide-gap-y": value => ({ rowGap: value }),
    },
    { values },
  );
  matchUtilities(
    {
      "slide-m": value => ({ margin: value }),
      "slide-mx": value => ({ marginLeft: value, marginRight: value }),
      "slide-my": value => ({ marginTop: value, marginBottom: value }),
      "slide-mt": value => ({ marginTop: value }),
      "slide-mr": value => ({ marginRight: value }),
      "slide-mb": value => ({ marginBottom: value }),
      "slide-ml": value => ({ marginLeft: value }),

      "slide-top": value => ({ top: value }),
      "slide-right": value => ({ right: value }),
      "slide-bottom": value => ({ bottom: value }),
      "slide-left": value => ({ left: value }),
      "slide-inset": value => ({ inset: value }),
      "slide-inset-x": value => ({ insetInline: value }),
      "slide-inset-y": value => ({ insetBlock: value }),

      "slide-translate-x": value => ({ transform: `translateX(${value})` }),
      "slide-translate-y": value => ({ transform: `translateY(${value})` }),
    },
    { values, supportsNegativeValues: true },
  );

  matchUtilities(
    {
      "slide-text": value => ({
        fontSize: typeof value === "number" ? `calc(${value} * var(--base-space))` : value,
      }),
    },
    { values: { small: 0.75, base: 1, large: 1.5, title: 2 } },
  );
});
