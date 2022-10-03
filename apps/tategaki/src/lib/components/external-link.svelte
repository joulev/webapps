<script lang="ts">
  export let href: string;
  export let title: string; // translation
</script>

<a
  {href}
  {title}
  target="_blank"
  rel="noopener noreferrer"
  class="btn btn-secondary btn-sm flex flex-row items-center gap-3"
>
  <slot />
</a>
