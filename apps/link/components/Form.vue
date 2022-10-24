<script lang="ts" setup>
import NProgress from "nprogress";
import { isSlug, isURL } from "~/lib/validator";
import { PublicLink } from "~/types";

const emit = defineEmits<{
  (e: "link-created", slug: string): void;
  (e: "error", error: string | null): void;
}>();

const slug = ref("");
const slugIsValid = computed(() => isSlug(slug.value));
const url = ref("");
const urlIsValid = computed(() => isURL(url.value));

async function submit() {
  emit("error", null);
  if ((slug.value !== "" && !slugIsValid.value) || !urlIsValid.value) return;
  NProgress.start();
  const payload: PublicLink["post"] = {
    slug: slug.value === "" ? undefined : slug.value,
    url: url.value,
  };
  const res = await fetch("/api/link", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) emit("link-created", (await res.json()).slug);
  else emit("error", (await res.json()).error);
  NProgress.done();
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submit">
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
    <button class="btn btn-primary">Shorten URL</button>
  </form>
</template>
