<script lang="ts" setup>
import { WithId } from "mongodb";
import { isSlug, isURL } from "~/lib/validator";
import { LinkDocument, JoulevLink } from "~/types";

import { X, Save, Trash2 } from "lucide-vue-next";

const displayDate = (date: Date) =>
  date.toLocaleDateString("en-sg", { timeZone: "Asia/Singapore" });

const { link } = defineProps<{ link: WithId<LinkDocument> | null }>();
const emit = defineEmits<{
  (e: "clear"): void;
  (e: "refresh"): void;
  (e: "error", error: string | null): void;
}>();

const slug = ref(link?.slug ?? "");
const url = ref(link?.url ?? "");

const slugUpdating = computed(() => !link || link.slug !== slug.value);
const slugIsValid = computed(() => isSlug(slug.value));
const urlUpdating = computed(() => !link || link.url !== url.value);
const urlIsValid = computed(() => isURL(url.value));
const updating = computed(() => slugUpdating.value || urlUpdating.value);

async function mutate(method: "post", data: JoulevLink["post"]): Promise<void>;
async function mutate(method: "put", data: JoulevLink["put"]): Promise<void>;
async function mutate(method: "delete", data: JoulevLink["delete"]): Promise<void>;
async function mutate(method: "post" | "put" | "delete", data: any): Promise<void> {
  const res = await fetch("/api/joulev-link", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) emit("refresh");
  else emit("error", (await res.json()).error);
}

function clear() {
  emit("error", null);
  if (!link) emit("clear");
  slug.value = link?.slug ?? "";
  url.value = link?.url ?? "";
}

function save() {
  emit("error", null);
  if (!updating.value || !slugIsValid.value || !urlIsValid.value) return;
  if (!link) mutate("post", { slug: slug.value, url: url.value });
  else mutate("put", { _id: link._id, slug: slug.value, url: url.value });
}

function remove() {
  emit("error", null);
  if (!link) return; // should not happen
  mutate("delete", { _id: link._id });
}
</script>

<template>
  <div class="odd:bg-daw-main-100 lg:rounded flex flex-row items-center gap-6 px-6 py-6">
    <input
      class="w-24 md:w-36 focus:outline-none bg-transparent"
      :class="{ 'font-semibold': slugUpdating, 'text-red': !slugIsValid }"
      v-model="slug"
    />
    <input
      class="w-full focus:outline-none bg-transparent"
      :class="{ 'font-semibold': urlUpdating, 'text-red': !urlIsValid }"
      v-model="url"
    />
    <div v-if="!updating" class="text-daw-main-500 text-sm hidden md:table-cell">
      {{ displayDate(link ? new Date(link.updated) : new Date()) }}
    </div>
    <div class="flex flex-row gap-3">
      <div v-if="updating">
        <button class="hidden md:block btn btn-sm btn-secondary" @click="clear">Clear</button>
        <button aria-hidden class="md:hidden btn btn-secondary btn-nopadding p-1.5" @click="clear">
          <X :size="18" :stroke-width="4 / 3" />
        </button>
      </div>
      <div v-if="updating && urlIsValid && slugIsValid">
        <button class="hidden md:block btn btn-sm btn-primary" @click="save">Save</button>
        <button aria-hidden class="md:hidden btn btn-primary btn-nopadding p-1.5" @click="save">
          <Save :size="18" :stroke-width="4 / 3" />
        </button>
      </div>
      <div v-if="!updating">
        <button class="hidden md:block btn btn-sm btn-secondary" @click="remove">Delete</button>
        <button aria-hidden class="md:hidden btn btn-secondary btn-nopadding p-1.5" @click="remove">
          <Trash2 :size="18" :stroke-width="4 / 3" />
        </button>
      </div>
    </div>
  </div>
</template>
