"use client";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import TechStackOverlap from "./TechStackOverlap";
import { motion } from "motion/react";

interface ProjectTemplateProps {
  title: string;
  description: string;
  image: string | StaticImageData;
  github: string;
  link?: string;
  stack?: string[];
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({
  title,
  description,
  image,
  github,
  link,
  stack,
}) => {
  return (
    <motion.div
      className="relative w-full rounded-xl overflow-hidden skillsDoubleBorder hover:cursor-pointer group h-full flex flex-col"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* Inner content */}
      <div className="flex flex-col w-full h-full gap-3 p-3">
        {/* Image */}
        <div className="w-full aspect-video rounded-lg relative overflow-hidden border border-black/10 dark:border-white/10">
          <motion.div
            className="relative w-full h-full"
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={title + " project preview"}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Title + links */}
        <div className="flex w-full justify-between items-start gap-2">
          <h2 className="smalll text-lg font-semibold text-black dark:text-white leading-tight">
            {title}
          </h2>
          <div className="flex space-x-1 shrink-0">
            {link && (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, rotate: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 inline-flex"
                aria-label="Live link"
              >
                <IconExternalLink size={16} stroke={1.5} />
              </motion.a>
            )}
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.12, rotate: -4 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 inline-flex"
              aria-label="GitHub repo"
            >
              <IconBrandGithub size={16} stroke={1.5} />
            </motion.a>
          </div>
        </div>

        {/* Description */}
        <p className="smalll text-sm leading-relaxed text-black/60 dark:text-white/60 line-clamp-2">
          {description}
        </p>

        {/* Stack pinned bottom */}
        {stack && stack.length > 0 && (
          <div className="w-full mt-auto pt-1">
            <TechStackOverlap stack={stack} maxVisible={5} size={28} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectTemplate;
