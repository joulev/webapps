<script lang="ts" setup>
const route = useRoute();
const { title, description, slides, slideTitles } = await useSlideContent(route.fullPath);

useHead({
  title,
  link: [{ rel: "canonical", href: "https://presentation.joulev.dev" + route.fullPath }],
  meta: [
    { name: "robots", content: "index,follow" },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: "https://presentation.joulev.dev" + route.fullPath },
    { property: "og:image:alt", content: "presentation at joulev.dev" },
  ],
});
</script>

<template>
  <Slides :title="title" :description="description" :slides="slides" :slide-titles="slideTitles" />
</template>
