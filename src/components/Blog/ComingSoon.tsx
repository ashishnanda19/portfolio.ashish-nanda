"use client";

import { useThemeMode } from "@/hooks/useThemeMode";
import { motion } from "motion/react";

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const ComingSoon = ({
  title = "Coming Soon",
  subtitle = "This section is under construction.",
  className = "",
}: ComingSoonProps) => {
  const theme = useThemeMode();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative flex flex-col items-center ${className}`}
    >
      {/* Title - Stylized with Playfair font */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`font-[family-name:var(--font-instrument)] italic font-bold text-5xl md:text-7xl tracking-wide ${
          isDark ? "demon-red" : "text-foreground"
        }`}
      >
        {title}
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "6rem" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`h-px mt-6 ${isDark ? "bg-red-500/40" : "bg-neutral-300"}`}
      />

      {/* Subtitle - Clean serif look */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="font-[family-name:var(--font-instrument)] italic text-base md:text-lg text-muted-foreground text-center max-w-sm mt-5"
      >
        {subtitle}
      </motion.p>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex items-center gap-2 mt-8"
      >
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${
            isDark ? "bg-red-500" : "bg-neutral-400"
          }`}
        />
        <span className="smalll text-sm text-muted-foreground uppercase tracking-widest">
          Building
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoon;
