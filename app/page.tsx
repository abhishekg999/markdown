"use client";

import EditorLayout from "@/components/EditorLayout";
import { EditorSettingsProvider } from "@/components/EditorSettings";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <EditorSettingsProvider>
        <div className="h-screen flex flex-col">
          <Navbar />
          <EditorLayout />
        </div>
      </EditorSettingsProvider>
    </ThemeProvider>
  );
}
