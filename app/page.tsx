"use client";

import EditorLayout from "@/components/EditorLayout";
import { EditorSettingsProvider } from "@/components/EditorSettings";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { registerServiceWorker } from "@/lib/register-sw";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

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
