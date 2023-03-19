"use client";

import { useCallback, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function getTokenFromStreamedUInt8Array(value: Uint8Array) {
  const decoder = new TextDecoder();
  const raw = decoder.decode(value);
  const messages = raw.split("\n");
  let buffer = "";
  for (const message of messages) {
    try {
      if (!message.startsWith("data: ")) continue;
      const data = JSON.parse(message.slice("data: ".length));
      if (data.object !== "chat.completion.chunk") continue;
      buffer += (data.choices[0].delta.content as string | undefined) ?? "";
    } catch {
      continue;
    }
  }
  return buffer;
}

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addTokenFromResponse = useCallback(
    (token: string) =>
      setMessages(messages => {
        const lastMessage = messages.at(-1);
        if (lastMessage && lastMessage.role === "assistant")
          return messages.map((message, i) =>
            i === messages.length - 1 ? { ...message, content: message.content + token } : message,
          );
        else return [...messages, { role: "assistant", content: token }];
      }),
    [setMessages],
  );

  const submit = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, previousMessages: messages }),
    });
    if (!res.ok || !res.body) return console.error("Something went wrong");
    setMessages(messages => [...messages, { role: "user", content: prompt }]);
    setPrompt("");
    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      addTokenFromResponse(getTokenFromStreamedUInt8Array(value));
    }
    setIsLoading(false);
  }, [prompt, messages, addTokenFromResponse]);

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !isLoading) {
        e.preventDefault();
        await submit();
      }
    },
    [isLoading, submit],
  );

  return (
    <div className="flex flex-col gap-6">
      {messages.map((message, i) =>
        message.role === "user" ? (
          <UserMessage key={i} content={message.content} />
        ) : (
          <ResponseMessage key={i} content={message.content} />
        ),
      )}
      <textarea
        className="w-full input h-24"
        value={prompt}
        onKeyDown={onKeyDown}
        onChange={e => setPrompt(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );
}
