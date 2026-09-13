"use client";
import { useThemeMode } from "@/hooks/useThemeMode";
import React from "react";

const IconCard = ({
  children,
  size = 64,
}: {
  children: React.ReactNode;
  size?: number;
}) => {
  const theme = useThemeMode();
  // If the child is a valid SVG element, clone it and set style for stroke color
  let coloredChild = children;
  if (
    React.isValidElement(children) &&
    typeof children.type === "string" &&
    children.type === "svg"
  ) {
    const childEl = children as React.ReactElement<
      React.SVGProps<SVGSVGElement>
    >;
    coloredChild = React.cloneElement(childEl, {
      style: {
        ...(childEl.props.style || {}),
        stroke: theme === "dark" ? "#fff" : "#000",
      },
    } as unknown as React.SVGProps<SVGSVGElement>);
  }
  return (
    <div
      className="BentoCard flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {coloredChild}
    </div>
  );
};

export default IconCard;
