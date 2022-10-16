<script lang="ts" setup>
import { WithId } from "mongodb";
import { LinkDocument, JoulevLink } from "~/types";
import Close from "vue-material-design-icons/Close.vue";
import ContentSaveOutline from "vue-material-design-icons/ContentSaveOutline.vue";
import DeleteOutline from "vue-material-design-icons/DeleteOutline.vue";

const displayDate = (date: Date) =>
  date.toLocaleDateString("en-sg", { timeZone: "Asia/Singapore" });

const { link } = defineProps<{ link: WithId<LinkDocument> | null }>();
const emit = defineEmits(["refresh", "clear"]);

const slug = ref(link?.slug ?? "");
const url = ref(link?.url ?? "");

const slugUpdating = computed(() => !link || link.slug !== slug.value);
const urlUpdating = computed(() => !link || link.url !== url.value);
const updating = computed(() => slugUpdating.value || urlUpdating.value);

function clear() {
  if (!link) emit("clear");
  slug.value = link?.slug ?? "";
  url.value = link?.url ?? "";
}

async function save() {
  if (!updating.value) return;
  if (!link) {
    const body: JoulevLink["post"] = { slug: slug.value, url: url.value };
    await fetch("/api/joulev-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    const body: JoulevLink["put"] = { _id: link._id, slug: slug.value, url: url.value };
    await fetch("/api/joulev-link", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  emit("refresh");
}

async function remove() {
  if (!link) return; // should not happen
  const body: JoulevLink["delete"] = { _id: link._id };
  await fetch("/api/joulev-link", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  emit("refresh");
}
</script>

<template>
  <div class="odd:bg-daw-main-200 lg:rounded flex flex-row items-center gap-6 px-6 py-6">
    <input
      class="w-24 md:w-36 focus:outline-none bg-transparent"
      :class="{ 'font-semibold': slugUpdating }"
      v-model="slug"
    />
    <input
      class="w-full focus:outline-none bg-transparent"
      :class="{ 'font-semibold': urlUpdating }"
      v-model="url"
    />
    <div v-if="!updating" class="text-daw-main-500 text-sm hidden md:table-cell">
      {{ displayDate(link ? new Date(link.updated) : new Date()) }}
    </div>
    <div class="flex flex-row gap-3">
      <div v-if="updating">
        <button class="hidden md:block btn btn-sm btn-secondary" @click="clear">Clear</button>
        <button aria-hidden class="md:hidden btn btn-secondary btn-nopadding p-1.5" @click="clear">
          <Close :size="18" />
        </button>
      </div>
      <div v-if="updating">
        <button class="hidden md:block btn btn-sm btn-primary" @click="save">Save</button>
        <button aria-hidden class="md:hidden btn btn-primary btn-nopadding p-1.5" @click="save">
          <ContentSaveOutline :size="18" />
        </button>
      </div>
      <div v-if="!updating">
        <button class="hidden md:block btn btn-sm btn-secondary" @click="remove">Delete</button>
        <button aria-hidden class="md:hidden btn btn-secondary btn-nopadding p-1.5" @click="remove">
          <DeleteOutline :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
