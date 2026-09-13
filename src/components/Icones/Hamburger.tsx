"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, SVGMotionProps } from "motion/react";
import { ThemeToggle } from "../ThemeToggle";
import { useMobileView } from "@/hooks/useMobileView";
import { useThemeMode } from "@/hooks/useThemeMode";
import JapaneseNameLogo from "../Logo/JapaneseNameLogo";

type PathProps = SVGMotionProps<SVGPathElement>;

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    className="stroke-black dark:stroke-white"
    strokeLinecap="round"
    {...props}
  />
);

const navItems = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Work",
    href: "/work",
  },
  {
    name: "Arena",
    href: "/arena",
  },
  {
    name: "Skills",
    href: "/skills",
  },
  // {
  //   name: "Certificates",
  //   href: "/certificates",
  // },
];

export const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const isMobile = useMobileView();
  const theme = useThemeMode();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Should only appear on mobile
  if (!isMobile) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-[101] p-1 focus:outline-none cursor-pointer select-none"
        aria-label="Toggle Menu"
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: "M 7 2.5 L 18 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          />
          <Path
            d="M 2 9.423 L 4 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          />
          <Path
            d="M 8 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          />
          <Path
            variants={{
              closed: { d: "M 5 16.346 L 16 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"
            />
            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[100] h-screen w-1/2 bg-background/95 backdrop-blur-md border-l border-border/10 flex flex-col items-center justify-center gap-8 shadow-2xl"
            >
              <div className="absolute top-6 left-4 flex items-center">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <JapaneseNameLogo
                    size={120}
                    color={theme === "dark" ? "#ff0000" : "black"}
                    glowOnHover
                  />
                </Link>
              </div>

              <nav className="flex flex-col items-center gap-6 text-center w-full mt-10">
                {navItems.map(({ name, href }, i) => (
                  <motion.div
                    key={name + href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="group relative block w-full px-2 py-1"
                    >
                      <span
                        className={`relative z-10 transition-colors duration-300 ${
                          path === href
                            ? "text-primary"
                            : "text-foreground/80 hover:text-foreground"
                        } ${
                          name === "Arena"
                            ? `jap text-4xl ${
                                theme === "dark" ? "demon-red" : "demon-red"
                              }`
                            : "smalll text-xl tracking-wide"
                        }`}
                      >
                        {name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mt-4"
              >
                <ThemeToggle />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
