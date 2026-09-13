"use client";
import { useThemeMode } from "@/hooks/useThemeMode";
import { FileText } from "lucide-react";
import { SITE } from "@/data/site";

export default function ResumeButton() {
  const theme = useThemeMode();

  return (
    <a
      href={SITE.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="skillsDoubleBorder !inline-flex flex-row items-center justify-center gap-2 px-3 py-1.5 text-sm smalll w-fit cursor-pointer"
    >
      <FileText
        size={16}
        className={theme === "dark" ? "white" : ""}
        strokeWidth={2.5}
      />
      <span>Resume</span>
    </a>
  );
}
