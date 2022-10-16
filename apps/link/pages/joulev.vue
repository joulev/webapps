<script lang="ts" setup>
import { WithId } from "mongodb";
import { LinkDocument } from "~/types";

type FetchRes = { error: string; entries?: undefined } | { entries: WithId<LinkDocument>[] };
const { data, error, refresh } = await useFetch<FetchRes>("/api/joulev-link", { server: false });

const newRow = ref(false);
const entries = computed(() => data?.value?.entries ?? []);
const rows = computed(() => (newRow.value ? [...entries.value, null] : entries.value));
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
          @refresh="refresh().then(() => (newRow = false))"
        />
      </div>
      <button class="mt-6 btn btn-primary" v-if="!newRow" @click="newRow = true">
        Add a new link
      </button>
    </div>
  </div>
</template>
