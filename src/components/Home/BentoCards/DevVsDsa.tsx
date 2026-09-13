"use client";
import { motion } from "motion/react";
import GitHubHeatmap from "@/components/GitHub/GitHubHeatmap";
import LeetCodeCard from "@/components/Leetcode/LeetCodeCard";
import BentoCard from "./BentoCard";
import { SITE } from "@/data/site";

export default function DevVsDsa({ className }: { className: string }) {
  return (
    <BentoCard className={`${className}`}>
      <motion.div
        className={`flex flex-col items-center justify-center space-y-2`}
      >
        <GitHubHeatmap username={SITE.githubUsername} />
        <LeetCodeCard username={SITE.leetcodeUsername} />
      </motion.div>
    </BentoCard>
  );
}
