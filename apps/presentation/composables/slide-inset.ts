export const useSlideInset = () => {
  const app = useNuxtApp();
  const {
    width: ratioWidth,
    height: ratioHeight,
    spacingCoefficient,
  } = app.$slideConfig.aspectRatio;

  const xInset = ref(0);
  const yInset = ref(0);
  const gap = ref(0);

  function updateSize() {
    if (!window) return;
    const { clientWidth, clientHeight } = window.document.documentElement;
    let width = clientWidth;
    let height = clientWidth * (ratioHeight / ratioWidth);
    if (height > clientHeight) {
      height = clientHeight;
      width = clientHeight * (ratioWidth / ratioHeight);
    }
    xInset.value = (clientWidth - width) / 2;
    yInset.value = (clientHeight - height) / 2;
    gap.value = spacingCoefficient * Math.max(width, height);
  }

  onMounted(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
  });

  const x = computed(() => `${xInset.value}px`);
  const y = computed(() => `${yInset.value}px`);

  return { x, y, xNum: xInset, yNum: yInset, gap };
};
