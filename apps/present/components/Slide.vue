<script lang="ts" setup>
defineProps<{ title?: string; slide: number }>();

const space = inject<string[]>("space")!;
const { x, y } = inject<{ x: string; y: string }>("inset")!;
const current = inject<number>("current")!;
</script>

<template>
  <Transition>
    <div
      class="absolute flex flex-col"
      :style="{ inset: `${y} ${x}`, padding: space[2], gap: space[2] }"
      v-if="current === slide"
    >
      <h1 v-if="title" class="font-semibold" :style="{ fontSize: space[2] }">{{ title }}</h1>
      <div :style="{ fontSize: space[1] }"><slot /></div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
