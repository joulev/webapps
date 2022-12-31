<script lang="ts" setup>
import { Home, Github } from "lucide-vue-next";

useHead({
  title: "presentation at joulev.dev",
  link: [{ rel: "canonical", href: "https://presentation.joulev.dev" }],
  meta: [
    { name: "robots", content: "index,follow" },
    {
      name: "description",
      content:
        "An app where I make (interactive) presentation slides with code and web technologies.",
    },
    { property: "og:title", content: "presentation at joulev.dev" },
    {
      property: "og:description",
      content:
        "An app where I make (interactive) presentation slides with code and web technologies.",
    },
    { property: "og:url", content: "https://presentation.joulev.dev" },
    { property: "og:image:alt", content: "presentation at joulev.dev" },
  ],
});
</script>

<template>
  <div class="container max-w-xl py-18 flex flex-col gap-12">
    <header class="flex flex-row justify-between items-center">
      <Logo class="cursor-pointer" />
      <div class="flex flex-row gap-6">
        <NuxtLink href="https://joulev.dev" target="_blank" class="btn btn-tertiary btn-nopadding">
          <Home :stroke-width="1" />
        </NuxtLink>
        <NuxtLink
          href="https://github.com/joulev/webapps/tree/main/apps/presentation"
          target="_blank"
          class="btn btn-tertiary btn-nopadding"
        >
          <Github :stroke-width="1" />
        </NuxtLink>
      </div>
    </header>
    <main class="flex flex-col gap-6">
      <p>Welcome to my app that I (plan to) use for my presentations, where</p>
      <ul class="list-disc [&_li]:ml-6 flex flex-col gap-6">
        <li>
          it can be viewed and navigated in all screen viewports (except oddities like Apple
          Watches).
        </li>
        <li>static content and Markdown are supported</li>
        <li>
          but dynamic and ✨ interactive components ✨ and basically everything is also supported.
        </li>
      </ul>
      <p>
        So basically Powerpoint or Google Docs, but with the web's superpowers. And without
        unnecessary and complex features like live collaboration &ndash; git will take care of that.
      </p>
      <NuxtLink href="/test-slides" class="btn btn-primary">View demo</NuxtLink>
    </main>
  </div>
</template>
