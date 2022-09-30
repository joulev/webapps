<script lang="ts">
  import { auth } from "$lib/stores/user";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any;
  $: Component = $auth.token ? import("./private.svelte") : import("./public.svelte");
</script>

{#await Component then { default: Component }}
  <svelte:component this={Component} />
{/await}
