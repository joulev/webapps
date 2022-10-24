<script lang="ts" setup>
import { WithId } from "mongodb";
import NProgress from "nprogress";
import { LinkDocument } from "~/types";

useHead({
  title: "All joulev's links | link at joulev.dev",
  link: [{ rel: "canonical", href: "https://link.joulev.dev/joulev" }],
  meta: [
    { name: "robots", content: "noindex" },
    { name: "description", content: "A list of all link shortened owned by @joulev" },
    { property: "og:title", content: "All joulev's links | link at joulev.dev" },
    { property: "og:description", content: "A list of all link shortened owned by @joulev" },
    { property: "og:url", content: "https://link.joulev.dev/joulev" },
    { property: "og:image:alt", content: "All joulev's links | link at joulev.dev" },
  ],
});

const notJoulev = ref(false);
type FetchRes = { error: string; entries?: undefined } | { entries: WithId<LinkDocument>[] };
const { data, error, refresh } = await useFetch<FetchRes>("/api/joulev-link", {
  server: false,
  onResponseError: async err => {
    notJoulev.value = err.response.status === 401;
  },
});

const newRow = ref(false);
const entries = computed(() => data?.value?.entries ?? []);
const rows = computed(() => (newRow.value ? [...entries.value, null] : entries.value));

const fetchError = ref<string | null>(null);

const refreshData = async () => {
  NProgress.start();
  await refresh();
  newRow.value = false;
  NProgress.done();
};
</script>

<template>
  <div class="container max-w-screen-lg py-18 flex flex-col gap-12">
    <div class="flex flex-row gap-6 items-center">
      <NuxtLink href="/">
        <Logo />
      </NuxtLink>
      <div class="text-xl border-l border-daw-main-300 pl-6">All joulev's links</div>
    </div>
    <div v-if="notJoulev">You are not authorised to see this page.</div>
    <div v-if="!notJoulev && fetchError" class="text-red">Error: {{ fetchError }}</div>
    <div v-if="!notJoulev && !data && !error">Loading&hellip;</div>
    <div v-else-if="!notJoulev && error" class="text-red">Error: {{ error }}</div>
    <div v-else-if="!notJoulev && !data" class="text-red">
      Error: Data is empty. This should not happen 😳.
    </div>
    <div v-else-if="!notJoulev">
      <div class="-mx-6 overflow-x-auto flex flex-col">
        <TableRow
          v-for="link in rows"
          :key="JSON.stringify(link)"
          :link="link"
          @clear="newRow = false"
          @error="(e: string | null) => (fetchError = e)"
          @refresh="refreshData"
        />
      </div>
      <button class="mt-6 btn btn-primary" v-if="!newRow" @click="newRow = true">
        Add a new link
      </button>
    </div>
  </div>
</template>
