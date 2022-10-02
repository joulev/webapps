<script lang="ts">
  import { auth } from "$lib/stores/user";
  import { onMount } from "svelte";
  import type { SvelteComponent } from "$lib";

  let Component: SvelteComponent;
  onMount(() => {
    auth.subscribe(async state => {
      Component = state.loggedIn
        ? (await import("./private.svelte")).default
        : (await import("./public.svelte")).default;
    });
  });
</script>

<svelte:component this={Component} />
