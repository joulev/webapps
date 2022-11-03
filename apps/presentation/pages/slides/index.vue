<script lang="ts" setup>
const { x, y, xNum, gap } = useSlideInset();

const current = ref(0);
const maxSlide = 6; // have to update this manually
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
    <Slide :slide="0" title="Hello, world!">
      <ul>
        <li>This is the first slide.</li>
        <li>It has a title.</li>
        <li>It has a list.</li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores perferendis et minus,
          excepturi animi repudiandae accusantium nemo numquam eos quam?
        </li>
      </ul>
    </Slide>
    <Slide :slide="1" title="Hello, world! 2">
      <ul>
        <li>This is the second slide.</li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores perferendis et minus,
          excepturi animi repudiandae accusantium nemo numquam eos quam?
        </li>
      </ul>
    </Slide>
    <Slide :slide="2" title="Custom reactive component"><CustomComponent /></Slide>
    <Slide :slide="3"> This slide does not have a title. </Slide>
    <Slide :slide="4" title="Slide number 5"> 5 </Slide>
    <Slide :slide="5" title="Slide number 6"> 6 </Slide>
    <Slide :slide="6" title="Slide number 7"> 7 </Slide>
  </div>
</template>

<style scoped lang="postcss">
ul {
  @apply flex flex-col slide-gap-4 slide-ml-8 list-disc;
}
</style>
