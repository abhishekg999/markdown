"use client";

import type { editor } from "monaco-editor";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useEditorSettings } from "./EditorSettings";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => null,
});

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
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    useImperativeHandle(ref, () => ({
      jumpToLine: (lineNumber: number) => {
        if (editorRef.current) {
          editorRef.current.revealLineInCenter(lineNumber);
          editorRef.current.setPosition({ lineNumber, column: 1 });
          editorRef.current.focus();
        }
      },
    }));

    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.updateOptions({
          wordWrap: settings.wordWrap ? "on" : "off",
          fontSize: settings.fontSize,
          lineNumbers: settings.lineNumbers ? "on" : "off",
        });
      }
    }, [settings]);

    return (
      <div className="w-1/2 h-full border-r border-neutral-200 dark:border-neutral-700">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={value}
          onChange={(value) => onChange(value || "")}
          theme={theme === "dark" ? "vs-dark" : "light"}
          loading=""
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          options={{
            minimap: { enabled: false },
            fontSize: settings.fontSize,
            lineNumbers: settings.lineNumbers ? "on" : "off",
            scrollBeyondLastLine: false,
            wordWrap: settings.wordWrap ? "on" : "off",
          }}
        />
      </div>
    );
  },
);

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
