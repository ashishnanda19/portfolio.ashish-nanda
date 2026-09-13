"use client";
import { motion, AnimatePresence } from "motion/react";
import XIcon from "./Icons/XIcon";
import GithubIcon from "./Icons/GithubIcon";
import AppleMusicIcon from "./Icons/AppleMusic";
import LinkedinIcon from "./Icons/LinkedinIcon";
import MailIcon from "./Icons/MailIcon";
import LeetcodeIcon from "./Icons/LeetcodeIcon";
import { useMobileView } from "@/hooks/useMobileView";
import { useState } from "react";
import { SITE } from "@/data/site";

const ICONS = [
  { label: "X", Component: XIcon, link: SITE.socials.x },
  {
    label: "GitHub",
    Component: GithubIcon,
    link: SITE.socials.github,
  },
  {
    label: "Apple Music",
    Component: AppleMusicIcon,
    link: SITE.socials.appleMusic,
  },
  {
    label: "LinkedIn",
    Component: LinkedinIcon,
    link: SITE.socials.linkedin,
  },
  {
    label: "Email",
    Component: MailIcon,
    link: `mailto:${SITE.email}`,
  },
  {
    label: "LeetCode",
    Component: LeetcodeIcon,
    link: SITE.socials.leetcode,
  },
];

const Socials = ({ className }: { className: string }) => {
  const isMobile = useMobileView();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className={
        isMobile
          ? `${className} flex flex-col items-center `
          : `${className} flex flex-row items-center justify-end w-full gap-3`
      }
    >
      <motion.div
        className={
          isMobile
            ? "jap text-4xl  mt-20 relative flex items-center justify-center w-full"
            : "jap text-4xl flex rotate-270 relative origin-top items-center justify-center"
        }
        initial={{
          y: isMobile ? -10 : 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={hovered}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={` absolute ${
              isMobile ? " right-[35%] -bottom-3" : "-bottom-3"
            }`}
          >
            {hovered || "Socials"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <motion.div
        className={`grid grid-cols-2 gap-2 ${isMobile ? "mt-1" : ""}`}
      >
        <motion.div className="flex flex-col gap-1">
          {ICONS.slice(0, 3).map(({ label, Component, link }) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={label}
              className="cursor-pointer relative z-10"
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(label)}
              onTouchEnd={() => setHovered(null)}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  scale: hovered === label ? 1.1 : 1,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, delay: 0.3 },
                }}
                className="cursor-pointer"
              >
                <Component size={50} />
              </motion.div>
            </a>
          ))}
        </motion.div>
        <div className="flex flex-col gap-1">
          {ICONS.slice(3, 6).map(({ label, Component, link }) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer relative z-10"
              key={label}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(label)}
              onTouchEnd={() => setHovered(null)}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: 15,
                }}
                animate={{
                  scale: hovered === label ? 1.1 : 1,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, delay: 0.3 },
                }}
                className="cursor-pointer"
              >
                <Component size={50} />
              </motion.div>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Socials;
