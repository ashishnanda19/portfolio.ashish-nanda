"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import {
  IconHome,
  IconBriefcase,
  IconNotebook,
  IconSwords,
  IconCode,
  IconUser,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

interface DockItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; stroke?: number }>;
}

const items: DockItem[] = [
  { name: "Home", href: "/", icon: IconHome },
  { name: "About", href: "/about", icon: IconUser },
  { name: "Work", href: "/work", icon: IconBriefcase },
  { name: "Blog", href: "/blog", icon: IconNotebook },
  { name: "Arena", href: "/arena", icon: IconSwords },
  { name: "Skills", href: "/skills", icon: IconCode },
];

// Inline View-Transition-API theme swap (top→bottom wipe)
type DocumentVT = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

const MobileDock = () => {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const target = isDark ? "light" : "dark";
    const doc = document as DocumentVT;
    if (!doc.startViewTransition) {
      setTheme(target);
      return;
    }
    const t = doc.startViewTransition(() => setTheme(target));
    t.ready.then(() => {
      doc.documentElement.animate(
        { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] },
        {
          duration: 1100,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.15 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden"
    >
      {/* Goo filter for liquid blob morph during active-pill transit */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden
      >
        <defs>
          <filter id="dock-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        style={{ display: "flex", flexDirection: "row" }}
        className="dock-pill skillsDoubleBorder items-center gap-1 px-2.5 py-1.5 !rounded-full backdrop-blur-xl w-max"
      >
        {items.map(({ name, href, icon: Icon }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} aria-label={name} className="relative">
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300 ease-out ${
                  active
                    ? "text-white dark:text-white"
                    : "text-black/65 dark:text-white/65"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full bg-black dark:bg-red-800 dark:shadow-[0_0_14px_rgba(153,27,27,0.4)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                      mass: 0.8,
                    }}
                  />
                )}
                <span className="relative z-10">
                  <Icon size={19} stroke={1.75} />
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* Divider */}
        <span className="mx-1 h-5 w-px bg-black/15 dark:bg-white/15" />

        {/* Theme toggle (compact) */}
        <motion.button
          type="button"
          onClick={toggleTheme}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          aria-label="Toggle theme"
          className="flex items-center justify-center w-11 h-11 rounded-full text-black/65 dark:text-white/65 hover:cursor-pointer"
        >
          {isDark ? (
            <IconSun size={19} stroke={1.75} />
          ) : (
            <IconMoon size={19} stroke={1.75} />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MobileDock;
