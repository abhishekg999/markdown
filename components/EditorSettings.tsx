"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, ReactNode, useContext } from "react";

interface EditorSettings {
  wordWrap: boolean;
  fontSize: number;
  lineNumbers: boolean;
}

interface EditorSettingsContextType {
  settings: EditorSettings;
  updateSettings: (settings: Partial<EditorSettings>) => void;
}

const defaultSettings: EditorSettings = {
  wordWrap: false,
  fontSize: 14,
  lineNumbers: true,
};

const EditorSettingsContext = createContext<
  EditorSettingsContextType | undefined
>(undefined);

export function EditorSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<EditorSettings>(
    "editor-settings",
    defaultSettings,
  );

  const updateSettings = (newSettings: Partial<EditorSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <EditorSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </EditorSettingsContext.Provider>
  );
}

export function useEditorSettings() {
  const context = useContext(EditorSettingsContext);
  if (!context) {
    throw new Error(
      "useEditorSettings must be used within EditorSettingsProvider",
    );
  }
  return context;
}
