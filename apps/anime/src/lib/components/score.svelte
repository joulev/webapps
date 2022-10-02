<script lang="ts">
  import { tweened } from "svelte/motion";
  import { longTransition } from "$lib/utils";
  export let score: number;

  const d2r = (degree: number) => (degree * Math.PI) / 180;
  const sin = (degree: number) => Math.sin(d2r(degree));
  const cos = (degree: number) => Math.cos(d2r(degree));

  const animatedScore = tweened(Math.min(score / 2, 3), longTransition);
  // since the page may be expensive, use onMount to only run animation after everything is rendered
  $: animatedScore.set(score);

  const center = 12;
  const width = 4;

  const f = (x: number) => 65.8656 * Math.pow(1.2035, x) - 60.8656; // f(0) = 5, f(7) = 180, f(10) ≈ 359
  $: angle = f($animatedScore);

  $: radius = center - width / 2;
  $: start = [center, width / 2];
  $: end = [center + radius * sin(angle), center - radius * cos(angle)];
  $: largeArcFlag = angle > 180 ? 1 : 0;
</script>

<svg viewBox="0 0 24 24" width="24" height="24" fill="none">
  <circle cx={center} cy={center} r={radius} class="stroke-faded" stroke-width={width} />
  <path
    class={score >= 7 ? "stroke-green" : "stroke-yellow"}
    stroke-width={width}
    stroke-linecap="round"
    d="M {start[0]} {start[1]} A {radius} {radius} 0 {largeArcFlag} 1 {end[0]} {end[1]}"
  />
</svg>
