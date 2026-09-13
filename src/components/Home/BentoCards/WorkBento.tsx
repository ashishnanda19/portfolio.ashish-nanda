"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  IconBrandGithub,
  IconExternalLink,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import BentoCard from "./BentoCard";
import { Projects } from "@/data/projects";
import TechStackOverlap from "@/components/Work/TechStackOverlap";

const WorkBento = ({ className }: { className: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentProject = Projects[currentIndex];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % Projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + Projects.length) % Projects.length);
  };

  // Auto-rotate projects every 5 seconds when not hovered
  useEffect(() => {
    if (Projects.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      nextProject();
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <BentoCard
      className={`relative overflow-hidden group cursor-pointer !p-0 ${className}`}
    >
      <div
        className="absolute inset-0 m-[3px] rounded-[0.6rem] overflow-hidden z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentProject.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ filter: isHovered ? "blur(0px)" : "blur(3px)" }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                className="object-cover scale-105"
                priority
              />
            </motion.div>
            {/* Gradient Overlay - Intensifies on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay - Smooth slide up on hover */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={currentProject.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-3"
            >
              {/* Project Title - Slides up first */}
              <motion.h3
                className="smalll text-black text-lg md:text-xl tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              >
                {currentProject.title}
              </motion.h3>

              {/* Tech Stack - Slides up with delay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
              >
                <TechStackOverlap
                  stack={currentProject.stack}
                  maxVisible={5}
                  size={26}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Links - Top Right */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {currentProject.link && (
            <Link
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
            >
              <IconExternalLink size={16} className="text-black" />
            </Link>
          )}
          <Link
            href={currentProject.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
          >
            <IconBrandGithub size={16} className="text-black" />
          </Link>
        </div>

        {/* Navigation Arrows - Only show if multiple projects */}
        {Projects.length > 1 && (
          <>
            <button
              onClick={prevProject}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/30"
              aria-label="Previous project"
            >
              <IconChevronLeft size={18} className="text-black" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/30"
              aria-label="Next project"
            >
              <IconChevronRight size={18} className="text-black" />
            </button>
          </>
        )}

        {/* Dots Indicator - Only show if multiple projects */}
        {Projects.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {Projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-black w-3"
                    : "bg-black/40 hover:bg-black/60"
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </BentoCard>
  );
};

export default WorkBento;
