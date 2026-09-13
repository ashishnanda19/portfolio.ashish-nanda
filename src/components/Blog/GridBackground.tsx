"use client";

import { useThemeMode } from "@/hooks/useThemeMode";

interface GridBackgroundProps {
  className?: string;
}

const GridBackground = ({ className = "" }: GridBackgroundProps) => {
  const theme = useThemeMode();
  const isDark = theme === "dark";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${
            isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.02)"
          } 1px, transparent 1px), linear-gradient(90deg, ${
            isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.02)"
          } 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

export default GridBackground;
