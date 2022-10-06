<script lang="ts" setup>
import DeleteOutline from "vue-material-design-icons/DeleteOutline.vue";
import PencilOutline from "vue-material-design-icons/PencilOutline.vue";
import { LinkDocument } from "~/types";

type FetchRes = { error: string; entries?: undefined } | { entries: LinkDocument[] };
const { data, error } = await useFetch<FetchRes>("/api/joulev-link", {
  server: false,
  method: "get",
});
</script>

<template>
  <div>
    <h1 class="text-3xl mb-12">All joulev's links</h1>
    <div v-if="!data && !error">Loading&hellip;</div>
    <div v-else-if="error" class="text-red">Error: {{ error }}</div>
    <div v-else>
      <div class="-mx-6 overflow-x-auto">
        <table class="table-auto w-full border-separate border-spacing-0">
          <!-- border-separate for tr rounded corners -->
          <tbody>
            <tr
              v-for="link in data!.entries"
              :key="String(link._id)"
              class="odd:bg-card rounded-full border [&_td]:pl-6 [&_td]:last:pr-6 [&_td]:py-3 md:[&_td]:py-6"
            >
              <td class="w-1/12 lg:rounded-l">/{{ link.slug }}</td>
              <td class="w-full">
                <a :href="link.url" class="anchor" target="_blank" rel="noopenner noreferrer">
                  {{ link.url }}
                </a>
              </td>
              <td class="text-muted text-sm hidden md:table-cell">
                {{
                  new Date(link.updated).toLocaleDateString("en-sg", { timeZone: "Asia/Singapore" })
                }}
              </td>
              <td class="lg:rounded-r">
                <div class="flex flex-row gap-3">
                  <button class="hidden md:block btn btn-sm btn-secondary">Update</button>
                  <button aria-hidden class="md:hidden btn btn-secondary btn-nopadding p-1.5">
                    <PencilOutline :size="18" />
                  </button>
                  <button class="hidden md:block btn btn-sm btn-secondary">Delete</button>
                  <button aria-hidden class="md:hidden btn btn-secondary btn-nopadding p-1.5">
                    <DeleteOutline :size="18" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="mt-6 btn btn-primary">Add a new link</button>
    </div>
  </div>
</template>
