<script lang="ts" setup>
import { Home, Github } from "lucide-vue-next";

useHead({
  title: "link at joulev.dev",
  link: [{ rel: "canonical", href: "https://link.joulev.dev" }],
  meta: [
    { name: "robots", content: "index,follow" },
    { name: "description", content: "@joulev's URL shortener" },
    { property: "og:title", content: "link at joulev.dev" },
    { property: "og:description", content: "@joulev's URL shortener" },
    { property: "og:url", content: "https://link.joulev.dev" },
    { property: "og:image:alt", content: "link at joulev.dev" },
  ],
});

const error = ref<string | null>(null);
const slug = ref("");
const showForm = ref(true);
</script>

<template>
  <div class="container max-w-xl py-18 flex flex-col gap-12">
    <div class="flex flex-row justify-between items-center">
      <Logo class="cursor-pointer" @click="showForm = true" />
      <div class="flex flex-row gap-6">
        <NuxtLink href="https://joulev.dev" target="_blank" class="btn btn-tertiary btn-nopadding">
          <Home />
        </NuxtLink>
        <NuxtLink
          href="https://github.com/joulev/webapps/tree/main/apps/link"
          target="_blank"
          class="btn btn-tertiary btn-nopadding"
        >
          <Github />
        </NuxtLink>
      </div>
    </div>
    <div v-if="error" class="text-red transition">Error: {{ error }}</div>
    <Transition appear>
      <Form
        v-if="showForm"
        @error="e => (error = e)"
        @link-created="s => ((slug = s), (showForm = false))"
      />
      <Success v-else :slug="slug" @new-link="showForm = true" />
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
.v-enter-active {
  @apply transition;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
