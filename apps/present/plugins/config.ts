import { SlideConfig } from "~/types";

const slideConfig: SlideConfig = {
  aspectRatio: { width: 16, height: 9, spacingCoefficient: 0.025 },
};
export default defineNuxtPlugin(() => ({ provide: { slideConfig } }));
