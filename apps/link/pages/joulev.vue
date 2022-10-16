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

type FetchRes = { error: string; entries?: undefined } | { entries: WithId<LinkDocument>[] };
const { data, error, refresh } = await useFetch<FetchRes>("/api/joulev-link", { server: false });

const newRow = ref(false);
const entries = computed(() => data?.value?.entries ?? []);
const rows = computed(() => (newRow.value ? [...entries.value, null] : entries.value));

const refreshData = async () => {
  NProgress.start();
  await refresh();
  newRow.value = false;
  NProgress.done();
};
</script>

<template>
  <div>
    <h1 class="text-3xl mb-12">All joulev's links</h1>
    <div v-if="!data && !error">Loading&hellip;</div>
    <div v-else-if="error" class="text-red">Error: {{ error }}</div>
    <div v-else-if="!data" class="text-red">Error: Data is empty. This should not happen 😳.</div>
    <div v-else>
      <div class="-mx-6 overflow-x-auto flex flex-col">
        <TableRow
          v-for="link in rows"
          :key="JSON.stringify(link)"
          :link="link"
          @clear="newRow = false"
          @refresh="refreshData"
        />
      </div>
      <button class="mt-6 btn btn-primary" v-if="!newRow" @click="newRow = true">
        Add a new link
      </button>
    </div>
  </div>
</template>
