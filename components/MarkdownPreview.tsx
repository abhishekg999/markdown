"use client";

import { rehypeAddLineNumbers } from "@/lib/rehype-add-line-numbers";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { useEffect, useRef, useState } from "react";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeAddLineNumbers)
  .use(rehypePrettyCode, {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    keepBackground: false,
  })
  .use(rehypeStringify);

interface MarkdownPreviewProps {
  content: string;
  onLineClick?: (lineNumber: number) => void;
}

export default function MarkdownPreview({
  content,
  onLineClick,
}: MarkdownPreviewProps) {
  const [html, setHtml] = useState("");
  const versionRef = useRef(0);

  useEffect(() => {
    const version = ++versionRef.current;
    processor
      .process(content)
      .then((result) => {
        if (version === versionRef.current) setHtml(String(result));
      })
      .catch(() => {});
  }, [content]);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = (e.target as HTMLElement).closest("[data-line]");
    if (element && onLineClick) {
      const lineNumber = element.getAttribute("data-line");
      if (lineNumber) onLineClick(parseInt(lineNumber, 10));
    }
  };

  return (
    <div className="w-1/2 overflow-auto bg-white dark:bg-neutral-900">
      <div
        className="prose prose-neutral dark:prose-invert max-w-none p-8 cursor-pointer"
        onDoubleClick={handleDoubleClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
