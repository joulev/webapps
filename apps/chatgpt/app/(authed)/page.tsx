"use client";

import { useChat } from "ai/react";
import { useCallback, useState } from "react";

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex flex-row justify-end">
      <pre className="bg-daw-main-200 px-4 py-2 rounded max-w-[85%] sm:max-w-[75%] whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}

function ResponseMessage({ content }: { content: string }) {
  return (
    <div className="flex flex-row justify-start">
      <pre className="border border-daw-main-300 px-4 py-2 rounded max-w-[85%] sm:max-w-[75%] whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}

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
    <div className="container max-w-screen-md py-12">
      <div className="flex flex-col gap-6">
        {messages.map((message, i) =>
          message.role === "user" ? (
            <UserMessage key={i} content={message.content} />
          ) : (
            <ResponseMessage key={i} content={message.content} />
          ),
        )}
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
