import internal from "tailwindcss/plugin";

export const plugin = internal(function ({ addComponents, theme }) {
  const main = {
    300: theme("colors.main.300"),
    400: theme("colors.main.400"),
    500: theme("colors.main.500"),
    600: theme("colors.main.600"),
    700: theme("colors.main.700"),
  };
  addComponents({
    ".muted": {
      color: main[400],
      "@media (prefers-color-scheme: dark)": { color: main[500] },
    },
    ".anchor": {
      backgroundImage: `linear-gradient(${main[300]}, ${main[300]}), linear-gradient(to right, ${main[600]}, ${main[600]})`,
      backgroundSize: "100% 1px, 0 1px",
      backgroundPosition: "100% 100%, 0% 100%",
      backgroundRepeat: "no-repeat",
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "150ms",
      "@media (prefers-color-scheme: dark)": {
        backgroundImage: `linear-gradient(${main[700]}, ${main[700]}), linear-gradient(to right, ${main[400]}, ${main[400]})`,
      },
      "&:hover": { backgroundSize: "0 1px, 100% 1px" },
    },
  });
});
