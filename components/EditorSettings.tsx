"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [settings, setSettings] = useState<EditorSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("editor-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editor-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<EditorSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
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
