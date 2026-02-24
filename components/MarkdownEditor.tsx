"use client";

import { markdown } from "@codemirror/lang-markdown";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import CodeMirror, {
  EditorView,
  type ReactCodeMirrorRef,
} from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { useEditorSettings } from "./EditorSettings";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export interface MarkdownEditorHandle {
  jumpToLine: (lineNumber: number) => void;
}

const MarkdownEditor = forwardRef<MarkdownEditorHandle, MarkdownEditorProps>(
  ({ value, onChange }, ref) => {
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

    const extensions = useMemo(
      () =>
        settings.wordWrap
          ? [markdown(), EditorView.lineWrapping]
          : [markdown()],
      [settings.wordWrap],
    );

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
          basicSetup={{
            lineNumbers: settings.lineNumbers,
            foldGutter: false,
          }}
        />
      </div>
    );
  },
);

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
