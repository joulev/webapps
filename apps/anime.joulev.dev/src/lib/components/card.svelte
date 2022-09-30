<script lang="ts">
  import { auth } from "$lib/stores/user";
  import { onMount } from "svelte";
  import type { CardVariant, ListItem } from "$lib";
  export let item: ListItem;
  export let variant: CardVariant;

  let Component: any;
  onMount(() => {
    auth.subscribe(async state => {
      Component =
        state.token && state.token !== ""
          ? (await import("./card/privateCard.svelte")).default
          : (await import("./card/publicCard.svelte")).default;
    });
  });
</script>

<svelte:component this={Component} {item} {variant} />
