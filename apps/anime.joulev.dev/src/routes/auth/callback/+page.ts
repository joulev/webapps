import { error, redirect } from "@sveltejs/kit";
import { isCorrectUser } from "$lib/utils";
import type { PageLoad } from "./$types";
import { dangerouslySetAuth } from "$lib/stores/user";

type Payload = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export const load: PageLoad = () => {
  const { access_token: token }: Payload = Object.fromEntries(
    window.location.hash
      .substring(1)
      .split("&")
      .map(str => str.split("=")),
  );
  if (!token) throw error(400, "Access token not found.");
  if (!isCorrectUser(token)) throw error(403, "Invalid user.");
  localStorage.setItem("token", token);
  dangerouslySetAuth(token);
  throw redirect(302, "/completed/tv");
};

export const prerender = false;
export const ssr = false;
