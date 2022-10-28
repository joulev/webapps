export type SlideConfig = {
  aspectRatio: {
    width: number;
    height: number;
    /** Portion of the large side (typically the width) as the base in the spacing scheme */
    spacingCoefficient: number;
  };
};
