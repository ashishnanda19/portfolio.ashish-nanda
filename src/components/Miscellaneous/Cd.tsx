"use client";

import Link from "next/link";
import { useThemeMode } from "@/hooks/useThemeMode";

interface CdProps {
  className?: string;
}

const Cd = ({ className = "" }: CdProps) => {
  const theme = useThemeMode();
  const isDark = theme === "dark";

  return (
    <div className={`flex justify-end mt-auto ${className}`}>
      <Link
        href="/"
        className={`font-mono text-lg transition-colors duration-300 ${
          isDark
            ? "text-neutral-500 hover:text-red-500"
            : "text-neutral-400 hover:text-neutral-800"
        }`}
      >
        <span className={isDark ? "text-red-500" : "text-neutral-600"}>
          {">"}
        </span>{" "}
        cd..
      </Link>
    </div>
  );
};

export default Cd;
