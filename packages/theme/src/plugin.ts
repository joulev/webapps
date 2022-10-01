import internal from "tailwindcss/plugin";

export const plugin = internal(function ({ addComponents, theme }) {
  addComponents({
    ".muted": {
      color: theme("colors.main.400"),
      "@media (prefers-color-scheme: dark)": {
        color: theme("colors.main.500"),
      },
    },
  });
});
