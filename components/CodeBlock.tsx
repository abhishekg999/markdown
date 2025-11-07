"use client";

import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const { theme } = useTheme();
  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1] || "text";

  return (
    <div className="my-4 relative">
      {language !== "text" && (
        <div className="absolute top-3 right-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
          {language}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={theme === "dark" ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          padding: "0.75rem",
          paddingTop: "1.5rem",
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#f6f8fa",
          borderRadius: "0.25rem",
          fontSize: "0.9em",
        }}
        codeTagProps={{
          style: {
            backgroundColor: "transparent",
            fontSize: "inherit",
          },
        }}
        PreTag="div"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
