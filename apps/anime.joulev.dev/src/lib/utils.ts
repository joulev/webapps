import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import type { MediaTitle } from "$lib/gql/graphql";

export function convertSeason(season: string) {
  return season[0] + season.slice(1).toLowerCase();
}

export function getTitle(title: MediaTitle | null | undefined) {
  return title?.english ?? title?.romaji ?? "Title N/A";
}

export function isCorrectUser(token: string) {
  // https://stackoverflow.com/a/38552302
  function parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  }

  const payload = parseJwt(token);
  const subject = Object.hasOwn(payload, "sub") ? payload.sub : "";
  const expire = Object.hasOwn(payload, "exp") ? payload.exp : 0;
  return subject === "858763" && expire > Date.now() / 1000;
}

export function constraintScore(score: number) {
  if (score < 0) return 0;
  if (score > 10) return 10;
  return Math.floor(score * 10) / 10;
}

export const transition: TransitionConfig = {
  duration: 300,
  easing: cubicOut,
};

export const longTransition: TransitionConfig = {
  duration: 600,
  easing: cubicOut,
};

export function capitalise(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
