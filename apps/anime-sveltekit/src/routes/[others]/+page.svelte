<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import NotFound from "$lib/components/not-found.svelte";
  import { getList } from "$lib/stores/list";
  import { capitalise } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: list = getList(capitalise(data.path));
</script>

{#each $list as item}
  {#if item}
    <Card {item} variant={data.path} />
  {/if}
{/each}

{#if $list.length === 0}
  <NotFound text="No entries. Check back later." />
{/if}
