"use client";

import { useEffect, useRef, useState } from "react";
import MarkdownEditor, { type MarkdownEditorHandle } from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";

const DEFAULT_MARKDOWN = `
# Welcome to Markdown Editor

## Features

- **Bold** and *italic* text
- [Links](https://example.com)
- Lists and task lists
- Multi-language syntax highlighting

### JavaScript

\`\`\`javascript
const greeting = (name) => {
  return \`Hello, \${name}!\`;
};
console.log(greeting("World"));
\`\`\`

### Python

\`\`\`python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

print(factorial(5))
\`\`\`

### TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
}

const users: User[] = [];
\`\`\`

### Tables

| Feature | Status |
|---------|--------|
| Editor  | ✓      |
| Preview | ✓      |
| Themes  | ✓      |

---

Start editing to see changes!
`.trim();

export default function EditorLayout() {
  const [mounted, setMounted] = useState(false);
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const editorRef = useRef<MarkdownEditorHandle>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("markdown-content");
    if (saved) setMarkdown(saved);
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js");
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("markdown-content", markdown);
    }
  }, [markdown, mounted]);

  const handleLineClick = (lineNumber: number) => {
    editorRef.current?.jumpToLine(lineNumber);
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {!mounted ? (
        <>
          <div className="w-1/2 bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          <div className="w-1/2 bg-neutral-50 dark:bg-neutral-950 animate-pulse" />
        </>
      ) : (
        <>
          <MarkdownEditor
            ref={editorRef}
            value={markdown}
            onChange={setMarkdown}
          />
          <MarkdownPreview content={markdown} onLineClick={handleLineClick} />
        </>
      )}
    </div>
  );
}
