"use client";

import Link from "next/link";

interface CertificateCarouselProps {
  urls: string[];
}

const CertificateCarousel: React.FC<CertificateCarouselProps> = ({ urls }) => {
  if (!urls || urls.length === 0) return null;

  // Duplicate for seamless loop
  const items = [...urls, ...urls];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      <Link href="/certificates" className="jap text-3xl mb-4 block hover:opacity-80 transition-opacity">
        Certificates
      </Link>
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-background to-transparent" />

        <Link href="/certificates" className="flex gap-2 w-max animate-certificate-scroll">
          {items.map((url, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 h-48 rounded-xl overflow-hidden border border-border bg-card"
            >
              <img
                src={url}
                alt={`Certificate ${(i % urls.length) + 1}`}
                className="w-full h-full object-cover grayscale transition-[filter] duration-300 hover:grayscale-0 cursor-pointer"
                draggable={false}
              />
            </div>
          ))}
        </Link>
      </div>
    </div>
  );
};

export default CertificateCarousel;
