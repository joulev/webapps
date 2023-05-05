<script lang="ts">
  import { getCompletedOthers, getList } from "$lib/stores/list";
  import Card from "$lib/components/card.svelte";
  import NotFound from "$lib/components/not-found.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: list = data.name === "Completed others" ? getCompletedOthers() : getList(data.name);
</script>

{#each $list as item}
  {#if item}
    <Card {item} variant={data.name === "Completed others" ? "completed-others" : "completed"} />
  {/if}
{/each}

{#if $list.length === 0}
  <NotFound text="No entries. Check back later." />
{/if}
