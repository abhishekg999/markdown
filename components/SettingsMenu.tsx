"use client";

import { Settings, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useEditorSettings } from "./EditorSettings";

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { settings, updateSettings } = useEditorSettings();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
        aria-label="Settings"
      >
        <Settings size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              Editor Settings
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded text-neutral-500 dark:text-neutral-400"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">
                Word Wrap
              </label>
              <button
                onClick={() => updateSettings({ wordWrap: !settings.wordWrap })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.wordWrap
                    ? "bg-blue-600"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.wordWrap ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">
                Line Numbers
              </label>
              <button
                onClick={() =>
                  updateSettings({ lineNumbers: !settings.lineNumbers })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.lineNumbers
                    ? "bg-blue-600"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.lineNumbers ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-700 dark:text-neutral-300">
                Font Size: {settings.fontSize}px
              </label>
              <input
                type="range"
                min="10"
                max="20"
                value={settings.fontSize}
                onChange={(e) =>
                  updateSettings({ fontSize: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>10px</span>
                <span>20px</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
