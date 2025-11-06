"use client";

import { rehypeAddLineNumbers } from "@/lib/rehype-add-line-numbers";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface MarkdownPreviewProps {
  content: string;
  onLineClick?: (lineNumber: number) => void;
}

export default function MarkdownPreview({
  content,
  onLineClick,
}: MarkdownPreviewProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const isInline = !className;
      const codeContent = String(children).replace(/\n$/, "");

      return isInline ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <CodeBlock className={className}>{codeContent}</CodeBlock>
      );
    },
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const element = target.closest("[data-line]");

    if (element) {
      const lineNumber = element.getAttribute("data-line");
      if (lineNumber && onLineClick) {
        onLineClick(parseInt(lineNumber, 10));
      }
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
          rehypePlugins={[rehypeRaw, rehypeAddLineNumbers]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
