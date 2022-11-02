<script lang="ts">
  import { inject } from "@vercel/analytics";

  import { title, rawParagraphs, srParagraphs } from "$lib/content";
  import splitLine from "$lib/split-line";
  import Logo from "$lib/components/logo.svelte";
  import type { Paragraph } from "$lib";

  import News from "svelte-material-icons/Newspaper.svelte";
  import GitHub from "svelte-material-icons/Github.svelte";
  import Home from "svelte-material-icons/Home.svelte";
  import ExternalLink from "$lib/components/external-link.svelte";

  const MARGIN = 48;
  const SIZE = 24;

  let h = 0;
  let paragraphs: Paragraph[] = [];

  $: height = `${h}px`;

  function main() {
    const maxHeight = window.innerHeight - MARGIN * 2;
    const countPerColumn = Math.floor(maxHeight / SIZE);
    h = countPerColumn * SIZE;
    paragraphs = rawParagraphs.map(p => splitLine(p, countPerColumn));
  }

  main();
  window.addEventListener("resize", main);

  inject();
</script>

<div class="sr-only">
  <h1>{title}</h1>
  {#each srParagraphs as p}
    <p>{p}</p>
  {/each}
</div>

<div class="m-12 flex flex-col gap-6" style:height>
  <div class="w-9"><a href="/"><Logo /></a></div>
  <div class="flex flex-row flex-wrap items-center gap-3">
    <ExternalLink
      href="https://www3.nhk.or.jp/news/easy/k10013820001000/k10013820001000.html"
      title="Original version"
    >
      <News size="24px" />
      <span>原版</span>
    </ExternalLink>
    <ExternalLink href="https://joulev.dev" title="My website">
      <Home size="24px" />
      <span>個人サイト</span>
    </ExternalLink>
    <ExternalLink
      href="https://github.com/joulev/webapps/tree/main/apps/tategaki"
      title="Source code"
    >
      <GitHub size="24px" />
      <span>ソースコード</span>
    </ExternalLink>
  </div>
</div>

<div aria-hidden class="m-12 border border-daw-main-300 text-base relative" style:height>
  <!-- mask image original version taken from http://ni.siois.in, with some modifications -->
  <div class="absolute inset-0 bg-daw-main-300 -m-px -z-10 ruler" />
  <div class="flex flex-col gap-12 -m-px">
    <h1 class="flex flex-row flex-wrap">
      {#each title.split("") as char}
        <span class="w-18 h-12 text-h1 grid place-items-center">{char}</span>
      {/each}
    </h1>
    {#each paragraphs as paragraph}
      <p class="flex flex-col">
        {#each paragraph as line}
          <span class="flex flex-row">
            {#each line as { char, furigana }}
              <span class="h-6 w-6 mr-6 grid place-items-center relative">
                {char[0]}
                {#if char.length > 1}
                  <span class="absolute top-full left-0">{char[1]}</span>
                {/if}
                {#if furigana}
                  <span class="absolute left-full top-1/2 -translate-y-1/2">
                    <span
                      class="flex flex-row origin-center"
                      class:crushed-furigana={furigana.length > 2}
                      style:--furigana-count={furigana.length}
                    >
                      {#each furigana.split("") as fChar}
                        <span class="text-furigana text-daw-main-500">{fChar}</span>
                      {/each}
                    </span>
                  </span>
                {/if}
              </span>
            {/each}
          </span>
        {/each}
      </p>
    {/each}
  </div>
</div>

<style>
  .crushed-furigana {
    transform: scaleY(calc(2 / var(--furigana-count)));
  }
</style>
