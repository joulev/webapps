<script lang="ts" setup>
defineProps<{ title?: string; slide: number }>();

const space = inject<string[]>("space")!;
const { x, y } = inject<{ x: string; y: string }>("inset")!;
const current = inject<number>("current")!;
</script>

<template>
  <div
    class="absolute bg-main-900 text-main-100 flex flex-col"
    style="box-shadow: 0px 0px 120px 0px rgba(120, 113, 108, 0.5)"
    :style="{ inset: `${y} ${x}`, padding: space[2], gap: space[2] }"
    v-if="current === slide"
  >
    <h1 v-if="title" class="font-semibold" :style="{ fontSize: space[2] }">{{ title }}</h1>
    <div :style="{ fontSize: space[1] }"><slot /></div>
  </div>
</template>
