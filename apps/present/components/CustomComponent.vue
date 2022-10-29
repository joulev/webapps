<script lang="ts" setup>
const count = ref(0);
</script>

<template>
  <div class="p">
    <button
      class="btn btn-primary !slide-text-base !slide-py-[1.5] !slide-px-4 !slide-rounded"
      v-on:click="count++"
    >
      Click me
    </button>
  </div>
  <p class="p">You have clicked the button {{ count }} time{{ count !== 1 ? "s" : "" }}</p>
  <p class="p">This will rerender after navigating back.</p>
</template>

<style scoped lang="postcss">
.p {
  @apply slide-mb-4;
}
</style>
