"use client";
import React from "react";
import VisitorCount from "./VisitorCount";

const Footer = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear().toString().slice(-2);
  const formattedDate = `${month}/${day}/${year}`;

  return (
    <footer className="w-full mt-10">
      <hr className="border-t border-neutral-700 w-full mb-2" />
      <div className="flex justify-between items-start w-full px-2">
        <div className="jap flex flex-col items-start max-w-xs break-words">
          <VisitorCount />
        </div>
        <div className="jap text-center w-1/3 text-2xl">{formattedDate}</div>
        <div className="text-right text-3xl jap">@ashish19n</div>
      </div>
    </footer>
  );
};

export default Footer;
