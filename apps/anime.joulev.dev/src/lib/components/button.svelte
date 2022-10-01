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

  const classes: Record<Variant, string> = {
    primary:
      "bg-main-900 dark:bg-main-100 text-main-100 dark:text-main-900 hover:bg-main-700 dark:hover:bg-main-300",
    secondary:
      "bg-main-300 dark:bg-main-700 text-main-900 dark:text-main-100 hover:bg-main-300 dark:hover:bg-main-700",
    tertiary:
      "bg-transparent text-main-900 dark:text-main-100 hover:text-main-600 dark:hover:text-main-400",
  };

  const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    base: "px-4 py-2 text-base",
  };

  $: className = `block rounded-lg transition text-center active:translate-y-0.5 ${sizeClasses[size]} ${classes[variant]}`;
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
