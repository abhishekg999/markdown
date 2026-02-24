"use client";

import { rehypeAddLineNumbers } from "@/lib/rehype-add-line-numbers";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewProps {
  content: string;
  onLineClick?: (lineNumber: number) => void;
}

export default function MarkdownPreview({
  content,
  onLineClick,
}: MarkdownPreviewProps) {
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
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeAddLineNumbers, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
