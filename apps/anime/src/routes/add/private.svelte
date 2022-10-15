<script lang="ts">
  import { fade } from "svelte/transition";
  import { mutation, query } from "svelte-apollo";
  import { getAllAnimeIds, refetchAnime } from "$lib/stores/list";
  import { SEARCH_ANIME, type SearchAnime, type SearchAnimeVariables } from "$lib/queries";
  import { ADD_ANIME, type AddToPtw, type AddToPtwVariables } from "$lib/mutations";
  import { getTitle, transition, convertSeason } from "$lib/utils";
  import A from "$lib/components/a.svelte";
  import Button from "$lib/components/button.svelte";
  import Score from "$lib/components/score.svelte";
  import NotFound from "$lib/components/not-found.svelte";

  let value = "";
  let debouncedValue = "";
  let timer: NodeJS.Timeout;
  function debounce() {
    clearTimeout(timer);
    timer = setTimeout(() => (debouncedValue = value), 500);
  }

  const listOfAnimeIds = getAllAnimeIds();
  const store = query<SearchAnime, SearchAnimeVariables>(SEARCH_ANIME, {
    variables: { search: debouncedValue, idNotIn: [] },
  });
  $: store.refetch({ search: debouncedValue, idNotIn: $listOfAnimeIds });
  $: list = $store.data?.Page?.media ?? [];

  const mutate = mutation<AddToPtw, AddToPtwVariables>(ADD_ANIME);
  async function addToList(id: number | null | undefined) {
    if (!id) return;
    await mutate({ variables: { mediaId: id } });
    refetchAnime.set(true);
  }
</script>

<input placeholder="Anime title" class="input" bind:value on:keypress={debounce} />

<div class="flex flex-col gap-6">
  {#each list as item}
    {#if item}
      <div class="card flex flex-col relative" transition:fade={transition}>
        <div class="absolute top-6 right-6 flex flex-row gap-1.5">
          <Button size="sm" variant="secondary" on:click={() => addToList(item?.id)}>
            Add to PTW
          </Button>
        </div>
        <div class="p-6 flex flex-row gap-6">
          {#if item.coverImage?.medium}
            <img
              src={item.coverImage.medium}
              alt="cover"
              class="hidden sm:block w-18 min-h-[96px] rounded shrink-0 object-cover"
            />
          {:else}
            <div class="hidden sm:block w-18 min-h-[96px] rounded shrink-0 bg-daw-main-300" />
          {/if}
          <div
            class="
              flex-1 flex min-w-0 flex-col justify-between gap-6 {item.meanScore && 'sm:gap-1.5'}
            "
          >
            <div class="flex flex-col">
              <div class="text-lg">
                <A href={`https://anilist.co/anime/${item.id}`}>
                  {getTitle(item.title)}
                </A>
              </div>
              <div class="help-text">
                {item.title?.native ?? "Japanese title N/A"}
              </div>
            </div>
            <div class="flex flex-row justify-between items-end">
              <div class="help-text">
                {#if item.genres && item.genres.length > 0}
                  {item.genres.slice(0, 3).join(", ")}
                {:else if item.season && item.seasonYear}
                  {convertSeason(item.season)} {item.seasonYear}
                {:else}
                  Season N/A
                {/if}
              </div>
              {#if item.meanScore}
                <div class="flex flex-row gap-3 items-center">
                  <Score score={item.meanScore / 10} />
                  <div>{item.meanScore / 10}</div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

{#if !$store.loading && list.length <= 0 && debouncedValue.length > 0}
  <NotFound text="No results found." />
{/if}
