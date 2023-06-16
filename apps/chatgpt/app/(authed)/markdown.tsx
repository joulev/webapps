"use client";

import { useEffect, useState } from "react";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

async function md2html(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify);
  return String(await processor.process(md));
}

export default function Markdown({ className, content }: { className?: string; content: string }) {
  const [html, setHtml] = useState("");
  useEffect(() => void md2html(content).then(setHtml), [content]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
