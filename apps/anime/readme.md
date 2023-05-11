<img src="/apps/static/public/images/gh-asset/anime/light.svg#gh-light-mode-only" alt="Logo" height="48px">
<img src="/apps/static/public/images/gh-asset/anime/dark.svg#gh-dark-mode-only" alt="Logo" height="48px">

[https://anime.joulev.dev](https://anime.joulev.dev)&emsp;•&emsp;Next.js, React

---

My _personal_ app which kinda substitutes [AniList](https://anilist.co) as the interface for me to manage my list (only the anime part) (since after all I still prefer my own design system over AniList's). Powered by Next.js [App Router](https://nextjs.org/docs/getting-started/react-essentials), React Server Components and is also the place I experiment with [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions).

This still makes use of the AniList database. Communication is handled by GraphQL thanks to Apollo, and mutation request authorisation is handled by AniList's OAuth. Everything is _not_ handled in the browser though, but in the server using server components and server actions.

Without authentication, it is possible to view all public info in my list i.e. my entire list. It is pretty much a carbon copy of [my list @ AniList](https://anilist.co/user/joulev/animelist), but with my design system.

With authentication (only I can do so), it can do all what I need a media management system to do, no more, no less. Examples: Moving entries between list categories, adding new entries, removing entries, a not-so-trivial scoring system, "rewatching", etc.

There is a previous version of this app, written in SvelteKit, at the time not yet at v1. You can see it [here](/apps/anime-sveltekit).
