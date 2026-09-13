"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconCalendar, IconClock, IconArrowUpRight } from "@tabler/icons-react";

interface BlogTemplateProps {
  title: string;
  description: string;
  date: string;
  readTime?: string;
  link: string;
  tags?: string[];
}

const BlogTemplate = ({
  title,
  description,
  date,
  readTime,
  link,
  tags,
}: BlogTemplateProps) => {
  return (
    <Link href={link} className="block w-full h-full">
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="skillsDoubleBorder relative w-full h-full rounded-xl overflow-hidden hover:cursor-pointer flex flex-col p-4 gap-3"
      >
        {/* Top row: meta + arrow */}
        <div className="flex items-center justify-between text-[11px] text-black/55 dark:text-white/55">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <IconCalendar size={12} stroke={1.5} />
              {date}
            </span>
            {readTime && (
              <span className="flex items-center gap-1">
                <IconClock size={12} stroke={1.5} />
                {readTime}
              </span>
            )}
          </div>
          <motion.span
            variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-black/70 dark:text-white/70"
          >
            <IconArrowUpRight size={16} stroke={1.5} />
          </motion.span>
        </div>

        {/* Title */}
        <h3 className="smalll text-base md:text-lg font-semibold leading-snug text-black dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs leading-relaxed text-black/60 dark:text-white/60 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full border border-black/15 dark:border-white/15 text-black/60 dark:text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default BlogTemplate;
