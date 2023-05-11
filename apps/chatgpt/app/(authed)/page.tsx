"use client";

import { useCallback, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function getAnswerFromStreamResponse(raw: string) {
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

  const addAnswer = useCallback(
    (answer: string) =>
      setMessages(messages => {
        const lastMessage = messages.at(-1);
        if (lastMessage && lastMessage.role === "assistant")
          return messages.map((message, i) =>
            i === messages.length - 1 ? { ...message, content: answer } : message,
          );
        else return [...messages, { role: "assistant", content: answer }];
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
    if (!res.ok || !res.body) {
      setIsLoading(false);
      alert(`Something went wrong (status: ${res.status})`);
      return;
    }
    setMessages(messages => [...messages, { role: "user", content: prompt }]);
    setPrompt("");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let content = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const raw = decoder.decode(value);
      content += raw;
      addAnswer(getAnswerFromStreamResponse(content));
      // Yeah I know it's not good; but this app can only be used by me so this is "good enough"
      window.scrollTo(0, document.body.scrollHeight);
    }
    setIsLoading(false);
  }, [prompt, messages, addAnswer]);

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
            value={prompt}
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
