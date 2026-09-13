'use client';
import { useThemeMode } from "@/hooks/useThemeMode";

export default function Vs({custom}:{custom? : string }) {
    const theme = useThemeMode();
    return(
      <div className="flex">
        <div className={` jap text-4xl ${theme==='dark'?'demon-red':''} ${custom}`}>V</div>
        <div className={` jap text-4xl ${theme==='dark'?'text-yellow-400':''} ${custom}`}>S</div>
      </div>
  );
}