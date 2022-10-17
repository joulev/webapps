<script lang="ts" setup>
const { slug } = defineProps<{ slug: string }>();
defineEmits(["newLink"]);

const copyLabel = ref("Copy");

function copy() {
  copyLabel.value = "Copied!";
  navigator.clipboard.writeText(`https://link.joulev.dev/l/${slug}`);
  setTimeout(() => (copyLabel.value = "Copy"), 1000);
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl">Success!</h1>
    <p>Your shortened link has been created successfully.</p>
    <div class="flex flex-row items-stretch gap-3">
      <input :value="`https://link.joulev.dev/l/${slug}`" class="input flex-1" readonly />
      <button class="btn btn-primary" @click="copy">{{ copyLabel }}</button>
    </div>
    <button class="btn btn-secondary" @click="$emit('newLink')">Shorten a new link</button>
  </div>
</template>
