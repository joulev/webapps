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
