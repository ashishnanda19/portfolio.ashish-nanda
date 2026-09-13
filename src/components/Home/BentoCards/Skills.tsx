"use client";
import {
  Cpp,
  Java,
  Python,
  Html,
  Tailwind,
  Javascript,
  SQL,
  React,
  Node,
  Express,
  MongoDB,
  Postgres,
  MySQL,
  Redis,
  ChromaDB,
  Docker,
  AWS,
  FastAPI,
  LangChain,
  LangGraph,
  HuggingFace,
  NumPy,
  Pandas,
  Jenkins,
  CICD,
  Git,
  GitHubSkill,
  Supabase,
  SocketIO,
  BullMQ,
  Flask,
  Qdrant,
  PostGIS,
  Groq,
  NetworkX,
  Ollama,
  TesseractOCR,
  FFmpeg,
  Prometheus,
  Grafana,
  CMake,
} from "@/components/Skills/SkillsLogo";
import BentoCard from "./BentoCard";
import { useMobileView } from "@/hooks/useMobileView";
import { motion } from "motion/react";

type SkillsProps = {
  className?: string;
};

const skillsRow1 = [
  Cpp,
  Java,
  Python,
  Javascript,
  SQL,
  Html,
  Tailwind,
  React,
  Node,
  Express,
  FastAPI,
  Flask,
  SocketIO,
  BullMQ,
  MongoDB,
  MySQL,
  Postgres,
  PostGIS,
  Redis,
  ChromaDB,
  Qdrant,
];

const skillsRow2 = [
  LangChain,
  LangGraph,
  Groq,
  HuggingFace,
  NetworkX,
  Ollama,
  TesseractOCR,
  NumPy,
  Pandas,
  AWS,
  Docker,
  Jenkins,
  CICD,
  Git,
  GitHubSkill,
  Supabase,
  FFmpeg,
  Prometheus,
  Grafana,
  CMake,
];

export default function Skills({ className }: SkillsProps) {
  const isMobile = useMobileView();

  // Calculate the total size needed for seamless scrolling
  const skillsCount1 = skillsRow1.length;
  const skillsCount2 = skillsRow2.length;

  // Exact Tailwind values: w-15 = 60px, h-15 = 60px, gap-x-3 = 12px, gap-y-3 = 12px
  const skillWidth = 60; // w-15 = 60px
  const skillHeight = 60; // h-15 = 60px
  const skillWidth2 = 56; // w-14 = 56px (for second row)
  const skillHeight2 = 56; // h-14 = 56px (for second row)
  const gapHorizontal = 12; // gap-x-3 = 12px
  const gapVertical = 12; // gap-y-3 = 12px

  // Calculate total width/height for each row based on actual dimensions
  const totalWidth1 =
    skillsCount1 * skillWidth + (skillsCount1 - 1) * gapHorizontal;
  const totalHeight1 =
    skillsCount1 * skillHeight + (skillsCount1 - 1) * gapVertical;

  const totalWidth2 =
    skillsCount2 * skillWidth2 + (skillsCount2 - 1) * gapHorizontal;
  const totalHeight2 =
    skillsCount2 * skillHeight2 + (skillsCount2 - 1) * gapVertical;

  return (
    <BentoCard className={className}>
      <div
        className={`w-full flex hover:cursor-pointer ${
          isMobile
            ? "pt-2 flex-col [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
            : "gap-2 px-3 flex-row max-h-[460px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
        } skills-container  `}
      >
        <div
          className={`flex flex-1 ${
            isMobile
              ? "gap-x-3 overflow-hidden"
              : "flex-col gap-y-3 overflow-hidden"
          } items-center h-full`}
        >
          <motion.div
            key={isMobile ? "row1-h" : "row1-v"}
            className={`flex ${
              isMobile ? "flex-row gap-x-3" : "flex-col gap-y-3"
            } items-center h-full`}
            style={{
              width: isMobile ? `${totalWidth1 * 2}px` : "auto",
              height: isMobile ? "auto" : `${totalHeight1 * 2}px`,
            }}
            animate={{
              x: isMobile ? [0, -totalWidth1] : 0,
              y: isMobile ? 0 : [0, -totalHeight1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            }}
            whileHover={{
              transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {[...skillsRow1, ...skillsRow1].map((SkillComponent, index) => (
              <div key={index} className="flex-shrink-0 w-[60px] h-[60px]">
                <SkillComponent />
              </div>
            ))}
          </motion.div>
        </div>

        <div
          className={`flex flex-1 ${
            isMobile
              ? "gap-x-3 overflow-hidden"
              : "flex-col gap-y-3 overflow-hidden"
          } items-center h-full`}
        >
          <motion.div
            key={isMobile ? "row2-h" : "row2-v"}
            className={`flex ${
              isMobile ? "flex-row gap-x-3" : "flex-col gap-y-3"
            } items-center h-full`}
            style={{
              width: isMobile ? `${totalWidth2 * 2}px` : "auto",
              height: isMobile ? "auto" : `${totalHeight2 * 2}px`,
            }}
            animate={{
              x: isMobile ? [-totalWidth2, 0] : 0,
              y: isMobile ? 0 : [-totalHeight2, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            }}
            whileHover={{
              transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {[...skillsRow2, ...skillsRow2].map((SkillComponent, index) => (
              <div key={index} className="flex-shrink-0 w-[56px] h-[56px]">
                <SkillComponent />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </BentoCard>
  );
}
