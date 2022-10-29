import plugin from "tailwindcss/plugin";

export default plugin(({ matchUtilities, addUtilities }) => {
  const values = Object.fromEntries(new Array(10).fill(null).map((_, i) => [i + 1, i + 1]));
  const getCSSValueFromNumber = (value: number) => `calc(${value * 0.25} * var(--base-space))`;
  const getCSSValue = (value: number | string) => getCSSValueFromNumber(Number(value));

  const createUtilities = (
    name: string,
    props: string[],
    withNegative = false,
    transform = (_: string) => _,
  ) =>
    matchUtilities(
      { [name]: value => Object.fromEntries(props.map(p => [p, transform(getCSSValue(value))])) },
      { values, supportsNegativeValues: withNegative },
    );

  createUtilities("slide-p", ["padding"]);
  createUtilities("slide-px", ["padding-left", "padding-right"]);
  createUtilities("slide-py", ["padding-top", "padding-bottom"]);
  createUtilities("slide-pt", ["padding-top"]);
  createUtilities("slide-pr", ["padding-right"]);
  createUtilities("slide-pb", ["padding-bottom"]);
  createUtilities("slide-pl", ["padding-left"]);

  createUtilities("slide-m", ["margin"], true);
  createUtilities("slide-mx", ["margin-left", "margin-right"], true);
  createUtilities("slide-my", ["margin-top", "margin-bottom"], true);
  createUtilities("slide-mt", ["margin-top"], true);
  createUtilities("slide-mr", ["margin-right"], true);
  createUtilities("slide-mb", ["margin-bottom"], true);
  createUtilities("slide-ml", ["margin-left"], true);

  createUtilities("slide-w", ["width"]);
  createUtilities("slide-min-w", ["min-width"]);
  createUtilities("slide-max-w", ["max-width"]);

  createUtilities("slide-h", ["height"]);
  createUtilities("slide-min-h", ["min-height"]);
  createUtilities("slide-max-h", ["max-height"]);

  createUtilities("slide-gap", ["gap"]);
  createUtilities("slide-gap-x", ["column-gap"]);
  createUtilities("slide-gap-y", ["row-gap"]);

  createUtilities("slide-top", ["top"], true);
  createUtilities("slide-right", ["right"], true);
  createUtilities("slide-bottom", ["bottom"], true);
  createUtilities("slide-left", ["left"], true);
  createUtilities("slide-inset", ["top", "right", "bottom", "left"], true);
  createUtilities("slide-inset-x", ["left", "right"], true);
  createUtilities("slide-inset-y", ["top", "bottom"], true);

  createUtilities("slide-translate-x", ["transform"], true, value => `translateX(${value})`);
  createUtilities("slide-translate-y", ["transform"], true, value => `translateY(${value})`);

  matchUtilities(
    {
      "slide-text": value =>
        typeof value === "number"
          ? { fontSize: getCSSValue(value), lineHeight: getCSSValue(value * 1.5) }
          : { fontSize: value, lineHeight: null },
    },
    { values: { small: 3, base: 4, large: 6, title: 8 } },
  );

  addUtilities({ ".slide-rounded": { borderRadius: getCSSValue(2) } });
});
