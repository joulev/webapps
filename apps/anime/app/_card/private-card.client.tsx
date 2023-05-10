"use client";
import clsx from "clsx";
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
import Score from "./score";
import { useState, useTransition } from "react";
import { incrementProgress } from "./actions";

const icons = [Enjoyment, Story, Character, Animation, Music];
const keys = ["Enjoyment", "Story", "Characters", "Animation", "Music"];
const coef = [0.35, 0.25, 0.15, 0.1, 0.15];

function BottomContent({
  item,
  variant,
  scores,
  set,
}: {
  item: Item;
  variant: CardVariant;
  scores: number[];
  set: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const accumulate = constraintScore(
    scores.map((score, index) => score * coef[index]).reduce((a, b) => a + b, 0),
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
                scores[i] !== Number(item.advancedScores[keys[i]]) && "font-semibold",
              )}
              value={scores[i]}
              onChange={e =>
                set([...scores.slice(0, i), Number(e.target.value), ...scores.slice(i + 1)])
              }
            />
          </div>
        ))}
        <div className="flex flex-row gap-1.5 sm:gap-3 items-center">
          <Score score={accumulate} />
          <div className={clsx(accumulate !== item.score && "font-semibold")}>{accumulate}</div>
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

function TopRightContent({ item, variant }: { item: Item; variant: CardVariant }) {
  const [isPending, startTransition] = useTransition();

  if (variant === "watching") {
    return (
      <>
        <button className="btn btn-sm btn-tertiary">Drop</button>
        <button className="btn btn-sm btn-secondary">Pause</button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => startTransition(() => incrementProgress(item))}
        >
          Next ep
        </button>
      </>
    );
  }

  if (variant === "rewatching") {
    return (
      <>
        <button className="btn btn-sm btn-secondary">Stop rewatch</button>
        <button className="btn btn-sm btn-primary">Next ep</button>
      </>
    );
  }

  if (variant === "completed") {
    return (
      <>
        <button className="btn btn-sm btn-secondary">Clear</button>
        <button className="btn btn-sm btn-primary">Save</button>
      </>
    );
  }

  if (variant === "completed-others") {
    return (
      <>
        <button className="btn btn-sm btn-secondary">Rewatch</button>
      </>
    );
  }

  if (variant === "paused") {
    return (
      <>
        <button className="btn btn-sm btn-secondary">Resume</button>
      </>
    );
  }

  if (variant === "dropped") {
    return (
      <>
        <button className="btn btn-sm btn-secondary">Retry</button>
      </>
    );
  }

  if (variant === "planning") {
    return (
      <>
        <button className="btn btn-sm btn-tertiary">Remove</button>
        <button className="btn btn-sm btn-primary">Start</button>
      </>
    );
  }

  throw new Error("invariant: unreachable code in TopRightContent");
}

export default function PrivateCardClient({ item, variant }: { item: Item; variant: CardVariant }) {
  const [detailedScores, setDetailedScores] = useState(
    keys
      .map<string>(key => String(item.advancedScores[key]) ?? "0")
      .map(score => constraintScore(Number(score))),
  );
  return (
    <Base
      item={item}
      variant={variant}
      topRight={
        <div className="absolute top-5 right-5 flex flex-row gap-1.5 p-1 rounded bg-daw-main-100">
          <TopRightContent item={item} variant={variant} />
        </div>
      }
    >
      <div className="flex flex-row justify-between items-center">
        <BottomContent
          item={item}
          variant={variant}
          scores={detailedScores}
          set={setDetailedScores}
        />
      </div>
    </Base>
  );
}
