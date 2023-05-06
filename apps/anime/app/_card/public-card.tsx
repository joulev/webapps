"use client";

import clsx from "clsx";
import { useState } from "react";

import { Item } from "~/lib/get-lists";
import { convertSeason } from "~/lib/utils";

import Base from "./base";
import { CardVariant } from "./card";

function BottomRightInfo({ item, variant }: { item: Item; variant: CardVariant }) {
  if ((variant === "watching" || variant === "rewatching") && item.progress)
    return (
      <div className="text-sm">
        Episode {item.progress}/{item.media?.episodes ?? "unknown"}
      </div>
    );

  if (item.score)
    return (
      <div className="flex flex-row gap-3 items-center">
        {/* <Score score={item.score} /> */}Score
        <div>{item.score}</div>
      </div>
    );

  return (
    <div className="help-text">
      Last updated:{" "}
      {item.updatedAt ? new Date(item.updatedAt * 1000).toLocaleDateString("en-gb") : "N/A"}
    </div>
  );
}

export default function PublicCard({ item, variant }: { item: Item; variant: CardVariant }) {
  const [showDetailedScore, setShowDetailedScore] = useState(false);
  const onHover = () => setShowDetailedScore(true);
  const onLeave = () => setShowDetailedScore(false);

  return (
    <Base item={item} variant={variant}>
      <div
        className="flex flex-row justify-between items-end"
        onMouseOver={onHover}
        onFocus={onHover}
        onMouseLeave={onLeave}
        onBlur={onLeave}
      >
        {showDetailedScore && item.score ? (
          <div className="flex flex-row help-text">
            {Object.entries(item.advancedScores).map(([key, score]: [string, any], i) => (
              <div
                key={i}
                className={clsx("group", i > 0 && "ml-3 border-l border-daw-main-300 pl-3")}
              >
                <div title={`${key}: ${score}/10`}>
                  <span className="hidden md:inline-block lg:hidden xl:inline-block">{key}</span>
                  <span className="hidden lg:inline-block xl:hidden">
                    {key.substring(0, 3)}
                  </span>{" "}
                  {score}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-row help-text">
            <div>
              {item.media?.season && item.media?.seasonYear
                ? `${convertSeason(item.media.season)} ${item.media.seasonYear}`
                : "Season N/A"}
            </div>
            {item.repeat ? (
              <div className="ml-3 border-l border-daw-main-300 pl-3">&times;{item.repeat + 1}</div>
            ) : null}
          </div>
        )}
        <BottomRightInfo item={item} variant={variant} />
      </div>
    </Base>
  );
}
