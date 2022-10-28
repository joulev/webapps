<script lang="ts" setup>
const count = ref(0);

const space = inject<string[]>("space")!;
</script>

<template>
  <div class="p">
    <button
      class="btn btn-primary"
      :style="{ fontSize: space[1], padding: `${space[1]} ${space[2]}` }"
      v-on:click="count++"
    >
      Click me
    </button>
  </div>
  <p class="p">You have clicked the button {{ count }} time{{ count !== 1 ? "s" : "" }}</p>
  <p class="p">This will rerender after navigating back.</p>
</template>

<style scoped>
.p {
  margin-bottom: v-bind(space[1]);
}
</style>
