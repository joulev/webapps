import internal from "tailwindcss/plugin";

// states
const dark = "@media (prefers-color-scheme: dark)";
const hover = "&:hover";
const focus = "&:focus";
const active = "&:active";

// reused tailwind classes
const transition = {
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
};

export const plugin = internal(function ({ addComponents, theme }) {
  const main = theme("colors.main");
  const space = theme("space");
  const fontSize = (key: string) => {
    const [size, { lineHeight }] = theme("fontSize")[key];
    return lineHeight ? { fontSize: size, lineHeight } : { fontSize: size };
  };
  const muted = (key: string) => ({ [key]: main[400], [dark]: { [key]: main[500] } });

  addComponents({
    ".muted": muted("color"),
    ".stroke-muted": muted("stroke"),
    ".fill-muted": muted("fill"),
    ".help-text": { ...muted("color"), ...fontSize("sm") },
  });

  addComponents({
    ".anchor": {
      ...transition,
      backgroundImage: `linear-gradient(${main[300]}, ${main[300]}), linear-gradient(to right, ${main[600]}, ${main[600]})`,
      backgroundSize: "100% 1px, 0 1px",
      backgroundPosition: "100% 100%, 0% 100%",
      backgroundRepeat: "no-repeat",
      [dark]: {
        backgroundImage: `linear-gradient(${main[700]}, ${main[700]}), linear-gradient(to right, ${main[400]}, ${main[400]})`,
      },
      [hover]: { backgroundSize: "0 1px, 100% 1px" },
    },
  });

  addComponents({
    ".btn": {
      ...transition,
      display: "inline-block",
      borderRadius: theme("borderRadius.lg"),
      textAlign: "center",
      [active]: { transform: "translateY(2px)" },

      "&:not(.btn-sm):not(.btn-nopadding)": {
        padding: `${space[2]} ${space[4]}`,
        ...fontSize("base"),
      },
      "&.btn-sm": { padding: `${space[1.5]} ${space[3]}`, ...fontSize("sm") },
      "&.btn-nopadding": { padding: "0", ...fontSize("base") },

      "&.btn-primary": {
        backgroundColor: main[900],
        color: main[100],
        [hover]: { backgroundColor: main[700] },
        [dark]: {
          backgroundColor: main[100],
          color: main[900],
          [hover]: { backgroundColor: main[300] },
        },
      },

      "&.btn-secondary": {
        backgroundColor: main[300],
        color: main[900],
        [dark]: { backgroundColor: main[700], color: main[100] },
      },

      "&.btn-tertiary": {
        color: main[900],
        [dark]: { color: main[100] },
        [hover]: { color: main[600], [dark]: { color: main[400] } },
      },
    },
  });
});
