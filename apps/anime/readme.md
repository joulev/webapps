<img src="/.github/assets/anime/light.svg#gh-light-mode-only" alt="Logo" height="48px">
<img src="/.github/assets/anime/dark.svg#gh-dark-mode-only" alt="Logo" height="48px">

[https://anime.joulev.dev](https://anime.joulev.dev)&emsp;•&emsp;Svelte, Svelte Kit, GraphQL

---

My _personal_ app which will kinda substitute [AniList](https://anilist.co) as the interface for me to manage my list (only the anime part) (since after all I still prefer my own design system over AniList's). Powered by [Svelte Kit](https://kit.svelte.dev) (yes it isn't v1 yet but this is a personal app so who cares). This is also my first (relatively) serious [Svelte](https://svelte.dev) mini-project ([tategaki](https://tategaki.joulev.dev) is not svelte enough to be counted), and this framework has been absolutely incredible to me and I think it is criminally underrated.

This still makes use of the AniList database, so this app is 99% a purely frontend app. Communication is handled by GraphQL thanks to Apollo, and mutation request authorisation is handled by AniList's OAuth.

Without authentication, it is possible to view all public info in my list i.e. my entire list. It is pretty much a carbon copy of [my list @ AniList](https://anilist.co/user/joulev/animelist), but with my design system.

With authentication (only I can do so), it can do all what I need a media management system to do, no more, no less. Examples: Moving entries between list categories, adding new entries, removing entries, a not-so-trivial scoring system, "rewatching", etc.

I plan to continue adding features as I see fit and probably refactor the super buggy code written by this Svelte first-timer.
