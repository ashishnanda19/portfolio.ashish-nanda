"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface ViewMoreButtonProps {
  href: string;
  label?: string;
}

const ViewMoreButton = ({ href, label = "View More" }: ViewMoreButtonProps) => {
  return (
    <Link href={href} className="inline-block">
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={{ scale: 0.96 }}
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.03 },
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="skillsDoubleBorder relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl smalll text-sm tracking-wide text-black dark:text-white hover:cursor-pointer overflow-hidden"
      >
        <span className="relative z-10">{label}</span>
      </motion.div>
    </Link>
  );
};

export default ViewMoreButton;
