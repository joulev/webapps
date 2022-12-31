<script setup lang="ts">
const { title, description, slides, slideTitles } = await useSlideContent("/test");
</script>

<template>
  <Slides :title="title" :description="description" :slides="slides" :slide-titles="slideTitles" />
</template>
