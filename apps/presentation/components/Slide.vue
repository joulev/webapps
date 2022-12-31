<script lang="ts" setup>
defineProps<{ title?: string; slide: number }>();

const { x, y } = inject<{ x: string; y: string }>("inset")!;
const current = inject<number>("current")!;
</script>

<template>
  <Transition>
    <div
      class="absolute flex flex-col slide-p-8 slide-gap-8"
      :style="{ inset: `${y} ${x}` }"
      v-if="current === slide"
    >
      <h1 v-if="title" class="font-semibold slide-text-title">{{ title }}</h1>
      <div class="slide-text-base flex-1"><slot /></div>
    </div>
  </Transition>
</template>

<style scoped lang="postcss">
.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration-300;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
