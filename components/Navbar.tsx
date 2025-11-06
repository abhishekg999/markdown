"use client";

import ThemeToggle from "./ThemeToggle";
import SettingsMenu from "./SettingsMenu";

export default function Navbar() {
  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        Markdown Editor
      </h1>
      <div className="flex items-center gap-2">
        <SettingsMenu />
        <ThemeToggle />
      </div>
    </nav>
  );
}
