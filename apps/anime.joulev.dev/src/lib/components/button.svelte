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
    primary: "bg-c-900 dark:bg-c-100 text-c-100 dark:text-c-900 hover:bg-c-700 dark:hover:bg-c-300",
    secondary:
      "bg-c-300 dark:bg-c-700 text-c-900 dark:text-c-100 hover:bg-c-300 dark:hover:bg-c-700",
    tertiary: "bg-transparent text-c-900 dark:text-c-100 hover:text-c-600 dark:hover:text-c-400",
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
