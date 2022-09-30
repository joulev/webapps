import { isCorrectUser } from "$lib/utils";
import { writable } from "svelte/store";

export const auth = writable({ token: "", loading: true });

export function retrieveAuth() {
  const token = localStorage.getItem("token");
  if (token && isCorrectUser(token)) auth.set({ token, loading: false });
  else {
    auth.set({ token: "", loading: false });
    localStorage.removeItem("token");
  }
}

export function dangerouslySetAuth(token: string) {
  auth.set({ token, loading: false });
}
