import { isCorrectUser } from "$lib/utils";
import { writable } from "svelte/store";

export const auth = writable({ loggedIn: false, loading: true });

export function getAuth() {
  const token = localStorage.getItem("token");
  if (token && isCorrectUser(token)) auth.set({ loggedIn: true, loading: false });
  else {
    auth.set({ loggedIn: false, loading: false });
    localStorage.removeItem("token");
  }
}
