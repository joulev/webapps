<script lang="ts" setup>
// Currently complex types and type imports from other files are not supported. It is possible to
// support type imports in the future. :(
// const props = defineProps<Awaited<ReturnType<typeof useSlideContent>>>();

const props = defineProps<{
  title: string;
  description: string;
  slides: { body: { type: string; children: any[] } }[];
  slideTitles: string[];
}>();

const { x, y, xNum, gap } = useSlideInset();

const current = ref(0);
const maxSlide = props.slides.length + 1;
const increment = () => (current.value = Math.min(current.value + 1, maxSlide));
const decrement = () => (current.value = Math.max(current.value - 1, 0));

onMounted(() => {
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") increment();
    else if (e.key === "ArrowLeft") decrement();
  });
  window.addEventListener("touchstart", e => {
    const { clientX } = e.touches[0];
    const threshold = xNum.value + gap.value * 5;
    if (clientX < threshold) decrement();
    else if (clientX > window.document.documentElement.clientWidth - threshold) increment();
  });
});

provide("inset", { x, y });
provide("current", current);
</script>

<template>
  <div
    class="relative w-screen h-screen"
    style="width: 100dvw; height: 100dvh"
    :style="{ '--base-space': `${gap}px` }"
  >
    <Slide :slide="0">
      <div class="flex flex-col slide-gap-8 justify-center items-center h-full">
        <h1 class="font-semibold slide-text-title">{{ title }}</h1>
        <div class="slide-text-base">{{ description }}</div>
      </div>
    </Slide>
    <Slide
      v-for="(slide, i) in props.slides"
      :key="i"
      :slide="i + 1"
      :title="slideTitles[i] || undefined"
    >
      <ContentRenderer :value="slide" />
    </Slide>
  </div>
</template>
