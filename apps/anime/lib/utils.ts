import { MediaTitle } from "~/lib/gql/graphql";

export function convertSeason(season: string) {
  return season[0] + season.slice(1).toLowerCase();
}

export function getTitle(title: MediaTitle | null | undefined) {
  return title?.english ?? title?.romaji ?? "Title N/A";
}

export function constraintScore(score: number) {
  if (score < 0) return 0;
  if (score > 10) return 10;
  return Math.floor(score * 10) / 10;
}

export function capitalise(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
