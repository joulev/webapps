"use client";

import clsx from "clsx";
import {
  Smile as Enjoyment,
  AlignJustify as Story,
  User as Character,
  Move3d as Animation,
  Music,
} from "lucide-react";
import { useState } from "react";

import { Item } from "~/lib/get-lists";
import { MediaListStatus } from "~/lib/queries";
import { constraintScore, convertSeason, getAccumulatedScore } from "~/lib/utils";

import Base from "./base";
import { CardVariant } from "./card";
import Score from "./score";
import {
  incrementProgress,
  updateStatus,
  cancelRewatch as _cancelRewatch,
  updateScore,
  removeFromList,
} from "./actions";
import { useTransitionWithNProgress } from "./use-transition-nprogress";

const icons = [Enjoyment, Story, Character, Animation, Music];
const keys = ["Enjoyment", "Story", "Characters", "Animation", "Music"];

function BottomContent({
  item,
  variant,
  scoresStr,
  set,
}: {
  item: Item;
  variant: CardVariant;
  scoresStr: string[];
  set: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const scores = scoresStr.map(score => constraintScore(Number(score)));
  const accumulate = getAccumulatedScore(scores);

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
              value={scoresStr[i]}
              onChange={e =>
                set([...scoresStr.slice(0, i), e.target.value, ...scoresStr.slice(i + 1)])
              }
              onFocus={event => event.target.select()}
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

function TopRightContent({
  item,
  variant,
  scoresStr,
  set,
}: {
  item: Item;
  variant: CardVariant;
  scoresStr: string[];
  set: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const startTransition = useTransitionWithNProgress();

  const scores = scoresStr.map(score => constraintScore(Number(score)));
  const accumulate = getAccumulatedScore(scores);
  const hasPendingChanges =
    scores.some((score, index) => score !== Number(item.advancedScores[keys[index]])) ||
    accumulate !== Number(item.score);

  const setAsWatching = () => startTransition(() => updateStatus(item, MediaListStatus.Current));
  const setAsRewatching = () =>
    startTransition(() => updateStatus(item, MediaListStatus.Repeating));
  const setAsPaused = () => startTransition(() => updateStatus(item, MediaListStatus.Paused));
  const setAsDropped = () => startTransition(() => updateStatus(item, MediaListStatus.Dropped));
  const increment = () => startTransition(() => incrementProgress(item));
  const cancelRewatch = () => startTransition(() => _cancelRewatch(item));
  const setScore = () => {
    window.getSelection()?.removeAllRanges();
    startTransition(() => updateScore(item, scores));
  };
  const remove = () => startTransition(() => removeFromList(item));

  const clear = () => set(keys.map<string>(key => String(item.advancedScores[key]) ?? "0"));

  if (variant === "watching") {
    return (
      <>
        <button className="btn btn-sm btn-tertiary" onClick={setAsDropped}>
          Drop
        </button>
        <button className="btn btn-sm btn-secondary" onClick={setAsPaused}>
          Pause
        </button>
        <button className="btn btn-sm btn-primary" onClick={increment}>
          Next ep
        </button>
      </>
    );
  }

  if (variant === "rewatching") {
    return (
      <>
        <button className="btn btn-sm btn-secondary" onClick={cancelRewatch}>
          Stop rewatch
        </button>
        <button className="btn btn-sm btn-primary" onClick={increment}>
          Next ep
        </button>
      </>
    );
  }

  if (variant === "completed" && hasPendingChanges) {
    return (
      <>
        <button className="btn btn-sm btn-secondary" onClick={clear}>
          Clear
        </button>
        <button className="btn btn-sm btn-primary" onClick={setScore}>
          Save
        </button>
      </>
    );
  }

  if ((variant === "completed" && !hasPendingChanges) || variant === "completed-others") {
    return (
      <>
        <button className="btn btn-sm btn-secondary" onClick={setAsRewatching}>
          Rewatch
        </button>
      </>
    );
  }

  if (variant === "paused") {
    return (
      <>
        <button className="btn btn-sm btn-secondary" onClick={setAsWatching}>
          Resume
        </button>
      </>
    );
  }

  if (variant === "dropped") {
    return (
      <>
        <button className="btn btn-sm btn-secondary" onClick={setAsWatching}>
          Retry
        </button>
      </>
    );
  }

  if (variant === "planning") {
    return (
      <>
        <button className="btn btn-sm btn-tertiary" onClick={remove}>
          Remove
        </button>
        <button className="btn btn-sm btn-primary" onClick={setAsWatching}>
          Start
        </button>
      </>
    );
  }

  throw new Error("invariant: unreachable code in TopRightContent");
}

export default function PrivateCardClient({ item, variant }: { item: Item; variant: CardVariant }) {
  const [scoresStr, setScoresStr] = useState(
    keys.map<string>(key => String(item.advancedScores[key]) ?? "0"),
  );

  return (
    <Base
      item={item}
      variant={variant}
      topRight={
        <div className="absolute top-5 right-5 flex flex-row gap-1.5 p-1 rounded bg-daw-main-100">
          <TopRightContent item={item} variant={variant} scoresStr={scoresStr} set={setScoresStr} />
        </div>
      }
    >
      <div className="flex flex-row justify-between items-center">
        <BottomContent item={item} variant={variant} scoresStr={scoresStr} set={setScoresStr} />
      </div>
    </Base>
  );
}
