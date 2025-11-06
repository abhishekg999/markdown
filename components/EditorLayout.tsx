"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState, useRef } from "react";
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
  const [markdown, setMarkdown] = useLocalStorage(
    "markdown-content",
    DEFAULT_MARKDOWN,
  );
  const editorRef = useRef<MarkdownEditorHandle>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLineClick = (lineNumber: number) => {
    editorRef.current?.jumpToLine(lineNumber);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <MarkdownEditor ref={editorRef} value={markdown} onChange={setMarkdown} />
      <MarkdownPreview content={markdown} onLineClick={handleLineClick} />
    </div>
  );
}
