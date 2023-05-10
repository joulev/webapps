import { getToken } from "~/lib/auth";

export default function Page() {
  const token = getToken();
  const clientId = process.env.CLIENT_ID;
  const origin = process.env.ORIGIN;
  if (token) return <p>You are authenticated. Hi to myself!</p>;
  return (
    <>
      <p>
        If you are AniList user @joulev (aka me) and would like to make change to the lists using
        this interface, please log in below. You will be directed to AniList to complete the
        authentication process. Do note that you will be refused access if you log in with a
        different AniList account.
      </p>
      <p>
        I do not plan to expand this site for other users, as I do not intend to build a
        full-fledged AniList client.
      </p>
      <a
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${origin}/auth/callback&response_type=code`}
        className="btn btn-primary"
      >
        Log in with AniList
      </a>
    </>
  );
}

export const dynamic = "force-dynamic";
