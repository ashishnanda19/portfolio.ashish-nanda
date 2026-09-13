import BentoCard from "./BentoCard";
import Image from "next/image";

const Vibe = ({ className }: { className: string }) => {
  return (
    <BentoCard className={` overflow-hidden min-h-[250px] ${className}`}>
      <div className="relative w-full h-full">
        <Image
          src="/images/me.png"
          alt="Ashish Nanda"
          fill
          className="object-cover w-full h-full"
          sizes="100vw"
          priority
        />
      </div>
    </BentoCard>
  );
};

export default Vibe;
