<script>
  import { dev } from "$app/environment";
  import { auth } from "$lib/stores/user";

  import Button from "$lib/components/button.svelte";
  import Loading from "$lib/components/loading.svelte";

  const clientId = dev ? 9330 : 9619;
</script>

{#if $auth.loading}
  <Loading />
{:else if $auth.loggedIn}
  <p>You are authenticated. Hi to myself!</p>
{:else}
  <p>
    If you are AniList user @joulev (aka me) and would like to make change to the lists using this
    interface, please log in below. You will be directed to AniList to complete the authentication
    process. Do note that you will be refused access if you log in with a different AniList account.
  </p>
  <p>
    I do not plan to expand this site for other users, as I do not intend to build a full-fledged
    AniList client.
  </p>
  <Button
    href="https://anilist.co/api/v2/oauth/authorize?client_id={clientId}&response_type=token"
    notExternal
  >
    Log in with AniList
  </Button>
{/if}
