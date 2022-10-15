<script lang="ts">
  import Enjoyment from "svelte-material-icons/EmoticonHappyOutline.svelte";
  import Story from "svelte-material-icons/TextLong.svelte";
  import Character from "svelte-material-icons/AccountMultipleOutline.svelte";
  import Animation from "svelte-material-icons/AnimationOutline.svelte";
  import Music from "svelte-material-icons/MusicNoteOutline.svelte";
  import Base from "./base.svelte";
  import Score from "$lib/components/score.svelte";
  import Button from "$lib/components/button.svelte";

  import { constraintScore, convertSeason } from "$lib/utils";

  import { mutation } from "svelte-apollo";
  import {
    UPDATE_SCORE,
    type UpdateScore,
    type UpdateScoreVariables,
    UPDATE_PROGRESS,
    type UpdateProgress,
    type UpdateProgressVariables,
    UPDATE_STATUS,
    type UpdateStatus,
    type UpdateStatusVariables,
    UPDATE_REPEAT,
    type UpdateRepeat,
    type UpdateRepeatVariables,
    DELETE_ANIME,
    type RemoveFromList,
    type RemoveFromListVariables,
  } from "$lib/mutations";
  import { MediaListStatus } from "$lib/gql/graphql";
  import { refetchAnime } from "$lib/stores/list";

  import type { CardVariant, ListItem } from "$lib";

  export let item: ListItem;
  export let variant: CardVariant;

  const icons = [Enjoyment, Story, Character, Animation, Music];
  const keys = ["Enjoyment", "Story", "Characters", "Animation", "Music"];

  let scores = keys.map<string>(key => String(item.advancedScores[key]) ?? "0");
  const coef = [0.35, 0.25, 0.15, 0.1, 0.15];

  $: safeScores = scores.map(score => constraintScore(Number(score)));
  $: accumulate = constraintScore(
    safeScores.map((score, index) => score * coef[index]).reduce((a, b) => a + b, 0),
  );

  $: unsavedScore =
    safeScores.some((score, index) => score !== Number(item.advancedScores[keys[index]])) ||
    accumulate !== Number(item.score);

  // Increment episode count
  const mutateProgress = mutation<UpdateProgress, UpdateProgressVariables>(UPDATE_PROGRESS);
  async function incrementProgress() {
    await mutateProgress({ variables: { id: item.id, progress: (item?.progress ?? 0) + 1 } });
    refetchAnime.set(true);
  }

  // Update status
  const mutateStatus = mutation<UpdateStatus, UpdateStatusVariables>(UPDATE_STATUS);
  async function updateStatus(status: MediaListStatus) {
    await mutateStatus({ variables: { id: item.id, status } });
    refetchAnime.set(true);
  }
  const setAsWatching = () => updateStatus(MediaListStatus.Current);
  const setAsRewatching = () => updateStatus(MediaListStatus.Repeating);
  const setAsPaused = () => updateStatus(MediaListStatus.Paused);
  const setAsDropped = () => updateStatus(MediaListStatus.Dropped);

  // Cancel rewatch
  const mutateRepeat = mutation<UpdateRepeat, UpdateRepeatVariables>(UPDATE_REPEAT);
  async function cancelRewatch() {
    await mutateStatus({ variables: { id: item.id, status: MediaListStatus.Completed } });
    await mutateRepeat({
      variables: { id: item.id, repeat: item.repeat ?? 0, progress: item.media?.episodes ?? 0 },
    });
    refetchAnime.set(true);
  }

  // Update scores
  const mutateScore = mutation<UpdateScore, UpdateScoreVariables>(UPDATE_SCORE);
  async function updateScore() {
    window.getSelection()?.removeAllRanges();
    await mutateScore({ variables: { id: item.id, score: accumulate, advanced: safeScores } });
    refetchAnime.set(true);
  }
  const clear = () => (scores = keys.map<string>(key => String(item.advancedScores[key]) ?? "0"));
  const onFocus = (event: FocusEvent) => (event.target as HTMLInputElement).select();

  // Remove from list
  const mutateRemove = mutation<RemoveFromList, RemoveFromListVariables>(DELETE_ANIME);
  async function removeFromList() {
    await mutateRemove({ variables: { id: item.id } });
    refetchAnime.set(true);
  }
</script>

<Base {item} {variant}>
  <svelte:fragment slot="top-right">
    {#if variant === "watching"}
      <Button size="sm" animated on:click={setAsDropped} variant="tertiary">Drop</Button>
      <Button size="sm" animated on:click={setAsPaused} variant="secondary">Pause</Button>
      <Button size="sm" animated on:click={incrementProgress}>Next ep</Button>
    {/if}
    {#if variant === "rewatching"}
      <Button size="sm" animated on:click={cancelRewatch} variant="secondary">Stop rewatch</Button>
      <Button size="sm" animated on:click={incrementProgress}>Next ep</Button>
    {/if}
    {#if variant === "completed" && unsavedScore}
      <Button size="sm" animated on:click={clear} variant="secondary">Clear</Button>
      <Button size="sm" animated on:click={updateScore}>Save</Button>
    {/if}
    {#if (variant === "completed" && !unsavedScore) || variant === "completed-others"}
      <Button size="sm" animated on:click={setAsRewatching} variant="secondary">Rewatch</Button>
    {/if}
    {#if variant === "paused"}
      <Button size="sm" animated on:click={setAsWatching} variant="secondary">Resume</Button>
    {/if}
    {#if variant === "dropped"}
      <Button size="sm" animated on:click={setAsWatching} variant="secondary">Retry</Button>
    {/if}
    {#if variant === "planning"}
      <Button size="sm" animated on:click={removeFromList} variant="tertiary">Remove</Button>
      <Button size="sm" animated on:click={setAsWatching} variant="secondary">Start</Button>
    {/if}
  </svelte:fragment>
  <div class="flex flex-row justify-between items-center">
    {#if variant === "completed"}
      {#each icons as Icon, i}
        <div class="flex flex-row flex-1 gap-1.5 sm:gap-3 items-center">
          <div class="text-daw-main-500"><Icon size="18px" /></div>
          <input
            class="text-sm flex-1 outline-none bg-transparent w-full"
            class:font-semibold={safeScores[i] !== Number(item.advancedScores[keys[i]])}
            bind:value={scores[i]}
            on:focus={onFocus}
          />
        </div>
      {/each}
      <div class="flex flex-row gap-1.5 sm:gap-3 items-center">
        <Score score={accumulate} />
        <div class:font-semibold={accumulate !== item.score}>{accumulate}</div>
      </div>
    {:else}
      {#if variant === "planning"}
        <div class="help-text">
          {#if item.media?.season && item.media?.seasonYear}
            {convertSeason(item.media.season)} {item.media.seasonYear}
          {:else}
            Season N/A
          {/if}
        </div>
      {:else if variant === "watching" || variant === "rewatching"}
        <div class="text-sm">
          Episode {item.progress}/{item.media?.episodes ?? "unknown"}
        </div>
      {/if}
      <div class="help-text">
        Last updated: {item.updatedAt
          ? new Date(item.updatedAt * 1000).toLocaleDateString("en-gb")
          : "N/A"}
      </div>
    {/if}
  </div>
</Base>
