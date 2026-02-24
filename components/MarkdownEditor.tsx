"use client";

import { markdown } from "@codemirror/lang-markdown";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import CodeMirror, {
  EditorView,
  type ReactCodeMirrorRef,
} from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { useImperativeHandle, useRef } from "react";
import { useEditorSettings } from "./EditorSettings";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  ref?: React.Ref<MarkdownEditorHandle>;
}

export interface MarkdownEditorHandle {
  jumpToLine: (lineNumber: number) => void;
}

export default function MarkdownEditor({
  value,
  onChange,
  ref,
}: MarkdownEditorProps) {
  const { theme } = useTheme();
  const { settings } = useEditorSettings();
  const cmRef = useRef<ReactCodeMirrorRef>(null);

  useImperativeHandle(ref, () => ({
    jumpToLine: (lineNumber: number) => {
      const view = cmRef.current?.view;
      if (!view) return;
      const line = view.state.doc.line(lineNumber);
      view.dispatch({
        selection: { anchor: line.from },
        effects: EditorView.scrollIntoView(line.from, { y: "center" }),
      });
      view.focus();
    },
  }));

  const extensions = settings.wordWrap
    ? [markdown(), EditorView.lineWrapping]
    : [markdown()];

  return (
    <div
      className="w-1/2 h-full border-r border-neutral-200 dark:border-neutral-700 overflow-hidden"
      style={{ fontSize: settings.fontSize }}
    >
      <CodeMirror
        ref={cmRef}
        value={value}
        height="100%"
        style={{ height: "100%" }}
        theme={theme === "dark" ? vscodeDark : vscodeLight}
        extensions={extensions}
        onChange={onChange}
        basicSetup={{ lineNumbers: settings.lineNumbers, foldGutter: false }}
      />
    </div>
  );
}
