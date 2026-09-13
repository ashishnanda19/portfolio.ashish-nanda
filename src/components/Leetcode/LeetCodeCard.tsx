"use client";

import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useMobileView } from "@/hooks/useMobileView";
import { Tooltip } from "react-tooltip";

import Loader from "../Miscellaneous/Loader";

// Color scale constants for heatmap (same as GitHubHeatmap)
const HEATMAP_COLORS = {
  dark: [
    "#232323", // match GitHubHeatmap dark empty
    "#7c6f00", // dark yellow
    "#bba800", // medium yellow
    "#FFD600", // bright yellow
    "#FFF176", // light yellow
  ],
  light: [
    "#ebedf0", // empty (match GitHubHeatmap light empty)
    "#7a7a7a", // low — clearly darker than empty
    "#4a4a4a", // mid
    "#222222", // high
    "#000000", // max
  ],
};

const GET_CALENDAR = gql`
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
      }
    }
  }
`;

function parseSubmissionCalendar(
  submissionCalendar: string
): Record<string, number> {
  if (!submissionCalendar) return {};
  return JSON.parse(submissionCalendar);
}

function mergeCalendars(
  ...calendars: Record<string, number>[]
): Record<string, number> {
  const merged: Record<string, number> = {};
  for (const cal of calendars) {
    for (const [timestamp, count] of Object.entries(cal)) {
      merged[timestamp] = (merged[timestamp] || 0) + Number(count);
    }
  }
  return merged;
}

// Helper: format date as YYYY-MM-DD
function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

// Helper: get color index for a count
function getColorIndex(count: number) {
  if (!count) return 0;
  if (count < 2) return 1;
  if (count < 4) return 2;
  if (count < 8) return 3;
  return 4;
}

const DAYS = 7;

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LeetCodeCard = ({ username }: { username: string }) => {
  const theme = useThemeMode();
  const isMobile = useMobileView();
  const [values, setValues] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const thisYear = new Date().getFullYear();
    const lastYear = thisYear - 1;
    Promise.all([
      fetch("/api/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_CALENDAR.loc?.source.body,
          variables: { username, year: thisYear },
        }),
      }).then((res) => res.json()),
      fetch("/api/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_CALENDAR.loc?.source.body,
          variables: { username, year: lastYear },
        }),
      }).then((res) => res.json()),
    ])
      .then(([thisYearData, lastYearData]) => {
        const cal1 = parseSubmissionCalendar(
          thisYearData?.data?.matchedUser?.userCalendar?.submissionCalendar ||
            "{}"
        );
        const cal2 = parseSubmissionCalendar(
          lastYearData?.data?.matchedUser?.userCalendar?.submissionCalendar ||
            "{}"
        );
        const merged = mergeCalendars(cal1, cal2);
        // Convert to array for heatmap
        const arr = Object.entries(merged).map(([timestamp, count]) => {
          const date = new Date(Number(timestamp) * 1000)
            .toISOString()
            .slice(0, 10);
          return { date, count: Number(count) };
        });
        setValues(arr);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch LeetCode data");
        setLoading(false);
      });
  }, [username]);

  if (loading) return <Loader size="md" />;
  if (error) return <div>Error :(</div>;

  // Build a map: date string -> count
  const dateToCount: Record<string, number> = {};
  for (const { date, count } of values) {
    dateToCount[date] = count;
  }

  // Responsive block size and margin
  const BLOCK_SIZE = isMobile ? 7 : 9;
  const BLOCK_MARGIN = isMobile ? 2 : 3;
  const BLOCK_RADIUS = 1;

  // Always end on today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Number of weeks to show: 26 for mobile (6 months), 53 for desktop (12 months)
  const numWeeks = isMobile ? 18 : 53;
  const daysToShow = numWeeks * 7;
  // Find the Sunday (start of week) that is (daysToShow - 1) days before today
  const endDate = new Date(today);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - (daysToShow - 1));
  startDate.setDate(startDate.getDate() - startDate.getDay());
  // Build the array of dates from startDate to today (never after today)
  const allDates: { date: string; count: number }[] = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = formatDate(current);
    allDates.push({ date: dateStr, count: dateToCount[dateStr] || 0 });
    const next = new Date(current);
    next.setDate(next.getDate() + 1);
    current = next;
  }
  // If the last week is incomplete, pad with empty cells
  const remainder = allDates.length % 7;
  if (remainder !== 0) {
    for (let i = remainder; i < 7; i++) {
      allDates.push({ date: "", count: 0 });
    }
  }
  // Chunk into weeks
  const grid: { date: string; count: number }[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    grid.push(allDates.slice(i, i + 7));
  }
  // Month labels
  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = null;
  for (let w = 0; w < grid.length; w++) {
    const firstDay = grid[w][0];
    if (firstDay && firstDay.date) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          x: w * (BLOCK_SIZE + BLOCK_MARGIN),
          label: MONTH_LABELS[month],
        });
        lastMonth = month;
      }
    }
  }

  // Tooltip id
  const tooltipId = "leetcode-heatmap-tooltip";
  const colorScale =
    theme === "dark" ? HEATMAP_COLORS.dark : HEATMAP_COLORS.light;

  return (
    <div
      className={`w-full flex flex-col items-center  ${
        isMobile ? "max-h-[110px]" : "max-h-[160px]"
      }`}
    >
      <svg
        width={(BLOCK_SIZE + BLOCK_MARGIN) * grid.length}
        height={(BLOCK_SIZE + BLOCK_MARGIN) * DAYS + (isMobile ? 20 : 30)}
        style={{ display: "block" }}
      >
        {/* Month labels */}
        {monthLabels.map((m) => (
          <text
            key={m.x}
            x={m.x + 2}
            y={isMobile ? 12 : 22}
            fontSize={isMobile ? 8 : 10}
            fill={theme === "dark" ? "#fff" : "#222"}
            fontFamily="inherit"
          >
            {m.label}
          </text>
        ))}
        {/* Heatmap grid */}
        {grid.map((week, x) =>
          week.map((day, y) => {
            const colorIdx = getColorIndex(day.count);
            return (
              <rect
                key={day.date + x + y}
                x={x * (BLOCK_SIZE + BLOCK_MARGIN)}
                y={y * (BLOCK_SIZE + BLOCK_MARGIN) + (isMobile ? 18 : 30)}
                width={BLOCK_SIZE}
                height={BLOCK_SIZE}
                rx={BLOCK_RADIUS}
                fill={colorScale[colorIdx]}
                data-tooltip-id={tooltipId}
                data-tooltip-content={`${day.count} submission${
                  day.count === 1 ? "" : "s"
                } on ${day.date}`}
                style={{ cursor: day.count > 0 ? "pointer" : "default" }}
              />
            );
          })
        )}
      </svg>
      <Tooltip
        id={tooltipId}
        style={{ fontSize: "10px", padding: "3px 8px" }}
      />
    </div>
  );
};

export default LeetCodeCard;
