"use client";

import { useChat } from "ai/react";
import clsx from "clsx";
import { useCallback, useState } from "react";
import Markdown from "./markdown";

export default function Page() {
  const { messages, append } = useChat({ api: "/chat" });
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(async () => {
    setIsLoading(true);
    try {
      await append({ role: "user", content: prompt });
      setPrompt("");
    } catch {
      alert("Fetch failed, please try again later.");
    }
    setIsLoading(false);
  }, [append, prompt]);

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && e.shiftKey && !isLoading) {
        e.preventDefault();
        await submit();
      }
    },
    [isLoading, submit],
  );

  return (
    <div className="h-screen py-12 overflow-y-auto flex flex-col-reverse">
      <div className="flex flex-col gap-6 max-w-screen-md container">
        {messages.map((message, i) => (
          <div
            className={clsx(
              "flex flex-row",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
            key={i}
          >
            <Markdown
              className={clsx(
                "px-4 py-2 rounded max-w-[85%] sm:max-w-[75%] prose dark:prose-invert prose-zinc",
                message.role === "user" ? "bg-daw-main-200" : "border border-daw-main-300",
              )}
              content={message.content}
            />
          </div>
        ))}
        <div className="flex flex-col gap-3">
          <textarea
            className="w-full input h-24"
            value={isLoading ? "" : prompt}
            onKeyDown={onKeyDown}
            onChange={e => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex flex-row justify-end gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => setPrompt("")}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submit} disabled={isLoading}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
