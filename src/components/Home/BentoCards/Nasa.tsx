"use client";

import { useState, useEffect } from "react";
import BentoCard from "./BentoCard";
import Loader from "@/components/Miscellaneous/Loader";

interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
  copyright?: string;
  thumbnail_url?: string;
}

const Nasa = ({ className }: { className: string }) => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/nasa");

        if (!response.ok) {
          throw new Error("Failed to fetch APOD");
        }

        const data = await response.json();

        // count=1 returns an array with one item
        const apod = Array.isArray(data) ? data[0] : data;

        // Validate the response has required fields
        if (!apod || !apod.url) {
          throw new Error("Invalid APOD data");
        }

        setApodData(apod);
      } catch (err: unknown) {
        console.error("Error fetching APOD:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <BentoCard
        noBorder
        className={`relative overflow-hidden rounded-xl ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size="md" />
        </div>
      </BentoCard>
    );
  }

  // Error state
  if (error || !apodData) {
    return (
      <BentoCard className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center gap-2 p-1">
          <span className="text-xs text-white/50 text-center">
            Unable to load
          </span>
        </div>
      </BentoCard>
    );
  }

  const isVideo = apodData.media_type === "video";
  const imageUrl = isVideo ? apodData.thumbnail_url : apodData.url;

  // Parse date (format: YYYY-MM-DD) into day, month, year
  const dateParts = apodData.date ? apodData.date.split("-") : [];
  const year = dateParts[0] || "";
  const month = dateParts[1] || "";
  const day = dateParts[2] || "";

  return (
    <BentoCard
      noBorder
      className={`relative overflow-hidden rounded-xl flex flex-col ${className}`}
    >
      {/* Image container - full width, takes available space */}
      <div className="relative flex-1 min-h-0 w-full">
        {imageUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={apodData.title || "NASA APOD"}
            className="w-full h-full object-cover rounded-xl"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0c0c1d] via-[#1a1a2e] to-[#0f0f23] rounded-xl" />
        )}
      </div>

      {/* Date section - outside the image, below it */}
      <div className="flex justify-end w-full px-4 py-2">
        <span className="jap font-bold text-xl tracking-widest">
          <span className="text-[#ff0000]">
            {day}-{month}
          </span>
          <span className="text-black/70 dark:text-white/80">-{year}</span>
        </span>
      </div>
    </BentoCard>
  );
};

export default Nasa;
