<script lang="ts" setup>
import { isSlug, isURL } from "~/lib/validator";
import Home from "vue-material-design-icons/Home.vue";
import GitHub from "vue-material-design-icons/Github.vue";

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

const slug = ref("");
const slugIsValid = computed(() => isSlug(slug.value));
const url = ref("");
const urlIsValid = computed(() => isURL(url.value));
</script>

<template>
  <div class="container max-w-xl py-18 flex flex-col gap-12">
    <div class="flex flex-row justify-between items-center">
      <Logo />
      <div class="flex flex-row gap-3">
        <NuxtLink href="https://joulev.dev" target="_blank" class="btn btn-tertiary btn-nopadding">
          <Home :size="24" />
        </NuxtLink>
        <NuxtLink
          href="https://github.com/joulev/webapps/tree/main/apps/link"
          target="_blank"
          class="btn btn-tertiary btn-nopadding"
        >
          <GitHub :size="24" />
        </NuxtLink>
      </div>
    </div>
    <form class="flex flex-col gap-6" @submit.prevent="() => {}">
      <div class="flex flex-row gap-3 items-center">
        <span class="hidden sm:block">https://link.joulev.dev/l/</span>
        <input
          class="input flex-1 min-w-0"
          :class="{ 'text-red': !slugIsValid }"
          placeholder="Slug (optional)"
          v-model="slug"
        />
      </div>
      <input
        class="input"
        :class="{ 'text-red': !urlIsValid }"
        placeholder="URL to shorten"
        required
        v-model="url"
      />
      <button class="btn btn-primary">Shorten URL (doesn't do anything yet)</button>
    </form>
  </div>
</template>
