"use client";

import { useThemeMode } from "@/hooks/useThemeMode";
import { useState } from "react";
import { motion as m } from "motion/react";
import {
  C,
  Cpp,
  Java,
  Python,
  Html,
  Css,
  Tailwind,
  Javascript,
  Typescript,
  React,
  Node,
  Express,
  Hono,
  MongoDB,
  Postgres,
  MySQL,
  NextjS,
  Expo,
  Docker,
  Vercel,
  Prisma,
  Neon,
  Motion,
  Redux,
  Zustand,
  Azure,
  DigitalOcean,
  Cursor,
  GraphQl,
  Trpc,
  GSAP,
  Figma,
  Postman,
  VScode,
  AWS,
  Redis,
  FastAPI,
  LangGraph,
  Qdrant,
  Flask,
  SocketIO,
  D3,
} from "@/components/Skills/SkillsLogo";

// Re-export SKILLS from the separate file for convenience
export { SKILLS, type SkillName } from "./skills";

// Map skill names (matching SKILLS values) to their logo components
const skillLogoMap: { [key: string]: React.ComponentType } = {
  // Languages
  C: C,
  "C++": Cpp,
  Java: Java,
  Python: Python,
  HTML: Html,
  CSS: Css,
  Tailwind: Tailwind,
  "Tailwind CSS": Tailwind,
  Javascript: Javascript,
  JavaScript: Javascript,
  Typescript: Typescript,
  TypeScript: Typescript,
  // Frontend
  React: React,
  "Next.js": NextjS,
  Expo: Expo,
  Motion: Motion,
  "Framer Motion": Motion,
  Redux: Redux,
  Zustand: Zustand,
  GSAP: GSAP,
  // Backend
  "Node.js": Node,
  Node: Node,
  Express: Express,
  Hono: Hono,
  tRPC: Trpc,
  GraphQL: GraphQl,
  // Databases
  MongoDB: MongoDB,
  Postgres: Postgres,
  PostgreSQL: Postgres,
  MySQL: MySQL,
  Prisma: Prisma,
  Neon: Neon,
  // DevOps & Tools
  Docker: Docker,
  Vercel: Vercel,
  Azure: Azure,
  DigitalOcean: DigitalOcean,
  Cursor: Cursor,
  Figma: Figma,
  Postman: Postman,
  VSCode: VScode,
  AWS: AWS,
  Redis: Redis,
  FastAPI: FastAPI,
  LangGraph: LangGraph,
  Qdrant: Qdrant,
  Flask: Flask,
  "Socket.io": SocketIO,
  "D3.js": D3,
};

interface TechStackOverlapProps {
  stack: string[];
  maxVisible?: number;
  size?: number;
  className?: string;
}

const TechStackOverlap = ({
  stack,
  maxVisible = 4,
  size = 32,
  className = "",
}: TechStackOverlapProps) => {
  const theme = useThemeMode();
  const isDark = theme === "dark";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Early return if stack is empty or undefined
  if (!stack || stack.length === 0) {
    return null;
  }

  // Only show items that have a logo component
  const withLogos = stack.filter((tech) => skillLogoMap[tech]);
  const withoutLogos = stack.filter((tech) => !skillLogoMap[tech]);

  const visibleStack = withLogos.slice(0, maxVisible);
  const remainingCount = withLogos.length - maxVisible + withoutLogos.length;

  return (
    <div className={`flex items-center ${className}`}>
      {visibleStack.map((tech, index) => {
        const LogoComponent = skillLogoMap[tech];
        const isHovered = hoveredIndex === index;

        return (
          <m.div
            key={index}
            className={`relative rounded-full flex items-center justify-center border overflow-visible ${
              isDark
                ? "bg-[#0a0a0a] border-white/15"
                : "bg-[#fffef6] border-black/15"
            }`}
            style={{
              width: size,
              height: size,
              marginLeft: index === 0 ? 0 : -(size * 0.5),
              zIndex: isHovered ? 50 : visibleStack.length - index,
            }}
            animate={{ scale: isHovered ? 1.15 : 1, y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Logo clipped inside circle */}
            <div
              className="flex items-center justify-center w-full h-full rounded-full overflow-hidden"
              style={{ transform: "scale(1.2)" }}
            >
              {LogoComponent && <LogoComponent />}
            </div>
          </m.div>
        );
      })}

      {/* Remaining count indicator */}
      {remainingCount > 0 && (
        <div
          className={`relative rounded-full flex items-center justify-center border ${
            isDark
              ? "bg-[#0a0a0a] border-white/15"
              : "bg-[#fffef6] border-black/15"
          }`}
          style={{
            width: size,
            height: size,
            marginLeft: -(size * 0.3),
            zIndex: 0,
          }}
        >
          <span
            className={`text-xs font-mono font-bold ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default TechStackOverlap;
