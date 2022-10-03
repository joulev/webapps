<script lang="ts">
  import { title, rawParagraphs, srParagraphs } from "$lib/content";
  import splitLine from "$lib/split-line";
  import Logo from "$lib/components/logo.svelte";
  import type { Paragraph } from "$lib";

  const MARGIN = 48;
  const SIZE = 24;

  let height = 0;
  let paragraphs: Paragraph[] = [];

  function main() {
    const maxHeight = window.innerHeight - MARGIN * 2;
    const countPerColumn = Math.floor(maxHeight / SIZE);
    height = countPerColumn * SIZE;
    paragraphs = rawParagraphs.map(p => splitLine(p, countPerColumn));
  }

  main();
  window.addEventListener("resize", main);
</script>

<div class="sr-only">
  <h1>{title}</h1>
  {#each srParagraphs as p}
    <p>{p}</p>
  {/each}
</div>

<div class="m-12 ml-0 w-9">
  <a href="https://joulev.dev" target="_blank" rel="noopener noreferrer" class="inline-block">
    <Logo />
  </a>
</div>

<div aria-hidden class="m-12 border border-faded text-base relative inline-block" {height}>
  <!-- mask image original version taken from http://ni.siois.in, with some modifications -->
  <div class="absolute inset-0 bg-faded -m-px -z-10 ruler" />
  <div class="flex flex-col gap-12 -m-px">
    <h1 class="flex flex-row">
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
                        <span class="text-furigana text-muted">{fChar}</span>
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
