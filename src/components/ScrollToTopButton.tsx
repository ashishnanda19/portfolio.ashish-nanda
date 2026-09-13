"use client";
import React, { useEffect, useState } from "react";
import { useMobileView } from "@/hooks/useMobileView";
import ArrowNarrowUpIcon from "@/components/ui/arrow-narrow-up-icon";

const ScrollToTopButton = () => {
  const isMobile = useMobileView();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isMobile) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 size-14 transition-opacity duration-300 flex justify-center items-center ${
        visible ? "opacity-100 rounded-full " : "opacity-0 "
      }`}
      aria-label="Scroll to top"
    >
      <ArrowNarrowUpIcon size={28} strokeWidth={2} />
    </button>
  );
};

export default ScrollToTopButton;
