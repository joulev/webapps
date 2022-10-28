<script lang="ts" setup>
const { x, y, gap } = useSlideInset();
const space = computed(() => new Array(6).fill(0).map((_, i) => `${gap.value * i}px`));

const current = ref(0);
const maxSlide = 6; // have to update this manually
onMounted(() => {
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") current.value = Math.min(current.value + 1, maxSlide);
    else if (e.key === "ArrowLeft") current.value = Math.max(current.value - 1, 0);
  });
});

provide("space", space);
provide("inset", { x, y });
provide("current", current);
</script>

<template>
  <div class="relative w-screen h-screen bg-[black] text-main-100">
    <div
      class="absolute bg-main-900"
      style="box-shadow: 0px 0px 120px 0px rgba(120, 113, 108, 0.5)"
      :style="{ inset: `${y} ${x}` }"
    />
    <Slide :slide="0" title="Hello, world!">
      <ul class="list-disc">
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
      <ul class="list-disc">
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

<style scoped>
ul {
  margin-left: v-bind(space[2]);
  display: flex;
  flex-direction: column;
  gap: v-bind(space[1]);
}
</style>
