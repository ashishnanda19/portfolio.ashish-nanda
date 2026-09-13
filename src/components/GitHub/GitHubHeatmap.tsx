"use client";

import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

import { useThemeMode } from "@/hooks/useThemeMode";
import { useMobileView } from "@/hooks/useMobileView";

import type { ReactElement, CSSProperties, RefObject } from "react";
import { Tooltip } from "react-tooltip";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Activity = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockElement = any;
type DayName = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type Labels = Record<string, string>;

export type ColorScale = string[];
export type ThemeInput = {
  dark: ColorScale;
  light?: ColorScale;
};

export type GitHubCalendarProps = {
  username: string;
  year?: number | "last";
  blockMargin?: number;
  blockRadius?: number;
  blockSize?: number;
  colorScheme?: "light" | "dark";
  errorMessage?: string;
  eventHandlers?: Record<
    string,
    (event: React.SyntheticEvent, data: Activity) => void
  >;
  fontSize?: number;
  hideColorLegend?: boolean;
  hideMonthLabels?: boolean;
  hideTotalCount?: boolean;
  labels?: Labels;
  loading?: boolean;
  ref?: RefObject<HTMLElement>;
  renderBlock?: (block: BlockElement, activity: Activity) => ReactElement;
  renderColorLegend?: (block: BlockElement, level: number) => ReactElement;
  showWeekdayLabels?: boolean | DayName[];
  style?: CSSProperties;
  theme?: ThemeInput;
  throwOnError?: boolean;
  totalCount?: number;
  transformData?: (data: Activity[]) => Activity[];
  transformTotalCount?: boolean;
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

// 6 months
export const selectLastHalfYear = (contributions: Activity[]) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};

export default function GitHubHeatmap({ username }: { username: string }) {
  const themeMode = useThemeMode();
  const isMobile = useMobileView();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define custom color scales
  // Zero (level 0) color also drives loading skeleton — keep subtle vs page bg
  const customTheme = {
    dark: [
      "#1a1a1a", // near-black empty + skeleton on dark bg
      "#0e4429", // deep green
      "#006d32", // dark green
      "#26a641", // mid green
      "#39d353", // bright green
    ],
    light: [
      "#ebedf0", // empty
      "#7a7a7a", // low — already clearly darker than empty
      "#4a4a4a", // mid
      "#222222", // high
      "#000000", // max
    ],
  };

  //hover commits
  const tooltipId = "gh-heatmap-tooltip";
  const defaultRenderBlock = (block: BlockElement, activity: Activity) =>
    activity && block ? (
      <>
        {React.cloneElement(block, {
          "data-tooltip-id": tooltipId,
          "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
        })}
      </>
    ) : (
      block
    );

  // Responsive block size and margin
  const blockSize = isMobile ? 7 : 9;
  const blockMargin = isMobile ? 2 : 3;
  const blockRadius = isMobile ? 1 : 1;
  const fontSize = isMobile ? 8 : 10;

  // Only show last 6 months on mobile
  const transformData = isMobile
    ? (contributions: Activity[]) => {
        // Get the last 26 weeks (6 months)
        const last26Weeks = contributions.slice(-18 * 7);
        return last26Weeks;
      }
    : undefined;

  // Approximate calendar dimensions to reserve space and avoid layout flash
  const weeks = isMobile ? 18 : 53;
  const placeholderWidth = weeks * (blockSize + blockMargin);
  const placeholderHeight = 7 * (blockSize + blockMargin) + fontSize + 8;

  if (!mounted) {
    return (
      <div
        style={{
          width: placeholderWidth,
          height: placeholderHeight,
          maxWidth: "100%",
        }}
      />
    );
  }

  return (
    <>
      <GitHubCalendar
        username={username}
        blockMargin={blockMargin}
        blockRadius={blockRadius}
        blockSize={blockSize}
        colorScheme={themeMode}
        fontSize={fontSize}
        transformData={transformData}
        hideColorLegend={true}
        renderBlock={defaultRenderBlock}
        theme={customTheme}
      />
      <Tooltip
        id={tooltipId}
        style={{
          fontSize: fontSize,
          padding: isMobile ? "2px 6px" : "3px 8px",
        }}
      />
    </>
  );
}
