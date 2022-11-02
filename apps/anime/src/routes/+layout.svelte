<script lang="ts">
  // Someone teaches me the best way to sort imports in a svelte kit app...
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import NProgress from "nprogress";

  import { inject } from "@vercel/analytics";

  import { derived } from "svelte/store";
  import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
  import { setContext } from "@apollo/client/link/context";
  import { setClient, query } from "svelte-apollo";

  import { GET_ANIME, type GetAnime } from "$lib/queries";
  import { refetchAnime, getListCount, getLoadingState } from "$lib/stores/list";

  import { auth, getAuth } from "$lib/stores/user";

  import { transition } from "$lib/utils";

  import {
    Home,
    Github,
    Menu,
    X,
    PlayCircle,
    Repeat,
    Tv2,
    Film,
    CheckCircle,
    PauseCircle,
    XCircle,
    Calendar,
  } from "lucide-svelte";

  import A from "$lib/components/a.svelte";
  import Button from "$lib/components/button.svelte";
  import Loading from "$lib/components/loading.svelte";
  import Logo from "$lib/components/logo.svelte";

  import "../app.postcss";

  // Setting up Apollo
  const httpLink = createHttpLink({ uri: "https://graphql.anilist.co" });
  const authLink = setContext((_, { headers }) => {
    const token = globalThis.localStorage ? localStorage.getItem("token") : null;
    return token ? { headers: { ...headers, authorization: `Bearer ${token}` } } : { headers };
  });
  const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });
  setClient(client);

  // Glboal fetching
  const store = query<GetAnime>(GET_ANIME);
  function refetch() {
    NProgress.start();
    store.refetch();
    refetchAnime.set(false);
    NProgress.done();
  }
  $: $refetchAnime && refetch();

  const isLoading = getLoadingState();
  const count = getListCount();
  onMount(getAuth);

  const navItems = derived(count, $cnt => [
    { content: "Watching", icon: PlayCircle, slug: "/watching", count: $cnt.watching },
    { content: "Rewatching", icon: Repeat, slug: "/rewatching", count: $cnt.rewatching },
    {
      content: "Completed TV",
      icon: Tv2,
      slug: "/completed/tv",
      count: $cnt.completedTV,
    },
    {
      content: "Completed Movies",
      icon: Film,
      slug: "/completed/movies",
      count: $cnt.completedMovies,
    },
    {
      content: "Completed (others)",
      icon: CheckCircle,
      slug: "/completed/others",
      count: $cnt.completedOthers,
    },
    { content: "Paused", icon: PauseCircle, slug: "/paused", count: $cnt.paused },
    { content: "Dropped", icon: XCircle, slug: "/dropped", count: $cnt.dropped },
    { content: "Planning", icon: Calendar, slug: "/planning", count: $cnt.planning },
  ]);

  $: activeIndex = $navItems.findIndex(item => item.slug === $page.url.pathname);

  let navOpen = false;
  page.subscribe(() => (navOpen = false));
  let navHeight: number;

  onMount(inject);
</script>

<div class="container flex flex-col lg:flex-row gap-x-18 gap-y-12 pb-18 pt-6 lg:pt-18">
  <header class="lg:w-72 shrink-0">
    <div class="flex flex-col sticky top-18">
      <div class="flex flex-row justify-between items-center">
        {#key navOpen}
          <button
            class="lg:hidden text-daw-main-500 hover:text-daw-main-900"
            on:click={() => (navOpen = !navOpen)}
            in:fade={transition}
          >
            {#if navOpen}
              <X strokeWidth={1} />
            {:else}
              <Menu strokeWidth={1} />
            {/if}
          </button>
        {/key}
        <A href="/watching" notStyled><Logo /></A>
        <div class="flex flex-row gap-6">
          <Button
            href="https://joulev.dev"
            variant="tertiary"
            class="btn-nopadding hidden lg:block"
          >
            <Home strokeWidth={1} />
          </Button>
          <Button
            href="https://github.com/joulev/webapps/tree/main/apps/anime"
            variant="tertiary"
            class="btn-nopadding"
          >
            <Github strokeWidth={1} />
          </Button>
        </div>
      </div>
      <div
        style="height: {navOpen ? navHeight + 'px' : '0px'};"
        class="transition-all lg:!h-auto overflow-hidden"
      >
        <div class="flex flex-col gap-9 pt-9" bind:clientHeight={navHeight}>
          {#if !$auth.loading && !$auth.loggedIn}
            <Button variant="secondary" href="/auth" animated>Log in as joulev</Button>
          {:else if !$auth.loading}
            <Button variant="secondary" href="/add" animated>Add anime to PTW</Button>
          {/if}
          <nav class="flex flex-col">
            {#each $navItems as { content, icon: Icon, slug: href, count }}
              <a
                {href}
                class="flex flex-row justify-between items-center transition py-3 hover:text-daw-main-900"
                class:text-daw-main-500={$page.url.pathname !== href}
              >
                <div class="flex flex-row gap-6 items-center">
                  <Icon strokeWidth={1} />
                  {content}
                </div>
                {#if !$isLoading}
                  <div transition:fade={transition}>{count}</div>
                {/if}
              </a>
            {/each}
          </nav>
        </div>
      </div>
    </div>
  </header>
  <!--
    * I don't believe this is the best way of doing it, but I've not seen a better way, whether in
      the doc or otherwise
    * The animation can be very laggy in Safari, as the children may have a lot of DOM elements.
      There is too little material on handling complex Svelte components on Google for me to improve
      this... However, in Firefox and Chrome, the animation works beautifully.
  -->
  {#key JSON.stringify( { path: $page.url.pathname, dataLoading: $page.url.pathname.startsWith("/auth") || $isLoading, authLoading: $page.url.pathname.startsWith("/auth") && $auth.loading }, )}
    <div class="flex-1" in:fade={transition}>
      {#if $isLoading && !$page.url.pathname.startsWith("/auth")}
        <Loading />
      {:else}
        <main class="flex flex-col gap-6">
          {#if activeIndex !== -1}
            <h1 class="lg:hidden text-2xl font-semibold">{$navItems[activeIndex].content}</h1>
          {/if}
          <slot />
        </main>
      {/if}
    </div>
  {/key}
</div>
