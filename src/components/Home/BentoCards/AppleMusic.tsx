"use client";

import BentoCard from "./BentoCard";
import { useMobileView } from "@/hooks/useMobileView";

interface AppleMusicProps {
  className?: string;
}

const AppleMusic: React.FC<AppleMusicProps> = ({ className }) => {
  const isMobile = useMobileView();

  return (
    <BentoCard noBorder className={`${className} !p-0  overflow-hidden`}>
      <div
        className={`w-full h-full flex ${
          isMobile ? "item-center" : "relative bottom-14.5 "
        } justify-center`}
        style={{
          transform: !isMobile ? "scale(0.55)" : "none",
        }}
      >
        <iframe
          className={` ${
            !isMobile ? "w-[352px] h-[360px]" : "w-full h-full min-h-[172px]"
          }`}
          style={{
            border: "none",
            borderRadius: "20px",
            boxShadow: "none",
            backgroundColor: "transparent",
          }}
          src="https://embed.music.apple.com/in/playlist/dikhe-na-koi-disha/pl.u-DdANrpPs0Pa4gJA"
          height="100%"
          allow="autoplay *; encrypted-media *; clipboard-write"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </BentoCard>
  );
};

export default AppleMusic;
