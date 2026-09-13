"use client";

import { useState, useEffect } from "react";
import BentoCard from "./BentoCard";
import Loader from "@/components/Miscellaneous/Loader";
import { motion, AnimatePresence } from "motion/react";

interface QuoteData {
  quote: string;
  author: string;
  work?: string | null;
  categories: string[];
}

const Quotes = ({ className }: { className: string }) => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check for cached quote
      const cachedData = localStorage.getItem("quote_cache");
      if (cachedData) {
        const { quote, timestamp } = JSON.parse(cachedData);
        // Check if cache is less than 1 hour old (3600000 ms)
        if (Date.now() - timestamp < 3600000) {
          setQuoteData(quote);
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch("/api/quotes");

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await response.json();

      if (!data || !data.quote) {
        throw new Error("Invalid quote data");
      }

      // Save to cache
      localStorage.setItem(
        "quote_cache",
        JSON.stringify({
          quote: data,
          timestamp: Date.now(),
        })
      );

      setQuoteData(data);
    } catch (err: unknown) {
      console.error("Error fetching quote:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load";
      setError(errorMessage);

      // Fallback to cache even if expired if fetch fails
      const cachedData = localStorage.getItem("quote_cache");
      if (cachedData) {
        const { quote } = JSON.parse(cachedData);
        setQuoteData(quote);
        setError(null); // Clear error since we have content
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <BentoCard className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size="sm" />
        </div>
      </BentoCard>
    );
  }

  // Error state
  if (error || !quoteData) {
    return (
      <BentoCard className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2">
          <span className="text-xs text-black/50 dark:text-white/50 text-center">
            Unable to load quote
          </span>
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard
      className={`relative overflow-hidden group cursor-pointer ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteData.quote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative h-full w-full flex flex-col justify-between px-5 py-4"
        >
          {/* Decorative opening glyph */}
          <span
            aria-hidden
            className="absolute top-1 left-3 font-[family-name:var(--font-instrument)] text-5xl md:text-6xl leading-none text-black/10 dark:text-white/10 select-none pointer-events-none"
          >
            &ldquo;
          </span>

          {/* Quote Text */}
          <p className="font-[family-name:var(--font-instrument)] relative z-10 text-[13px] md:text-sm leading-relaxed text-black/85 dark:text-white/85 italic line-clamp-3 md:line-clamp-4 pl-5 pr-2 pt-3">
            {quoteData.quote}
          </p>

          {/* Author & Work */}
          <div className="relative z-10 mt-2 flex flex-col items-end gap-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-black/30 dark:bg-white/30" />
              <span className="font-[family-name:var(--font-instrument)] italic text-[10px] md:text-xs tracking-wide text-black/70 dark:text-white/70">
                {quoteData.author}
              </span>
            </div>
            {quoteData.work && (
              <span className="text-[9px] md:text-[10px] text-black/40 dark:text-white/40 italic mt-0.5">
                {quoteData.work}
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </BentoCard>
  );
};

export default Quotes;
