"use client";
import React from "react";
import MailFilledIcon from "@/components/ui/mail-filled-icon";
import { SITE } from "@/data/site";

const ContactButton = () => {

  return (
    <>
      <button
        type="button"
        aria-label="Contact"
        className="fixed left-4 bottom-2/5 -translate-y-1/2 z-10 size-14 flex items-center justify-center rounded-full border hover:border-2 transition-all ease-in-out"
        onClick={() => (window.location.href = `mailto:${SITE.email}`)}
      >
        <MailFilledIcon size={28} />
      </button>
    </>
  );
};

export default ContactButton;
