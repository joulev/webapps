<script lang="ts">
  import { transition } from "$lib/utils";
  import { fade } from "svelte/transition";

  type Variant = "primary" | "secondary" | "tertiary";
  type Size = "sm" | "base";

  export let href: string | undefined = undefined;
  export let notExternal = false;
  $: isExternal = !notExternal && href?.startsWith("http");

  export let variant: Variant = "primary";
  export let size: Size = "base";
  export let animated = false;
  let _class = "";
  export { _class as class };

  const className = `btn ${size === "sm" ? "btn-sm" : ""} btn-${variant} ${_class}`;
</script>

{#if href}
  <a
    {href}
    target={isExternal ? "_blank" : undefined}
    rel={isExternal ? "noopener noreferrer" : undefined}
    class={className}
    in:fade={animated ? transition : undefined}
  >
    <slot />
  </a>
{:else}
  <button on:click class={className} in:fade={animated ? transition : undefined}>
    <slot />
  </button>
{/if}
