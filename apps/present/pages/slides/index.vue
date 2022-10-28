<script lang="ts" setup>
const { x, y, gap } = useSlideInset();
const space = computed(() => new Array(6).fill(0).map((_, i) => `${gap.value * i}px`));
</script>

<template>
  <Slide title="Hello, world!" :inset="{ x, y }" :space="space">
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
</template>

<style scoped>
ul {
  margin-left: v-bind(space[2]);
  display: flex;
  flex-direction: column;
  gap: v-bind(space[1]);
}
</style>
