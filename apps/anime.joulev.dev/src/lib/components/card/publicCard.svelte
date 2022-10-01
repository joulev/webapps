<script lang="ts">
  import { fade } from "svelte/transition";
  import { convertSeason, transition } from "$lib/utils";
  import Base from "./base.svelte";
  import Score from "$lib/components/score.svelte";
  import type { CardVariant, ListItem } from "$lib";

  export let item: ListItem;
  export let variant: CardVariant;

  let showDetailedScore = false;
  const onHover = () => (showDetailedScore = true);
  const onLeave = () => (showDetailedScore = false);
</script>

<Base {item} {variant}>
  <div
    class="flex flex-row justify-between items-end"
    on:mouseover={onHover}
    on:focus={onHover}
    on:mouseleave={onLeave}
    on:blur={onLeave}
  >
    {#if showDetailedScore && item.score}
      <div class="flex flex-row text-sm muted" in:fade={transition}>
        {#each Object.entries(item.advancedScores) as [key, score], i}
          <div
            class="group {i > 0 && 'ml-3 border-l border-main-300 dark:border-main-700 pl-3'}"
            title={key}
          >
            <span class="hidden md:inline-block lg:hidden xl:inline-block">{key}</span>
            <span class="hidden lg:inline-block xl:hidden">{key.substring(0, 3)}</span>
            {score}
          </div>
        {/each}
      </div>
    {:else}
      <div class="flex flex-row text-sm muted" in:fade={transition}>
        <div>
          {#if item.media?.season && item.media?.seasonYear}
            {convertSeason(item.media.season)} {item.media.seasonYear}
          {:else}
            Season N/A
          {/if}
        </div>
        {#if item.repeat}
          <div class="ml-3 border-l border-main-300 dark:border-main-700 pl-3">
            &times;{item.repeat + 1}
          </div>
        {/if}
      </div>
    {/if}
    {#if (variant === "watching" || variant === "rewatching") && item.progress}
      <div class="text-sm">Episode {item.progress}/{item.media?.episodes ?? "unknown"}</div>
    {:else if item.score}
      <div class="flex flex-row gap-3 items-center">
        <Score score={item.score} />
        <div>{item.score}</div>
      </div>
    {:else}
      <div class="text-sm muted">
        Last updated: {item.updatedAt
          ? new Date(item.updatedAt * 1000).toLocaleDateString("en-gb")
          : "N/A"}
      </div>
    {/if}
  </div>
</Base>
