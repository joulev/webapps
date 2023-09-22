"use client";

import { init } from "@paralleldrive/cuid2";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import Link from "~/components/link";

export default function Content() {
  const [length, setLength] = useState(12);
  const [result, setResult] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);
  function copy(value: string) {
    if (currentTimeout) clearTimeout(currentTimeout);
    navigator.clipboard.writeText(value);
    setShowCopied(true);
    setCurrentTimeout(setTimeout(() => setShowCopied(false), 1000));
  }
  return (
    <div className="h-screen w-screen grid place-items-center p-6">
      <div className="max-w-xs w-full flex flex-col gap-6">
        <div className="flex flex-row gap-2 justify-start items-center text-daw-main-600 text-sm">
          <ArrowLeft size={18} width={24} strokeWidth={4 / 3} />
          <Link href="/" className="anchor text-daw-main-600">
            Back to home
          </Link>
        </div>
        <div />
        <div>
          Generate a{" "}
          <a href="https://github.com/paralleldrive/cuid2" className="anchor">
            cuid2
          </a>{" "}
          value from a given length
        </div>
        <form
          className="flex flex-row gap-6"
          onSubmit={e => {
            e.preventDefault();
            const value = init({ length })();
            setResult(value);
            copy(value);
          }}
        >
          <input
            className="input flex-1 min-w-0 text-daw-main-950"
            placeholder="Length"
            required
            type="number"
            value={length}
            onChange={e => setLength(e.target.valueAsNumber)}
          />
          <button className="btn btn-primary" disabled={isNaN(length) || length < 1}>
            {showCopied ? "Copied" : "Generate"}
          </button>
        </form>
        <div className="bg-daw-main-100 p-6 rounded text-center break-all h-36 grid place-items-center overflow-y-auto text-daw-main-950">
          <Balancer>{result}</Balancer>
        </div>
        <hr className="border-daw-main-300" />
        <div className="flex flex-row justify-between text-sm text-daw-main-600">
          <a href="https://github.com/joulev/webapps/tree/main/apps/cuid2" className="anchor">
            Source code
          </a>
          <span>
            Made by{" "}
            <a href="https://joulev.dev" className="anchor">
              @joulev
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
