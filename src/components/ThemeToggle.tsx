"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import BrightnessDownIcon from "@/components/ui/brightness-down-icon";
import MoonIcon from "@/components/ui/moon-icon";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface ThemeToggleProps {
  charizardMode?: boolean;
}

// View Transition API typing
type DocumentVT = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

export function ThemeToggle({ charizardMode = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [showCharizard, setShowCharizard] = useState(false);
  const [showWhiteCharizard, setShowWhiteCharizard] = useState(false);
  const [animating, setAnimating] = useState(false);

  const runRealtimeSwap = (target: "dark" | "light") => {
    const doc = document as DocumentVT;

    // Fallback for browsers without View Transitions — just swap.
    if (!doc.startViewTransition) {
      setTheme(target);
      return;
    }

    setAnimating(true);

    const transition = doc.startViewTransition(() => {
      setTheme(target);
    });

    transition.ready.then(() => {
      doc.documentElement.animate(
        {
          clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
        },
        {
          duration: 1100,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    transition.finished.finally(() => setAnimating(false));
  };

  const handleToggle = () => {
    const target: "dark" | "light" = isDark ? "light" : "dark";

    if (!charizardMode) {
      runRealtimeSwap(target);
      return;
    }

    if (!isDark) {
      setShowCharizard(true);
      setAnimating(true);
      setTimeout(() => {
        setTheme("dark");
        setTimeout(() => {
          setShowCharizard(false);
          setAnimating(false);
        }, 300);
      }, 400);
    } else {
      setShowWhiteCharizard(true);
      setAnimating(true);
      setTimeout(() => {
        setTheme("light");
        setTimeout(() => {
          setShowWhiteCharizard(false);
          setAnimating(false);
        }, 300);
      }, 400);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative flex items-center justify-center w-14 h-14 hover:cursor-pointer ${
          isDark ? "mt-[5px]" : ""
        } `}
        aria-label="Toggle theme"
        disabled={animating}
      >
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 1 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <BrightnessDownIcon size={28} className="text-[#ff0000]" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 1 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <MoonIcon size={20} />
          </motion.span>
        )}
        <span className="sr-only">Toggle theme</span>
      </button>

      <AnimatePresence onExitComplete={() => setShowCharizard(false)}>
        {showCharizard && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.7 }}
            animate={{ scale: 20, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              pointerEvents: "none",
              transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <Image
              src="/images/BlackCharizard.png"
              alt="Charizard Transition"
              width={600}
              height={600}
              style={{
                objectFit: "contain",
                transition: "transform 1.2s cubic-bezier(0.4,0,0.2,1)",
              }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence onExitComplete={() => setShowWhiteCharizard(false)}>
        {showWhiteCharizard && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.7 }}
            animate={{ scale: 20, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              pointerEvents: "none",
              transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <Image
              src="/images/WhiteCharizard.png"
              alt="Charizard Transition Light"
              width={600}
              height={600}
              style={{
                objectFit: "contain",
                transition: "transform 1.2s cubic-bezier(0.4,0,0.2,1)",
              }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
