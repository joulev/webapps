"use client";

import { addToPTW } from "~/app/_card/actions";
import { useTransitionWithNProgress } from "~/app/_card/use-transition-nprogress";

export default function AddButton({ itemId }: { itemId: number }) {
  const startTransition = useTransitionWithNProgress();
  return (
    <button
      className="btn btn-sm btn-secondary"
      onClick={() => startTransition(() => addToPTW(itemId))}
    >
      Add to PTW
    </button>
  );
}
