"use client";

import { useThemeMode } from "@/hooks/useThemeMode";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loader({ size = "sm", className = "" }: LoaderProps) {
  const theme = useThemeMode();

  // Size configurations - made smaller
  const sizeConfig = {
    sm: { cellSize: 6, spacing: 1, radius: 1 },
    md: { cellSize: 8, spacing: 1, radius: 1 },
    lg: { cellSize: 12, spacing: 1, radius: 2 },
  };

  const config = sizeConfig[size];
  const totalSize = 3 * (config.cellSize + 2 * config.spacing);

  // Colors - Shades of black in light mode, shades of demon red in dark mode
  const colors =
    theme === "dark"
      ? [
          "#4d0000", // darkest red
          "#660000",
          "#800000",
          "#990000",
          "#b30000",
          "#cc0000",
          "#e60000",
          "#ff0000", // demon red
          "#ff1a1a", // lightest red
        ]
      : [
          "#000000", // pure black
          "#1a1a1a",
          "#333333",
          "#4d4d4d",
          "#666666",
          "#808080",
          "#999999",
          "#b3b3b3",
          "#cccccc", // light gray
        ];

  const delays = [
    "d-0",
    "d-1",
    "d-2",
    "d-1",
    "d-2",
    "d-2",
    "d-3",
    "d-3",
    "d-4",
  ];

  return (
    <div
      className={`loader ${className}`}
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: totalSize,
        height: totalSize,
      }}
    >
      {delays.map((delay, index) => (
        <div
          key={index}
          className={`cell ${delay}`}
          style={
            {
              flex: `0 0 ${config.cellSize}px`,
              height: config.cellSize,
              margin: config.spacing,
              backgroundColor: "transparent",
              boxSizing: "border-box",
              borderRadius: config.radius,
              
              "--cell-color": colors[index],
            } as React.CSSProperties
          }
        />
      ))}
      <style jsx>{`
        .cell {
          animation: 1.5s ripple ease infinite;
        }

        .cell.d-1 {
          animation-delay: 100ms;
        }

        .cell.d-2 {
          animation-delay: 200ms;
        }

        .cell.d-3 {
          animation-delay: 300ms;
        }

        .cell.d-4 {
          animation-delay: 400ms;
        }

        @keyframes ripple {
          0% {
            background-color: transparent;
          }
          30% {
            background-color: var(--cell-color);
          }
          60% {
            background-color: transparent;
          }
          100% {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}
