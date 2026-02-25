import EditorLayout from "@/components/EditorLayout";
import { EditorSettingsProvider } from "@/components/EditorSettings";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <EditorSettingsProvider>
        <div className="h-screen flex flex-col">
          <Navbar />
          <EditorLayout />
        </div>
      </EditorSettingsProvider>
    </ThemeProvider>
  );
}
