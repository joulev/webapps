"use client";

import { useEffect, useState } from "react";
import Clock from "~/components/clock";

export default function LastUpdated({ updated }: { updated: string }) {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => setDate(new Date(updated)), [updated, setDate]);
  return (
    <div className="flex flex-row items-center gap-3">
      <Clock hour={date?.getHours() ?? 4} minute={date?.getMinutes() ?? 0} />
      <span>
        Updated: <time title={updated}>{date?.toLocaleDateString("en-SG") ?? "loading"}</time>
      </span>
    </div>
  );
}
