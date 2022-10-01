<script lang="ts">
  export let href: string;
  export let notStyled = false;
  let className = "";
  export { className as class };
  $: isExternal = href.startsWith("http");
</script>

<a
  {href}
  target={isExternal ? "_blank" : undefined}
  rel={isExternal ? "noopener noreferrer" : undefined}
  class={className}
  class:anchor={!notStyled}
  on:click
>
  <slot />
</a>

<style lang="postcss">
  .anchor {
    background-image: linear-gradient(theme(colors.main.300), theme(colors.main.300)),
      linear-gradient(to right, theme(colors.main.600), theme(colors.main.600));
    @apply bg-no-repeat transition-all;
    background-size: 100% 1px, 0 1px;
    background-position: 100% 100%, 0% 100%;
  }
  @media (prefers-color-scheme: dark) {
    .anchor {
      background-image: linear-gradient(theme(colors.main.700), theme(colors.main.700)),
        linear-gradient(to right, theme(colors.main.400), theme(colors.main.400));
    }
  }
  .anchor:hover {
    background-size: 0 1px, 100% 1px;
  }
</style>
