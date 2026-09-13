"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function SideScroller() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth spring animation for the scroll progress - fast & responsive
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.5,
  });

  useEffect(() => {
    const checkScrollable = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      setIsVisible(isScrollable);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-1 top-1/2 -translate-y-1/2 z-50 h-48 w-2">
      {/* Track - container with white outline */}
      <div className="relative w-full h-full rounded-full border border-black/20 dark:border-white/30 bg-transparent overflow-hidden">
        {/* Thumb - black fill that grows based on scroll */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[#0a0a0a] dark:bg-red-700 rounded-full origin-top"
          style={{
            scaleY: smoothProgress,
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
