<script lang="ts">
  import { title, rawParagraphs, srParagraphs } from "$lib/content";
  import splitLine from "$lib/split-line";

  const MARGIN = 48;
  const SIZE = 24;

  let height = 0;
  let paragraphs: import("$lib/types").Paragraph[] = [];

  function main() {
    const maxHeight = window.innerHeight - MARGIN * 2;
    const countPerColumn = Math.floor(maxHeight / SIZE);
    height = countPerColumn * SIZE;
    paragraphs = rawParagraphs.map((p) => splitLine(p, countPerColumn));
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

<div {height} class="m-12 w-9">
  <a href="https://joulev.dev" target="_blank" rel="noopener noreferrer" class="inline-block">
    <img src="/tategaki.joulev.svg" alt="tategaki at joulev.dev" width="36" />
  </a>
</div>

<div aria-hidden class="not-sr-only m-12 border border-neutral-200 text-base" {height}>
  <div class="flex flex-col gap-12 -m-px" style="background: url('/ruler.svg');">
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
                        <span class="text-furigana text-neutral-400">{fChar}</span>
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
