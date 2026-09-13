"use client";
import { IconClockHour4 } from "@tabler/icons-react";

const WorkInProgress = () => {
  return (
    <div className="skillsDoubleBorder w-full">
      <div className="flex flex-col w-full h-full items-center gap-3 rounded-md p-6 text-center">
        
        <div className="flex items-center justify-center w-20 h-20 rounded-full ">
          <IconClockHour4 className="w-10 h-10 animate-pulse" />
        </div>

        <h2 className="text-xl font-semibold">Projects Coming Soon 🚀</h2>
        <p className="text-gray-400 text-sm max-w-md">
          I’m still building some exciting projects. Please check back later!
        </p>
      </div>
    </div>
  );
};

export default WorkInProgress;
