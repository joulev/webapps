import {
  Smile as Enjoyment,
  AlignJustify as Story,
  User as Character,
  Move3d as Animation,
  Music,
} from "lucide-react";
import { Item } from "~/lib/get-lists";
import { constraintScore, convertSeason } from "~/lib/utils";

import Base from "./base";
import { CardVariant } from "./card";
import clsx from "clsx";
import Score from "./score";

function TBA({ item, variant }: { item: Item; variant: CardVariant }) {
  const icons = [Enjoyment, Story, Character, Animation, Music];
  const keys = ["Enjoyment", "Story", "Characters", "Animation", "Music"];

  const scores = keys.map<string>(key => String(item.advancedScores[key]) ?? "0");
  const coef = [0.35, 0.25, 0.15, 0.1, 0.15];
  const safeScores = scores.map(score => constraintScore(Number(score)));
  const accumulate = constraintScore(
    safeScores.map((score, index) => score * coef[index]).reduce((a, b) => a + b, 0),
  );

  if (variant === "completed") {
    return (
      <>
        {icons.map((Icon, i) => (
          <div className="flex flex-row flex-1 gap-1.5 sm:gap-3 items-center" key={i}>
            <div className="text-daw-main-500">
              <Icon size={18} strokeWidth={4 / 3} />
            </div>
            <input
              className={clsx(
                "text-sm flex-1 outline-none bg-transparent w-full",
                safeScores[i] !== Number(item.advancedScores[keys[i]]) && "font-semibold",
              )}
              defaultValue={item.advancedScores[keys[i]]}
            />
          </div>
        ))}
        <div className="flex flex-row gap-1.5 sm:gap-3 items-center">
          <Score score={accumulate} />
          <div>{accumulate}</div>
        </div>
      </>
    );
  }

  return (
    <>
      {variant === "planning" ? (
        <>
          <div className="help-text">
            {item.media?.season && item.media?.seasonYear
              ? `${convertSeason(item.media.season)} ${item.media.seasonYear}`
              : "Season N/A"}
          </div>
        </>
      ) : variant === "watching" || variant === "rewatching" ? (
        <div className="text-sm">
          Episode {item.progress}/{item.media?.episodes ?? "unknown"}
        </div>
      ) : null}
      <div className="help-text">
        Last updated:{" "}
        {item.updatedAt ? new Date(item.updatedAt * 1000).toLocaleDateString("en-gb") : "N/A"}
      </div>
    </>
  );
}

export default function PrivateCard({ item, variant }: { item: Item; variant: CardVariant }) {
  return (
    <Base item={item} variant={variant}>
      <div className="flex flex-row justify-between items-center">
        <TBA item={item} variant={variant} />
      </div>
    </Base>
  );
}
