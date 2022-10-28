<script lang="ts" setup>
defineProps<{
  title?: string; // or a component type?
  inset: { x: string; y: string };
  space: string[];
}>();
</script>

<template>
  <div class="relative w-screen h-screen bg-[black]">
    <div
      class="absolute bg-main-900 text-main-100 flex flex-col"
      style="box-shadow: 0px 0px 120px 0px rgba(120, 113, 108, 0.5)"
      :style="{ inset: `${inset.y} ${inset.x}`, padding: space[2], gap: space[2] }"
    >
      <h1 v-if="title" class="font-semibold" :style="{ fontSize: space[2] }">{{ title }}</h1>
      <div :style="{ fontSize: space[1] }">
        <slot />
      </div>
    </div>
  </div>
</template>
