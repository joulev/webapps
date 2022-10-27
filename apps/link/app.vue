<script lang="ts" setup>
import { inject } from "@vercel/analytics";
onMounted(inject);
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  @apply transition;
}
.page-enter-from,
.page-leave-to {
  @apply opacity-0;
}
</style>
