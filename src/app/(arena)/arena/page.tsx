import AppleMusicIframe from "@/components/Arena/AppleMusicIframe";
import Cd from "@/components/Miscellaneous/Cd";

export default function ArenaPage() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="flex-1">
        <AppleMusicIframe />
      </div>
      <Cd />
    </div>
  );
}
