"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { useEffect, useState } from "react";

export default function Input({ query }: { query: string | undefined }) {
  const router = useRouter();
  const [value, setValue] = useState(query ?? "");

  useEffect(() => {
    if (value === query) NProgress.done();
  }, [value, query]);

  return (
    <form
      className="flex flex-row gap-3"
      onSubmit={e => {
        e.preventDefault();
        if (value) {
          NProgress.start();
          router.push(`/add?s=${encodeURIComponent(value)}`);
        }
      }}
    >
      <input
        placeholder="Anime title"
        className="input flex-grow"
        value={value}
        onChange={e => setValue(e.target.value)}
        spellCheck={false}
      />
      <button className="btn btn-primary" disabled={!value}>
        Search
      </button>
    </form>
  );
}
