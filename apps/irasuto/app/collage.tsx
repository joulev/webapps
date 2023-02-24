"use client";
import { useState, useEffect as useEffectOriginal, useLayoutEffect, useMemo } from "react";
import TweetPhoto from "./tweet-photo";
import { Photo } from "~/types";

const useEffect = typeof window === "undefined" ? useEffectOriginal : useLayoutEffect;

const BREAKPOINTS = [640, 1024]; // [1] 640 [2] 1024 [3], all are min-width
const GAP = 12;

function useColumnCount() {
  const [columnCount, setColumnCount] = useState<number | null>(null);
  useEffect(() => {
    function handleResize() {
      let currentCount = 1;
      for (const breakpoint of BREAKPOINTS)
        if (window.matchMedia(`(min-width: ${breakpoint}px)`).matches) currentCount++;
      setColumnCount(currentCount);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return columnCount;
}

function useOrganisedPhotos(photos: Photo[], columnCount: number | null) {
  const organisedPhotos = useMemo(() => {
    if (columnCount === null) return [];
    let columns: { photos: Photo[]; height: number; index: number }[] = new Array(columnCount)
      .fill([])
      .map((_, i) => ({ photos: [], height: 0, index: i }));
    for (const photo of photos) {
      const lowestColumn = columns.slice().sort((a, b) => a.height - b.height)[0];
      columns[lowestColumn.index].photos.push(photo);
      columns[lowestColumn.index].height += photo.height + GAP;
    }
    return columns.map(column => column.photos);
  }, [photos, columnCount]);
  return organisedPhotos;
}

export default function Collage({ photos }: { photos: Photo[] }) {
  const count = useColumnCount();
  const columns = useOrganisedPhotos(photos, count);
  if (count === null) return null;
  return (
    <>
      {columns.map((column, i) => (
        <div key={i} className="flex flex-col" style={{ gap: GAP }}>
          {column.map(photo => (
            <TweetPhoto key={photo.url} {...photo} />
          ))}
        </div>
      ))}
    </>
  );
}
