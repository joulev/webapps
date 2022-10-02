<script lang="ts">
  import { tweened } from "svelte/motion";
  import { getTitle, longTransition } from "$lib/utils";
  import A from "$lib/components/a.svelte";
  import type { CardVariant, ListItem } from "$lib";
  export let item: ListItem;
  export let variant: CardVariant;

  const progressPercentage = tweened(0, longTransition);
  $: progressPercentage.set(
    (100 * (item.progress ?? 0)) / (item.media?.episodes ?? item.progress ?? 1),
  );
</script>

<div class="flex flex-col rounded-lg overflow-hidden bg-card relative">
  <div class="absolute top-6 right-6 flex flex-row gap-1.5">
    <slot name="top-right" />
  </div>
  <div class="p-6 flex flex-row gap-6">
    {#if item.media?.coverImage?.medium}
      <img
        src={item.media.coverImage.medium}
        alt="cover"
        class="hidden sm:block w-18 min-h-[96px] rounded-lg shrink-0 object-cover"
      />
    {:else}
      <div class="hidden sm:block w-18 min-h-[96px] rounded-lg shrink-0 bg-faded" />
    {/if}
    <div class="flex-1 flex min-w-0 flex-col justify-between gap-6 {item.score && 'sm:gap-1.5'}">
      <div class="flex flex-col">
        <div class="text-lg">
          <A href={`https://anilist.co/anime/${item.mediaId}`}>
            {getTitle(item.media?.title)}
          </A>
        </div>
        <div class="help-text">
          {item.media?.title?.native ?? "Japanese title N/A"}
        </div>
      </div>
      <slot />
    </div>
  </div>
  {#if variant !== "planning" && variant !== "completed" && variant !== "completed-others"}
    <div
      class="h-1 rounded-full"
      class:bg-green={variant === "watching"}
      class:bg-blue={variant === "rewatching"}
      class:bg-yellow={variant === "paused"}
      class:bg-red={variant === "dropped"}
      style="width: {$progressPercentage}%;"
    />
  {/if}
</div>
