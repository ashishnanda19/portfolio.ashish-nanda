"use client";
import React from "react";
import { motion } from "motion/react";

export const DrawCircleText = ({ text }: { text: string }) => {
  return (
    <span className="relative smalll mx-1">
      {text}
      <svg
        viewBox="0 0 285 85"
        fill="none"
  className="absolute -left-2 -right-1.5 -top-1 bottom-0 translate-y-2"      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{
            duration: 1.25,
            ease: "easeInOut",
          }}
          d="M142.293 1C106.854 6.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
          stroke="#ff0000"
          strokeWidth="3.5"
        />
      </svg>
    </span>
  );
};
